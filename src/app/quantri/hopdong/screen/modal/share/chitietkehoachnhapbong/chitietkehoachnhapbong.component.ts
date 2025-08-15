import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { async } from 'rxjs/internal/scheduler/async';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-chitietkehoachnhapbong',
  templateUrl: './chitietkehoachnhapbong.component.html',
  styleUrls: ['./chitietkehoachnhapbong.component.css']
})
export class ChitietkehoachnhapbongComponent implements OnInit {

  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {
    "id": "",
    "idKeHoachNhapBong": this.item.Id,
  };
  editTableItem: any = [];
  listLoBong: any = [];
  listKho: any = [];
  lang: any = vn;
  data: any = {};
  filter: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  userInfo: any;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  listduan: any = [];
  listhopdong: any = [];
  listhopdong_copy: any = [];
  listdmCapBong: any = [];
  listdmKho: any = []
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    public _modal: NgbModal,
    private _services: SanXuatService,
    private _auth: AuthenticationService,
    private store: StoreService,
    private _servicesHopDong: HopDongService,
  ) {
  }

  ngOnInit(): void {
    this.userInfo = this._auth.currentUserValue;
    this.GetDanhSachDuAnByIdUser();
    if (this.opt !== 'edit') {
      this.item = {
        Id: "",
        listInvoice: [],
      }
      this.item.IdDuAn = this.store.getCurrent();
      this.GetDanhSachHopDongByNhaThau();
      this.GetNextSoQuyTrinh();
    }
    else {
      this.GetItem(this.item.Id);
    }
    this.data.CurrentPage = 0;
    
    this._services.GetListOptdmCapBong().subscribe((res: any) => {
      this.listdmCapBong = mapArrayForDropDown(res, "Ten", "Id");
    });
   
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
      if(this.item.isKetThuc === true){
          this._services.CheckEditPhieuInvoice(this.item.Id || '').subscribe(res => {
          if(res == true){
            this.item.isEdit = true;
            this.checkbutton.Ghi = true;
          }
        })
      }
    })
  }

  GetDanhSachDuAnByIdUser() {
    this._services.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res: any) => {
      this.listduan = mapArrayForDropDown(res, 'TenDuAn', 'Id');
    })
  }

  GetDanhSachHopDongByNhaThau() {
    this._servicesHopDong.QuyTrinhHopDong().GetDanhSachHopDongMua(this.item.IdDuAn).subscribe((res: any) => {//lay bong va xo
      this.listhopdong = mapArrayForDropDown(res, 'soTenHopDong', 'id');
      this.listhopdong_copy = deepCopy(res);
    })
  }

  GetListdmLoaiBongForHopDong() {
    let item = this.listhopdong_copy.find(obj => obj.Id == this.item.IdHopDong);
    this.item.SoLuong = item.SoLuong;
    this.item.GiaCif = item.GiaCif;
    this.item.tenLoaiBongXo = item.tenLoaiBongXo;
    this.item.IddmLoaiBong = item.IddmLoaiBong;
    this.item.IddmCapBong = item.IddmCapBong;
    this.item.IddmDacTinh = item.IddmDacTinh;
    this.item.SoContainer = item.SoContainer;
    this.item.SoKien = item.SoKien;
    this.item.TendmCapBong = validVariable(this.item.IddmCapBong) ? this.listdmCapBong.find(e=> e.value == this.item.IddmCapBong).label : '';
    this._services.dmDacTinhBong().GetDacTinh(this.item.IddmLoaiBong || '', this.item.IddmCapBong || '').subscribe((res: any) => {
      this.item.dacTinhBong = validVariable(this.item.IddmDacTinh) ? res.find(e=> e.Id == this.item.IddmDacTinh).DacTinh : '';
    });
    this.data.Loai = item.loai;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listdmKho = mapArrayForDropDown(res, "Ten", "Id");
    });
  }

  ChuyenDuyet() {
    if (this.setdata()) {
      this._services.KeHoachNhapBong().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.Message);
          }
        }
      })
    }
  }

  KhongDuyet() {
    if (this.setdata()) {
      this._services.KeHoachNhapBong().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.Message);
          }
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._services.KeHoachNhapBong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  setdata() {
    if(validVariable(this.newTableItem.SoContainer) && validVariable(this.newTableItem.SoLuong) && validVariable(this.newTableItem.SoKien)
    && validVariable(this.newTableItem.ThoiGianCapCang) && validVariable(this.newTableItem.ThoiGianDuKien)){
      this.add()
    }
    let isCheckThoiGian : any = false;
    let isCheckKho : any = false;
    
    if(validVariable(this.item.listInvoice)){
      for(let i = 0; i < this.item.listInvoice.length; i ++){
        if(!validVariable(this.item.listInvoice[i].ThoiGianDuKien) || !validVariable(this.item.listInvoice[i].ThoiGianCapCang)){
          isCheckThoiGian = true;
          break;
        }
        if(!validVariable(this.item.listInvoice[i].IddmKho)){
          isCheckKho = true;
          break;
        }
      }
    }
    
    if(isCheckThoiGian === true)
    {
      this.toastr.error('Vui lòng chọn thời gian')
      return false;
    }
    else if(isCheckKho === true)
    {
      this.toastr.error('Vui lòng chọn kho')
      return false;
    }
    else if (!validVariable(this.item.IdHopDong)) {
      this.toastr.error('Vui lòng chọn hợp đồng')
      return false;
    }
    else if (!validVariable(this.item.ThoiGianDuKien)) {
      this.toastr.error('Vui lòng chọn thời gian dự kiến')
      return false;
    }
    else if (!validVariable(this.item.ThoiGianCapCang)) {
      this.toastr.error('Vui lòng chọn thời gian cập cảng')
      return false;
    }
    else{
      this.item.ThoiGianDuKienUnix = DateToUnix(this.item.ThoiGianDuKien);
      this.item.ThoiGianCapCangUnix = DateToUnix(this.item.ThoiGianCapCang);
      if (this.item.listInvoice.length > 0) {
        this.item.listInvoice.forEach(obj => {
          obj.ThoiGianDuKienUnix = DateToUnix(obj.ThoiGianDuKien);
          obj.ThoiGianCapCangUnix = DateToUnix(obj.ThoiGianCapCang);
        });
      }
      return true;
    }
  }

  GhiLai() {
    
    if (this.setdata()) {
      this._services.KeHoachNhapBong().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.toastr.success(res.Message)
            this.opt = 'edit';
            this.GetItem(res.Data);
          } else {
            this.toastr.error(res.Message);
          }
        }
      })
    }
  }

  GetItem(Id) {
    this._services.KeHoachNhapBong().Get(Id).subscribe((res: any) => {
      this.item = res.Data;
      this.item.ThoiGianDuKien = UnixToDate(this.item.ThoiGianDuKienUnix);
      this.item.ThoiGianCapCang = UnixToDate(this.item.ThoiGianCapCangUnix);
      if (this.item.listInvoice.length > 0) {
        this.item.listInvoice.forEach(obj => {
          obj.ThoiGianDuKien = UnixToDate(obj.ThoiGianDuKienUnix);
          obj.ThoiGianCapCang = UnixToDate(obj.ThoiGianCapCangUnix);
        });
      }
      this._servicesHopDong.QuyTrinhHopDong().GetDanhSachHopDongMua(this.item.IdDuAn).subscribe((res: any) => {
        this.listhopdong = mapArrayForDropDown(res, 'soTenHopDong', 'id');
        this.listhopdong_copy = deepCopy(res);
        this.GetListdmLoaiBongForHopDong();
      })
      this.KiemTraButtonModal();
    })
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._services.KeHoachNhapBong().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.statusCode === 200) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.Message);
        }
      })
    }).catch(er => console.log(er))
  }

  filtertable_add() {
    if (this.filter.KeyWord != undefined && this.filter.KeyWord != null && this.filter.KeyWord != "") {
      this.item.listItem_copy = deepCopy(this.item.listItem);
      let filter = this.item.listItem.filter(obj => {
        let Ten = obj.objloaibong.label.toLowerCase();
        let indexOf = Ten.indexOf(this.filter.KeyWord);
        return indexOf != -1
      });
      this.item.listItem = filter;
      
    }
    else {
      this.item.listItem = deepCopy(this.item.listItem_copy);
      this.item.listItem.filter(obj => {
        obj.ThoiGianDuKien = obj.ThoiGianDuKienUnix > 0 ? UnixToDate(obj.ThoiGianDuKienUnix) : 0;
        obj.ThoiGianCapCang = obj.ThoiGianCapCangUnix > 0 ? UnixToDate(obj.ThoiGianCapCangUnix) : 0;
      });
    }
  }

  resetFilter() {
    this.filter = {};
    this.filter.KeyWord = '';
    this.filtertable_add();
  }

  add() {
    if(!validVariable(this.newTableItem.ThoiGianCapCang) || !validVariable(this.newTableItem.ThoiGianDuKien)){
      this.toastr.error('Vui lòng chọn thời gian')
    }
    if (this.item.listInvoice == undefined || this.item.listInvoice == null)
      this.item.listInvoice = [];
    this.newTableItem.Id = "";
    this.newTableItem.IdKeHoachNhapBong = this.item.Id;
    if(!validVariable(this.newTableItem.SoContainer))
      this.newTableItem.SoContainer = 0;
    if(!validVariable(this.newTableItem.SoLuong))
      this.newTableItem.SoLuong = 0;
    if(!validVariable(this.newTableItem.SoKien))
      this.newTableItem.SoKien = 0;
    this.item.listInvoice.push(this.newTableItem);
    this.tinhTongContainer_SoKien();
    this.newTableItem = {
      "id": "",
      "idKeHoachNhapBong": this.item.Id,
    }
  }
  edit(item, index) {
    this.item.listInvoice.forEach(element => {
      element.editField = false;
    });
    this.item.listInvoice[index].editField = true;
    this.editTableItem = deepCopy(item);
  }
  delete(index) {
    if (!validVariable(this.item.listInvoice[index].Id)) {
      this.item.listInvoice.splice(index, 1)
    } else {
      this.item.listInvoice[index].isXoa = true;
    }
    this.tinhTongContainer_SoKien();
  }
  saveEdit(item, index) {
    this.item.listInvoice[index] = item;
    this.item.listInvoice[index].editField = false;
  }
  cancelEdit(item, index) {
    this.item.listInvoice[index].editField = false;
  }
  Onclose() {
    this.activeModal.close();
  }
  editItem(item) {
    // let modalRef = this._modal.open(KehoachnhapnguyenlieuitemmodalComponent, {
    //   size: 'fullscreen',
    //   backdrop: 'static'
    // })
    // modalRef.componentInstance.item = item;

    // modalRef.result.then((res: any) => {
    //   item.Container = 0;
    //   item.TongSoKien = 0;
    //   item.SoLuongNhap = 0;
    //   console.log(res)
    //   item.listDot = res.Data;
    //   item.listDot.forEach(element => {
    //     item.Container += element.Container;
    //     item.TongSoKien += element.TongSoKien;
    //     item.SoLuongNhap += element.SoLuongNhap;
    //   });
    // })
    //   .catch(er => { console.log(er) })
  }

  tinhTongContainer_SoKien() {
    this.item.SoContainer = 0;
    this.item.SoKien = 0;
    this.item.listInvoice.forEach(obj => {
      if (this.item.isXoa == undefined || this.item.isXoa == false) {
        this.item.SoContainer += obj.SoContainer;
        this.item.SoKien += obj.SoKien;
      }
    });
  }

}

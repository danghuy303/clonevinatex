import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { XuatkhohoiamComponent } from 'src/app/quantri/quanlykhosanxuat/quytrinh/xuatkhohoiam/xuatkhohoiam.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-hopdongxuatlobongxomodal',
  templateUrl: './hopdongxuatlobongxomodal.component.html',
  styleUrls: ['./hopdongxuatlobongxomodal.component.css']
})
export class HopdongxuatlobongxomodalComponent implements OnInit {
  
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  lang: any = vn;
  data: any = {};
  type: any = '';
  nametype: any = '';
  listHopDong: any = [];
  listHopDongFull: any = [];
  IdDuAn: any = 0;
  userInfo: any;
  listLoBong: any = [];
  listKho: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService, private _auth: AuthenticationService,
    private _hopdong: HopDongService,) {
      this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.item = {
        id: '',
        idDuAn: this.IdDuAn,
        DaVeKho: true,
      }
      this.GetNextSoQuyTrinh();
    }
    else{
      this.getQuyTrinh(this.item.id);
    }
    this.getListHopDong();
    this.getListdmKho();
  }
  getListHopDong(){
    this._hopdong.QuyTrinhHopDong().GetListHopDongBanChoVay(this.item.idDuAn).subscribe((res: any) => {
      this.listHopDong = mapArrayForDropDown(res, 'tenSoHopDong', 'id');
      this.listHopDongFull = res;
    })
  }
  
  getListdmKho(){
    let data: any = {
      CurrentPage: 0,
      Loai: 2,
    }
    this._services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.id || '', this.item.idTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  ChuyenTiep() {
    if(this.CheckTruocKhiLuu()){
      this.item.isChuaVeKho = this.item.ChuaVeKho;
      if (this.item.ngay !== null && this.item.ngay !== undefined)
        this.item.ngayUnix = DateToUnix(this.item.ngay);
      this._hopdong.QuyTrinhXuatBongXo().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.activeModal.close();
            this.toastr.success(res.message)
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  KhongDuyet() {
    if(this.CheckTruocKhiLuu()){
      this.item.isChuaVeKho = this.item.ChuaVeKho;
      if (this.item.ngay !== null && this.item.ngay !== undefined)
        this.item.ngayUnix = DateToUnix(this.item.ngay);
      this._hopdong.QuyTrinhXuatBongXo().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.activeModal.close();
            this.toastr.success(res.message)
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  GetNextSoQuyTrinh() {
    this._hopdong.QuyTrinhXuatBongXo().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.soQuyTrinh = res.data;
    })
  }

  GhiLai() {
    if(this.CheckTruocKhiLuu())
    {
      this.item.ngayUnix = DateToUnix(this.item.ngay);
      this.item.isChuaVeKho = this.item.ChuaVeKho;
      this._hopdong.QuyTrinhXuatBongXo().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.getQuyTrinh(res.data.id)
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._hopdong.QuyTrinhXuatBongXo().Delete(this.item.id).subscribe((res: any) => {
        console.log(res);
        if (res?.statusCode === 200) {
          this.activeModal.close();
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getQuyTrinh(Id) {
    this._hopdong.QuyTrinhXuatBongXo().Get(Id).subscribe((res1: any) => {
      this.item=res1.data;
      this.item.ngay = UnixToDate(this.item.ngayUnix);
      this.KiemTraButtonModal();
      this.item.ChuaVeKho = this.item.isChuaVeKho;
      this.item.DaVeKho = !this.item.ChuaVeKho;
      let dnm: any = {}
      dnm.IddmLoaiBong = this.item.iddmLoaiBong;
      dnm.CurrentPage = 0;
      this._services.GetListLoBong(dnm).subscribe((res: any) => {
        this.listLoBong = mapArrayForDropDown(res, "Ten", "Id");
      });
    })
  }
  add() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(this.newTableItem);
    this.newTableItem = {}
    
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  Onclose() {
    this.activeModal.close();
  }
  CheckTruocKhiLuu(){
    if(validVariable(this.newTableItem.soKien)){
      this.add();
    }
    if (!validVariable(this.item.idHopDong)) {
      this.toastr.error("Bạn chưa chọn hợp đồng!");
      return false;
    }
    else if (!validVariable(this.item.ngay)) {
      this.toastr.error("Bạn chưa chọn  ngày!");
      return false;
    }
    else if (!validVariable(this.item.noiDung)) {
      this.toastr.error("Bạn chưa điền nội dung!");
      return false;
    }
    return true;
  }
  chonHopDong(){
    let data: any = this.listHopDongFull.filter(e=> e.id == this.item.idHopDong);
    if(data !== undefined){
      this.item.tenLoaiBongXo = data[0].tenLoaiBongXo;
      this.item.xuatXu = data[0].xuatXu;
      this.item.iddmLoaiBong = data[0].iddmLoaiBong;

      let dnm: any = {}
      dnm.IddmLoaiBong = data[0].iddmLoaiBong;
      dnm.CurrentPage = 0;
      this._services.GetListLoBong(dnm).subscribe((res: any) => {
        this.listLoBong = mapArrayForDropDown(res, "Ten", "Id");
      });
    }
  }
}

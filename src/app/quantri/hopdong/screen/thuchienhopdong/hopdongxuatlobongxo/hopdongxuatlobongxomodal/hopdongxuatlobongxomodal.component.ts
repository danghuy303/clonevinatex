import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
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
  IdDuAn: any = 0;
  listLoaiThanhToan: any = [{label: 'Thanh toán theo kế hoạch thanh toán',value: 1},
  {label: 'Thanh toán theo invoice', value: 2}];
  userInfo: any;

  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService, private _auth: AuthenticationService,
    private _dmhopdong: DanhMucHopDongService,private _hopdong: HopDongService,) {
      this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.item = {
        id: '',
        idDuAn: this.IdDuAn,
      }
      this.GetNextSoQuyTrinh();
    }
    else{
      this.getQuyTrinh(this.item.id);
    }
    this.getListHopDong();

  }
  getListHopDong(){
    this._services.GetOptions().GetDanhSachHopDongByNhaThau(this.item.idDuAn).subscribe((res: any) => {
      this.listHopDong = mapArrayForDropDown(res, 'tenHopDong', 'id');
    })
  }
  
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.id || '', this.item.idTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  ChuyenTiep() {
    if(this.CheckTruocKhiLuu()){
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

  GetNextSoQuyTrinh() {
    this._hopdong.QuyTrinhXuatBongXo().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.soQuyTrinh = res.data;
    })
  }

  GhiLai() {
    if(this.CheckTruocKhiLuu())
    {
      this.item.ngayUnix = DateToUnix(this.item.ngay);
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
    if (this.newTableItem.Ten != undefined || this.newTableItem.SoCan != undefined || this.newTableItem.SoKien != undefined || this.newTableItem.IddmViTri != undefined) {
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
}

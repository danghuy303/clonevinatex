import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { ChonmathangthanhtoanhopdongComponent } from '../chonmathangthanhtoanhopdong/chonmathangthanhtoanhopdong.component';

@Component({
  selector: 'app-thanhtoanhopdongsoimodal',
  templateUrl: './thanhtoanhopdongsoimodal.component.html',
  styleUrls: ['./thanhtoanhopdongsoimodal.component.css']
})
export class ThanhtoanhopdongsoimodalComponent implements OnInit {

 
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
  listDieuKhoanThanhToan: any = [];
  listThanhToanInvoice: any = [];
  IdDuAn: any = 0;
  listLoaiThanhToan: any = [{label: 'Thanh toán theo kế hoạch thanh toán',value: 1},
  {label: 'Thanh toán theo đợt xuất hàng', value: 2}];
  userInfo: any;

  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService, private _auth: AuthenticationService,
    private _hopdong: HopDongService,) {
      this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.getListHopDong();
    if (this.opt !== 'edit') {
      this.item = {
        id: '',
        listFileDinhKem : [],
        listThanhToanMatHang  : [],
        listThanhToanThuHoi  : [],
        listThanhToanDotGiaoNhan  : [],
        idDuAn: this.IdDuAn,
      }
      this.GetNextSoQuyTrinh();
    }
    else{
      this.getQuyTrinh(this.item.id);
    }
  }
  getListHopDong(){
    this._services.GetOptions().GetDanhSachHopDongByNhaThau(this.IdDuAn).subscribe((res: any) => {
      this.listHopDong = mapArrayForDropDown(res, 'tenHopDong', 'id');
    })
  }
  
  getListDieuKhoanThanhToan(){
    if(this.item.loaiThanhToan === 1){
      this._hopdong.QuyTrinhHopDong().getListDieuKhoan(this.item.idHopDong).subscribe((res: any) => {
        this.listDieuKhoanThanhToan = mapArrayForDropDown(res.data, 'noiDung', 'id');
      })
    }
    else if(this.item.loaiThanhToan === 2){
      this._hopdong.QuyTrinhThanhToan().getListInvoice(this.item.idHopDong).subscribe((res: any) => {
        this.listThanhToanInvoice = mapArrayForDropDown(res.data, 'soQuyTrinh', 'id');
      })
    }
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.id || '', this.item.idTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  ChuyenTiep() {
    if(this.CheckTruocKhiLuu()){
      if (this.item.ngayThanhToan !== null && this.item.ngayThanhToan !== undefined)
        this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
      this._hopdong.QuyTrinhThanhToan().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this._hopdong.QuyTrinhThanhToan().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.soQuyTrinh = res.data;
    })
  }

  GhiLai() {
    if(this.CheckTruocKhiLuu())
    {
      this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
      this._hopdong.QuyTrinhThanhToan().Set(this.item).subscribe((res: any) => {
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
      this._hopdong.QuyTrinhThanhToan().Delete(this.item.id).subscribe((res: any) => {
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
    this._hopdong.QuyTrinhThanhToan().Get(Id).subscribe((res1: any) => {
      this.item=res1.data;
      this.item.listThanhToanDotGiaoNhan = []
      if (this.item.ngayThanhToanUnix !== null && this.item.ngayThanhToanUnix !== undefined) {
        this.item.ngayThanhToan = UnixToDate(this.item.ngayThanhToanUnix);
      }
      this.item.listThanhToanMatHang.forEach(element => {
        this.item.listThanhToanDotGiaoNhan.push(element["idInvoice"])
      });
      this.KiemTraButtonModal();
      this.getListDieuKhoanThanhToan();
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
    if (this.item.idHopDong === null || this.item.idHopDong === undefined) {
      this.toastr.error("Bạn chưa chọn hợp đồng!");
      return false;
    }
    else if (this.item.ngayThanhToan === null || this.item.ngayThanhToan === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày!");
      return false;
    }
    return true;
  }
  getListItem() {
    this.item.listThanhToanMatHang=[];
    this.item.listThanhToanDotGiaoNhan.forEach(element => {
      let data = {
        id : "",
        iddmitem : element,
        idHopDong: "",
        idThanhToanQuyTrinh:"",
      }
      this.item.listThanhToanMatHang.push(data)
    });
  }
  
  chonMatHang() {
    this._services.GetListdmItemByHangHoa().subscribe((res1: any) => {
      let modalRef = this._modal.open(ChonmathangthanhtoanhopdongComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.listThanhToanMatHang;
      modalRef.result.then(res => {
        this.item.listThanhToanMatHang = res;  
      }).catch(er => { console.log(er) });
    })
  }
}

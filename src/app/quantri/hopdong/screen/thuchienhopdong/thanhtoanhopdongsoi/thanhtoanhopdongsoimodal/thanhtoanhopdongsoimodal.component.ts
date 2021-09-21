import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
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
  listIdThanhToanInvoice: any = [];
  listThanhToanInvoiceFull: any = [];
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
    console.log(this.item)
    if (this.opt !== 'edit') {
      this.item = {
        id: '',
        listFileDinhKem : [],
        listThanhToanMatHang  : [],
        listThanhToanThuHoi  : [],
        listThanhToanDotGiaoNhan  : [],
        idDuAn: this.IdDuAn,
        loai:1,
      }
      this.GetNextSoQuyTrinh();
    }
    else{
      this.getQuyTrinh(this.item.id);
    }
    this.getListHopDong();

  }
  getListHopDong(){
    this._services.GetOptions().GetDanhSachHopDongByNhaThauSoi(this.item.idDuAn).subscribe((res: any) => {
      this.listHopDong = mapArrayForDropDown(res, 'tenHopDong', 'id');
    })
  }
  
  getListDieuKhoanThanhToan(){
    if(this.item.loaiThanhToan === 1){
      this._hopdong.QuyTrinhHopDong().getListDieuKhoan(this.item.idHopDong).subscribe((res: any) => {
        this.listDieuKhoanThanhToan = mapArrayForDropDown(res.data, 'noiDung', 'id');
        this.item.listThanhToanMatHang = []
        this.item.listThanhToanDotGiaoNhan = []
        this.listIdThanhToanInvoice=[]
      })
    }
    else if(this.item.loaiThanhToan === 2){
      this._hopdong.QuyTrinhThanhToan().getListInvoice(this.item.idHopDong).subscribe((res: any) => {
        this.listThanhToanInvoice = mapArrayForDropDown(res.data, 'soQuyTrinh', 'idPhieuXuatThanhPham');
        this.listThanhToanInvoiceFull = res.data;
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
      this.listIdThanhToanInvoice = []
      if (this.item.ngayThanhToanUnix !== null && this.item.ngayThanhToanUnix !== undefined) {
        this.item.ngayThanhToan = UnixToDate(this.item.ngayThanhToanUnix);
      }
      if(this.item.listThanhToanDotGiaoNhan.length> 0){
        this.item.listThanhToanDotGiaoNhan.forEach(element => {
          this.listIdThanhToanInvoice.push(element.idPhieuXuatThanhPham)
        });
      }
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
    this.item.listThanhToanDotGiaoNhan=[];
    this.listIdThanhToanInvoice.forEach(element => {
      let item: any = this.listThanhToanInvoiceFull.filter(e=> e.idPhieuXuatThanhPham == element)
      if(item!== undefined){
        let itempush: any = {
          idPhieuXuatThanhPham: element,
        }
        this.item.listThanhToanDotGiaoNhan.push(itempush);
      }
    });
    let data: any = deepCopy(this.listIdThanhToanInvoice);
    data.unshift(this.item.idHopDong);
    this._hopdong.QuyTrinhThanhToan().GetListInvoiceHopDongChiTiet(data).subscribe((res: any) => {
      res.data.forEach(element => {
        let itempush: any = {
          id:'',
          iddmItem: element.iddmItem,
          madmItem: element.madmItem,
          tendmItem: element.tendmItem,
          soContainer: element.soContainer,
          tongSoKien: element.tongSoKien,
          soLuongDaThanhToan: element.soLuongDaThanhToan,
          tongKhoiLuong: element.tongKhoiLuong,
        }
        this.item.listThanhToanMatHang.push(itempush);
      });
    })
  }
  
}

import { ChonthutucthanhtoanmodalComponent } from './chonthutucthanhtoanmodal/chonthutucthanhtoanmodal.component';
import { DanhMucHopDongService } from '../../../../../../../services/Hopdong/danhmuchopdong.service';
import { vn } from 'src/app/services/const';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { mapArrayForDropDown, DateToUnix, deepCopy, validVariable, UnixToDate, dinhDangSo } from 'src/app/services/globalfunction';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chitietdieukhoanmodal',
  templateUrl: './chitietdieukhoanmodal.component.html',
  styleUrls: ['./chitietdieukhoanmodal.component.css']
})
export class ChitietdieukhoanmodalComponent implements OnInit {
  lang: any = vn;
  isThoIdiem: boolean = false;
  opt: any = '';
  item: any = {
    TheoHopDong: true,
    TheoGiaTri: false,
    listThanhToanThuTuc: [],
    Id: "",
    GiaTri: 0,
    TyLe: 0,
  };
  listLoaiThanhToan: any = []
  listTheoLoaiThanhToan: any = []
  listLoaiTheoNgay: any = []
  listTinhTrangBaoLanh: any = []
  listThuTucThanhToan_ref: any = []
  listThuTucThanhToan: any = [];
  IdQuyTrinh: any;
  HopDong: any = {};
  optionsLoaiThanhToan = [
    { label: 'Tạm ứng', value: 0 },
    { label: 'Thanh toán', value: 1 },
  ]
  listDieuKhoanThanhToan: any = {}
  dinhDangSo = dinhDangSo;

  yearRange: string = `${new Date().getFullYear() - 50
    }:${new Date().getFullYear()}`;
  constructor(
    public activeModal: NgbActiveModal,
    private _servicesdmHopDong: DanhMucHopDongService,
    private _modal: NgbModal,
    private _serviceDungChung: SanXuatService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.GetOptions();
    if (this.opt === "edit") {
      if (this.item.isTheoGiaTriHopDong) {
        this.item.TheoHopDong = this.item.isTheoGiaTriHopDong;
        this.item.TheoGiaTri = !this.item.TheoHopDong;
        this.item.NgayThanhToan = UnixToDate(this.item.NgayThanhToanUnix);
      }
      else {
        this.item.TheoGiaTri = !this.item.isTheoGiaTriHopDong;
        this.item.TheoHopDong = !this.item.TheoGiaTri;
      }
    }
  }

  GetOptions() {
    this._servicesdmHopDong
      .DanhMucTrangThaiBaoLanh()
      .GetdmTrangThaiBaoLanh()
      .subscribe((res: any) => {
        this.listTinhTrangBaoLanh = mapArrayForDropDown(res, "ten", "Id");
      });

    this._serviceDungChung
      .GetListThanhToanTheo()
      .subscribe((res: any) => {
        this.listLoaiThanhToan = mapArrayForDropDown(res, "ten", "Id");
      });
  }

  toggleVisibility() {
    if (this.item.isChonThoIdiemKhac) {
      this.item.SoNgayCong = undefined;
      this.item.LoaiNgay = undefined;
    }
  }

  onChangeLoaiThanhToan(even) {
    console.log('onChangeLoaiThanhToan>>>>>>>>>>', even.value);
    this.item.loaiThanhToan = even.value
  }

  onChangeLoaiNgay(even) {
    console.log('onChangeLoaiNgay>>>>>>>>>>', even.value);
    this.item.TheoThoiGian = even.value
  }

  chonDanhMuc() {
    let modalRef = this._modal.open(ChonthutucthanhtoanmodalComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    modalRef.componentInstance.listThanhToanThuTuc = deepCopy(this.item.listThanhToanThuTuc);
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.IdQuyTrinh = this.IdQuyTrinh;
    modalRef.result.then((res) => {
      this.item.listThanhToanThuTuc = res;
    }, (reason) => {
      // không
    })
  }

  accept(opt) {
    if (this.item.NgayThanhToan !== undefined && this.item.NgayThanhToan !== null) {
      this.item.NgayThanhToanUnix = DateToUnix(this.item.NgayThanhToan);
    }
    if(this.item.soNgay == null || this.item.soNgay === undefined)
      this.item.soNgay = 0;
    if(this.item.GiaTri === null)
      this.item.GiaTri = 0;
    if(this.item.TyLe === null)
      this.item.TyLe = 0;
    this.item.isTheoGiaTriHopDong = this.item.TheoHopDong;
    if (this.item.loaiThanhToan!=undefined) {
      this.item.TenLoaiThanhToan = this.optionsLoaiThanhToan.find(obj => obj.value == this.item.loaiThanhToan).label;
    }
    this.activeModal.close({ opt: opt, item: this.item });
  }

  changeGiaTri() {
    if (this.item.TheoHopDong) {
      if (this.HopDong.GiaTri != undefined && this.HopDong.GiaTri > 0) {
        this.item.TyLe = (this.item.GiaTri / this.HopDong.GiaTri) * 100;
      }
      else {
        this._toastr.error("Yêu cầu nhập giá trị trong tab Hợp đồng", "Thông báo");
      }
    }
  }

  changeTyLe() {
    if (this.item.TheoHopDong) {
      if (this.HopDong.GiaTri != undefined && this.HopDong.GiaTri > 0) {
        this.item.GiaTri = (this.item.TyLe / 100) * this.HopDong.GiaTri;
      }
      else {
        this._toastr.error("Yêu cầu nhập giá trị Hợp đồng", "Thông báo");
      }
    }
  }

  selectTheoGiaTriHopDong() {
    this.item.TheoGiaTri = !this.item.TheoHopDong;
    if (this.HopDong.GiaTri != undefined && this.HopDong.GiaTri > 0 && this.item.TheoHopDong === true) {
      this.item.GiaTri = (this.HopDong.GiaTri || 0) * (this.item.TyLe || 0);
    }
    else {
      this._toastr.error("Yêu cầu nhập giá trị Hợp đồng", "Thông báo");
    }
  }
  selectTheoTyLeHopDong() {
    this.item.TheoGiaTri = !this.item.TheoHopDong;
    if (this.HopDong.GiaTri != undefined && this.HopDong.GiaTri > 0 && this.item.TheoHopDong === true) {
      this.item.TyLe = (this.item.GiaTri / this.HopDong.GiaTri) * 100;
    }
    else {
      this._toastr.error("Yêu cầu nhập giá trị Hợp đồng", "Thông báo");
    }
  }
  selectTheoGiaTridotGiaoHang() {
    this.item.TheoHopDong = !this.item.TheoGiaTri;
    this.item.TyLe = 0;
    this.item.GiaTri = 0;
  }
}

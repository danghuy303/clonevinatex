import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { ChonthutucthanhtoanmodalComponent } from './chonthutucthanhtoanmodal/chonthutucthanhtoanmodal.component';
import { ChonhanghoamodalComponent } from './../../../../../../quanlykhosanxuat/modals/chonhanghoamodal/chonhanghoamodal.component';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { vn } from 'src/app/services/const';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { mapArrayForDropDown, DateToUnix, deepCopy, validVariable } from 'src/app/services/globalfunction';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-chitietdieukhoanmodal',
  templateUrl: './chitietdieukhoanmodal.component.html',
  styleUrls: ['./chitietdieukhoanmodal.component.css']
})
export class ChitietdieukhoanmodalComponent implements OnInit {
  lang: any = vn;
  listThanhToanThuTuc = []
  isThoiDiem: boolean = false;
  opt: any = '';
  item: any = {
    TheoHopDong: true,
    TheoGiaTri: false,
    listThanhToanThuTuc: [],
    id: "",
  };
  listLoaiThanhToan: any = []
  listTheoLoaiThanhToan: any = []
  listLoaiTheoNgay: any = []
  listTinhTrangBaoLanh: any = []
  listThuTucThanhToan_ref: any = []
  listThuTucThanhToan: any = [];
  IdQuyTrinh: any

  optionsLoaiThanhToan = [
    { label: 'Tạm ứng', value: 0 },
    { label: 'Thanh toán', value: 1 },
    { label: 'Thanh toán vật tư', value: 2 }
  ]


  // optionsTheoNgay = [
  //   { label: 'Thời gian giao hàng', value: 2 },
  //   { label: 'Ngày nhận hàng', value: 3 },
  //   { label: 'Ngày nhận được tài liệu giao hàng', value: 4 },
  //   { label: 'Ngày ký hợp đồng', value: 0 },
  //   { label: 'Ngày ký hợp đồng có hiệu lực', value: 1 },
  // ]

  listDieuKhoanThanhToan: any = {}
  yearRange: string = `${new Date().getFullYear() - 50
    }:${new Date().getFullYear()}`;
  constructor(
    public activeModal: NgbActiveModal,
    private _servicesdmHopDong: DanhMucHopDongService,
    private _modal: NgbModal,
    private _service: HopDongService,
    private _serviceDungChung: SanXuatService,) { }

  ngOnInit(): void {
    this.GetOptions();
    if (this.opt === "edit") {
      if (this.item.isTheoGiaTriHopDong) {
        this.item.TheoHopDong = this.item.isTheoGiaTriHopDong;
        this.item.TheoGiaTri = !this.item.TheoHopDong;
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
        this.listTinhTrangBaoLanh = mapArrayForDropDown(res, "ten", "id");
      });

    this._serviceDungChung
      .GetListThanhToanTheo()
      .subscribe((res: any) => {
        this.listLoaiThanhToan = mapArrayForDropDown(res, "ten", "id");
      });

    // this._servicesdmHopDong
    //   .GetListAlldmTheoLoaiThanhToan()
    //   .subscribe((res: any) => {
    //     this.listTheoLoaiThanhToan = mapArrayForDropDown(res, "ten", "id");
    //   });
  }

  toggleVisibility() {
    if (this.item.isChonThoiDiemKhac) {
      this.item.soNgayCong = undefined;
      this.item.loaiNgay = undefined;
    }
  }

  onChangeLoaiThanhToan(even) {
    console.log('onChangeLoaiThanhToan>>>>>>>>>>', even.value);
    this.item.loaiThanhToan = even.value
  }

  onChangeLoaiNgay(even) {
    console.log('onChangeLoaiNgay>>>>>>>>>>', even.value);
    this.item.theoThoiGian = even.value
  }

  chonDanhMuc() {

    // modalRef.componentInstance.listDieuKhoanThanhToan = res1;
    // modalRef.componentInstance.listThuTucThanhToan = listThuTucThanhToan;
    let modalRef = this._modal.open(ChonthutucthanhtoanmodalComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    modalRef.componentInstance.listThanhToanThuTuc = this.item.listThanhToanThuTuc;
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.IdQuyTrinh = this.IdQuyTrinh;
    modalRef.result.then((res) => {
      res.forEach(obj => {
        if (!this.item.listThanhToanThuTuc.every(element => element.iddmThanhToanThuTuc === obj.iddmThanhToanThuTuc) || this.item.listThanhToanThuTuc.length == 0) {
          this.item.listThanhToanThuTuc.push(obj);
        }
      });
      // this.item.listThanhToanThuTuc.forEach(element => {
      //   console.log('listThanhToanThuTuc', element);

      //   element.isXoa = true;
      // });


      // for (let i = 0; i < data.length; i++) {
      //   for (let j = 0; j < this.listThanhToanThuTuc.length; j++) {

      //     this.listThanhToanThuTuc[j].isXoa = false;
      //     data[i].isXoa = true;

      //   }
      // }


    }, (reason) => {
      // không
    })
  }

  accept(opt) {
    if (this.item.ngayThanhToan !== undefined && this.item.ngayThanhToan !== null) {
      this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);

    }
    this.item.isTheoGiaTriHopDong = this.item.TheoHopDong;
    this.item.TenloaiThanhToan = this.optionsLoaiThanhToan.find(obj => obj.value == this.item.loaiThanhToan).label;
    this.activeModal.close({ opt: opt, item: this.item });
  } 

}

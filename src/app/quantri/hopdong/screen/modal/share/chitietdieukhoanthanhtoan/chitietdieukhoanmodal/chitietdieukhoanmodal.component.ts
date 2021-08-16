import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { ChonthutucthanhtoanmodalComponent } from './chonthutucthanhtoanmodal/chonthutucthanhtoanmodal.component';
import { ChonhanghoamodalComponent } from './../../../../../../quanlykhosanxuat/modals/chonhanghoamodal/chonhanghoamodal.component';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { vn } from 'src/app/services/const';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { mapArrayForDropDown, DateToUnix } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-chitietdieukhoanmodal',
  templateUrl: './chitietdieukhoanmodal.component.html',
  styleUrls: ['./chitietdieukhoanmodal.component.css']
})
export class ChitietdieukhoanmodalComponent implements OnInit {
  lang: any = vn;

  opt: any = '';
  item: any = [];
  listLoaiThanhToan: any = []
  listTinhTrangBaoLanh: any = []
  listThuTucThanhToan_ref: any = []
  listThuTucThanhToan: any = []

  optionsLoaiThanhToan = [
    { label: 'Tạm ứng', value: 0 },
    { label: 'Thanh toán', value: 1 },
    { label: 'Thanh toán vật tư', value: 2 }
  ]

  listDieuKhoanThanhToan: any = {}
  yearRange: string = `${new Date().getFullYear() - 50
    }:${new Date().getFullYear()}`;
  constructor(public activeModal: NgbActiveModal, private _servicesdmHopDong: DanhMucHopDongService, private _modal: NgbModal, private _service: HopDongService,) { }

  ngOnInit(): void {
    this.GetOptions()
  }


  GetOptions() {
    this._servicesdmHopDong
      .DanhMucTrangThaiBaoLanh()
      .GetdmTrangThaiBaoLanh()
      .subscribe((res: any) => {
        this.listTinhTrangBaoLanh = mapArrayForDropDown(res, "ten", "id");
      });
  }


  onChangeLoaiThanhToan(even) {
    console.log('onChangeLoaiThanhToan>>>>>>>>>>', even.value);
    this.item.loaiThanhToan = even.value



  }
  chonDanhMuc() {
    let listThanhToanThuTuc: any = []
    this._servicesdmHopDong.DanhMucThuTucThanhToan().GetListAll().subscribe((res1: any) => {
      console.log(res1);

      let modalRef = this._modal.open(ChonthutucthanhtoanmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      console.log(modalRef.componentInstance.listThanhToanThuTuc);
      this.listThuTucThanhToan_ref = res1
      modalRef.componentInstance.opt = 'edit';


      modalRef.componentInstance.listThanhToanThuTuc = res1;
      // modalRef.componentInstance.item = this.item.listDieuKhoanThanhToan;

    })
  }

  accept(opt) {
    if (this.item.ngayThanhToan !== undefined && this.item.ngayThanhToan !== null) {
      this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
    
    }


    this.activeModal.close({ opt: opt, item: this.item });
    console.log(this.item);
    
  }

}

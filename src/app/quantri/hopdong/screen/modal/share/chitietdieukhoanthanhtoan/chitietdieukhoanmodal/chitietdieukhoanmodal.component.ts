import { ChonthutucthanhtoanmodalComponent } from './chonthutucthanhtoanmodal/chonthutucthanhtoanmodal.component';
import { ChonhanghoamodalComponent } from './../../../../../../quanlykhosanxuat/modals/chonhanghoamodal/chonhanghoamodal.component';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { vn } from 'src/app/services/const';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-chitietdieukhoanmodal',
  templateUrl: './chitietdieukhoanmodal.component.html',
  styleUrls: ['./chitietdieukhoanmodal.component.css']
})
export class ChitietdieukhoanmodalComponent implements OnInit {
  lang: any = vn;

  opt: any = '';
  item: any = [];
  listLoaiThanhToan:any = []
  listThuTucThanhToan_ref:any = []
  listThuTucThanhToan:any = []

  

  listDieuKhoanThanhToan :any = {}
  yearRange: string = `${
    new Date().getFullYear() - 50
  }:${new Date().getFullYear()}`;
  constructor(public activeModal:NgbActiveModal, private _servicesdmHopDong: DanhMucHopDongService, private _modal : NgbModal) { }

  ngOnInit(): void {
  }
  chonDanhMuc() {
     let   listThanhToanThuTuc:any = []
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
  
accept(opt){
  // if (this.item.tempCapHang !== undefined && this.item.tempCapHang !== null) {
  //   this.item.IDdmCapHang = this.item.tempCapHang.ID;
  //   this.item.TendmCapHang = this.item.tempCapHang.Ten;
  // }
 
  
  this.activeModal.close({ opt: opt, item: this.item });
}

}

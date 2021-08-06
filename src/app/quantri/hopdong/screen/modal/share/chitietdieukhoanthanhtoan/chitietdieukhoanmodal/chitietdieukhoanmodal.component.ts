import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { vn } from 'src/app/services/const';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  item: any = {};
  listLoaiThanhToan:any = []
 

  listDieuKhoanThanhToan :any = {}
  yearRange: string = `${
    new Date().getFullYear() - 50
  }:${new Date().getFullYear()}`;
  constructor(public activeModal:NgbActiveModal, private _servicesdmHopDong: DanhMucHopDongService) { }

  ngOnInit(): void {
  }

  
accept(opt){
  // if (this.item.tempCapHang !== undefined && this.item.tempCapHang !== null) {
  //   this.item.IDdmCapHang = this.item.tempCapHang.ID;
  //   this.item.TendmCapHang = this.item.tempCapHang.Ten;
  // }
 
  
  this.activeModal.close({ opt: opt, item: this.item });
}

}

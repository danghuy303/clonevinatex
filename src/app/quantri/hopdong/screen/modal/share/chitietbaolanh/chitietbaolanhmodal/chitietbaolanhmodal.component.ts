import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { mapArrayForDropDown, DateToUnix } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { vn } from './../../../../../../../services/const';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { ChitiethopdongbongxomodalComponent } from './../../../danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chitietbaolanhmodal',
  templateUrl: './chitietbaolanhmodal.component.html',
  styleUrls: ['./chitietbaolanhmodal.component.css']
})
export class ChitietbaolanhmodalComponent implements OnInit {
  lang: any = vn;
  listTinhTrang: any = []
  listLoaiBaoLanh: any = []
  listTinhTrangBaoLanh: any = []

 
  opt: any = '';
  item: any = {};
  yearRange: string = `${
    new Date().getFullYear() - 50
  }:${new Date().getFullYear()}`;
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router, public activeModal: NgbActiveModal, private _servicedmHopDong: DanhMucHopDongService) { }


  ngOnInit(): void {
    this.GetOptions()
  }
  GetOptions() {
    this._servicedmHopDong
    .DanhMucTrangThaiBaoLanh()
    .GetdmTrangThaiBaoLanh()
    .subscribe((res: any) => {
      this.listTinhTrangBaoLanh = mapArrayForDropDown(res, "ten", "id");
    });

    this._servicedmHopDong
    .DanhMucTrangThaiBaoLanh()
    .GetListAlldmLoaiBaoLanh()
    .subscribe((res: any) => {
      this.listLoaiBaoLanh = mapArrayForDropDown(res, "ten", "id");
    });
  }
  accept(opt){
    if (this.item.hieuLucBaoLanh !== undefined && this.item.hieuLucBaoLanh !== null) {
      this.item.hieuLucBaoLanhUnix = DateToUnix(this.item.hieuLucBaoLanh);    
    }
    this.item.TendmLoaiBaoLanh = this.listLoaiBaoLanh.find(obj=>obj.value === this.item.iddmLoaiBaoLanh).label;
    this.activeModal.close({ opt: opt, item: this.item });
  }
}

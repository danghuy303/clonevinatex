import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { mapArrayForDropDown, DateToUnix } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { vn } from './../../../../../../../services/const';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { ChitiethopdongbongxomodalComponent } from './../../../danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
import { Component, OnInit } from '@angular/core';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';


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
  item: any = { id: "", listFileDinhKem: [] };
  yearRange: string = `${new Date().getFullYear() - 50
    }:${new Date().getFullYear()}`;
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router, public activeModal: NgbActiveModal, private _servicedmHopDong: DanhMucHopDongService) { }


  ngOnInit(): void {
    this.GetOptions();
    if (this.opt == 'edit') {
      this.item.listTen = "";
      this.item.listFileDinhKem.forEach(element => {
        this.item.listTen += `${element.TenGoc}`;
      });
    }
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
  accept(opt) {
    if (this.item.hieuLucBaoLanh !== undefined && this.item.hieuLucBaoLanh !== null) {
      this.item.hieuLucBaoLanhUnix = DateToUnix(this.item.hieuLucBaoLanh);
    }
    this.item.tendmLoaiBaoLanh = this.listLoaiBaoLanh.find(obj => obj.value == this.item.iddmLoaiBaoLanh).label;
    this.item.tendmTinhTrangBaoLanh = this.listTinhTrangBaoLanh.find(obj => obj.value == this.item.iddmTinhTrangBaoLanh).label;
    this.activeModal.close({ opt: opt, item: this.item });
  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      let item: any = {}
      item.id = 0;
      item.TenGui = data[data.length - 1].Name;
      item.TenGoc = data[data.length - 1].NameLocal;
      item.DuongDan = data[data.length - 1].Url;
      // "idDuAn": 0,
      // "maDuAn": "string",
      this.item.listFileDinhKem.push(item);
      this.item.listTen = "";
      this.item.listFileDinhKem.forEach(element => {
        this.item.listTen += `${element.TenGoc}`;
      });
    }, (reason) => {

    });
  }
}

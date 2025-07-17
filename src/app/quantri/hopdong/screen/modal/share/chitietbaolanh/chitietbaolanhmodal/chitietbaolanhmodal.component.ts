import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { mapArrayForDropDown, DateToUnix, UnixToDate, validVariable, dinhDangSo } from 'src/app/services/globalfunction';
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
  dinhDangSo = dinhDangSo;

  opt: any = '';
  item: any = { Id: "", listFileDinhKem: [] };
  yearRange: string = `${new Date().getFullYear() - 50
    }:${new Date().getFullYear()}`;
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router, public activeModal: NgbActiveModal, private _servicedmHopDong: DanhMucHopDongService) { }


  ngOnInit(): void {
    this.GetOptions();
    if (this.opt == 'edit') {
      this.item.listTen = "";
      this.item.HieuLucBaoLanh = UnixToDate(this.item.HieuLucBaoLanhUnix);
      this.item.listFileDinhKem.forEach(element => {
        this.item.listTen += `${element.FileName}`+ '; ';
      });
    }
  }
  GetOptions() {
    this._servicedmHopDong
      .DanhMucTrangThaiBaoLanh()
      .GetdmTrangThaiBaoLanh()
      .subscribe((res: any) => {
        this.listTinhTrangBaoLanh = mapArrayForDropDown(res, "Ten", "Id");
      });

    this._servicedmHopDong
      .DanhMucTrangThaiBaoLanh()
      .GetListAlldmLoaiBaoLanh()
      .subscribe((res: any) => {
        this.listLoaiBaoLanh = mapArrayForDropDown(res, "Ten", "Id");
      });
  }
  accept(opt) {
    if (this.item.HieuLucBaoLanh !== undefined && this.item.HieuLucBaoLanh !== null) {
      this.item.HieuLucBaoLanhUnix = DateToUnix(this.item.HieuLucBaoLanh);
    }
    if(validVariable(this.item.IddmLoaiBaoLanh))
      this.item.tendmLoaiBaoLanh = this.listLoaiBaoLanh.find(obj => obj.value == this.item.IddmLoaiBaoLanh).label;
    if(validVariable(this.item.IddmTinhTrangBaoLanh))
      this.item.tendmTinhTrangBaoLanh = this.listTinhTrangBaoLanh.find(obj => obj.value == this.item.IddmTinhTrangBaoLanh).label;
    this.activeModal.close({ opt: opt, item: this.item });
  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      let item: any = {}
      item.Id = '';
      item.FileNameGui = data[data.length - 1].Name;
      item.FileName = data[data.length - 1].NameLocal;
      item.Link = data[data.length - 1].Url;
      // "idDuAn": 0,
      // "maDuAn": "string",
      this.item.listFileDinhKem.push(item);
      this.item.listTen = "";
      this.item.listFileDinhKem.forEach(element => {
        this.item.listTen += `${element.FileName}` + '; ';
      });
    }, (reason) => {

    });
  }
}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { vn } from 'src/app/services/const';
import { validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModaltaolichbaoduongComponent } from '../../modal/modaltaolichbaoduong/modaltaolichbaoduong.component';
import { ChonComponent } from '../chon/chon.component';

@Component({
  selector: 'app-thongtinthemmoitaisan',
  templateUrl: './thongtinthemmoitaisan.component.html',
  styleUrls: ['./thongtinthemmoitaisan.component.css']
})
export class ThongtinthemmoitaisanComponent implements OnInit {

  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = {};
  NameFile: any = "";
  listTinhTrangTaiSan_copy: any = [];
  qrcode: any = {
    size: 250
  };
  eTable: string = "QLTS_TaiSan_QuyTrinhNhap";
  IdTable: string = '';

  @Input('item') item: any = {};
  @Input('TaiSanChaCon') TaiSanChaCon: string = "";
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('listPhanXuong') listPhanXuong: any = [];
  @Input('listLoaiTaiSan') listLoaiTaiSan: any = [];
  @Input('listCungSanXuat') listCungSanXuat: any = [];
  @Input('opt') opt: any = "";

  constructor(
    private _modal: NgbModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit() {
    console.log("this.item", this.item);
    
    if (this.opt === 'edit') {
      this.item.listFileDinhKem?.forEach(obj => {
        this.NameFile += `${obj.FileName}, `;
      });
      this.IdTable = this.item.IdTaiSan;
    }
  }

  LayMa(e) {
    this.item.TendmTaiSan  = '';
    this.item.IddmTaiSan = '';
    if (!validVariable(e.value)) {
      this.item.Ma = '';
      this.item.TendmTaiSan  = '';
      return
    }
    this._serviceTaiSan.NhapTaiSan().GetNextMaTaiSan(e.value).subscribe((res: any) => {
      if (res.StatusCode === 500) {
        this.item.Ma = '';
        this.toastr.error(res.Message);
      }
      else {
        this.item.Ma = res.Data;
      }
    })
  }

  edit(item) {
    this.item.GiaTriConLai = item.NguyenGia;
  }
  isCanDuTru() {
    this.item.isCanDuTru = true;
    this.item.isCanDuTru = false;
  }
  // taiLenFileDinhKem() {
  //   const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
  //   modalRef.componentInstance.multiple = true;
  //   modalRef.componentInstance.type = '';
  //   modalRef.result.then((data) => {
  //     // this.item.listFileDinhKem = data;
  //     // this.item.listFileDinhKem.forEach(obj => {
  //     //   this.NameFile += `${obj.NameLocal}, `;
  //     // });
  //     this.item.listFileDinhKem = data;
  //     this.item.listFileDinhKem.forEach(obj => {
  //       obj.Id = '';
  //       obj.FileNameGUI = obj.Name;
  //       obj.FileName = obj.NameLocal;
  //       obj.Link = obj.Url;
  //       this.NameFile += `${obj.FileName}` + '; '; /// gắn tên vào NameFile 
  //     });
  //   }, (reason) => {

  //   });
  // }

  ChangeData() {
    this.itemChange.emit(this.item);
  }

  ngOnDestroy() {

  }
  ChonTaiSan() {
    let modalRef = this._modal.open(ChonComponent, {
      size: "xl",
      backdrop: "static",
    });

    // modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.Id) : [];
    modalRef.componentInstance.ItemDaChon = this.item.IddmTaiSan ? this.item.IddmTaiSan : "";
    modalRef.componentInstance.item = this.item;
    modalRef.result.then((res: any) => {
      this.item.IddmTaiSan = res[0]?.Id;
      this.item.TendmTaiSan = res[0]?.Ten;
    })
      .catch((er) => {
      });
  }
}
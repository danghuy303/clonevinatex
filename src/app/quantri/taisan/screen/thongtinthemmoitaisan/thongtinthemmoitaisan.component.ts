import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { vn } from 'src/app/services/const';
import { validVariable } from 'src/app/services/globalfunction';
import { ModaltaolichbaoduongComponent } from '../../modal/modaltaolichbaoduong/modaltaolichbaoduong.component';

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
  ) {}

  ngOnInit() {
    if (this.opt === 'edit') {
      // this.item.listFileDinhKem.forEach(obj => {
      //   this.NameFile += `${obj.FileName}, `;
      // });
    }
  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.multiple = true;
    modalRef.componentInstance.type = '';
    modalRef.result.then((data) => {
      this.item.listFileDinhKem = data;
      this.item.listFileDinhKem.forEach(obj => {
        this.NameFile += `${obj.NameLocal}, `;
      });
      this.item.listFileDinhKem = data;
      this.item.listFileDinhKem.forEach(obj => {
        obj.Id = '';
        obj.fileNameGui = obj.Name;
        obj.fileName = obj.NameLocal;
        obj.Link = obj.Url;
        this.NameFile += `${obj.fileName}` + '; ';
      });
    }, (reason) => {

    });
  }

  ChangeData() {
    this.itemChange.emit(this.item);
  }

  ngOnDestroy() {

  }
}
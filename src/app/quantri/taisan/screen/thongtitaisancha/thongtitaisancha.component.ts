import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { vn } from 'src/app/services/const';

@Component({
  selector: 'app-thongtitaisancha',
  templateUrl: './thongtitaisancha.component.html',
  styleUrls: ['./thongtitaisancha.component.css']
})
export class ThongtitaisanchaComponent implements OnInit {
  lang: any = vn;
  checkbutton: any = {};
  NameFile: any = "";

  @Input('item') item: any = {};
  @Output('itemChange') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('listDonVi') listDonVi: any = [];
  @Input('listLoaiTaiSan') listLoaiTaiSan: any = [];
  @Input('listTinhTrangTaiSan') listTinhTrangTaiSan: any = [];
  @Input('listNhaSanXuat') listNhaSanXuat: any = [];
  @Input('opt') opt: any = [];


  constructor(
    private _modal: NgbModal,
  ) {

  }

  ngOnInit() {
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
    }, (reason) => {

    });
  }

  ChangeData() {
    this.itemChange.emit(this.item);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { vn } from 'src/app/services/const';
import { DanhMucMatHangPopupComponent } from '../../danh-muc-mat-hang-popup/danh-muc-mat-hang-popup.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nhap-kho-gia-cong-modal',
  templateUrl: './nhap-kho-gia-cong-modal.component.html',
  styleUrls: ['./nhap-kho-gia-cong-modal.component.css']
})
export class NhapKhoGiaCongModalComponent implements OnInit {

  nametype: string = '';
  item: any = {};
  checkbutton: any = {};
  listKhoGiaCong: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private services: SanXuatService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  GetMatHangTheoKho() {
    let modalRef = this._modal.open(DanhMucMatHangPopupComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    modalRef.componentInstance.kho = 'khothanhpham';
    modalRef.result.then((data) => {

    })
  }

  ExportExcel() {

  }

  ChuyenTiep() {

  }

  KhongDuyet() {

  }

  XoaQuyTrinh() {

  }

  GhiLai() {

  }

  Onclose() {
    this.activeModal.close();
  }

}

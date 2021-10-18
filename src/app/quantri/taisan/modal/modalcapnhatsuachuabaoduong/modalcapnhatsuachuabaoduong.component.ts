import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { vn } from 'src/app/services/const';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-modalcapnhatsuachuabaoduong',
  templateUrl: './modalcapnhatsuachuabaoduong.component.html',
  styleUrls: ['./modalcapnhatsuachuabaoduong.component.css']
})
export class ModalcapnhatsuachuabaoduongComponent implements OnInit {
  item: any = {};
  opt: any = "";
  title: any = "";
  lang: any = vn;
  listLoaiSuCo: any = [];
  listPhongBan: any = [];
  listMucDoUuTien: any = [];
  newTableItem: any = {};

  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService,) { }

  ngOnInit(): void {
    if (this.opt === 'add') {
      this.title = "Thêm mới";
    }
    else {
      this.title = "Cập nhật";
    }
  }

  add() {
    // if (!validVariable(this.newTableItem.thoiGianCapCang) || !validVariable(this.newTableItem.thoiGianDuKien)) {
    //   this.toastr.error('Vui lòng chọn thời gian')
    // }
    // if (this.item.listInvoice == undefined || this.item.listInvoice == null)
    //   this.item.listInvoice = [];
    // this.newTableItem.id = "";
    // this.newTableItem.idKeHoachNhapBong = this.item.id;
    // this.newTableItem = {
    //   "id": "",
    //   "idKeHoachNhapBong": this.item.id,
    // }
  }

}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-bao-hanh-popup',
  templateUrl: './bao-hanh-popup.component.html',
  styleUrls: ['./bao-hanh-popup.component.css']
})
export class BaoHanhPopupComponent implements OnInit {

  item:any = {};
  listKiemDinh: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    public _modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.item.NgayBatDauUnix = DateToUnix(this.item?.NgayBatDau);
    this.item.NgayBatDau = this.item.NgayBatDauUnix ? UnixToDate(this.item.NgayBatDauUnix) : new Date();
    this.item.NgayHetHanUnix = DateToUnix(this.item?.NgayHetHan);
    this.item.NgayHetHan = this.item.NgayHetHanUnix ? UnixToDate(this.item.NgayHetHanUnix) : new Date();
  }

  GhiLai() {
    this.activeModal.close(this.item)
  }

}

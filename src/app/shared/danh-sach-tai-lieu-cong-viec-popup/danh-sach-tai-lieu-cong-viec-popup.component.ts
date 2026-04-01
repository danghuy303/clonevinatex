import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-danh-sach-tai-lieu-cong-viec-popup',
  templateUrl: './danh-sach-tai-lieu-cong-viec-popup.component.html',
  styleUrls: ['./danh-sach-tai-lieu-cong-viec-popup.component.css']
})
export class DanhSachTaiLieuCongViecPopupComponent implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  listFileDinhKem: any = [];
  checkedAll: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

}

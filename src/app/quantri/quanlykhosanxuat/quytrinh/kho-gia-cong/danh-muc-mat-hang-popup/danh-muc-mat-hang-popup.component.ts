import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-danh-muc-mat-hang-popup',
  templateUrl: './danh-muc-mat-hang-popup.component.html',
  styleUrls: ['./danh-muc-mat-hang-popup.component.css']
})
export class DanhMucMatHangPopupComponent implements OnInit {

  KeyWord: string = '';
  listItem: any = [];
  paging:any = {};

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  filtertable_add() { }

  resetFilter() { }

  accept() {
    this.activeModal.close();
  }

}

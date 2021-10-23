import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalcapnhatsuachuabaoduongComponent } from '../modal/modalcapnhatsuachuabaoduong/modalcapnhatsuachuabaoduong.component';

@Component({
  selector: 'app-sucosuachua',
  templateUrl: './sucosuachua.component.html',
  styleUrls: ['./sucosuachua.component.css']
})
export class SucosuachuaComponent implements OnInit {

  constructor(public _modal: NgbModal,) { }

  ngOnInit(): void {
  }

  add() {
    let modalRef = this._modal.open(ModalcapnhatsuachuabaoduongComponent, {
      size: "xl",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.item = {};
    modalRef.result
      .then((res: any) => {
      })
      .catch((er) => {

      });
  }

  edit(item) {
    let modalRef = this._modal.open(ModalcapnhatsuachuabaoduongComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.item = item;
    modalRef.result
      .then((res: any) => {
      })
      .catch((er) => {

      });
  }


}

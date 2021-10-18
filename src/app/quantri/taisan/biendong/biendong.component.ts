import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalcapnhatbaoduongComponent } from '../modal/modalcapnhatbaoduong/modalcapnhatbaoduong.component';

@Component({
  selector: 'app-biendong',
  templateUrl: './biendong.component.html',
  styleUrls: ['./biendong.component.css']
})
export class BiendongComponent implements OnInit {
  items: any = [];

  constructor(public _modal: NgbModal,) { }

  ngOnInit(): void {
  }

  add() {
    let modalRef = this._modal.open(ModalcapnhatbaoduongComponent, {
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
    let modalRef = this._modal.open(ModalcapnhatbaoduongComponent, {
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

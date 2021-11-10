import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalcapnhatbaoduongComponent } from '../modal/modalcapnhatbaoduong/modalcapnhatbaoduong.component';

@Component({
  selector: 'app-biendong',
  templateUrl: './biendong.component.html',
  styleUrls: ['./biendong.component.css']
})
export class BiendongComponent implements OnInit {
 
  @Input("Du_Lieu_Bien_Dong") Chon_Vao_Bien_Dong:any={};
  constructor(public _modal: NgbModal,) { }

  ngOnInit(): void {
    console.log(this.Chon_Vao_Bien_Dong)
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
  // changePage(event) {
  //   this.paging.CurrentPage = event.Page + 1;
  //   this.GetList();
  // }
 
}

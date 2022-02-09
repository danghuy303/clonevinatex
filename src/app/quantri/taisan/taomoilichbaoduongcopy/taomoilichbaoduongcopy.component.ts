import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalcapnhatbaoduongcopyyComponent } from '../modalcapnhatbaoduongcopyy/modalcapnhatbaoduongcopyy.component';

@Component({
  selector: 'app-taomoilichbaoduongcopy',
  templateUrl: './taomoilichbaoduongcopy.component.html',
  styleUrls: ['./taomoilichbaoduongcopy.component.css']
})
export class TaomoilichbaoduongcopyComponent implements OnInit {
 
  constructor(public _modal: NgbModal, public _toastr: ToastrService,) { }

  ngOnInit(): void {

  }
  addBaoDuong() {
    let modalRef = this._modal.open(ModalcapnhatbaoduongcopyyComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = "";
    modalRef.result.then((res: any) => {

    }).catch(er=>{})
  }
  
}

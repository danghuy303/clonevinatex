import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalthongbaoComponent } from '../quantri/modal/modalthongbao/modalthongbao.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(
    private modal: NgbModal
  ) { }

  public show(option, callback) {
    let modalRef = this.modal.open(ModalthongbaoComponent, {
      size: 'md',
      backdrop: 'static'
    })
    modalRef.componentInstance.message = option.message;
    modalRef.result
      .then(()=>{
        callback();
      })
  }

}

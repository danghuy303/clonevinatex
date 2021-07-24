
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { ChitiethopdongbongxomodalComponent } from './../../../danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chitietbaolanhmodal',
  templateUrl: './chitietbaolanhmodal.component.html',
  styleUrls: ['./chitietbaolanhmodal.component.css']
})
export class ChitietbaolanhmodalComponent implements OnInit {

  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router, public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
  }
  add() {
    // this.changeParam(0);
    let modalRef = this._modal.open(ChitietbaolanhmodalComponent, {
      size: 'fullscreen-100',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {
      Id: '',
      listItem: []
    }
    // modalRef.result.then((res: any) => {
    //   console.log(res);
    //   this._toastr.success('Cập nhật thành công');
    //   this.GetListQuyTrinh();
    //   this.changeParam(0)
    // })
    //   .catch(er => { this.GetListQuyTrinh(); this.changeParam(0) })
  }
}

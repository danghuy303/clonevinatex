import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChitiethopdongbongxomodalComponent } from './../../../danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
import { Component, OnInit } from '@angular/core';
import { ChitietdieukhoanmodalComponent } from './chitietdieukhoanmodal/chitietdieukhoanmodal.component';

@Component({
  selector: 'app-chitietdieukhoanthanhtoan',
  templateUrl: './chitietdieukhoanthanhtoan.component.html',
  styleUrls: ['./chitietdieukhoanthanhtoan.component.css']
})
export class ChitietdieukhoanthanhtoanComponent implements OnInit {

  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
  }
  add() {
    // this.changeParam(0);
    let modalRef = this._modal.open(ChitietdieukhoanmodalComponent, {
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

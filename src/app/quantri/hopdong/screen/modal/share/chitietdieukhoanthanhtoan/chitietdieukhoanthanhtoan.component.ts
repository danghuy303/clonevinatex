import { DateToUnix } from 'src/app/services/globalfunction';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChitiethopdongbongxomodalComponent } from './../../../danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
import { Component, Input, OnInit, EventEmitter, Output, DoCheck } from '@angular/core';
import { ChitietdieukhoanmodalComponent } from './chitietdieukhoanmodal/chitietdieukhoanmodal.component';

@Component({
  selector: 'app-chitietdieukhoanthanhtoan',
  templateUrl: './chitietdieukhoanthanhtoan.component.html',
  styleUrls: ['./chitietdieukhoanthanhtoan.component.css']
})
export class ChitietdieukhoanthanhtoanComponent implements OnInit, DoCheck {

  item: any = {};

  @Input() listDieuKhoanThanhToan: any = [];
  @Output() itemChange: EventEmitter<any> = new EventEmitter<any>();
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };


  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.itemChange.emit(this.listDieuKhoanThanhToan);

  }
  add() {


    this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
    let modalRef = this._modal.open(ChitietdieukhoanmodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = {
      Id: "",
      listThanhToanThuTuc: [],

    };
    modalRef.componentInstance.opt = 'add';
    modalRef.result.then(res => {
      console.log(res.item);
      this.listDieuKhoanThanhToan.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  edit(item, i) {
    let modalRef = this._modal.open(ChitietdieukhoanmodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.opt = 'edit';
    modalRef.result.then(res => {
      this.listDieuKhoanThanhToan.splice(i, 1);
      this.listDieuKhoanThanhToan.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  delete(i) {
    let item = this.listDieuKhoanThanhToan.splice(i, 1)[0];
    if (item.ID === 0) {
    } else {
      item.isXoa = true;
      this.listDieuKhoanThanhToan.push(JSON.parse(JSON.stringify(item)));
    }

    // this.listDieuKhoanThanhToan[i].isXoa = true;
    // this.listDieuKhoanThanhToan.push(this.listDieuKhoanThanhToan.splice(i,1));
    console.log(item);
    console.log(this.listDieuKhoanThanhToan);
  }
}

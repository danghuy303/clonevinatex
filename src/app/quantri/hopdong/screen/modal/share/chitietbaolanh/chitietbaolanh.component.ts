import { DateToUnix } from 'src/app/services/globalfunction';
import { ChitietbaolanhmodalComponent } from './chitietbaolanhmodal/chitietbaolanhmodal.component';



import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChitiethopdongbongxomodalComponent } from './../../../danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';


@Component({
  selector: 'app-chitietbaolanh',
  templateUrl: './chitietbaolanh.component.html',
  styleUrls: ['./chitietbaolanh.component.css']
})
export class ChitietbaolanhComponent implements OnInit,DoCheck {
 items:any=[];
  @Input('opt') opt:string='';
  item: any = {};
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  @Output('baoLanh')baoLanhChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.baoLanhChange.emit(this.items);
  }
  add() {
    this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
    let modalRef = this._modal.open(ChitietbaolanhmodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = {
      Id: 0,
     
      
    };
    modalRef.componentInstance.opt = 'add';
    modalRef.result.then(res => {
      console.log(res.item);
      this.items.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  edit(item, i) {
    let modalRef = this._modal.open(ChitietbaolanhmodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.opt = 'edit';
    modalRef.result.then(res => {
      this.items.splice(i, 1);
      this.items.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  delete(i) {
    let item = this.items.splice(i, 1)[0];
    if (item.ID === 0) {
    } else {
      item.isXoa = true;
      this.items.push(JSON.parse(JSON.stringify(item)));
    }

    // this.items[i].isXoa = true;
    // this.items.push(this.items.splice(i,1));
    console.log(item);
    console.log(this.items);
  }
}

import { ChitietbaolanhmodalComponent } from './chitietbaolanhmodal/chitietbaolanhmodal.component';



import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChitiethopdongbongxomodalComponent } from './../../../danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-chitietbaolanh',
  templateUrl: './chitietbaolanh.component.html',
  styleUrls: ['./chitietbaolanh.component.css']
})
export class ChitietbaolanhComponent implements OnInit {
  @Input('baoLanh')items:any=[];
  @Input('opt') opt:string='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  @Output('baoLanh')baoLanhChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router) { }


  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.baoLanhChange.emit(this.items);
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

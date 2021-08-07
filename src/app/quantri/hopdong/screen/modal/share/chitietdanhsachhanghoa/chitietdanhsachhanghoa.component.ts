import { DateToUnix } from 'src/app/services/globalfunction';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ChitiethanghoamodalComponent } from './chitiethanghoamodal/chitiethanghoamodal.component';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';

@Component({
  selector: 'app-chitietdanhsachhanghoa',
  templateUrl: './chitietdanhsachhanghoa.component.html',
  styleUrls: ['./chitietdanhsachhanghoa.component.css']
})
export class ChitietdanhsachhanghoaComponent implements OnInit, DoCheck {
  @Input() listVatTu: any = [];
  @Input('opt') opt: string = '';
  @Output() itemChange: EventEmitter<any> = new EventEmitter<any>();
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };

  item: any = {}
  listThanhToanThuTuc: any = []
  @Input() isBongXo: boolean;
  @Input() isSoi: boolean;

  @Output() newItemEvent = new EventEmitter<string>();
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.itemChange.emit(this.listVatTu);

  }
  chonHangHoa() {
    let modalRef = this._modal.open(ChitiethanghoamodalComponent, {
      size: 'xl'
    })
    modalRef.componentInstance.listVatTu = this.listThanhToanThuTuc;
    modalRef.componentInstance.selectedlistVatTu = [];
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.result.then(res => {
      if (res.length > 0) {
        res.forEach(obj => this.item.listItem.push(obj))
      }
      // merge(res, this.item.listItem, 'IddmItem')
    }).catch(er => {
      console.log(er);
    })
  }
  add() {


    this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
    let modalRef = this._modal.open(ChitiethanghoamodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = {
      Id: "",


    };
    modalRef.componentInstance.opt = 'add';
    modalRef.result.then(res => {
      console.log(res.item);
      this.listVatTu.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }

  edit(item, i) {
    let modalRef = this._modal.open(ChitiethanghoamodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.opt = 'edit';
    modalRef.result.then(res => {
      this.listVatTu.splice(i, 1);
      this.listVatTu.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  delete(i) {
    let item = this.listVatTu.splice(i, 1)[0];
    if (item.ID === 0) {
    } else {
      item.isXoa = true;
      this.listVatTu.push(JSON.parse(JSON.stringify(item)));
    }

    // this.listVatTu[i].isXoa = true;
    // this.listVatTu.push(this.listVatTu.splice(i,1));
    console.log(item);
    console.log(this.listVatTu);
  }
}

import { SanXuatService } from './../../../../../../services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ChitiethanghoamodalComponent } from './chitiethanghoamodal/chitiethanghoamodal.component';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
// import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-chitietdanhsachhanghoa',
  templateUrl: './chitietdanhsachhanghoa.component.html',
  styleUrls: ['./chitietdanhsachhanghoa.component.css']
})
export class ChitietdanhsachhanghoaComponent implements OnInit, DoCheck {
  @Input() item: any = {};
  @Input() listTieuChuanChatLuong: any = {}
  @Input("opt") opt: string;

  @Output() itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() chiTieuChange: EventEmitter<any> = new EventEmitter<any>();
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };

  // item: any = {}


  data: any = {}
  listThanhToanThuTuc: any = []
  listLoaiMatHang: any = []
  listLoaiMatHang_ref: any = []
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router, public activeModal: NgbActiveModal, private _servicesSanXuat: SanXuatService) { }

  ngOnInit(): void {
    console.log(this.listTieuChuanChatLuong);

    this._servicesSanXuat
      .GetListdmLoaiBongForHopDong(this.data.Loai = 5)
      .subscribe((res: any) => {
        this.listLoaiMatHang = mapArrayForDropDown(res, "Ten", "Id");
        this.listLoaiMatHang_ref = res;
      });
  }
  ngDoCheck(): void {
    this.itemChange.emit(this.item);
    this.chiTieuChange.emit(this.listTieuChuanChatLuong);

  }
  changInput() {

    console.log(this.item);



  }

  add() {
    this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
    let modalRef = this._modal.open(ChitiethanghoamodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.item = {
      Id: "",
    };
    modalRef.componentInstance.opt = 'add';
    modalRef.result.then(res => {
      console.log(res.item);
      this.listTieuChuanChatLuong.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  // add() {
  //   this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
  //   let modalRef = this._modal.open(ChitiethanghoamodalComponent, { size: 'xl', backdrop: 'static' });
  //   modalRef.componentInstance.item = {
  //     Id: "",
  //   };
  //   modalRef.componentInstance.opt = 'add';
  //   modalRef.result.then(res => {
  //     console.log(res.item);
  //     this.listVatTu.push(res.item);
  //     if (res.opt !== 'add') {
  //       this.add()
  //     }
  //   }).catch(er => { console.log(er) });
  // }

  edit(item, i) {
    let modalRef = this._modal.open(ChitiethanghoamodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.opt = 'edit';
    modalRef.result.then(res => {
      this.listTieuChuanChatLuong.splice(i, 1);
      this.listTieuChuanChatLuong.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  delete(i) {
    let item = this.listTieuChuanChatLuong.splice(i, 1)[0];
    if (item.ID === 0) {
    } else {
      item.isXoa = true;
      this.listTieuChuanChatLuong.push(JSON.parse(JSON.stringify(item)));
    }

    // this.listTieuChuanChatLuong[i].isXoa = true;
    // this.listTieuChuanChatLuong.push(this.listTieuChuanChatLuong.splice(i,1));
    console.log(item);
    console.log(this.listTieuChuanChatLuong);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chonm-vat-tu-thay-the-pop-up',
  templateUrl: './chonm-vat-tu-thay-the-pop-up.component.html',
  styleUrls: ['./chonm-vat-tu-thay-the-pop-up.component.css']
})
export class ChonmVatTuThayThePopUpComponent implements OnInit {

  title: string = '';
  listHienThi: any = [];
  checkedAll: boolean = false;
  listDaChon: any = [];

  constructor(
    private _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.checkAll();
    this.checkItem();
  }

  checkAll() {
    this.listHienThi = this.listHienThi.map(ele => {
      return {
        ...ele,
        checked: this.checkedAll ? this.checkedAll : this.listDaChon.includes(ele.IdVatTuThayThe)
      }
    })
  }

  checkItem() {
    this.checkedAll = this.listHienThi.every((ele: any) => ele.checked)
  }

  GhiLai() {
    let arr = this.listHienThi.filter(ele => ele.checked);
    console.log(arr);
    
    this.activeModal.close(arr);
  }

}

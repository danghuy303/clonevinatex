import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-danhsachduan',
  templateUrl: './danhsachduan.component.html',
  styleUrls: ['./danhsachduan.component.css']
})
export class DanhsachduanComponent implements OnInit {

  listDuAn: any = [];
  listDaChon: any = [];
  checkedAll: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.listDuAn = this.listDuAn.map(ele => {
      return {
        ...ele,
        checked: this.listDaChon.includes(ele.Id)
      }
    });
    this.getCheck();
  }

  getCheck() {
    this.checkedAll = this.listDuAn.every(ele => ele.checked);
  }

  CheckAll(e) {
    this.listDuAn = this.listDuAn.map(ele => {
      return {
        ...ele,
        checked: e.checked
      }
    })
  }

  chapNhan() {
    this.activeModal.close(this.listDuAn.filter(ele => ele.checked)?.map(ele => {
      return {
        TenDuAn: ele.TenDuAn,
        MaDuAn: ele.MaDuAn,
        IdDuAn: ele.Id,
      }
    }));
  }

}
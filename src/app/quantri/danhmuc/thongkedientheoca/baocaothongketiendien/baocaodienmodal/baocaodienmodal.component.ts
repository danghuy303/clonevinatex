import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-baocaodienmodal',
  templateUrl: './baocaodienmodal.component.html',
  styleUrls: ['./baocaodienmodal.component.css']
})
export class BaocaodienmodalComponent implements OnInit {

  listKhungGio: any = [];
  NgayNhap: any = Date;
  filter: any = {};
  items: any = [];
  listHeader: any = [];
  listTotal: any = [];
  constructor(private _service: SanXuatService, public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
    if (this.items && this.items.length > 0) {
      let _firstRow = this.items[0];
      let _arr = _firstRow.listLoaiCongToKhac.map((x: any) => x.Title);
      this.listHeader = _arr;
      console.log(this.listHeader);
      _arr.forEach((x: any, index: any) => {
        this.listTotal.push({
          Ca1: this.items.reduce((a: any, b: any) => a + b.listLoaiCongToKhac[index][`Ca1`], 0),
          Ca2: this.items.reduce((a: any, b: any) => a + b.listLoaiCongToKhac[index][`Ca2`], 0),
          Ca3: this.items.reduce((a: any, b: any) => a + b.listLoaiCongToKhac[index][`Ca3`], 0),
          Tong: this.items.reduce((a: any, b: any) => a + b.listLoaiCongToKhac[index][`Tong`], 0),
        })
      })
      console.log("this.filter", this.filter);

    }
  }

}

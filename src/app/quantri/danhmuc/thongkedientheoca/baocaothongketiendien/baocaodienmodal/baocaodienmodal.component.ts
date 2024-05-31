import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DinhmucbaocaodienmodalComponent } from './dinhmucbaocaodienmodal/dinhmucbaocaodienmodal.component';
import { DateToUnix } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

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
  constructor(public _modal: NgbModal, private _service: SanXuatService, public store: StoreService, public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
    this.caculate(this.items)
  }

  getBaoCaoDien() {
    this._service.ThongKeDien().GetBaoCaoDien_Hue({
      nThang: this.filter.nThang,
      nNam: this.filter.nNam,
      IdDuAn: this.store.getCurrent()
    }).subscribe((res: any) => {
      this.caculate(res)
    })
  }

  caculate(res) {
    if (res && res.length > 0) {
      let _firstRow = res[0];
      let _arr = _firstRow.listLoaiCongToKhac.map((x: any) => x.Title);
      this.listHeader = _arr;
      console.log(this.listHeader);
      _arr.forEach((x: any, index: any) => {
        this.listTotal.push({
          Ca1: res.reduce((a: any, b: any) => a + b.listLoaiCongToKhac[index][`Ca1`], 0),
          Ca2: res.reduce((a: any, b: any) => a + b.listLoaiCongToKhac[index][`Ca2`], 0),
          Ca3: res.reduce((a: any, b: any) => a + b.listLoaiCongToKhac[index][`Ca3`], 0),
          Tong: res.reduce((a: any, b: any) => a + b.listLoaiCongToKhac[index][`Tong`], 0),
        })
      })
      console.log("this.filter", this.filter);

    }
  }

  showModalDinhMuc() {
    this._service.BaoCao().GetBaoCaoDienHueDinhMuc({ NgayUnix: DateToUnix(new Date()) }).subscribe((res: any) => {
      let modalRef = this._modal.open(DinhmucbaocaodienmodalComponent, {
        backdrop: 'static', size: 'fullscreen',
      });
      modalRef.componentInstance.items = [res];
      modalRef.result.then(res => {
      }).catch(er => console.log(er))
        .finally(() => {
          this.getBaoCaoDien()
        })
    })
  }


}

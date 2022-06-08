import { number } from '@amcharts/amcharts4/core';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { validVariable } from 'src/app/services/globalfunction';
import { handleHTTPResponse } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-denghixulysucochiphikhac',
  templateUrl: './denghixulysucochiphikhac.component.html',
  styleUrls: ['./denghixulysucochiphikhac.component.css']
})
export class DenghixulysucochiphikhacComponent implements OnInit, OnChanges {

  @Input() items: any = {};
  newitem: any = {};
  TongChiPhi: any = 0;

  constructor(
    public _modal: NgbModal,
  ) { }

  ngOnChanges(): void {
    this.TinhTong();
  }

  ngOnInit(): void {
  }
  add2(item) {
    if (!validVariable(item.listChiPhiKhac)) {
      item.listChiPhiKhac = [];
    }
    item.listChiPhiKhac.push({});

  }
  delete(item, index) {
    // console.log({ item: item, index: index });
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      size: 'md',
      backdrop: 'static',
    })
    modalRef.componentInstance.message = 'Bạn chắc chắn muốn xóa chi phí này?'
    modalRef.result
      .then(() => {
        item.listChiPhiKhac.splice(index, 1);
        this.TinhTong();
      })
  }

  TinhTong() {
    this.TongChiPhi = 0;
    this.items.forEach(item => {
      item.ThanhTien = item.listChiPhiKhac?.reduce((total, chiphi) => {
        return total + chiphi.GiaTri
      }, 0)
      this.TongChiPhi += (item.ThanhTien || 0)
    })

  }
}

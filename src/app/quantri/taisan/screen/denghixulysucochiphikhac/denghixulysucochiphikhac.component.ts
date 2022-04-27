import { number } from '@amcharts/amcharts4/core';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-denghixulysucochiphikhac',
  templateUrl: './denghixulysucochiphikhac.component.html',
  styleUrls: ['./denghixulysucochiphikhac.component.css']
})
export class DenghixulysucochiphikhacComponent implements OnInit, OnChanges {

  @Input('item') items: any = {};
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  newitem: any = {};
  TongChiPhi:any = 0; 

  constructor() { }

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
  delete(index) {
   this.items.forEach(chiphi => {
     chiphi.listChiPhiKhac.splice(index, 1)[0];
   })
  }

  TinhTong() {
    this.TongChiPhi = 0;
    this.items.forEach(item => {
      item.ThanhTien = 0;
      item.ThanhTien = item.listChiPhiKhac.reduce((total, chiphi) => {
        return total + chiphi.GiaTri
      }, 0)
      this.TongChiPhi += (item.ThanhTien || 0)
    })

  }
}

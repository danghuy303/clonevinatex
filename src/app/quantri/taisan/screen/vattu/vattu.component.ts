import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-vattu',
  templateUrl: './vattu.component.html',
  styleUrls: ['./vattu.component.css']
})
export class VattuComponent implements OnInit, OnChanges {

  @Input() items: any;
  items_copy: any = [];
  tongThanhTien: number = 0;

  constructor(private _services: SanXuatService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.CountTheoKeHoach();
    this.Count();
  }

  ngOnInit(): void {
  
  }

  CountTheoKeHoach() {
    this.items.forEach(ele => {
      ele.ThanhTienTheoKeHoach = ele.listVatTu.reduce((total, ele) => {
        return total + ele.ThanhTienTheoKeHoach
      }, 0)
    })
  }

  Count() {
    this.items.forEach(ele => {
      ele.ThanhTien = 0;
      ele.listVatTu.forEach(children => {
        children.ThanhTien = (children.DonGia || 0) * (children.SoLuong || 0);
        ele.ThanhTien += children.ThanhTien;
      })
    })
    this.tongThanhTien = this.items.reduce((sum, ele) => {
      return sum + ele.ThanhTien
    },0)
  }

}

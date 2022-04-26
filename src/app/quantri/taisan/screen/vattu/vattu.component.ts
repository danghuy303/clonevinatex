import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-vattu',
  templateUrl: './vattu.component.html',
  styleUrls: ['./vattu.component.css']
})
export class VattuComponent implements OnInit, OnChanges {

  @Input() items: any;
  @Output() itemsChange = new EventEmitter<any>();
  items_copy: any = [];
  tongThanhTien: number = 0;

  constructor(private _services: SanXuatService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.LoadData();
  }

  ngOnInit(): void {
  

  }

  LoadData() {
    this.items = this.items.map(ele => {
      return {
        data: {
          ...ele,
          isCha: true,
        },
        children: ele.listVatTu.map(children => {
          return {
            data: {
              ...children,
              isCha: false,
            }
          }
        }),
        expanded: true
      }
    })
  }

  Count() {
    this.items.forEach(ele => {
      ele.data.ThanhTien = 0;
      ele.children.forEach(children => {
        children.data.ThanhTien = (children.data.DonGia || 0) * (children.data.SoLuong || 0);
        ele.data.ThanhTien += children.data.ThanhTien;
      })
    })
    this.tongThanhTien = this.items.reduce((sum, ele) => {
      return sum + ele.data.ThanhTien
    },0)
  }

}

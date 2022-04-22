import { Component, Input, OnInit } from '@angular/core';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-vattuthaythelichxichnam',
  templateUrl: './vattuthaythelichxichnam.component.html',
  styleUrls: ['./vattuthaythelichxichnam.component.css']
})
export class VattuthaythelichxichnamComponent implements OnInit {

  @Input('item') items: any = {};
  lableThang: any = [];
  ThanhTien: any = 0;
  TongGiaTriToanBang: any = 0;

  constructor() { }

  ngOnInit(): void {

    for (let i = 1; i <= 12; i++) {
      this.lableThang.push(i);
    }
  }

  tongTien(item) {
    this.TongGiaTriToanBang = 0;
    item.TongGiaTri = 0;
    item.TongThanhTien = new Array(12).fill(0);

    for (let i = 0; i <= 11; i++) {
      item.listVatTu.forEach(vattu => {
        item.TongThanhTien[i] += ((vattu.listThoiGian[i].DonGia || 0) * (vattu.listThoiGian[i].SoLuong || 0));
      })
    }
    item.listVatTu.forEach(vattu => {
      vattu.ThanhTien12Thang = vattu.listThoiGian.reduce((a, b) => { return a += (b.DonGia || 0) * (b.SoLuong || 0) }, 0)
    })
    item.TongThanhTien.forEach(Tong => {
      item.TongGiaTri += Tong;
    });
    this.items.forEach(ele => {
      this.TongGiaTriToanBang += (ele.TongGiaTri || 0);
    })
  }

}

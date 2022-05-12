import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { validVariable } from 'src/app/services/globalfunction';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-vattuthaythelichxichnam',
  templateUrl: './vattuthaythelichxichnam.component.html',
  styleUrls: ['./vattuthaythelichxichnam.component.css']
})
export class VattuthaythelichxichnamComponent implements OnInit, OnChanges {

  @Input('item') items: any = {};
  @ViewChild(PintableDirective) voiPintable: PintableDirective;

  lableThang: any = [];
  ThanhTien: any = 0;
  TongGiaTriToanBang: any = 0;
  vatTu: any = [];
  labelThang = [];

  constructor() { }

  ngOnChanges(): void {
    this.SumAll();
    this.ThoiGianVatTu();
    for (let i = 1; i <= 12; i++) {
      this.labelThang.push(`Tháng ${i}`);
    }
  }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.voiPintable.active();
  }

  ThoiGianVatTu() {
    this.items.forEach(ele => {
      ele.listVatTu.forEach(obj => {
        this.vatTu = obj.listThoiGian;
      })
    })
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

  SumAll() {
    this.TongGiaTriToanBang = 0;
    this.items.forEach(item => {
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
      this.TongGiaTriToanBang += (item.TongGiaTri || 0);
    })
  }

}

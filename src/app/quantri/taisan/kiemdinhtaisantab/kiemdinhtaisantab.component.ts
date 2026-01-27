import { Component, Input, OnInit } from '@angular/core';
import { UnixToDate } from '../../../services/globalfunction';
import { vn } from '../../../services/const';

@Component({
  selector: 'app-kiemdinhtaisantab',
  templateUrl: './kiemdinhtaisantab.component.html',
  styleUrls: ['./kiemdinhtaisantab.component.css']
})
export class KiemdinhtaisantabComponent implements OnInit {

  @Input() listKiemDinh: any = [];
  @Input() listNoiDangKiem: any = [];
  tongChiPhi: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.getTongChiPhiTaiSan();
  }

  getTongChiPhiTaiSan() {
    this.tongChiPhi = this.listKiemDinh?.reduce((a: any, b: any) => a + (b.ChiPhi || 0), 0)
  }

}

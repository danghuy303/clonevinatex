import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-baohiemtaisantab',
  templateUrl: './baohiemtaisantab.component.html',
  styleUrls: ['./baohiemtaisantab.component.css']
})
export class BaohiemtaisantabComponent implements OnInit {

  @Input()  listBaoHiem: any = [];
  tongChiPhi: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.getTongChiPhiTaiSan();
  }

  getTongChiPhiTaiSan() {
    this.tongChiPhi = this.listBaoHiem?.reduce((a: any, b: any) => a + (b.ChiPhi || 0), 0)
  }

}

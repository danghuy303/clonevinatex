import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-chi-phi-khau-hao',
  templateUrl: './table-chi-phi-khau-hao.component.html',
  styleUrls: ['./table-chi-phi-khau-hao.component.css']
})
export class TableChiPhiKhauHaoComponent implements OnInit, OnChanges {

  @Input() kehoach: any = {};
  @Input() listLableThang: any = [];
  verticalSum: any = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.countAllSum();
  }

  ngOnInit(): void {
  }

  countAllSum() {
    this.countVerticalSum();
    this.countTongChiPhi();
  }

  countVerticalSum() {
    for (let i = 0; i < 12; i++) {
      this.verticalSum[i] = 0;
      this.kehoach.listKhauHao.forEach(chiphi => {
        this.verticalSum[i] += (chiphi.listThang[i].ChiPhi || 0);
      })
    }
    this.verticalSum[12] = this.verticalSum.reduce((total, ele) => {
      return total + ele;
    }, 0);
  }

  countTongChiPhi() {
    this.kehoach.listKhauHao.forEach(chiphi => {
      chiphi.TongChiPhi = chiphi.listThang.reduce((total, ele) => {
        return total + ele.ChiPhi;
      }, 0);
    })
  }

}

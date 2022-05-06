import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-vattulichxichthang',
  templateUrl: './vattulichxichthang.component.html',
  styleUrls: ['./vattulichxichthang.component.css']
})
export class VattulichxichthangComponent implements OnInit, OnChanges {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  @Input('listTaiSan') listTaiSan: any = [];
  labelThang: any = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.listTaiSan);
    
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    for (let i = 1; i <= 31; i++) {
      this.labelThang.push(i);
    }
  }

  ngAfterViewInit(): void {
    this.voiPintable.active();
  }

}

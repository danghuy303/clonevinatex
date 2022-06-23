import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mayong-baocaoca',
  templateUrl: './mayong-baocaoca.component.html',
  styleUrls: ['./mayong-baocaoca.component.css']
})
export class MayongBaocaocaComponent implements OnInit {
  @Input('data') item: any = {};
  constructor() { }

  ngOnInit(): void {
  }
  changeCoLoi(item) {
    item.KhoiLuongTachLoi = (item.KhoiLuongCoLoi||0) - (item.SoLoi || 0)*0.054
  }
}

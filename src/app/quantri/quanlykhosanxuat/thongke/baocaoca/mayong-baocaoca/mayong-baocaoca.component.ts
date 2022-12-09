import { Component, Input, OnInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-mayong-baocaoca',
  templateUrl: './mayong-baocaoca.component.html',
  styleUrls: ['./mayong-baocaoca.component.css']
})
export class MayongBaocaocaComponent implements OnInit {
  @Input('data') item: any = {};
  @ViewChildren('inputKhoiLuong') inputKhoiLuongs: any;
  @ViewChildren('inputSoLoi') inputSoLois: any;
  @ViewChildren('inputTrongLuongLoi') inputTrongLuongLois: any;

  constructor() { }

  ngOnInit(): void {
  }
  changeCoLoi(item) {
    item.KhoiLuongTachLoi = (item.KhoiLuongCoLoi || 0) - (item.SoLoi || 0) * (item.TrongLuongLoi||0)
  }

  nextFocus(index) {
    let length = this.inputKhoiLuongs.toArray().length;
    this.inputKhoiLuongs.toArray()[(index + 1 < length ? index + 1 : 0)].el.nativeElement.children[0].children[0].focus();
    setTimeout(() => {
      this.inputKhoiLuongs.toArray()[(index + 1 < length ? index + 1 : 0)].el.nativeElement.children[0].children[0].focus();
    }, 400)
  }

  nextFocusSoLoi(index) {
    let length = this.inputSoLois.toArray().length;
    this.inputSoLois.toArray()[(index + 1 < length ? index + 1 : 0)].el.nativeElement.children[0].children[0].focus();
    setTimeout(() => {
      this.inputSoLois.toArray()[(index + 1 < length ? index + 1 : 0)].el.nativeElement.children[0].children[0].focus();
    }, 400)
  }

  nextFocusTrongLuongLoi(index) {
    let length = this.inputTrongLuongLois.toArray().length;
    this.inputTrongLuongLois.toArray()[(index + 1 < length ? index + 1 : 0)].el.nativeElement.children[0].children[0].focus();
    setTimeout(() => {
      this.inputTrongLuongLois.toArray()[(index + 1 < length ? index + 1 : 0)].el.nativeElement.children[0].children[0].focus();
    }, 400)
  }
}

import { Component, Input, OnInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-soicon-baocaoca',
  templateUrl: './soicon-baocaoca.component.html',
  styleUrls: ['./soicon-baocaoca.component.css']
})
export class SoiconBaocaocaComponent implements OnInit {
  @Input('data') item :any={};
  @ViewChildren('inputKhoiLuong') inputKhoiLuongs: any;
  constructor() { }

  ngOnInit(): void {
  }

  nextFocus(index) {
    let length = this.inputKhoiLuongs.toArray().length;
    this.inputKhoiLuongs.toArray()[(index + 1 < length ? index + 1 : 0)].el.nativeElement.children[0].children[0].focus();
    setTimeout(() => {
      this.inputKhoiLuongs.toArray()[(index + 1 < length ? index + 1 : 0)].el.nativeElement.children[0].children[0].focus();
    }, 400)
  }

}

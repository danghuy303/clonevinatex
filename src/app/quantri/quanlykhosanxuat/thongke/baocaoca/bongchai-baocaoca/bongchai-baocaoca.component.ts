import { Component, Input, OnInit, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-bongchai-baocaoca',
  templateUrl: './bongchai-baocaoca.component.html',
  styleUrls: ['./bongchai-baocaoca.component.css']
})
export class BongchaiBaocaocaComponent implements OnInit {
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

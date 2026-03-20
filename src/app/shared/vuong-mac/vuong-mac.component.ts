import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-vuong-mac',
  templateUrl: './vuong-mac.component.html',
  styleUrls: ['./vuong-mac.component.css']
})
export class VuongMacComponent implements OnInit , OnChanges {

  @Input() quyTrinh: any = {};
  display: boolean =false;
  DanhGia: string = '';

  constructor(
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.GetList();
  }

  ngOnInit(): void {

  }

  GetList() {
    this.quyTrinh.listVuongMacQuyTrinh.forEach((ele: any) => {
      ele.VuongMacTooltip =  this.setPageContent(ele.VuongMac);
    })
  }

  setPageContent(value: any) {
    const temp = document.createElement('div');
    temp.innerHTML = value;
    return temp.textContent || temp.innerText || '';
  }

  show(e:any) {
    this.display = !this.display;
    this.DanhGia = e.VuongMac;
  }

}

import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-danh-gia',
  templateUrl: './danh-gia.component.html',
  styleUrls: ['./danh-gia.component.css']
})
export class DanhGiaComponent implements OnInit , OnChanges {

  @Input() quyTrinh: any = {};
  display: boolean =false;
  DanhGia: string = '';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.GetList();
  }

  ngOnInit(): void {

  }

  GetList() {
    this.quyTrinh.listDanhGiaQuyTrinh.forEach((ele: any) => {
      ele.DanhGiaTooltip =  this.setPageContent(ele.DanhGia);
    })
  }

  setPageContent(value: any) {
    const temp = document.createElement('div');
    temp.innerHTML = value;
    return temp.textContent || temp.innerText || '';
  }

  show(e:any) {
    this.display = !this.display;
    this.DanhGia = e.DanhGia;
  }

}

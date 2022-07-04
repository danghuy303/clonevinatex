import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-danh-muc-ke-hoach-kinh-doanh',
  templateUrl: './danh-muc-ke-hoach-kinh-doanh.component.html',
  styleUrls: ['./danh-muc-ke-hoach-kinh-doanh.component.css']
})
export class DanhMucKeHoachKinhDoanhComponent implements OnInit, OnChanges {

  @Input() cols: any[];
  listDanhMuc: any = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("cols", this.cols);
  }

  ngOnInit(): void {
  }

  add() {

  }
}

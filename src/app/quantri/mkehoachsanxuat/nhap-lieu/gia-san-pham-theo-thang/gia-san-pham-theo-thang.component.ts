import { Component, OnInit } from '@angular/core';
import { GiaSanPhamTheoThangModalComponent } from './gia-san-pham-theo-thang-modal/gia-san-pham-theo-thang-modal.component';

@Component({
  selector: 'app-gia-san-pham-theo-thang',
  templateUrl: './gia-san-pham-theo-thang.component.html',
  styleUrls: ['./gia-san-pham-theo-thang.component.css']
})
export class GiaSanPhamTheoThangComponent implements OnInit {

  modal = GiaSanPhamTheoThangModalComponent;
  cols: any = [
    {header: 'Nhà máy', field: 'NhaMay', headerStyle: {}, dataStyle: {}},
    {header: 'Năm', field: 'Nam', headerStyle: {}, dataStyle: {"text-align": "center"}},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

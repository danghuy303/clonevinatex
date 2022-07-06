import { Component, OnInit } from '@angular/core';
import { PhuongThucVanChuyenModalComponent } from './phuong-thuc-van-chuyen-modal/phuong-thuc-van-chuyen-modal.component';

@Component({
  selector: 'app-phuong-thuc-van-chuyen',
  templateUrl: './phuong-thuc-van-chuyen.component.html',
  styleUrls: ['./phuong-thuc-van-chuyen.component.css']
})
export class PhuongThucVanChuyenComponent implements OnInit {

  modal = PhuongThucVanChuyenModalComponent;
  cols: any = [
    {header: 'Mã', field: 'Ma', headerStyle: {}, dataStyle: {}},
    {header: 'Tên', field: 'Ten', headerStyle: {}, dataStyle: {}},
    {header: 'Ghi chú', field: 'GhiChu', headerStyle: {}, dataStyle: {}},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

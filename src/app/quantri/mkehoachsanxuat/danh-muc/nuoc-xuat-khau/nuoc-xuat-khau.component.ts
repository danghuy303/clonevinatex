import { Component, OnInit } from '@angular/core';
import { NuocXuatKhauComponentComponent } from './nuoc-xuat-khau-component/nuoc-xuat-khau-component.component';

@Component({
  selector: 'app-nuoc-xuat-khau',
  templateUrl: './nuoc-xuat-khau.component.html',
  styleUrls: ['./nuoc-xuat-khau.component.css']
})
export class NuocXuatKhauComponent implements OnInit {

  modal = NuocXuatKhauComponentComponent;
  cols: any = [
    {header: 'Mã', field: 'Ma', headerStyle: {}, dataStyle: {}},
    {header: 'Tên', field: 'Ten', headerStyle: {}, dataStyle: {}},
    {header: 'Ghi chú', field: 'GhiChu', headerStyle: {}, dataStyle: {}},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

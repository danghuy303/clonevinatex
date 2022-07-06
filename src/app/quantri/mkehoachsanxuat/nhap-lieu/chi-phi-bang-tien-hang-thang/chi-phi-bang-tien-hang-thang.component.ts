import { Component, OnInit } from '@angular/core';
import { ChiPhiBangTienHangThangModalComponent } from './chi-phi-bang-tien-hang-thang-modal/chi-phi-bang-tien-hang-thang-modal.component';

@Component({
  selector: 'app-chi-phi-bang-tien-hang-thang',
  templateUrl: './chi-phi-bang-tien-hang-thang.component.html',
  styleUrls: ['./chi-phi-bang-tien-hang-thang.component.css']
})
export class ChiPhiBangTienHangThangComponent implements OnInit {

  modal = ChiPhiBangTienHangThangModalComponent;
  cols: any = [
    {header: 'Nhà máy', field: 'NhaMay', headerStyle: {}, dataStyle: {}},
    {header: 'Năm', field: 'Nam', headerStyle: {}, dataStyle: {"text-align": "center"}},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

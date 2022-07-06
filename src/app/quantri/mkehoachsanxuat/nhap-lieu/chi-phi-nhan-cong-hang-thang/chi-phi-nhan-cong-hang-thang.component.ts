import { Component, OnInit } from '@angular/core';
import { ChiPhiNhanCongHangThangModalComponent } from './chi-phi-nhan-cong-hang-thang-modal/chi-phi-nhan-cong-hang-thang-modal.component';

@Component({
  selector: 'app-chi-phi-nhan-cong-hang-thang',
  templateUrl: './chi-phi-nhan-cong-hang-thang.component.html',
  styleUrls: ['./chi-phi-nhan-cong-hang-thang.component.css']
})
export class ChiPhiNhanCongHangThangComponent implements OnInit {

  modal = ChiPhiNhanCongHangThangModalComponent;
  cols: any = [
    {header: 'Nhà máy', field: 'NhaMay', headerStyle: {}, dataStyle: {}},
    {header: 'Năm', field: 'Nam', headerStyle: {}, dataStyle: {"text-align": "center"}},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

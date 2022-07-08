import { Component, OnInit } from '@angular/core';
import { ChiPhiNhanCongModalComponent } from './chi-phi-nhan-cong-modal/chi-phi-nhan-cong-modal.component';

@Component({
  selector: 'app-chi-phi-nhan-cong',
  templateUrl: './chi-phi-nhan-cong.component.html',
  styleUrls: ['./chi-phi-nhan-cong.component.css']
})
export class ChiPhiNhanCongComponent implements OnInit {

  modal = ChiPhiNhanCongModalComponent;
  cols: any = [
    {header: 'Mã', field: 'Ma', headerStyle: {}, dataStyle: {}},
    {header: 'Tên', field: 'Ten', headerStyle: {}, dataStyle: {}},
    {header: 'Ghi chú', field: 'GhiChu', headerStyle: {}, dataStyle: {}},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

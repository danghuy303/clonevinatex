import { Component, OnInit } from '@angular/core';
import { ChiPhiLaiVayHangThangModalComponent } from './chi-phi-lai-vay-hang-thang-modal/chi-phi-lai-vay-hang-thang-modal.component';

@Component({
  selector: 'app-chi-phi-lai-vay-hang-thang',
  templateUrl: './chi-phi-lai-vay-hang-thang.component.html',
  styleUrls: ['./chi-phi-lai-vay-hang-thang.component.css']
})
export class ChiPhiLaiVayHangThangComponent implements OnInit {

  modal = ChiPhiLaiVayHangThangModalComponent;
  cols: any = [
    {header: 'Nhà máy', field: 'NhaMay', headerStyle: {}, dataStyle: {}},
    {header: 'Năm', field: 'Nam', headerStyle: {}, dataStyle: {"text-align": "center"}},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

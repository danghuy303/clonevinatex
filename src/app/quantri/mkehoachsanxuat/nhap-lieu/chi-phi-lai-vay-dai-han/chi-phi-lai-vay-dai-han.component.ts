import { Component, OnInit } from '@angular/core';
import { ChiPhiLaiVayDaiHanModalComponent } from './chi-phi-lai-vay-dai-han-modal/chi-phi-lai-vay-dai-han-modal.component';

@Component({
  selector: 'app-chi-phi-lai-vay-dai-han',
  templateUrl: './chi-phi-lai-vay-dai-han.component.html',
  styleUrls: ['./chi-phi-lai-vay-dai-han.component.css']
})
export class ChiPhiLaiVayDaiHanComponent implements OnInit {

  modal = ChiPhiLaiVayDaiHanModalComponent;
  cols: any = [
    {header: 'Nhà máy', field: 'NhaMay', headerStyle: {}, dataStyle: {}},
    {header: 'Năm', field: 'Nam', headerStyle: {}, dataStyle: {"text-align": "center"}},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { ChiPhiLaiVayModalComponent } from './chi-phi-lai-vay-modal/chi-phi-lai-vay-modal.component'

@Component({
  selector: 'app-chi-phi-lai-vay',
  templateUrl: './chi-phi-lai-vay.component.html',
  styleUrls: ['./chi-phi-lai-vay.component.css']
})
export class ChiPhiLaiVayComponent implements OnInit {

  modal = ChiPhiLaiVayModalComponent;
  cols: any = [
    {header: 'Mã', field: 'Ma', headerStyle: {}, dataStyle: {}},
    {header: 'Tên', field: 'Ten', headerStyle: {}, dataStyle: {}},
    {header: 'Ghi chú', field: 'GhiChu', headerStyle: {}, dataStyle: {}},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

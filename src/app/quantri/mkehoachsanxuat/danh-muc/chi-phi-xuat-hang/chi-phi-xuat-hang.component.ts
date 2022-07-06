import { Component, OnInit } from '@angular/core';
import { ChiPhiXuatHangModalComponent } from './chi-phi-xuat-hang-modal/chi-phi-xuat-hang-modal.component';

@Component({
  selector: 'app-chi-phi-xuat-hang',
  templateUrl: './chi-phi-xuat-hang.component.html',
  styleUrls: ['./chi-phi-xuat-hang.component.css']
})
export class ChiPhiXuatHangComponent implements OnInit {

  modal = ChiPhiXuatHangModalComponent;
  cols: any = [
    {header: 'Mã', field: 'Ma', headerStyle: {}, dataStyle: {}},
    {header: 'Tên', field: 'Ten', headerStyle: {}, dataStyle: {}},
    {header: 'Ghi chú', field: 'GhiChu', headerStyle: {}, dataStyle: {}},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

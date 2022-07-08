import { Component, OnInit } from '@angular/core';
import { ChiPhiBangTienModalComponent } from './chi-phi-bang-tien-modal/chi-phi-bang-tien-modal.component'

@Component({
  selector: 'app-chi-phi-bang-tien',
  templateUrl: './chi-phi-bang-tien.component.html',
  styleUrls: ['./chi-phi-bang-tien.component.css']
})
export class ChiPhiBangTienComponent implements OnInit {

  modal = ChiPhiBangTienModalComponent;
  cols: any = [
    {header: 'Mã', field: 'Ma', headerStyle: {}, dataStyle: {}},
    {header: 'Tên', field: 'Ten', headerStyle: {}, dataStyle: {}},
    {header: 'Ghi chú', field: 'GhiChu', headerStyle: {}, dataStyle: {}},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

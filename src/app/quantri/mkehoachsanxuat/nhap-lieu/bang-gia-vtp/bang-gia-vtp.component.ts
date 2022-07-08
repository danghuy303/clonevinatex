import { Component, OnInit } from '@angular/core';
import { BangGiaVtpModalComponent } from './bang-gia-vtp-modal/bang-gia-vtp-modal.component';

@Component({
  selector: 'app-bang-gia-vtp',
  templateUrl: './bang-gia-vtp.component.html',
  styleUrls: ['./bang-gia-vtp.component.css']
})
export class BangGiaVtpComponent implements OnInit {

  modal = BangGiaVtpModalComponent;
  cols: any = [
    {header: 'Nhà máy', field: 'NhaMay', headerStyle: {}, dataStyle: {}},
    {header: 'Năm', field: 'Nam', headerStyle: {}, dataStyle: {"text-align": "center"}},
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}

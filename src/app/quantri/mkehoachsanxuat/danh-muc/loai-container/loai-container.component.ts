import { Component, OnInit } from '@angular/core';
import { LoaiContainerModalComponent } from './loai-container-modal/loai-container-modal.component';

@Component({
  selector: 'app-loai-container',
  templateUrl: './loai-container.component.html',
  styleUrls: ['./loai-container.component.css']
})
export class LoaiContainerComponent implements OnInit {

  modal = LoaiContainerModalComponent;
  cols: any = [
    {header: 'Mã', field: 'Ma', headerStyle: {}, dataStyle: {}},
    {header: 'Tên', field: 'Ten', headerStyle: {}, dataStyle: {}},
    {header: 'Tải trọng', field: 'TaiTrong', headerStyle: {}, dataStyle: {"text-align": "right"}},
    {header: 'Ghi chú', field: 'GhiChu', headerStyle: {}, dataStyle: {}},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

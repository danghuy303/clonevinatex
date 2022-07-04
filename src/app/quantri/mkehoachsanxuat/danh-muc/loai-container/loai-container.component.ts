import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loai-container',
  templateUrl: './loai-container.component.html',
  styleUrls: ['./loai-container.component.css']
})
export class LoaiContainerComponent implements OnInit {

  cols: any = [
    {header: 'STT', style: {
      "width": "100px"
    }},
    {header: 'Mã', style: {

    }},
    {header: 'Tên', style: {

    }},
    {header: 'Tải trọng', style: {

    }},
    {header: 'Ghi chú', style: {

    }},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

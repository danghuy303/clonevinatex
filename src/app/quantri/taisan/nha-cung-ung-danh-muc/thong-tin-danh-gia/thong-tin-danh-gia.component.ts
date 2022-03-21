import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thong-tin-danh-gia',
  templateUrl: './thong-tin-danh-gia.component.html',
  styleUrls: ['./thong-tin-danh-gia.component.css']
})
export class ThongTinDanhGiaComponent implements OnInit {

  @Input() item: any = {};
  paging: any = {}

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modalchiphibong',
  templateUrl: './modalchiphibong.component.html',
  styleUrls: ['./modalchiphibong.component.css']
})
export class ModalchiphibongComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  //callAPI this._danhMucHopDong.KeHoachKinhDoanh_DonGiaDinhMuc().ChiPhi('Bong').Get(Nam) sau khi chọn năm
  // this._danhMucHopDong.KeHoachKinhDoanh_DonGiaDinhMuc().Set(item) để ghi lại
}

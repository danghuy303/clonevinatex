import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tieuhaonhienlieutab',
  templateUrl: './tieuhaonhienlieutab.component.html',
  styleUrls: ['./tieuhaonhienlieutab.component.css']
})
export class TieuhaonhienlieutabComponent implements OnInit {

  @Input() listTieuHao: any = [];
  @Input() listLoaiDinhMucNhienLieu: any = [];
  @Input() listLoaiNhienLieu: any = [];
  tongChiPhi: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.getTongChiPhiTaiSan();
  }

  getTongChiPhiTaiSan() {
    this.tongChiPhi = this.listTieuHao?.reduce((a: any, b: any) => a + (b.ThanhTien || 0), 0)
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-table-chi-phi-ban-hang',
  templateUrl: './table-chi-phi-ban-hang.component.html',
  styleUrls: ['./table-chi-phi-ban-hang.component.css']
})
export class TableChiPhiBanHangComponent implements OnInit {

  @Input() kehoach: any = {};
  @Input() listLableThang: any = [];
  verticalSum: any = [];

  constructor(
    private _danhMucHopDong: DanhMucHopDongService,
  ) { }

  ngOnInit(): void {
  }

  tinhChiPhi() {
    let data = {
      IdKeHoachSanLuong: this.kehoach.IdLapKeHoachSanLuongNam,
      listDonGia: this.kehoach.listChiPhiBanHang.DonGia.listDonGia
    }
    this._danhMucHopDong.KeHoachChiPhi()
      .CountChiPhi(data, "BanHang").subscribe((res: any) => {
        this.kehoach.listChiPhiBanHang.ChiPhi.listChiPhi = res;
        this.countAll();
      })
  }

  countAll() {
    this.countVerticalSum();
    this.countTongChiPhi();
  }

  countTongChiPhi() {
    this.kehoach.listChiPhiBanHang.ChiPhi.listChiPhi.forEach(chiphi => {
      chiphi.TongChiPhi = chiphi.listChiPhi.reduce((total, ele) => {
        return total + ele.ChiPhi
      }, 0)
    })
  }

  countVerticalSum() {
    for (let i = 0; i < 12; i++) {
      this.verticalSum[i] = 0;
      this.kehoach.listChiPhiBanHang.ChiPhi.listChiPhi.forEach(chiphi => {
        this.verticalSum[i] += (chiphi.listChiPhi[i].ChiPhi || 0);
      })
    }
    this.verticalSum[12] = 0;
    this.verticalSum[12] = this.verticalSum.reduce((total, ele) => {
      return total + ele;
    }, 0);
  }
}

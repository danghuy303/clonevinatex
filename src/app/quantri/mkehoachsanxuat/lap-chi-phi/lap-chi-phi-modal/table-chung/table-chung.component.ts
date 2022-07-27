import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-table-chung',
  templateUrl: './table-chung.component.html',
  styleUrls: ['./table-chung.component.css']
})
export class TableChungComponent implements OnInit, OnChanges {

  @Input() listName: string = "";
  @Input() kehoach: any = {};
  listLabelThang: any = [];
  dinhMucName: any;
  verticalSum: any = [];

  constructor(
    private _danhMucHopDong: DanhMucHopDongService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.dinhMucName = `list${this.listName}`;
    console.log("dinhMucNam", this.dinhMucName);
    this.countAll();
  }

  ngOnInit(): void {
    this.getLabelThang();
    this.countAll();
  }

  getLabelThang() {
    for (let i = 1; i <= 12; i++) {
      this.listLabelThang.push(`Tháng ${i}`);
    }
  }

  tinhChiPhi() {
    let data = {
      IdKeHoachSanLuong: this.kehoach.IdLapKeHoachSanLuongNam,
      listDonGia: this.kehoach[this.dinhMucName]?.listDonGia
    }
    this._danhMucHopDong.KeHoachChiPhi()
      .CountChiPhi(data, this.listName).subscribe((res: any) => {
        this.kehoach[this.dinhMucName].listChiPhi = res;
        this.countAll();
      })
  }

  countAll() {
    this.countVerticalSum();
    this.countTongChiPhi();
  }

  countTongChiPhi() {
    this.kehoach[this.dinhMucName].listChiPhi.forEach(chiphi => {
      chiphi.TongChiPhi = chiphi.listChiPhi.reduce((total, ele) => {
        return total + ele.ChiPhi
      }, 0)
    })
  }

  countVerticalSum() {
    for (let i = 0; i < 12; i++) {
      this.verticalSum[i] = 0;
      this.kehoach[this.dinhMucName].listChiPhi.forEach(chiphi => {
        this.verticalSum[i] += (chiphi.listChiPhi[i].ChiPhi || 0);
      })
    }
    this.verticalSum[12] = this.verticalSum.reduce((total, ele) => {
      return total + ele;
    }, 0);
  }

}

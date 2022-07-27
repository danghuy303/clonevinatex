import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-table-chi-phi-nhan-cong',
  templateUrl: './table-chi-phi-nhan-cong.component.html',
  styleUrls: ['./table-chi-phi-nhan-cong.component.css']
})
export class TableChiPhiNhanCongComponent implements OnInit, OnChanges {

  @Input() kehoach: any = {};
  @Input() listLableThang: any = [];
  verticalSum: any = [];
  
  constructor(
    private _danhMucHopDong: DanhMucHopDongService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.countAllSum();
  }

  ngOnInit(): void {
  }

  countAllSum() {
    this.countChiPhiParent();
    this.countVerticalSum();
    this.countTongChiPhi();
  }

  countChiPhiParent() {
    this.kehoach.listNhanCong.forEach(nhancong => {
      if (nhancong.listNhanCong?.length) {
        for(let i = 0; i < 12; i++) {
          nhancong.listDonGia[i].Gia = 0;
          nhancong.listNhanCong.forEach(child => {
            nhancong.listDonGia[i].Gia += child.listDonGia[i].Gia;
          })
        } 
      }
    })
  }

  countTongChiPhi() {
    this.kehoach.listChiPhiNhanCong.forEach(chiphi => {
      chiphi.TongChiPhi = chiphi.listThang.reduce((total, ele) => {
        return total + ele.ChiPhi;
      }, 0);
      if (chiphi.listChiPhi?.length) {
        chiphi.listChiPhi.forEach(child => {
          child.TongChiPhi = child.listThang.reduce((total, ele) => {
            return total + ele.ChiPhi;
          }, 0)
        })
      }
    })
  }

  countVerticalSum() {
    for (let i = 0; i < 12; i++) {
      this.verticalSum[i] = 0;
      this.kehoach.listChiPhiNhanCong.forEach(chiphi => {
        this.verticalSum[i] += (chiphi.listThang[i].ChiPhi || 0);
      })
    }
    this.verticalSum[12] = this.verticalSum.reduce((total, ele) => {
      return total + ele;
    }, 0);
  }

  countChiPhi() {
    let data = {
      IdKeHoachSanLuong: this.kehoach.IdLapKeHoachSanLuongNam,
      listNhanCong: this.kehoach.listNhanCong
    }
    this._danhMucHopDong.KeHoachChiPhi()
      .CountChiPhi(data, 'NhanCong').subscribe((res: any) => {
        
      })
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, DateToUnix } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-thong-ke-thoi-gian-dung-may',
  templateUrl: './thong-ke-thoi-gian-dung-may.component.html',
  styleUrls: ['./thong-ke-thoi-gian-dung-may.component.css']
})
export class ThongKeThoiGianDungMayComponent extends StoreBase implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  filter: any = {};
  listPhanXuong: any = [];
  listCongDoan: any = [];
  item: any = {};
  constructor(public store: StoreService, public _services: SanXuatService, public toastr: ToastrService) {
    super(store)
  }

  ngOnInit(): void {
    let date = new Date();
    this.filter.TuNgayChon = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter.DenNgayChon = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.getListPhanXuong();
    // this.getListCongDoan();
  }
  ngAfterViewInit(): void {
    this.voiPintable.active()
  }
  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any[]) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", "Id");
      this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
      this.getBaoCao()
    })
  }
  getListCongDoan() {
    this._services.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
  }
  getBaoCao() {
    this.filter.TuNgay = DateToUnix(this.filter.TuNgayChon);
    this.filter.DenNgay = DateToUnix(this.filter.DenNgayChon);
    this._services.ThongKeThoiGianDungMay().GetThongKe(this.filter).subscribe(res => {
      this.item = res;
    })
  }
  calculateTong(list: any, index: number) {
    let result = 0
    list.forEach((x: any) => {
      let _this = x.lstSuCoDungMay[index];
      if (_this) {
        result += _this.ThoiGianDungMay;
      }
    })
    return result
  }
}

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
  item: any = {};
  constructor(public store: StoreService, public _services: SanXuatService, public toastr: ToastrService) {
    super(store)
  }

  ngOnInit(): void {
    let date = new Date();
    this.filter.TuNgayChon = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter.DenNgayChon = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.getListPhanXuong();
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
  getBaoCao() {
    this.filter.TuNgay = DateToUnix(this.filter.TuNgayChon);
    this.filter.DenNgay = DateToUnix(this.filter.DenNgayChon);
    this._services.ThongKeThoiGianDungMay().GetThongKe(this.filter).subscribe(res => {
      this.item = res;
    })
  }
  
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-thongkethoigiandungmay',
  templateUrl: './thongkethoigiandungmay.component.html',
  styleUrls: ['./thongkethoigiandungmay.component.css']
})
export class ThongkethoigiandungmayComponent extends StoreBase implements OnInit,AfterViewInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  filter: any = {};
  listPhanXuong: any = [];
  item: any = {};
  constructor(public store: StoreService, public _services: SanXuatService, public toastr: ToastrService) {
    super(store)
  }

  ngOnInit(): void {
    this.filter.NgayChon = new Date();
    this.getListPhanXuong();
  }
  ngAfterViewInit(): void {
      this.voiPintable.active()
  }
  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any[]) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", "Id");
      this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
      this.getPhieuThongKeThoiGianDungMay()
    })
  }
  getPhieuThongKeThoiGianDungMay() {
    this.filter.Ngay = DateToUnix(this.filter.NgayChon);
    this._services.ThongKeThoiGianDungMay().Get(this.filter).subscribe(res => {
      this.item = res;
    })
  }
  setPhieuThongKeThoiGianDungMay() {
    this._services.ThongKeThoiGianDungMay().Set(this.item).subscribe(res => {
      console.log(res)
      this.getPhieuThongKeThoiGianDungMay();
    })
  }
  TinhTong(item){
    item.TongThoiGianDungMay = item.lstSuCoDungMay.reduce((total,ele)=>total+=(ele.ThoiGianDungMay || 0),0)
  }
}

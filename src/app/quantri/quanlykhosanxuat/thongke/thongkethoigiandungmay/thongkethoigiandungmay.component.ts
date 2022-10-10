import { filter } from 'rxjs/operators';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
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
export class ThongkethoigiandungmayComponent extends StoreBase implements OnInit, AfterViewInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective | any;
  filter: any = {CongDoan:null};
  listPhanXuong: any = [];
  listCongDoan: any = [];
  item: any = {};
  listCaSanXuat: any[];
  listCaSanXuatThucTe: any[];
  constructor(public store: StoreService, public _services: SanXuatService, public toastr: ToastrService) {
    super(store)
  }

  ngOnInit(): void {
    this.filter.NgayChon = new Date();
    this.getAllOpt();
    this._services.GetListCongDoan().subscribe((res:any[])=>{
      // console.log('listCongDoan',res);
      this.listCongDoan = mapArrayForDropDown(res,'Ten','Ma');
      this.filter.MaCongDoan = this.listCongDoan[0].value;
    })
  }
  ngAfterViewInit(): void {
    this.voiPintable.active()
  }
  getAllOpt() {
    forkJoin([this._services.GetListdmPhanXuongOpt(),this._services.GetListOptdmCaSanXuat(),this._services.GetListOptdmCaSanXuatThucTe()])
    .subscribe((res: any[]) => {
      console.log(res);
      this.listPhanXuong = mapArrayForDropDown(res[0], "Ten", "Id");
      this.listCaSanXuat = mapArrayForDropDown(res[1],"Ten","Id");
      this.listCaSanXuatThucTe = mapArrayForDropDown(res[2],"Ten","Id");
      this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
      this.filter.IddmCaSanXuat = this.listCaSanXuat[0].value;
      this.filter.IddmCaSanXuatThucTe = this.listCaSanXuatThucTe[0].value;
      this.getPhieuThongKeThoiGianDungMay()
    })
    // this._services.GetListdmPhanXuongOpt().subscribe((res: any[]) => {
    //   this.listPhanXuong = mapArrayForDropDown(res, "Ten", "Id");
    //   this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
    //   this.getPhieuThongKeThoiGianDungMay()
    // })
  }
  
  getPhieuThongKeThoiGianDungMay() {
    this.filter.Ngay = DateToUnix(this.filter.NgayChon);
    this._services.ThongKeThoiGianDungMay().Get(this.filter).subscribe(res => {
      // res.lstMay = res.lstMay.filter(ele=>ele.)
      this.item = res;
      setTimeout(() => {
        document.querySelector('div.pintable-container tbody').scrollTo(0,0)
        this.voiPintable.active();
      }, 1000)
    })
  }
  setPhieuThongKeThoiGianDungMay() {
    this.item.IddmCaSanXuat = this.filter.IddmCaSanXuat;
    this.item.IddmCaSanXuatThucTe = this.filter.IddmCaSanXuatThucTe;
    this._services.ThongKeThoiGianDungMay().Set(this.item).subscribe(res => {
      console.log(res)
      this.getPhieuThongKeThoiGianDungMay();
    })
  }
  TinhTong(item) {
    item.TongThoiGianDungMay = item.lstSuCoDungMay.reduce((total, ele) => total += (ele.ThoiGianDungMay || 0), 0)
  }

}

import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-baocaokehoachkinhdoanh',
  templateUrl: './baocaokehoachkinhdoanh.component.html',
  styleUrls: ['./baocaokehoachkinhdoanh.component.css']
})
export class BaocaokehoachkinhdoanhComponent implements OnInit {

  @Input('TuNgay') TuNgay: any = null;
  @Input('DenNgay') DenNgay: any = null;
  @Input('CongDoan') CongDoan: any = null;
  filter: any = {
    IddmItem: '',
    IddmMay: '',
    IddmPhanXuong: '',
    CongDoan: 'ONG'
  };
  listMay: any = [];
  listCongDoan: any = [];
  listPhanXuong: any = [];
  currentDateString: string = '';

  constructor(
    private _services: SanXuatService, 
    private _toastr: ToastrService, 
    private store: StoreService
  ) { }

  ngOnInit(): void {
    if (validVariable(this.TuNgay) && validVariable(this.DenNgay)) {
      this.filter._tuNgay = this.TuNgay;
      this.filter._denNgay = this.DenNgay;
    } else {
      let date = new Date();
      this.currentDateString = formatDate(date, 'dd_MM_yyyy', 'en-EN');
      console.log(this.currentDateString)
      this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
      this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
    if (validVariable(this.CongDoan)) {
      this.filter.CongDoan = this.CongDoan;
    }
    this.GetBieuDo('ONG');
    this.getAllOptions()
  }

  GetMatHang(reset?: any) {

  }

  GetBieuDo(CongDoan?) {
    if (!!CongDoan) {
      this._services.BaoCao().GetListdmMayTheoCongDoan(this.filter.CongDoan, this.filter.IddmPhanXuong).subscribe((res: any) => {
        // console.log(res);
        this.listMay = mapArrayForDropDown(res, "Ten", 'Id')
        this.listMay.unshift({ label: 'Tất cả máy', value: '' })
        this.filter.IddmMay = this.listMay[0].value;
      })
    }
    if (validVariable(this.CongDoan)) {
      this._services.BaoCao().GetListdmMayTheoCongDoan(this.filter.CongDoan, this.filter.IddmPhanXuong).subscribe((res: any) => {
        this.listMay = mapArrayForDropDown(res, "Ten", 'Id')
        this.listMay.unshift({ label: 'Tất cả máy', value: '' })
      })
    }
  }

  getAllOptions() {
    let data = {
      CurrentPage: 0,
      NumperPage: 10,
      Ma: '',
      Ten: "",
      sFilter: ''
    }
    let data2 = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: this.filter.keyWord ? this.filter.keyWord : '',
      CongDoan: this.filter.CongDoan ? this.filter.CongDoan : '',
      Ma: "",
      Ten: ""
    };
    this._services.GetOptions().GetPhanXuong().subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tất cả phân xưởng' });
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
      this.GetMatHang();
    })
    this._services.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, "Ten", 'Ma')
      if (this.CongDoan !== null) {
        this.filter.CongDoan = this.CongDoan
      } else {
        this.filter.CongDoan = 'ONG';
      }
    });
  }

}

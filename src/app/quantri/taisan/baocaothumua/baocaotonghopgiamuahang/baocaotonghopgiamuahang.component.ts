import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from '../../../../services/callApiSanXuat';
import { TaisanService } from '../../../../services/Taisan/taisan.service';
import { DateToUnix, mapArrayForDropDown } from '../../../../services/globalfunction';
import { AuthenticationService } from '../../../../services/auth.service';
import { host1 } from '../../../../services/host';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-baocaotonghopgiamuahang',
  templateUrl: './baocaotonghopgiamuahang.component.html',
  styleUrls: ['./baocaotonghopgiamuahang.component.css']
})
export class BaocaotonghopgiamuahangComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  @ViewChild('voiPintable') voiPintable: PintableDirective;
  items: any = [];
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  filter: any = {};
  listDuAn: any = [];
  listKho: any = [];
  listNam: any = [];
  listLabel: any = [];
  userInfo: any = {};

  constructor(
    private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private _auth: AuthenticationService
  ) { this.userInfo = this._auth.currentUserValue }

  ngOnInit(): void {
    this.GetDanhSachDuAnByIdUser();
    this.getListNam()
    this.GetList();
  }

  getListNam() {
    for (let i = 1; i <= 12; i++) {
      this.listLabel.push({
        value: i,
        label: `T${i}`
      })
    }
    for (let i = 2020; i <= new Date().getFullYear(); i++) {
      this.listNam.push({
        value: i,
        label: `${i}`
      })
    }
  }

  resetFilter() {
    this.filter = {};
    this.GetList();
  }

  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      Keyword: this.filter.Keyword,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      IdDuAn: this.filter.IdDuAn ? this.filter.IdDuAn : 0,
      IddmKho: this.filter.IddmKho ? this.filter.IddmKho : '',
      IddmNhaCungUng: this.filter.IddmNhaCungUng ? this.filter.IddmNhaCungUng : '',
      Nam: this.filter.Nam ? this.filter.Nam : 2025,
    };
    this._serviceTaiSan.TongHopGiaMuaHang(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }

  GetDanhSachDuAnByIdUser() {
    this._services.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res: any) => {
      this.listDuAn = mapArrayForDropDown(res, 'TenDuAn', 'Id');
    })
  }

  handleDuAn(value) {
    this.filter.IddmKho = null;
    this.GetKho(value);
    this.GetList(true);
  }

  GetKho(value) {
    this._serviceTaiSan.GetlistdmKho(value).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

  export() {
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      Keyword: this.filter.Keyword,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      IdDuAn: this.filter.IdDuAn ? this.filter.IdDuAn : 0,
      IddmKho: this.filter.IddmKho ? this.filter.IddmKho : '',
      IddmNhaCungUng: this.filter.IddmNhaCungUng ? this.filter.IddmNhaCungUng : '',
    };
    this._serviceTaiSan.ExportTongHopGiaMuaHang(data).subscribe((res: any) => {
      if (res.StatusCode === 200) {
        const _url = host1 + res.Data;
        this._toastr.success(res.Message)
        window.open(_url);
      } else this._toastr.error(res.Message)
    })
  }

}
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
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  items: any = [
    {Ma:'Ma000'}
  ];
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  filter: any = {};
  listDuAn: any = [];
  listKho: any = [];
  listNam: any = [];
  listLabel: any = [];
  userInfo: any = {};

  item: any = { listData: [], listHeader: [] };

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
      Nam: this.filter.Nam ? this.filter.Nam : new Date().getFullYear(),
    };
    this._serviceTaiSan.TongHopGiaMuaHang(data).subscribe((res: any) => {
      // this.items = res.Data.Items;
      // this.paging.TotalCount = res.Data.TotalCount;

      this.item.listData = this.mapDeQuy(res.Data.Items.listData, 0)
      this.item.listHeader = res.Data.Items.listHearder.map((ele: any) => {
        return {
          ...ele,
          Header: ele.Header.map((obj: any) => {
            return {
              ...obj,
              DoRong: `${obj.DoRong ? obj.DoRong : 100}px`
            }
          })
        }
      });
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }

  mapDeQuy(lits: any, level: number) {
    let newItem = lits.map((ele: any) => {
      return {
        data: {
          ...ele.data,
          level: level,
          RowData: ele.data.RowData.map((x: any) => {
            return {
              ...x,
              DoRong: `${x.DoRong ? x.DoRong : 100}px`,
            }
          })
        },
        children: ele.children || [],
        expanded: ele.data.expanded,
        showChildren: ele.data.expanded
      }
    })
    newItem.forEach((obj: any) => {
      if (obj.children && obj.children.length) {
        obj.children = this.mapDeQuy(obj.children, level + 1)
      }
    })
    return newItem;
  }

  toggleChildren(parent: any) {
    parent.showChildren = !parent.showChildren;
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
      Nam: this.filter.Nam ? this.filter.Nam : new Date().getFullYear(),
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
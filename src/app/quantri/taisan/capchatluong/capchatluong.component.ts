import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-capchatluong',
  templateUrl: './capchatluong.component.html',
  styleUrls: ['./capchatluong.component.css']
})
export class CapchatluongComponent implements OnInit {
  filter: any = {
    IdDuAn: 0,
    Keyword: ''
  };
  listDuAn: any[] = [];
  items: any[] = [];
  filteredItems: any[] = [];
  userInfo: any = {};
  loading: boolean = false;

  constructor(
    private _serviceTaiSan: TaisanService,
    private _servicesSanXuat: SanXuatService,
    private _toastr: ToastrService,
    private _auth: AuthenticationService,
    private store: StoreService
  ) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.GetDanhSachDuAn();
  }

  GetDanhSachDuAn(): void {
    this._servicesSanXuat.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo?.Id).subscribe(
      (res: any) => {
        const duAns = mapArrayForDropDown(res, 'TenDuAn', 'Id') || [];
        this.listDuAn = [
          { label: 'Tất cả công ty', value: 0 },
          ...duAns
        ];
        const currentDuAn = this.store.getCurrent();
        if (currentDuAn && duAns.some((d: any) => d.value === currentDuAn)) {
          this.filter.IdDuAn = currentDuAn;
        } else {
          this.filter.IdDuAn = 0;
        }
        this.getDataBaoCao();
      },
      (err: any) => {
        this.listDuAn = [{ label: 'Tất cả công ty', value: 0 }];
        this.filter.IdDuAn = 0;
        this.getDataBaoCao();
      }
    );
  }

  getDataBaoCao(): void {
    this.loading = true;
    const payload = {
      IdDuAn: this.filter.IdDuAn || 0
    };

    this._serviceTaiSan.GetBaoCaoPhanCapMay(payload).subscribe(
      (res: any) => {
        this.loading = false;
        let dataList: any[] = [];
        if (res && res.State === 1 && res.Data) {
          dataList = Array.isArray(res.Data) ? res.Data : (res.Data.Items || res.Data.List || []);
        } else if (Array.isArray(res)) {
          dataList = res;
        } else if (res && res.Data) {
          dataList = Array.isArray(res.Data) ? res.Data : (res.Data.Items || res.Data.List || []);
        } else if (res && Array.isArray(res.Items)) {
          dataList = res.Items;
        }

        this.items = dataList || [];
        this.filterTable();
      },
      (err: any) => {
        this.loading = false;
        this.items = [];
        this.filteredItems = [];
      }
    );
  }

  filterTable(): void {
    if (!this.filter.Keyword || !this.filter.Keyword.trim()) {
      this.filteredItems = [...this.items];
      return;
    }
    const kw = this.filter.Keyword.trim().toLowerCase();
    this.filteredItems = this.items.filter((item: any) => {
      const ma = (item.MadmChiTieu || '').toLowerCase();
      const ten = (item.TendmChiTieu || item.LoaiNhanHieu || item.TenLoaiTaiSan || item.Ten || '').toLowerCase();
      const dvt = (item.DonViTinh_SanLuong || item.DonViTinh || item.TenDonViTinh || '').toLowerCase();
      return ma.includes(kw) || ten.includes(kw) || dvt.includes(kw);
    });
  }

  resetFilter(): void {
    this.filter.Keyword = '';
    this.filter.IdDuAn = 0;
    this.getDataBaoCao();
  }

  getCapValue(item: any, level: number): any {
    if (!item) return '';
    const key = `SLKyNay_PhanCapCL_${level}`;
    const val = item[key] ??
                item[`Cap${level}`] ??
                item[`CapChatLuong${level}`] ??
                item[`PhanCap${level}`];
    if (val !== undefined && val !== null) {
      return val;
    }
    return '';
  }

  getTotalCap(level: number): any {
    if (!this.filteredItems || this.filteredItems.length === 0) return '';
    let total = 0;
    let hasNumeric = false;
    for (const item of this.filteredItems) {
      const val = item[`SLKyNay_PhanCapCL_${level}`] ?? this.getCapValue(item, level);
      if (val !== '' && val !== null && val !== undefined && !isNaN(Number(val))) {
        total += Number(val);
        hasNumeric = true;
      }
    }
    return hasNumeric ? total : '';
  }
}

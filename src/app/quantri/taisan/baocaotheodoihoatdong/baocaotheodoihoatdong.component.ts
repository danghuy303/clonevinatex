import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { API } from 'src/app/services/host';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-baocaotheodoihoatdong',
  templateUrl: './baocaotheodoihoatdong.component.html',
  styleUrls: ['./baocaotheodoihoatdong.component.css']
})
export class BaocaotheodoihoatdongComponent implements OnInit, OnDestroy {

  items: any[] = [];
  listBoPhan: any[] = [];
  listTaiSan: any[] = [];
  filter: any = {
    IdBoPhanSuDung: '',
    listIdTaiSan: [],
    TuNgay: null,
    DenNgay: null,
    Keyword: ''
  };
  paging: any = {
    CurrentPage: 1,
    PageSize: 20,
    TotalCount: 0
  };
  loading: boolean = false;
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  private $sub!: Subscription;

  constructor(
    private _serviceTaiSan: TaisanService,
    private store: StoreService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    let now = new Date();
    this.filter.TuNgay = new Date(now.getFullYear(), now.getMonth(), 1);
    this.filter.DenNgay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    this.$sub = this.store.getNhaMay().subscribe((res: any) => {
      if (res) {
        this.initData();
      }
    });

    this.initData();
  }

  ngOnDestroy(): void {
    if (this.$sub) {
      this.$sub.unsubscribe();
    }
  }

  initData(): void {
    this.getBoPhanSuDung();
    this.getListTaiSanDangSuDung();
    this.GetList(true);
  }

  getBoPhanSuDung(): void {
    const idDuAn = this.store.getCurrent();
    this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS(idDuAn).subscribe((res: any) => {
      this.listBoPhan = mapArrayForDropDown(res || [], 'Ten', 'Id');
    }, (err) => {
      console.error(err);
      this.listBoPhan = [];
    });
  }

  getListTaiSanDangSuDung(): void {
    const data: any = {
      IdDuAn: this.store.getCurrent(),
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung || '',
      CurrentPage: 0,
      PageSize: 1000
    };
    this._serviceTaiSan.GetListTaiSanDangSuDung(data).subscribe((res: any) => {
      const rawList = res?.Data || res?.Items || [];
      if (Array.isArray(rawList)) {
        this.listTaiSan = rawList.map((item: any) => {
          const ma = item.Ma || item.MaTaiSan || '';
          const ten = item.Ten || item.TenTaiSan || '';
          const label = ma && ten ? `${ma} - ${ten}` : (ten || ma || 'Không có tên');
          return {
            label: label,
            value: item.IdTaiSan || item.Id,
            ...item
          };
        });
      } else {
        this.listTaiSan = [];
      }
    }, (err) => {
      console.error(err);
      this.listTaiSan = [];
    });
  }

  onChangeBoPhan(): void {
    this.filter.listIdTaiSan = [];
    this.getListTaiSanDangSuDung();
    this.GetList(true);
  }

  getPayload(): any {
    const listId = Array.isArray(this.filter.listIdTaiSan)
      ? this.filter.listIdTaiSan
      : (this.filter.listIdTaiSan ? [this.filter.listIdTaiSan] : []);

    return {
      IdDuAn: this.store.getCurrent(),
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung || '',
      TuNgay: this.filter.TuNgay ? DateToUnix(this.filter.TuNgay) : 0,
      DenNgay: this.filter.DenNgay ? (DateToUnix(this.filter.DenNgay) + 86399) : 0,
      listIdTaiSan: listId,
      IdTaiSan: listId.length === 1 ? listId[0] : '',
      Keyword: this.filter.Keyword || '',
      CurrentPage: this.paging.CurrentPage,
      PageSize: this.paging.PageSize
    };
  }

  GetList(reset?: boolean): void {
    if (reset) {
      this.paging.CurrentPage = 1;
    }
    this.loading = true;
    const payload = this.getPayload();

    this._serviceTaiSan.GetListTheoDoiHoatDongXe_May(payload).subscribe((res: any) => {
      this.loading = false;
      const data = res?.Data || res || {};
      if (Array.isArray(data)) {
        this.items = data;
        this.paging.TotalCount = res?.TotalCount || data.length;
      } else if (Array.isArray(data?.Items)) {
        this.items = data.Items;
        this.paging.TotalCount = data.TotalCount || this.items.length;
      } else {
        this.items = [];
        this.paging.TotalCount = 0;
      }
    }, (err) => {
      this.loading = false;
      console.error(err);
      this.toastr.error('Lỗi khi tải dữ liệu báo cáo');
      this.items = [];
      this.paging.TotalCount = 0;
    });
  }

  exportExcel(): void {
    const payload = this.getPayload();
    this._serviceTaiSan.ExportTheoDoiHoatDongXe_May(payload).subscribe((res: any) => {
      if (res?.StatusCode === 200 || res?.Data) {
        if (res.Message) {
          this.toastr.success(res.Message);
        }
        const fileUrl = res.Data?.startsWith('http')
          ? res.Data
          : `${API.imgURL}${res.Data}`;
        window.open(fileUrl);
      } else {
        this.toastr.error(res?.Message || 'Có lỗi xảy ra khi xuất dữ liệu');
      }
    }, (err) => {
      console.error(err);
      this.toastr.error('Có lỗi xảy ra khi xuất dữ liệu');
    });
  }

  resetFilter(): void {
    let now = new Date();
    this.filter = {
      IdBoPhanSuDung: '',
      listIdTaiSan: [],
      TuNgay: new Date(now.getFullYear(), now.getMonth(), 1),
      DenNgay: new Date(now.getFullYear(), now.getMonth() + 1, 0),
      Keyword: ''
    };
    this.getListTaiSanDangSuDung();
    this.GetList(true);
  }

  changePage(event: any): void {
    this.paging.CurrentPage = event.page + 1;
    this.paging.PageSize = event.rows;
    this.GetList();
  }
}

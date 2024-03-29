import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-dm-kiem-ke-ban-che-pham',
  templateUrl: './dm-kiem-ke-ban-che-pham.component.html',
  styleUrls: ['./dm-kiem-ke-ban-che-pham.component.css']
})
export class DmKiemKeBanChePhamComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  Keyword: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  listHead: any = [];
  filter: any = {};
  listMay: any = [];
  listLoai: any = [];
  listLoaiCha: any = [];

  constructor(
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,) { }

  ngOnInit() {
    this.GetListMayCongDoanKiemKeBanChePhamToHieu();
  }
  GetListMayCongDoanKiemKeBanChePhamToHieu() {
    this._services.KiemKeBanChePham().GetListMayCongDoanKiemKeBanChePhamToHieu().subscribe((res: any) => {
      this.listMay = mapArrayForDropDown(res, 'Ten', 'Ma');
      this.filter.CongDoan = this.listMay[0].value;
      this.GetListLoaiTheoCongDoan(this.filter.CongDoan);
      this.GetList()
    })
  }

  resetFilter() {
    this.filter.Keyword = '';
    this.filter = {};
    this.GetList();
  }

  GetListLoaiTheoCongDoan(value) {
    this._services.GetListLoaiTheoCongDoanKiemKeBanChePhamToHieu(value).subscribe((res: any) => {
      this.listLoai = mapArrayForDropDown(res, 'Ten', 'Loai');
      this.filter.Loai = this.listLoai[0].value;
      this.GetList();
    })
  }

  ChonLoai(value) {
    this.GetList()
  }

  GetList() {
    this._services.GetListdmKiemKeBanChePham(this.filter.CongDoan, this.filter.Loai).subscribe((res: any) => {
      this.listLoaiCha = res.map(ele => {
        return {
          label: `${ele.Ma} - ${ele.Ten}`,
          value:ele.Id
        }
      })
      this.items = res;
    })
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

  save(data) {
    this._services.SetdmKiemKeBanChePham(data).subscribe((res: any) => {
      if (res.State === 1) {
        this._toastr.success(res.message)
      }
      else this._toastr.success(res.message)
    })
  }

}

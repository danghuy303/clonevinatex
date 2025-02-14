import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { UnixToDate, DateToUnix } from '../../../services/globalfunction';
import { DanhsachnhacungcungungmodalComponent } from './danhsachnhacungcungungmodal/danhsachnhacungcungungmodal.component';

@Component({
  selector: 'app-danhsachvattuphaimua',
  templateUrl: './danhsachvattuphaimua.component.html',
  styleUrls: ['./danhsachvattuphaimua.component.css']
})
export class DanhsachvattuphaimuaComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  filter: any = {};
  items: any = [];
  paging: any = {};
  checkedAll: boolean = false;

  constructor(
    private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _modal: NgbModal,
  ) { }

  ngOnInit(): void {
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
      IdDuAn: this.filter.IdDuAn || 0
    };
    this._serviceTaiSan.GetListHangPhaiMua(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
      this.paging.CurrentPage = res.Data.Page;
    })
  }

  resetFilter() {
    this.filter = {};
    this.GetList(true);
  }

  Edit(item) {
    let _payload = {
      IddmItem: item.IddmItem,
      Ngay: item.NgayUnix
    }
    this._serviceTaiSan.GetListChiTietHangPhaiMua(_payload).subscribe((res: any) => {
      let modalRef = this._modal.open(DanhsachnhacungcungungmodalComponent, {
        backdrop: 'static',
        size: 'fullscreen-100',
        keyboard: false
      });
      modalRef.componentInstance.title = 'Danh mục nhà cung cấp';
      modalRef.componentInstance.listData = res.Data;
      modalRef.result.then(res => {
        this.GetList();
      }).catch(er => console.log(er))
        .finally(() => {
        })
    })
  }

  checkAll(e) {
    this.items = this.items.map(ele => {
      return {
        ...ele,
        checked: e.checked
      }
    })
  }

  check() {
    this.checkedAll = this.items.every(ele => ele.checked);
  }

  createPO() {
    let listId = this.items.filter(ele => ele.checked);
    if (listId.length) {
      this._serviceTaiSan.TaoDonHang(listId).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this._toastr.success(res.Message);
        } else this._toastr.error(res.Message);
      })
    } else this._toastr.error('Vui lòng chọn ít nhất một vật tư');
  }

  changePage(event) {
    this.checkedAll = false
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

}

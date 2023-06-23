import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { KiemTraBanChePhamToHieuModalComponent } from '../modal/kiem-tra-ban-che-pham-to-hieu-modal/kiem-tra-ban-che-pham-to-hieu-modal.component';
import { vn } from 'src/app/services/const';
import { BanChePhamToHieuTongHopComponent } from '../modal/ban-che-pham-to-hieu-tong-hop/ban-che-pham-to-hieu-tong-hop.component';

@Component({
  selector: 'app-kiem-tra-ban-che-pham-to-hieu',
  templateUrl: './kiem-tra-ban-che-pham-to-hieu.component.html',
  styleUrls: ['./kiem-tra-ban-che-pham-to-hieu.component.css']
})
export class KiemTraBanChePhamToHieuComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  IdTrangThai: string = "";
  Keyword: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  selectedItems: any = [];
  filter: any = {};
  showDropDown: boolean = false;
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  trangThai: any = 1;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true };
  eAction = "KIEMKEBANCHEPHAMTOHIEU";
  listMay: any = [];
  TabTrangThai: any = 0;
  $sub!: Subscription;
  routeSub!: Subscription;

  constructor(
    private _modal: NgbModal,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute,
    private router: Router,) {
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
        this.ngOnInit();
      }
    })
  }

  ngOnInit() {
    this.GetListMayCongDoanKiemKeBanChePhamToHieu();
    this.GetList();
    if (this.routeSub) {
    } else {
      this.routeSub = this.activatedRoute.params.subscribe((res: any) => {
        if (res.id !== "0") {
          this._services.KiemKeBanChePham()
            .Get(res.id)
            .subscribe((res: any) => {
              this.update(res);
            });
        }
      })
    }

  }
  GetListMayCongDoanKiemKeBanChePhamToHieu() {
    this._services.KiemKeBanChePham().GetListMayCongDoanKiemKeBanChePhamToHieu().subscribe((res: any) => {
      this.listMay = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
  }
  changeParam(id) {
    this.router.navigate([`quantri/quanlykhosanxuat/khobong/kiemtrabanchepham-tohieu/${id}`], {
      replaceUrl: true,
    });
  }
  resetFilter() {
    this.filter.Keyword = '';
    this.filter = {};
    this.GetList(true);
  }

  GetList(reset?: boolean) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      CongDoan: this.filter.CongDoan,
      Thang: this.filter.Nam ? this.filter.Nam.getMonth() + 1 : null,
      Nam: this.filter.Nam ? this.filter.Nam.getFullYear() : null,
      Keyword: this.filter.Keyword,
      IdDuAn: this.store.getCurrent()
    };
    if (this.TabTrangThai === 0) {
      this._services.KiemKeBanChePham().GetList(data).subscribe((res: any) => {
        this.items = res.items;
        this.paging.TotalItem = res.paging.TotalItem;
      })
    }
    else {
      this._services.KiemKeBanChePham().GetListPhieuKiemKeBanChePhamToHieuTongHop(data).subscribe((res: any) => {
        this.items = res.items;
        this.paging.TotalItem = res.paging.TotalItem;
      })
    }
  }

  add() {
    let modalRef = this._modal.open(KiemTraBanChePhamToHieuModalComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard: false
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.title = 'Chọn máy kiểm kê';
    modalRef.componentInstance.isKiemKe = true;
    modalRef.result.then(res => {
    }).catch(er => console.log(er))
      .finally(() => {
        this.GetList(false);
        this.changeParam(0);
      })
  }
  update(item) {
    console.log(item.objectReturn.isDialogBig);
    let modalRef = this._modal.open(KiemTraBanChePhamToHieuModalComponent, {
      size: item.objectReturn.isDialogBig ? "fullscreen-100" : "lg",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.title = 'Kiểm kê kho bán chế phẩm';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item.objectReturn));
    modalRef.result
      .then(res => {

      })
      .catch(er => { })
      .finally(() => {
        this.GetList(false);
        this.changeParam(0);
      });
  }
  ViewTongHop(item) {
    this._services.KiemKeBanChePham()
      .GetPhieuKiemKeBanChePhamToHieuTongHop(item.Id)
      .subscribe((res: any) => {
        let modalRef = this._modal.open(BanChePhamToHieuTongHopComponent, {
          size: "fullscreen",
          backdrop: "static",
          keyboard: false,
        });
        modalRef.componentInstance.opt = "edit";
        modalRef.componentInstance.title = 'Tổng hợp kiểm kê kho bán chế phẩm';
        modalRef.componentInstance.item = res.objectReturn;
        modalRef.result
          .then(data => {
          })
          .catch(er => {
          })
          .finally(() => {
            this.GetList();
            this.changeParam(0);
          });
      });
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList(true)
  }

  changeTab(event) {
    this.TabTrangThai = event.index;
    this.GetList();
  }
  ngOnDestroy(): void {
    console.log('ondestroy');
    this.$sub.unsubscribe();
  }
}

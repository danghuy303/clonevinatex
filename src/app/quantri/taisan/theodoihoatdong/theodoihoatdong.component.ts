import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from '../../../services/callApiSanXuat';
import { StoreService } from '../../../services/store.service';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from '../../../services/globalfunction';
import { TaisanService } from '../../../services/Taisan/taisan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DanhmuctaisanService } from '../../../services/Taisan/danhmuctaisan.service';
import { TheodoihoatmodalComponent } from './theodoihoatmodal/theodoihoatmodal.component';

@Component({
  selector: 'app-theodoihoatdong',
  templateUrl: './theodoihoatdong.component.html',
  styleUrls: ['./theodoihoatdong.component.css']
})
export class TheodoihoatdongComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  IdTrangThai: string = "";
  keyWord: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  selectedItems: any = [];
  filter: any = {};
  showDropDown: boolean = false;
  trangThai: any = 1;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true };
  eAction = "THEODOIHOATDONG";
  listBoPhan: any = [];
  $sub!: Subscription;
  $subRoute!: Subscription;

  constructor(
    private _modal: NgbModal,
    private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _danhMucTaiSan: DanhmuctaisanService
  ) { }

  ngOnInit(): void {
    this.$subRoute = this.activatedRoute.params.subscribe((param: any) => {
      if (param.id && param.id !== "0") {
        this._serviceTaiSan
          .TheoDoiHoatDong()
          .Get(param.id)
          .subscribe((res: any) => {
            if (res && res.StatusCode === 200 && res.Data && typeof res.Data === 'object') {
              this.update(res.Data);
            } else {
              if (res?.Message) {
                this._toastr.error(res.Message);
              }
              const fallbackItem = this.items?.find((x: any) => x.Id === param.id);
              if (fallbackItem) {
                this.update(fallbackItem);
              } else {
                this.changeParam(0);
              }
            }
          });
      }
    });

    this.$sub = this.store.getNhaMay().subscribe((res: any) => {
      if (res) {
        this.initData();
      }
    })
    this.initData();

  }

  initData() {
    this.GetList();
    this.getListPhanXuong();
    this.KiemTraTabTrangThai();
  }

  ngOnDestroy(): void {
    if (this.$sub) {
      this.$sub.unsubscribe();
    }
    if (this.$subRoute) {
      this.$subRoute.unsubscribe();
    }
  }

  resetFilter() {
    this.filter = {};
    this.GetList(true);
  }
  GetList(reset?: any) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      Keyword: this.filter.Keyword,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      IddmPhanXuong: this.filter.IddmPhanXuong || '',
    };
    this._serviceTaiSan.TheoDoiHoatDong().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }

  changeParam(id: any) {
    this.router.navigate([`quantri/taisan/theodoihoatdong/${id}`], {
      replaceUrl: true,
    });
  }
  add() {
    let modalRef = this._modal.open(TheodoihoatmodalComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard: false
    });
    modalRef.componentInstance.type = 'themmoi';
    // modalRef.componentInstance.title = 'Thêm mới theo dõi hoạt động';
    modalRef.componentInstance.title = 'Thêm mới theo dõi khối lượng hoạt động';
    modalRef.componentInstance.listBoPhan = this.listBoPhan;
    modalRef.componentInstance.eAction = this.eAction;
    modalRef.result.then((res: any) => {
    }).catch((er: any) => console.log(er))
      .finally(() => {
        this.GetList()
        this.changeParam(0);
      })
  }
  update(item: any) {
    const safeItem = (item && typeof item === 'object') ? JSON.parse(JSON.stringify(item)) : { listTaiSan: [] };
    if (!Array.isArray(safeItem.listTaiSan)) {
      safeItem.listTaiSan = [];
    }
    let modalRef = this._modal.open(TheodoihoatmodalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.eAction = this.eAction;
    modalRef.componentInstance.type = 'capnhat';
    // modalRef.componentInstance.title = 'Cập nhật theo dõi hoạt động';
    modalRef.componentInstance.title = 'Cập nhật theo dõi khối lượng hoạt động';
    modalRef.componentInstance.listBoPhan = this.listBoPhan;
    modalRef.componentInstance.quyTrinh = safeItem;
    modalRef.result
      .then((data: any) => {
      })
      .catch((er: any) => {
      })
      .finally(() => {
        this.GetList();
        this.changeParam(0);
      });
  }
  changeTab(e: any) {
    this.trangThai = e.index + 1;
    this.GetList(true);
  }
  KiemTraTabTrangThai() {
    this._services.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetList();
    });
  }
  changePage(event: any) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

  getListPhanXuong() {
    this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS().subscribe((res: any) => {
      this.listBoPhan = mapArrayForDropDown(res, "Ten", "Id");
    })
  }

}
import { Component, OnInit, ViewChild } from '@angular/core';
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
export class TheodoihoatdongComponent implements OnInit {

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

  constructor(
    private _modal: NgbModal,
    private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _danhMucTaiSan: DanhmuctaisanService
  ) {
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
        this.ngOnInit()
      }
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._serviceTaiSan
          .TheoDoiHoatDong()
          .Get(res.id)
          .subscribe((res: any) => {
            this.update(res.Data);
          });
      }
    });
    this.GetList();
    this.getListPhanXuong();
    this.KiemTraTabTrangThai();
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
    modalRef.componentInstance.title = 'Thêm mới theo dõi hoạt động';
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
    let modalRef = this._modal.open(TheodoihoatmodalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.eAction = this.eAction;
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật theo dõi hoạt động';
    modalRef.componentInstance.listBoPhan = this.listBoPhan;
    modalRef.componentInstance.quyTrinh = JSON.parse(JSON.stringify(item));
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
    this._services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listBoPhan = mapArrayForDropDown(res, "Ten", "Id");
    })
  }

}
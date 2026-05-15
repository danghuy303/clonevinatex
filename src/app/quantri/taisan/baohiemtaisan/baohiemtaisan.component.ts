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
import { BaohiemtaisanmodalComponent } from './baohiemtaisanmodal/baohiemtaisanmodal.component';

@Component({
  selector: 'app-baohiemtaisan',
  templateUrl: './baohiemtaisan.component.html',
  styleUrls: ['./baohiemtaisan.component.css']
})
export class BaohiemtaisanComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  IdTrangThai: string = "";
  keyWord: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  selectedItems: any = [];
  filter: any = { IdDonViBaoHiem: '' };
  showDropDown: boolean = false;
  trangThai: any = 1;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true };
  eAction = "BAOHIEMTAISAN";
  listLoaiHinhBaoHiem: any = [];
  listDonViBaoHiem: any = [];
  $sub!: Subscription;
  $subRoute!: Subscription;
  listBoPhan: any = [];

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
    this.$subRoute = this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._serviceTaiSan
          .BaoHiemTaiSan()
          .Get(res.id)
          .subscribe((res: any) => {
            this.update(res.Data);
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
    this.getListDonViBaoHiem();
    this.getListLoaiHinhBaoHiem();
    this.KiemTraTabTrangThai();
    this.getListPhanXuong();
  }

  ngOnDestroy(): void {
    if (this.$sub) {
      this.$sub.unsubscribe();
    }
    if (this.$subRoute) {
      this.$subRoute.unsubscribe();
    }
  }

  getListPhanXuong() {
    this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS().subscribe((res: any) => {
      this.listBoPhan = mapArrayForDropDown(res, "Ten", "Id");
    })
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
      IdDonViBaoHiem: this.filter.IdDonViBaoHiem ? this.filter.IdDonViBaoHiem : '',
    };
    this._serviceTaiSan.BaoHiemTaiSan().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }

  changeParam(id: any) {
    this.router.navigate([`quantri/taisan/baohiemtaisan/${id}`], {
      replaceUrl: true,
    });
  }
  add() {
    let modalRef = this._modal.open(BaohiemtaisanmodalComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard: false
    });
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới bảo hiểm máy/thiết bị';
    modalRef.componentInstance.listDonViBaoHiem = this.listDonViBaoHiem;
    modalRef.componentInstance.listLoaiHinhBaoHiem = this.listLoaiHinhBaoHiem;
    modalRef.componentInstance.eAction = this.eAction;
    modalRef.componentInstance.listBoPhan = this.listBoPhan;
    modalRef.result.then((res: any) => {
    }).catch((er: any) => console.log(er))
      .finally(() => {
        this.GetList()
        this.changeParam(0);
      })
  }
  update(item: any) {
    let modalRef = this._modal.open(BaohiemtaisanmodalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.eAction = this.eAction;
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật bảo hiểm máy/thiết bị';
    modalRef.componentInstance.listDonViBaoHiem = this.listDonViBaoHiem;
    modalRef.componentInstance.listLoaiHinhBaoHiem = this.listLoaiHinhBaoHiem;
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

  getListLoaiHinhBaoHiem() {
    this._danhMucTaiSan.LoaiHinhBaoHiem().GetList({ CurrentPage: 0 }).subscribe((res: any) => {
      this.listLoaiHinhBaoHiem = mapArrayForDropDown(res.Data, 'Ten', 'Id')
    })
  }
  getListDonViBaoHiem() {
    this._danhMucTaiSan.DonViBaoHiem().GetList({ CurrentPage: 0 }).subscribe((res: any) => {
      this.listDonViBaoHiem = mapArrayForDropDown(res.Data, 'Ten', 'Id')
    })
  }
}

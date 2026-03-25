import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KiemDinhTaiSanModalComponent } from './kiem-dinh-tai-san-modal/kiem-dinh-tai-san-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kiem-dinh-tai-san',
  templateUrl: './kiem-dinh-tai-san.component.html',
  styleUrls: ['./kiem-dinh-tai-san.component.css']
})
export class KiemDinhTaiSanComponent implements OnInit, OnDestroy {

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
  eAction = "QUYTRINHKIEMDINH";
  listKiemDinh: any = [];
  $sub!: Subscription;
  $subRoute!: Subscription;
  listBoPhan: any = [];


  constructor(private _modal: NgbModal, private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute, private router: Router,
  ) { }

  ngOnInit(): void {
    this.$subRoute = this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._serviceTaiSan
          .KiemDinhTaiSan()
          .Get(res.id)
          .subscribe((res: any) => {
            this.update(res);
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
    this.KiemTraTabTrangThai();
    this.GetListdm();
    this.getListPhanXuong();
  }

  getListPhanXuong() {
    this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS().subscribe((res: any) => {
      this.listBoPhan = mapArrayForDropDown(res, "Ten", "Id");
    })
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
  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      IdDonViKiemDinh: this.filter.IdDonViKiemDinh,
      Keyword: this.filter.Keyword,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
    };
    this._serviceTaiSan.KiemDinhTaiSan().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  GetListdm() {
    let data = {
      CurrentPage: 0,
      PageSize: 0,
      IddmTinhTrangNhaCungUng: '',
    }
    this._services.GetALLdmNhaCungUngHienHang(data).subscribe((res: any) => {
      this.listKiemDinh = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  changeParam(id) {
    this.router.navigate([`quantri/taisan/kiem-dinh-tai-san/${id}`], {
      replaceUrl: true,
    });
  }
  add() {
    let modalRef = this._modal.open(KiemDinhTaiSanModalComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard: false
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = ' Kiểm định tài sản';
    modalRef.componentInstance.listKiemDinh = this.listKiemDinh;
    modalRef.componentInstance.listBoPhan = this.listBoPhan;
    modalRef.componentInstance.item = {
      Id: '', IdTaiSan: "", IdTrangThai: '', SoQuyTrinh: "", TenTrangThai: "", TendmPhanXuong: "",
      isKetThuc: false, listFileDinhKem: [], listTaiSan: [],
    };
    modalRef.result.then(res => {
    }).catch(er => console.log(er))
      .finally(() => {
        this.GetList()
        this.changeParam(0);
      })
  }
  update(item) {
    let modalRef = this._modal.open(KiemDinhTaiSanModalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật kiểm định tài sản';
    modalRef.componentInstance.listKiemDinh = this.listKiemDinh;
    modalRef.componentInstance.listBoPhan = this.listBoPhan;
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item.Data));
    modalRef.result
      .then(data => {
      })
      .catch(er => {
      })
      .finally(() => {
        this.GetList();
        this.changeParam(0);
      });
  }
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetList(true);
  }
  KiemTraTabTrangThai() {
    this._services.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetList();
    });
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }
}

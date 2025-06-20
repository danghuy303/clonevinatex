import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { KiemkekhomuimodalComponent } from './kiemkekhomuimodal/kiemkekhomuimodal.component';
import { StoreBase } from 'src/app/services/storebase.class';

@Component({
  selector: 'app-kiemkekhomui',
  templateUrl: './kiemkekhomui.component.html',
  styleUrls: ['./kiemkekhomui.component.css']
})
export class KiemkekhomuiComponent extends StoreBase implements OnInit, OnDestroy {
  @ViewChild("paginator") paginator: any;
  items: any = [];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: "Tên kho",
      field: "TendmKho",
      width: "200px",
    },
    {
      header: "Nội dung",
      field: "NoiDung",
      width: "200px",
    },
    {
      header: "Ghi chú",
      field: "GhiChu",
      width: "200px",
    },
    {
      header: "Trạng thái",
      field: "TenTrangThai",
      width: "150px",
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  eAction = 'PHIEUKIEMKEVATTUPHU'
  link: any = {};
  listRouter: any = [
    { value: 'khotho', lable: 'thô', Loai: 204, api: () => this._service.PhieuKiemKeSoiTho() },
    { value: 'khocui', lable: 'cũi', Loai: 205, api: () => this._service.PhieuKiemKeSoiCui() },
  ]


  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _service: SanXuatService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public store: StoreService
  ) { super(store) }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      const fullPath = window.location.hash || window.location.pathname;
      const segments = fullPath.split('/');
      let _hash = segments[segments.length - 3];
      this.link = this.listRouter.find(ele => ele.value == _hash);
      if (res.id !== "0") {
        this.update(res.id);
      }
    });
    this.GetListQuyTrinh();
    this.KiemTraTabTrangThai();
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll();
    }
    this.router.navigate(
      [`/quantri/hopdongsanxuat/${this.link}/kiemkekho/${id}`],
      { replaceUrl: true }
    );
  }
  add() {
    let modalRef = this._modal.open(KiemkekhomuimodalComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.link = this.link;
    modalRef.componentInstance.item = {};
    modalRef.result
      .then((res: any) => {
        this.changeParam(0);
        this.GetListQuyTrinh();
      })
      .catch((er) => {
        this.GetListQuyTrinh();
        console.log(er);
        this.changeParam(0);

      });
  }
  update(Id) {
    let modalRef = this._modal.open(KiemkekhomuimodalComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.link = this.link;
    modalRef.componentInstance.Id = JSON.parse(JSON.stringify(Id));
    modalRef.result
      .then((res: any) => {
        console.log(res);
        this.changeParam(0);
        this.GetListQuyTrinh();
      })
      .catch((er) => {
        this.GetListQuyTrinh();
        console.log(er);
        this.changeParam(0);

      });
  }
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data: any = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
    };
    this.link.api().GetList(data)
      .subscribe((res: any) => {
        this.items = res.items;
        this.paging = res.paging;
      });
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    this._service.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
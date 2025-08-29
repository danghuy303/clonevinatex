import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NhapkhomuimodalComponent } from './nhapkhomuimodal/nhapkhomuimodal.component';
import { StoreBase } from 'src/app/services/storebase.class';
import { StoreService } from 'src/app/services/store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-nhapkhomui',
  templateUrl: './nhapkhomui.component.html',
  styleUrls: ['./nhapkhomui.component.css']
})
export class NhapkhomuiComponent extends StoreBase implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: any;
  title: any = "";
  items: any = [];
  filter: any = {};
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  eAction: any = "";
  listKho: any = [];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  link: any = {};
  listRouter: any = [
    { value: 'khotho', lable: 'thô', Loai: 204, eAction: 'PHIEUNHAPSOITHO', api: () => this._service.PhieuNhapSoiTho() },
    { value: 'khocui', lable: 'cuộn cúi', Loai: 205, eAction: 'PHIEUNHAPCUONCUI', api: () => this._service.PhieuNhapSoiCui() },
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
      if (res.id !== '0') {
        this.link.api().Get(res.id).subscribe((res1: any) => {
          this.update(res1);
        })
      }
      this.getListKho();
    })
    this.KiemTraTabTrangThai();
  }

  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/hopdongsanxuat/${this.link.value}/nhapkho/${id}`], { replaceUrl: true })
  }

  getListKho() {
    this._service.GetListdmKho({ Loai: this.link.Loai }).subscribe((res: any) => {
      this.filter.IddmKho = undefined;
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
      this.GetListQuyTrinh();
    })
  }
  addPhieu() {
    this.changeParam(0);
    let modalRef = this._modal.open(NhapkhomuimodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {};
    modalRef.componentInstance.link = this.link;
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
      this.changeParam(0);

    })
      .catch(er => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
  }

  update(data) {
    let modalRef = this._modal.open(NhapkhomuimodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.link = this.link;
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(data));
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
      this.changeParam(0);
    })
      .catch(er => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
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
      // this.paginator.changePage(0);
    }
    let data: any = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      IddmKho: validVariable(this.filter.IddmKho) ? this.filter.IddmKho : '',
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
    }
    this.link.api().GetList(data).subscribe((res: any) => {
      this.items = res.items.map(ele => {
        return {
          ...ele,
          KhoNhap: this.listKho.find(alo => alo.value === ele.IddmKho)?.label
        }
      });
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    this._service.KiemTraTabTrangThai(this.link.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
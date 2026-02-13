import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from '../../../../services/callApiSanXuat';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../../services/store.service';
import { DieuchuyenkhobongmodalComponent } from './dieuchuyenkhobongmodal/dieuchuyenkhobongmodal.component';
import { DateToUnix, mapArrayForDropDown } from '../../../../services/globalfunction';

@Component({
  selector: 'app-dieuchuyenkhobong',
  templateUrl: './dieuchuyenkhobong.component.html',
  styleUrls: ['./dieuchuyenkhobong.component.css']
})
export class DieuchuyenkhobongComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  listDanhSach: any = [];
  filter: any = {};
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  eAction = 'PHIEUDIEUCHUYENBONG';
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listKhoXuat: any = [];
  listKhoNhan: any = [];
  loai: number = 2;


  constructor(
    public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService,
    private activatedRoute: ActivatedRoute, private router: Router, public store: StoreService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== '0' && res.id !== undefined) {
        this.update(res.id);
      }
    })
    this.getOptions();
    this.KiemTraTabTrangThai();
  }
  getOptions() {
    let data = {
      CurrentPage: 0,
      Loai: this.loai,
      IdDuAn: this.store.getCurrent()
    };
    this._service.GetListdmKhoXuat(data).subscribe((res: any) => {
      this.listKhoXuat = mapArrayForDropDown(res, 'Ten', 'Id');
    })

  }
  changeParam(id: any) {
    this.router.navigate([`quantri/quanlykhosanxuat/khobong/dieuchuyenkhobong/${id}`], { replaceUrl: true })
  }
  add() {
    this.changeParam(0);
    let modalRef = this._modal.open(DieuchuyenkhobongmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.eAction = this.eAction;
    modalRef.componentInstance.loai = this.loai;
    modalRef.componentInstance.listKhoXuat = this.listKhoXuat;
    modalRef.componentInstance.listKhoNhan = this.listKhoXuat;
    modalRef.result.then((res: any) => {
      this.getData();
      this.changeParam(0);

    })
      .catch(er => {
        console.log(er)
        this.getData();
        this.changeParam(0);
      })
  }
  update(item: any) {
    let modalRef = this._modal.open(DieuchuyenkhobongmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.eAction = this.eAction;
    modalRef.componentInstance.loai = this.loai;
    modalRef.componentInstance.listKhoXuat = this.listKhoXuat;
    modalRef.componentInstance.listKhoNhan = this.listKhoXuat;
    modalRef.componentInstance.quyTrinh = JSON.parse(JSON.stringify({ Id: item }));
    modalRef.result.then((res: any) => {
      this.getData();
      this.changeParam(0);
    })
      .catch(er => {
        this.getData();
        this.changeParam(0);
      })
  }
  changeTab(e: any) {
    this.trangThai = e.index + 1;
    this.getData(true);
  }
  changePage(event: any) {
    this.paging.CurrentPage = event.page + 1;
    this.getData();
  }
  getData(reset?: any) {
    if (reset) {
      this.paging.CurrentPage = 1;
      // this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay)
    }
    this._service.PhieuDieuChuyenBongXo().GetList(data).subscribe((res: any) => {
      this.listDanhSach = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    this.getData(true);
  }
  KiemTraTabTrangThai() {
    this._service.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.getData();
    })
  }

  ngOnDestroy() {
  }
}
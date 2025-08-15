import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from '../../../../services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from '../../../../services/globalfunction';
import { StoreService } from '../../../../services/store.service';
import { StoreBase } from '../../../../services/storebase.class';
import { XuatkhohoiammodalComponent } from '../xuatkhohoiammodal/xuatkhohoiammodal.component';
import { XuatkhocapdaumodalComponent } from './xuatkhocapdaumodal/xuatkhocapdaumodal.component';

@Component({
  selector: 'app-xuatkhocapdau',
  templateUrl: './xuatkhocapdau.component.html',
  styleUrls: ['./xuatkhocapdau.component.css']
})
export class XuatkhocapdauComponent extends StoreBase implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  eAction: any = "PHIEUXUATHOIAMCAPDAU";
  cols: any = [
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset'
    },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: 'unset'
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listdmKho: any = [];
  constructor(public _modal: NgbModal, public _toastr: ToastrService,
    private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router, public store: StoreService) { super(store) }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== '0') {
        this._service.PhieuXuatHoiAmCapDau().Get(res.id).subscribe((res1: any) => {
          this.update(res1);
        })
      }
      let data = {
        CurrentPage: 0,
        Loai: 10
      };
      this._service.GetListdmKho(data).subscribe((res: any) => {
        this.listdmKho = mapArrayForDropDown(res, 'Ten', 'Id');
      })
      this.GetListQuyTrinh();
      this.KiemTraTabTrangThai();
    })
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlysanxuat/khocapdau/xuatkho/${id}`], { replaceUrl: true })
  }

  update(data) {
    let modalRef = this._modal.open(XuatkhocapdaumodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.nametype = 'kho cấp đậu';
    modalRef.componentInstance.listKhoHoiAm = this.listdmKho;
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

  add() {
    let modalRef = this._modal.open(XuatkhocapdaumodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.nametype = 'kho cấp đậu';
    modalRef.componentInstance.listKhoHoiAm = this.listdmKho;
    modalRef.componentInstance.item = JSON.parse(JSON.stringify({}));
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
      this.changeParam(0);
    })
      .catch(er => {
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
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
      IddmKho: this.filter.IddmKho || '',
    }
    this._service.PhieuXuatHoiAmCapDau().GetList(data).subscribe((res: any) => {
      if (res.items) {
        this.items = res.items;
        this.paging = res.paging;
      }
    })
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


import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, DateToUnix, validVariable, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { Cnnamdinhpx1Component } from '../layoutmodals/cnnamdinhpx1/cnnamdinhpx1.component';
import { Dongvanpx1Component } from '../layoutmodals/dongvanpx1/dongvanpx1.component';
import { Dongvanpx2Component } from '../layoutmodals/dongvanpx2/dongvanpx2.component';
import { HoaxaComponent } from '../layoutmodals/hoaxa/hoaxa.component';
import { Hungyenpx1Component } from '../layoutmodals/hungyenpx1/hungyenpx1.component';
import { Phuhung1Component } from '../layoutmodals/phuhung1/phuhung1.component';
import { Phuhung2Component } from '../layoutmodals/phuhung2/phuhung2.component';
import { DetmayhueComponent } from '../layoutmodals/detmayhue/detmayhue.component';
import { PhucuongComponent } from '../layoutmodals/phucuong/phucuong.component';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-xepbanbong',
  templateUrl: './xepbanbong.component.html',
  styleUrls: ['./xepbanbong.component.css']
})
export class XepbanbongComponent implements OnInit, AfterViewInit, OnDestroy {
  $sub!: Subscription;
  paramsSubscription!: Subscription;
  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    // {
    //   header: 'Kế hoạch giao(Tấn)',
    //   field: '',
    //   width: 'unset'
    // },
    // {
    //   header: 'Kế hoạch thực hiện',
    //   field: 'NoiDung',
    //   width: 'unset'
    // },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: 'unset'
    },
  ];
  defineComponent: any = {
    '53': {
      '1cf3f340_0f55_4f34_938p_e329318e25et': Dongvanpx1Component,
      '1cf3f340_0f55_4f34_938p_e629318e25et': Dongvanpx2Component
    },
    '55': {
      '1cf3f340_0f55_4f34_938p_e329318e25et': HoaxaComponent,
    },
    '56': {
      '1cf3f340_0f55_4f34_938p_e629318e25et': HoaxaComponent
    },
    '57': {
      '1cf3f340_0f55_4f34_938p_e329318e25et': Phuhung1Component,
      '1cf3f340_0f55_4f34_938p_e629318e25et': Phuhung2Component
    },
    '60': {
      '1cf3f340_0f55_4f34_938p_e329318e25et': Hungyenpx1Component,
      '320d695b_2f56_42a7_a68d_14077f85fb93': Hungyenpx1Component
    },
    '61': {
      '1cf3f340_0f55_4f34_938p_e329318e25et': Hungyenpx1Component,
      '320d695b_2f56_42a7_a68d_14077f85fb93': Hungyenpx1Component
    },
    '65': {
      '1cf3f340_0f55_4f34_938p_e329318e25et': Cnnamdinhpx1Component,
      '1cf3f340_0f55_4f34_938p_e629318e25et': Cnnamdinhpx1Component
    },
    '66': {
      '6336eafc_bc2c_4c6e_b3ec_58d5ee127aef': DetmayhueComponent
    },
    '68': {
      '1cf3f340_0f55_4f34_938p_e329318e25et': PhucuongComponent
    },
    '69': {
      'e277d4ee-c938-47c1-8341-7f89b21da167': PhucuongComponent
    },
  }
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listdmPhanXuong: any = [];
  constructor(
    public _modal: NgbModal,
    // store: StoreService,
    public _toastr: ToastrService,
    private _service: SanXuatService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private _store: StoreService) {
    // super(store)
    this.$sub = this._store.getNhaMay().subscribe(res => {
      if (res) {
        this.ngOnInit()
      }
    })
  }

  ngOnInit(): void {
    if (!this.paramsSubscription) {
      this.paramsSubscription = this.activatedRoute.params.subscribe((res: any) => {
        if (res.id !== '0') {
          this._service.XepBanBong().Get(res.id).subscribe((res: any) => {
            console.log('res', res);

            this.update(res);
          })
        }
      })
    }

    this._service.GetListdmPhanXuong({}).subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmPhanXuong = this.listdmPhanXuong[0].value;
      this.KiemTraTabTrangThai();
    })
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  changeParam(id) {
    this.router.navigate([`quantri/trienkhaisanxuat/xepbanbong/${id}`], { replaceUrl: true })
  }
  update(item) {
    // const key = item.IddmPhanXuong.split('-').join('_');
  
    let id = item.IddmPhanXuong.replace(/-/g, '_');
    let component = this.defineComponent[`${this._store.getCurrent()}`]?.[id];

    item.PhuongAnPhaBong = undefined;
    if (!validVariable(item.ViTriNgoaiQuan)) {
      item.ViTriNgoaiQuan = ''
    }
    let modalRef = this._modal.open(component, {
      size: 'fullscreen-100',
      backdrop: 'static',
      keyboard: false
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = deepCopy(item);
    modalRef.componentInstance.SoViTriNgoaiQuan = item.SoViTriNgoaiQuan;
    modalRef.componentInstance.ViTriNgoaiQuan = item.ViTriNgoaiQuan;
    // modalRef.componentInstance.ghostItem = deepCopy(item);
    modalRef.result.then((res: any) => {
      this._toastr.success('Cập nhật thành công');
      this.GetListQuyTrinh();
      this.changeParam(0);
    })
      .catch(er => {
      })
      .finally(() => {
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
      IddmPhanXuong: this.filter.IddmPhanXuong || "",
    }
    this._service.XepBanBong().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    this._service.KiemTraTabTrangThai('PHUONGANXEPBANBONG').subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }
  ngOnDestroy() {
    // super.ngOnDestroy();
    this.paramsSubscription.unsubscribe();
  }
}

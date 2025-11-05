import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from '../../../../services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from '../../../../services/globalfunction';
import { StoreService } from '../../../../services/store.service';
import { StoreBase } from '../../../../services/storebase.class';
import { ThongkechitieuclasimattheomaymodalComponent } from './thongkechitieuclasimattheomaymodal/thongkechitieuclasimattheomaymodal.component';

@Component({
  selector: 'app-thongkechitieuclasimattheomay',
  templateUrl: './thongkechitieuclasimattheomay.component.html',
  styleUrls: ['./thongkechitieuclasimattheomay.component.css']
})
export class ThongkechitieuclasimattheomayComponent extends StoreBase implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PKK_0000_0000' }];
  filter: any = {};
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Tên phân xưởng',
      field: 'TendmPhanXuong',
      width: '200px'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset'
    },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: '200px'
    }
  ];
  listPhanXuong:any=[];
  isCheckModal: any = false;
  eAction = 'KIEMTRACHATLUONGCLASIMATTHEOMAY'
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  constructor(public _modal: NgbModal, public store: StoreService, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router) { super(store) }

  ngOnInit(): void {
    this.KiemTraTabTrangThai();
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== '0') {
        this.update(res.id);
      }
    })
    this._service.GetListdmPhanXuongOpt().subscribe((res:any)=>{
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", "Id");
    })
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`/quantri/theodoithongkebaocaosanxuat/thongkechitieuclassimattheomay/${id}`], { replaceUrl: true })
  }
  add() {
    this.changeParam(0);
    let modalRef = this._modal.open(ThongkechitieuclasimattheomaymodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {};
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
      this.changeParam(0);

    })
      .catch(er => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
  }
  update(Id) {
    this._service.QuyTrinhClassimatTheoMay().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(ThongkechitieuclasimattheomaymodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
      modalRef.result.then((res: any) => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
        .catch(er => {
          console.log(er)
          this.changeParam(0);
        })
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
      IddmPhanXuong:this.filter.IddmPhanXuong,
      Ma: "",
      Ten: "",
    }
    this._service.QuyTrinhClassimatTheoMay().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
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
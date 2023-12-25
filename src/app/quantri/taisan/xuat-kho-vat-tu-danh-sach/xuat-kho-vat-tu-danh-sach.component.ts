import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, formatdate, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { XuatKhoVatTuComponent } from '../modal/xuat-kho-vat-tu/xuat-kho-vat-tu.component';

@Component({
  selector: 'app-xuat-kho-vat-tu-danh-sach',
  templateUrl: './xuat-kho-vat-tu-danh-sach.component.html',
  styleUrls: ['./xuat-kho-vat-tu-danh-sach.component.css']
})
export class XuatKhoVatTuDanhSachComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  listKho: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  cols: any = [
    {
      header: 'Số phiếu',
      field: 'SoQuyTrinh',
      width: 'unset'
    },
    {
      header: 'Ngày',
      field: '_Ngay',
      width: 'unset'
    },
    {
      header: 'Nội dung',
      field: 'NoiDung',
      width: 'unset'
    },
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
  eAction = 'QUYTRINHXUATKHO';
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };

  constructor(public _modal: NgbModal,
    public _toastr: ToastrService,
    private _service: SanXuatService,
    private _taisan: TaisanService,
    private activatedRoute: ActivatedRoute, private router: Router, public store: StoreService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== '0') {
        this.update(res.id);
      }
    })
    this.KiemTraTabTrangThai();
    this.GetListQuyTrinh()
  }
  changeParam(id) {
    this.router.navigate([`quantri/taisan/xuat-kho/${id}`], { replaceUrl: true })
  }

  add() {
    this.changeParam(0);
    let modalRef = this._modal.open(XuatKhoVatTuComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
      this.changeParam(0);
    })
      .catch(er => {
        console.log(er)
        this.GetListQuyTrinh();

        this.changeParam(0);
      })
  }
  update(Id) {
    this._taisan.QuyTrinhXuatKho().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatKhoVatTuComponent, {
        size: 'fullscreen-100',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1.Data));
      modalRef.result.then((res: any) => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
        .catch(er => {
          console.log(er)
          this.GetListQuyTrinh();
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
      Keyword: this.filter.KeyWord,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.TuNgay),
    }
    this._taisan.QuyTrinhXuatKho().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.CurrentPage = res.Data.Page;
      this.paging.TotalItem = res.Data.TotalCount;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    //
    this._service.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetListQuyTrinh();
    })
  }

}

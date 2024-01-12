import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { NhapKhoGiaCongModalComponent } from './nhap-kho-gia-cong-modal/nhap-kho-gia-cong-modal.component';

@Component({
  selector: 'app-nhap-kho-gia-cong',
  templateUrl: './nhap-kho-gia-cong.component.html',
  styleUrls: ['./nhap-kho-gia-cong.component.css']
})
export class NhapKhoGiaCongComponent extends StoreBase implements OnInit,OnDestroy {

  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  eAction: any = "NHAPGIACONG";
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
    private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router,public store:StoreService) {
      super(store)
     }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      if(res.id!=='0'){
        this.update(res.id);
      }
      let data = {
        CurrentPage: 0,
        Loai: 203
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
    this.router.navigate([`quantri/quanlysanxuatkhogiacong/khogiacong/nhapkho/${id}`], { replaceUrl: true })
  }
  addPhieuBong() {
    this.changeParam(0);
    let modalRef = this._modal.open(NhapKhoGiaCongModalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'bong';
    modalRef.componentInstance.nametype = 'kho gia công';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
      this.changeParam(0);

    })
      .catch(er => { console.log(er)
        this.GetListQuyTrinh();
        this.changeParam(0);
       })
  }
  update(Id) {
    this._service.PhieuNhapGiaCong().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(NhapKhoGiaCongModalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.nametype = 'kho gia công';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
      modalRef.result.then((res: any) => {
        this.GetListQuyTrinh();
        this.changeParam(0);
      })
        .catch(er => { console.log(er)
          this.GetListQuyTrinh();
          this.changeParam(0);
        })
    })
  }
  changeTab(e) {
    this.trangThai = e.index+1;
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?) {
    if(this.validateFilter2()){
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
      IddmKhoThanhPham: this.filter.IddmKho,
    }
      this._service.PhieuNhapGiaCong().GetList(data).subscribe((res: any) => {
        this.items = res.items;
        this.paging = res.paging;
      })
    }
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    this._service.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
      this.checkQuyen = res;
    })
  }
  validateFilter2() {
    if (validVariable(this.filter.TuNgay) && validVariable(this.filter.DenNgay) && DateToUnix(this.filter.DenNgay) > DateToUnix(this.filter.TuNgay)) {
      return true
    }else if(!validVariable(this.filter.TuNgay) || !validVariable(this.filter.DenNgay)){
      return true
    }
    this._toastr.error('Vui lòng nhập khoảng thời gian hợp lệ!')
    return false
  }
  validateFilter() {
    if (!validVariable(this.filter.TuNgay) || !validVariable(this.filter.DenNgay) || DateToUnix(this.filter.DenNgay) < DateToUnix(this.filter.TuNgay)) {
      this._toastr.error('Vui lòng nhập khoảng thời gian hợp lệ!')
      return false
    }
    return true
  }
  exportExcel() {
    if (this.validateFilter()) {
      let data = {
        TuNgayUnix:DateToUnix(this.filter.TuNgay),
        DenNgayUnix:DateToUnix(this.filter.DenNgay),
        IddmKho:this.filter.IddmKho,
      }
      this._service.PhieuNhapGiaCong().ExportBangKeNhapKhoGiaCong(data).subscribe((res: any) => {
        this._service.download(res.TenFile);
      })
    }
  }
  ngOnDestroy(){
    super.ngOnDestroy();
  }
}
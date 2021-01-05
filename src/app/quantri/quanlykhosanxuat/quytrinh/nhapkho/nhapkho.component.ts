import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';
import { NhapkhomodalComponent } from '../nhapkhomodal/nhapkhomodal.component';

@Component({
  selector: 'app-nhapkho',
  templateUrl: './nhapkho.component.html',
  styleUrls: ['./nhapkho.component.css']
})
export class NhapkhoComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  eAction: any = "PHIEUNHAPLOBONG";
  cols: any = [
    {
      header: 'Số quy trình',
      field: 'SoQuyTrinh',
      width: 'unset'
    },
    {
      header: 'Mã PO/Hợp đồng',
      field: 'SoHopDong',
      width: 'unset'
    },
    {
      header: 'Lô bông',
      field: 'TenLoBong',
      width: 'unset'
    },
    {
      header: 'Loại bông',
      field: 'TendmLoaiBong',
      width: 'unset'
    },
    {
      header: 'Tổng số kiện',
      field: 'TongSoKien',
      width: 'unset'
    },
    {
      header: 'Tổng khối lượng',
      field: 'TongKhoiLuong',
      width: 'unset'
    },
    {
      header: 'Trạng thái',
      field: 'TenTrangThai',
      width: 'unset'
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };

  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.KiemTraTabTrangThai();
    this.GetListQuyTrinh()
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlykhosanxuat/nhapkho/${id}`], { replaceUrl: true })
  }
  addPhieuBong() {
    this.changeParam(0);
    let modalRef = this._modal.open(NhapkhomodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'bong';
    modalRef.componentInstance.nametype = 'bông';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  addPhieuSo() {
    this.changeParam(0);
    let modalRef = this._modal.open(NhapkhomodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'xo';
    modalRef.componentInstance.nametype = 'xơ';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  addPhieuBongHoi() {
    this.changeParam(0);
    let modalRef = this._modal.open(NhapkhomodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'bonghoi';
    modalRef.componentInstance.nametype = 'bông hồi';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  update(Id) {
    this._service.QuyTrinhPhieuNhapLoBong().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(NhapkhomodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      if(res1.Loai == 1 )
        modalRef.componentInstance.type = 'bong';
      else
        modalRef.componentInstance.type = 'xo';
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
      modalRef.result.then((res: any) => {
        this.GetListQuyTrinh();
      })
        .catch(er => { console.log(er) })
    })
  }
  changeTab(e) {
    this.trangThai = e.index+1;
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    // this.paging.CurrentPage = event.page + 1;
    // this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 25,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      TuNgay: (new Date(this.filter.TuNgay).getTime() / 1000) || 0,
      DenNgay: (new Date(this.filter.DenNgay).getTime() / 1000) || 0,
      Ma: "",
      Ten: "",
    }
    this._service.QuyTrinhPhieuNhapLoBong().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai() {
    // this._service.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
    //   this.checkQuyen = res;
    //   this.GetListQuyTrinh();
    // })
  }
}

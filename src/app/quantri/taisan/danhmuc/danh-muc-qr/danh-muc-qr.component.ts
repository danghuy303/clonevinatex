import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { API } from 'src/app/services/host';

@Component({
  selector: 'app-danh-muc-qr',
  templateUrl: './danh-muc-qr.component.html',
  styleUrls: ['./danh-muc-qr.component.css']
})
export class DanhMucQrComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  listHienThi: any = [];
  Keyword: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  filter: any = {};
  checkedAll: boolean = false;

  constructor(
    private _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    private _toastr: ToastrService
  ) { }

  ngOnInit() {
    this.GetList();
  }
  resetFilter() {
    this.filter = {};
    this.Keyword = '';
    this.GetList();
  }
  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      listMaQr: this.listHienThi ? this.listHienThi.filter(obj => obj.checked).map(ele => ele.MaQr) : [],
      SoLuong: this.filter.SoLuong,
      CurrentPage: this.paging.CurrentPage,
      PageSize: 20
    }
    this._danhMucTaiSan.GetListQRCODE(data).subscribe((res: any) => {
      this.listHienThi = res.items;
      this.paging.TotalCount = res.paging.TotalItem;
    })
  }

  TaoQR() {
    let data = {
      listMaQr: this.listHienThi ? this.listHienThi.filter(obj => obj.checked).map(ele => ele.MaQr) : [],
      SoLuong: this.filter.SoLuong,
    }
    this._danhMucTaiSan.SetQRCODE(data).subscribe(res => {
      this.GetList();
    })
  }

  InQrCode() {
    if (this.listHienThi.filter(obj => obj.checked).length || this.filter.SoLuongIn) {
      let data = {
        listMaQr: this.listHienThi ? this.listHienThi.filter(obj => obj.checked).map(ele => ele.MaQr) : [],
        SoLuong: this.filter.SoLuong,
        SoBanIn:this.filter.SoBanIn,
        SoLuongIn:this.filter.SoLuongIn,
      }
      this._danhMucTaiSan.InQrCode(data).subscribe((res: any) => {
        if(res.State === 1 ) {
          let url = res.Data
          window.open(API.imgURL + url);
          this._toastr.success(res.message)
        } else this._toastr.error(res.message)
      })
    }
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

  checkAll() {
    this.listHienThi = this.listHienThi.map((ele: any) => {
      return {
        ...ele,
        checked: this.checkedAll
      }
    })
  }

  checkItem() {
    this.checkedAll = this.listHienThi.every((ele: any) => ele.checked)
  }

}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { UnixToDate, mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-bao-duong-popup',
  templateUrl: './bao-duong-popup.component.html',
  styleUrls: ['./bao-duong-popup.component.css']
})
export class BaoDuongPopupComponent implements OnInit {

  item: any = {};
  getId: any = '';
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = {};;
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 1 };
  filter: any = {};
  listLoaiTaiSan: any = [];
  listPhanXuong: any = [];
  listCVBaoDuong: any = [];
  listDoiBaoDuong: any = [];
  listLoaiTaiSanDeep: any = [];

  constructor(
    private _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _danhMucTaiSan: DanhmuctaisanService,
    private _serviceTaiSan: TaisanService,) { }

  ngOnInit(): void {
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', };
    this._servicesSanXuat.GetListdmPhanXuongForIdDuAn().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this._danhMucTaiSan.LoaiThucHienBaoDuong().GetList(data).subscribe((res: any) => {
      this.listCVBaoDuong = res.Data;
    });
    this.GetDanhSachCongViecByIddmLoaiBaoDuong(this.item.IddmLoaiBaoDuong,this.item.IdTaiSan);
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res1: any) => {
      this.listLoaiTaiSanDeep = res1.Data;
      this.listLoaiTaiSan = mapArrayForDropDown(res1.Data, "Ten", "Id");
      this.GetDoiThiCong(this.item.IddmLoaiTaiSan ? this.item.IddmLoaiTaiSan : '')
    })
  }

  GetDaTa(value) {
    this.GetDoiThiCong(value);
  }

  GetDanhSachCongViecByIddmLoaiBaoDuong(IddmLoaiBaoDuong,IdTaiSan) {
    this._serviceTaiSan.GetDanhSachCongViecByIddmLoaiBaoDuong(IddmLoaiBaoDuong,IdTaiSan).subscribe((baoduong: any) => {
      this.item.listCongViec = baoduong.Data;
    })
  }

  GetDoiThiCong(value: any) {
    let data = {
      CurrentPage: 0,
      MaCongDoan: this.listLoaiTaiSanDeep.find(obj => obj.Id === value)?.MaCongDoan
    }
    this._danhMucTaiSan.GetListdmCongDoan_DoiBaoDuong(data).subscribe((res: any) => {
      this.listDoiBaoDuong = mapArrayForDropDown(res.Data, "Ten", "Id");
    })
  }

  XacNhan() {
    this.item.ThoiGianBatDau = new Date();
  }

  HoanThanh() {

  }
}

import { NAMED_ENTITIES } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';
import { ModalbaoduongComponent } from '../taisan/modal/modalbaoduong/modalbaoduong.component';
import { ModalthongtinchitiettaisanComponent } from '../taisan/modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component';

@Component({
  selector: 'app-baocaotonghoptaisan',
  templateUrl: './baocaotonghoptaisan.component.html',
  styleUrls: ['./baocaotonghoptaisan.component.css']
})
export class BaocaotonghoptaisanComponent implements OnInit {

  @ViewChild(PintableDirective) voiPintable: PintableDirective;

  listNam: any = [];
  bool: boolean = true;
  item: any = { isChon: 0, };
  items: any = [];
  itemMay: any = [];
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  pagingChiPhi: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  filter: any = {};
  namThang: any;
  nam: any;
  listLoaiTaiSan: any = [];
  listPhanXuong: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listThoiGian: any = [
    {
      value: 'NAM', label: 'Năm'
    },
    {
      value: "THANG", label: 'Tháng'
    },
  ];
  listVatTu: any = [];
  listChiPhiKhac: any = [];
  labelThang: any = [];
  thangDaChon: any = 0;
  itemsLichXichThang: any = [];
  tongGiaTriVatTu: 0;
  tongGiaTriChiPhi: 0;

  constructor(
    public _modal: NgbModal,
    private _serviceTaiSan: TaisanService,
    private _servicesSanXuat: SanXuatService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    this.filter.LoaiKeHoach = this.listThoiGian[0].value;
    // this.filter.Ngay = new Date();
    this.filter.namThang = new Date();
    this.filter.nam = new Date().getFullYear();
    this.filter.isChon = 'theoBaoDuong'
    let data = {
      Keyword: "",
      CurrentPage: 0,
      PageSize: 20,
      MaCongDoan: '',
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan,
      IdUser: '',
      Ngay: 0,
      IdDuAn: 0,
    };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.voiPintable.active();
  }

  loadData() {
    // goi thang nao hien so ngay trong thang
    // let month = this.filter.Ngay.getMonth() + 1;
    // let year = this.filter.Ngay.getFullYear();
    // this.thangDaChon = new Date(year, month, 0).getDate();
    // this.labelThang = [];
    let month = this.filter.namThang.getMonth() + 1;
    let year = this.filter.namThang.getFullYear();
    this.thangDaChon = new Date(year, month, 0).getDate();
    this.labelThang = [];

    this.filter.Ngay = (this.filter.LoaiKeHoach === 'NAM')?DateToUnix(new Date (this.filter.nam, 1, 1)): DateToUnix(this.filter.namThang);
    for (let i = 1; i <= this.thangDaChon; i++) {
      this.labelThang.push(i);
    }
    let data = {
      Keyword: "",
      CurrentPage: 0,
      PageSize: 20,
      MaCongDoan: '',
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan,
      IdUser: '',
      Ngay: this.filter.Ngay,
      LoaiKeHoach: this.filter.LoaiKeHoach,
      IdDuAn: 0,
    };

    if (this.filter.isChon === 'theoBaoDuong') {
      this._serviceTaiSan.ListLichXichNam().GetListBaoDuong(data).subscribe((res: any) => {
        this.items = res.Data;
      })
    } else {
      this._serviceTaiSan.ListLichXichNam().GetListMay(data).subscribe((res: any) => {
        this.itemMay = res.Data;
      })
    }
    this.GetListLichXichThang(data);
    this.GetListChiPhiVatTu(data);
    this.GetListChiPhiPhatSinh(data);
  }

  GetListChiPhiPhatSinh(data) {
    this._serviceTaiSan.BaoCaoTaiSan().GetListChiPhiPhatSinh(data).subscribe((res: any) => {
      this.tongGiaTriChiPhi = 0;
      this.tongGiaTriChiPhi = res.Data.TongGiaTri;
      this.pagingChiPhi.TotalCount = res.Data?.pagination?.TotalCount;
      this.listChiPhiKhac = res.Data?.pagination?.Items;
    })
  }

  GetListChiPhiVatTu(data) {
    this._serviceTaiSan.BaoCaoTaiSan().GetListChiPhiVatTu(data).subscribe((res: any) => {
      this.tongGiaTriVatTu = 0;
      this.tongGiaTriVatTu = res.Data.TongTien;
      this.paging.TotalCount = res.Data?.pagination?.TotalCount;
      this.listVatTu = res.Data?.pagination?.Items;
      this.listVatTu?.forEach(ele => {
        ele.ThanhTien =0;
        ele.ThanhTien = ele.SoLuong * ele.DonGia;
      })
    })
  }

  GetListLichXichThang(data) {
    this._serviceTaiSan.ListLichXichThang().GetList(data).subscribe((res: any) => {
      this.itemsLichXichThang = res.Data;
    })
  }

  ChiTietThongTin(item) {
    let modalRef = this._modal.open(ModalthongtinchitiettaisanComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    // modalRef.componentInstance.item = item.IdTaiSan;
    modalRef.componentInstance.getId = item.IdTaiSan;
    modalRef.result
      .then((res: any) => {

      })
      .catch((er) => {

      });
  }

  ChiTietBaoDuong(item) {
    this._serviceTaiSan.ListLichXichNam().Get(item.IddmLoaiBaoDuong).subscribe((res1: any) => {
      let modalRef = this._modal.open(ModalbaoduongComponent, {
        size: "lg",
        backdrop: "static",
      });
      modalRef.componentInstance.opt = "edit";
      modalRef.componentInstance.bool = false;
      modalRef.componentInstance.title = 'Cập nhật loại bảo dưỡng';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1.Data));
      modalRef.result
        .then((res: any) => {

        })
        .catch((er) => {
        });
    })
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.loadData()
  }
  changePageChiPhi(event) {
    this.pagingChiPhi.CurrentPage = event.page + 1;
    this.loadData()
  }

  ChiTietThongTinLichXIchThang(item) {
    let modalRef = this._modal.open(ModalthongtinchitiettaisanComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = item.IdTaiSan;
    modalRef.result
      .then((res: any) => {

      })
      .catch((er) => {

      });
  }
  ChiTietBaoDuongLichXIchThang(item) {
    this._serviceTaiSan.ListLichXichNam().Get(item.IddmLoaiBaoDuong).subscribe((res1: any) => {
      let modalRef = this._modal.open(ModalbaoduongComponent, {
        size: "fullscreen",
        backdrop: "static",
      });
      modalRef.componentInstance.opt = "edit";
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1.Data));
      modalRef.result
        .then((res: any) => {

        })
        .catch((er) => {
        });
    })
  }
}

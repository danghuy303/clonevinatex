import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalbaoduongComponent } from '../taisan/modal/modalbaoduong/modalbaoduong.component';
import { ModalthongtinchitiettaisanComponent } from '../taisan/modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component';

@Component({
  selector: 'app-baocaotonghoptaisan',
  templateUrl: './baocaotonghoptaisan.component.html',
  styleUrls: ['./baocaotonghoptaisan.component.css']
})
export class BaocaotonghoptaisanComponent implements OnInit {

  listNam: any = [];
  bool: boolean = true;
  item: any = { isChon: 0, };
  items: any = [];
  itemMay: any = [];
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  filter: any = {};
  listLoaiTaiSan: any = [];
  listPhanXuong: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
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
    this.filter.Ngay = new Date().getFullYear();
    let data = {
      Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan, IdUser: '', Ngay: 0, LoaiKeHoach: '',
      IdDuAn: 0,
    };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.filter.isChon = 'theoBaoDuong'
    this.loadData();
    this.GetListChiPhiVatTu();
  }
  resetFilter() {
    this.filter = {};
    this.loadData();
  }
  loadData() {
    let data = {
      Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan, IdUser: '',Ngay: DateToUnix(new Date(this.filter.Ngay, 1, 1, 1,)),LoaiKeHoach: '',
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
  }
  ChiTietThongTin(item) {
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
  // danh sach vat tu
  GetListChiPhiVatTu() {
    let data = {
      Ngay: DateToUnix(new Date(this.filter.Ngay, 1, 1, 1,)),
      IdBoPhanSuDung:this.filter.IdBoPhanSuDung,
      IddmLoaiTaiSan:this.filter.IddmLoaiTaiSan,
    }
    this._serviceTaiSan.BaoCaoTaiSan().GetListChiPhiVatTu(data).subscribe((res: any) => {
   
    })
  }
}

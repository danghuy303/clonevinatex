import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';
import { ModalbaoduongComponent } from '../modal/modalbaoduong/modalbaoduong.component';
import { ModalthongtinchitiettaisanComponent } from '../modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component';
import { ModalquytrinhbaoduongComponent } from '../modal/modalquytrinhbaoduong/modalquytrinhbaoduong.component';

@Component({
  selector: 'app-lichxichthang',
  templateUrl: './lichxichthang.component.html',
  styleUrls: ['./lichxichthang.component.css']
})
export class LichxichthangComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  item: any = {};
  items: any = [];
  filter: any = {};
  TongSoTaiSan: '';
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listCongDoan: any = [];
  listPhanXuong: any = [];
  labelThang: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  MaCongDoan: any = '';
  $sub!: Subscription;

  constructor(public _modal: NgbModal,
    private _serviceTaiSan: TaisanService,
    private _servicesSanXuat: SanXuatService,
    private _danhMucTaiSan: DanhmuctaisanService,
    private store: StoreService) {
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
        this.ngOnInit()
      }
    })
  }

  ngOnInit(): void {
    this.filter.Ngay = new Date();
    this.filter.isChon = 'theoBaoDuong'
    this.GetList();
    let getFullYear = new Date().getFullYear();
    let getMonth = new Date().getMonth() + 1;
    // this.filter.Ngay = `${getMonth}/${getFullYear}`;
    this._servicesSanXuat.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
    this._servicesSanXuat.GetListdmPhanXuongForIdDuAn().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetList(true);
  }
  GetList(reset?) {
    let data = {
      Keyword: "",
      CurrentPage: 0,
      PageSize: 20,
      MaCongDoan: this.filter.IddmLoaiTaiSan,
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
      IddmLoaiTaiSan: '',
      IdUser: '',
      Ngay: DateToUnix(new Date(this.filter.Ngay.getFullYear(), this.filter.Ngay.getMonth(), 1)),
      LoaiKeHoach: '',
      IdDuAn: 0,
    };

    if (this.filter.isChon === 'theoBaoDuong') {
      this._serviceTaiSan.ListLichXichThang().GetList(data).subscribe((res: any) => {
        this.items = res.Data;
        this.TongSoTaiSan = res.Data.TongSoTaiSan;
      })
    } else {
      this._serviceTaiSan.ListLichXichThang().GetLichXichThangLoaiTaiSan(data).subscribe((res: any) => {
        this.items = res.Data;
      })
    }

  }
  // ChiTietThongTin(item) {
  //   console.log(item);

  //   let modalRef = this._modal.open(ModalthongtinchitiettaisanComponent, {
  //     size: "fullscreen",
  //     backdrop: "static",
  //   });
  //   modalRef.componentInstance.opt = "edit";
  //   modalRef.componentInstance.getId = item.IdTaiSan;
  //   // modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
  //   modalRef.result
  //     .then((res: any) => {

  //     })
  //     .catch((er) => {

  //     });
  // }

  ChiTietThongTin(item) {
    let modalRef = this._modal.open(ModalquytrinhbaoduongComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result
      .then((res: any) => { })
      .catch((er) => { });
  }
  
  ChiTietBaoDuong(item) {
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
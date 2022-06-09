import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { vn } from 'src/app/services/const';
import { DateToUnix } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';
import { datafake } from './datafake';

@Component({
  selector: 'app-lichbaoduongcopy',
  templateUrl: './lichbaoduongcopy.component.html',
  styleUrls: ['./lichbaoduongcopy.component.css']
})
export class LichbaoduongcopyComponent implements OnInit {

  @Input('item') item: any = { };
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(PintableDirective) voiPintable: PintableDirective;

  listNam: any = [];
  listThang: any = [];
  items: any = [];
  itemLichBaoDuong: any = [];
  lang: any = vn;
  filter: any = {};
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  itemsThang: any = [];
  listThoiGianNangSuat: any = [];
  listdmLoaiBaoDuong: any = [];
  
  constructor(
    public _modal: NgbModal,
    private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    for (let i = 1; i <= 12; i++) {
      this.listThang.push({ value: i, label: `Tháng ${i}` });
    }
    this.filter.Nam = new Date().getFullYear();
    this.filter.Thang = new Date().getMonth() + 1;
    this._serviceTaiSan.ChiTietTaiSanLichBaoDuong().Get(this.item.Id).subscribe((res: any) => {
      if (res.StatusCode === 200) {
        this.listdmLoaiBaoDuong = res?.Data.lstLoaiBaoDuong;
        this.itemLichBaoDuong = res?.Data.lstChondmBaoDuong;
      } else {
        this._toastr.error(`${res.Message} - Lỗi lấy dữ liệu từ QLTS_Vinatex/QuanLyTaiSan/GetChiTietTaiSanById_LichBaoDuong`);
      }
    })
    this.isChonNam();
  }
 
  isChon(item) {
    item.isChonNam = 0;
  }
  isChonNam() {
    this.item.isChonThang = false;
    this._serviceTaiSan.ChiTietTaiSanLichBaoDuong().GetNam(this.item.Id, DateToUnix(new Date(this.filter.Nam, 1, 1))).subscribe((res: any) => {
      this.items = res.Data;
    })
  }
  isChonThang() {
    this.item.isChonNam = true;
    this._serviceTaiSan.ChiTietTaiSanLichBaoDuong().GetThang(this.item.Id, DateToUnix(new Date(this.filter.Nam, this.filter.Thang, 1))).subscribe((res: any) => {
        this.items = res.Data;
      })
  }
}
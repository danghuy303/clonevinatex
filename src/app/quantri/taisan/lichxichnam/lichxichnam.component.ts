import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalbaoduongComponent } from '../modal/modalbaoduong/modalbaoduong.component';
import { ModalthongtinchitiettaisanComponent } from '../modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component';

@Component({
  selector: 'app-lichxichnam',
  templateUrl: './lichxichnam.component.html',
  styleUrls: ['./lichxichnam.component.css']
})
export class LichxichnamComponent implements OnInit {
  listNam: any = [];
  item:any ={};
  items:any = [];
  itemMay:any = [];
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  constructor(
    public _modal: NgbModal,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    this.GetList();
  }
  isChon() {
    this.item.isChon=true;
    this.item.isChonMay=false;
    let data = {
      Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', IdBoPhanSuDung: '',
      IddmLoaiTaiSan: '', IdUser: '', Ngay: 0, LoaiKeHoach: '',
      IdDuAn: 0,
    };
    this._serviceTaiSan.ListLichXichNam().GetListBaoDuong(data).subscribe((res: any) => {
      this.items = res.Data;  
    })
  }
  isChonMay() {
    this.item.isChonMay=true;
    this.item.isChon=false;
    let data = {
      Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', IdBoPhanSuDung: '',
      IddmLoaiTaiSan: '', IdUser: '', Ngay: 0, LoaiKeHoach: '',
      IdDuAn: 0,
    };
    this._serviceTaiSan.ListLichXichNam().GetListMay(data).subscribe((res: any) => {
      console.log(res)
      this.itemMay = res.Data;  
    })
  }
  GetList() {
    
  }
  ChiTietThongTin(item) {
    let modalRef = this._modal.open(ModalthongtinchitiettaisanComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = item.IdTaiSan;
    // modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result
      .then((res: any) => {
        this.GetList();
      })
      .catch((er) => {

      });
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
          this.GetList();
        })
        .catch((er) => {
        });
    })
  }
   
}

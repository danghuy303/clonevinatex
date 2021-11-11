import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalthongtinchitiettaisan',
  templateUrl: './modalthongtinchitiettaisan.component.html',
  styleUrls: ['./modalthongtinchitiettaisan.component.css']
})
export class ModalthongtinchitiettaisanComponent implements OnInit {

  item: any;
  Du_Lieu_Cha: any={};
  Du_Lieu_Thong_Tin_Chung: any = {}; 
  Du_Lieu_Cha_Bien_Dong: any={};
  Du_Lieu_Bien_Dong: any = {};
  paging:any = {Page: 1, TotalPages: 1, TotalCount: 1 };
  filter:any ={};
  constructor(public activeModal: NgbActiveModal, public toastr: ToastrService, private _serviceTaiSan: TaisanService,) { }
  Du_Lieu_Cha_Su_Co: any={};
  Du_Lieu_Su_Co: any = {};
  ngOnInit(): void {
    // console.log(this.item.Id)
    let date = new Date();
    this.filter.TuNgay = new Date(date.getFullYear(),0,1);
    this.filter.DenNgay = new Date(date.getFullYear(),11,31); 
    this.GetById();
    this.GetListBienDongById();
    // if (this.Du_Lieu_Cha.NgayNhapUnix !== 0) {
    //   this.Du_Lieu_Cha.NgayNhap = UnixToDate(this.Du_Lieu_Cha.NgayNhapUnix);
    // }
    this.GetListSuCoById();
  }

  GetById() {
    this._serviceTaiSan.ListDanhSachTaiSan().Get(this.item.Id).subscribe((res: any) => {
        this.Du_Lieu_Cha = res.Data;
        console.log( this.Du_Lieu_Cha.NgayNhap)
        // this.Du_Lieu_Thong_Tin_Chung.Ma = this.Du_Lieu_Cha.Ma;
        this.Du_Lieu_Cha.NgayNhap = UnixToDate(this.Du_Lieu_Cha.NgayNhapUnix);
       console.log( this.Du_Lieu_Cha.NgayNhap)

    })
  }

  resetFilter() {
    this.filter = {};
    this.GetListBienDongById(true);
    this.GetListSuCoById(true);
  }

  GetListBienDongById(reset?) {
    if (reset) {
    }
    let data = {
      PageSize: 25,
      CurrentPage: this.paging.Page,
      KeyWord: this.filter.KeyWord,
      IdTaiSan:this.item.Id,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
    }
    this._serviceTaiSan.ListDanhSachBienDong().Get(data).subscribe((res: any) => {
       console.log(res)
       this.Du_Lieu_Cha_Bien_Dong = res.Data.Items;
     
    })
  }

  GetListSuCoById(reset?) {
    if (reset) {
    }
    let data = {
      PageSize: 25,
      CurrentPage: this.paging.Page,
      KeyWord: this.filter.KeyWord,
      IdTaiSan:this.item.Id,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
    }
    this._serviceTaiSan.ListDanhSachSuCo().Get(data).subscribe((res: any) => {
       console.log(res)
       this.Du_Lieu_Cha_Su_Co = res.Data.Items;
     
    })
  }

}

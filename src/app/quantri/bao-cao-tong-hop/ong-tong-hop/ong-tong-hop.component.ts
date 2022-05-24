import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable, DateToUnix } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { BongChai, DropDownData } from '../data-model';

@Component({
  selector: 'app-ong-tong-hop',
  templateUrl: './ong-tong-hop.component.html',
  styleUrls: ['./ong-tong-hop.component.css']
})
export class OngTongHopComponent extends StoreBase implements OnInit {
  cols: any[];
  items: any[];
  sum: any = {};
  currentTime: any = {};
  listPhanXuong:any =[];
  // listCaSanXuat:any=[];
  listNgay: DropDownData[] = [];
  listThang: DropDownData[] = [];
  listNam: DropDownData[] = [];
  filter:any={};
  Tong:any[]=[];
  // frozenCols: any[];

  constructor(private _services:SanXuatService,public store:StoreService,private _toastr:ToastrService) { super(store) }
  

  ngOnInit(): void {
    let date = new Date();
    this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() , date.getDate());
    this.GetCurrentTime();
    this.GetTimeForDropDown();
    this._services.GetOptions().GetPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
      this.GetBaoCao();
    })
  }
  GetBaoCao(){
    if (validVariable(this.filter._tuNgay)) {
      this.filter.TuNgay = DateToUnix(this.filter._tuNgay);
    } else {
      this.filter.TuNgay = null;
    }
    if (validVariable(this.filter._denNgay)) {
      this.filter.DenNgay = DateToUnix(this.filter._denNgay);
    } else {
      this.filter.DenNgay = null;
    }
    if (this.filter.DenNgay < this.filter.TuNgay) {
      this._toastr.error('Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu');
      setTimeout(() => {
        this.filter._denNgay = this.filter._tuNgay;
        this.GetBaoCao()
      }, 200)
      return;
    }
    this._services.BaoCaoTongHop().GetBaoCao_OngTongHop(this.filter).subscribe((res:any)=>{
      this.items = res.listItem;
      this.cols = res.listColumn;
      this.Tong = new Array(this.cols.length).fill(0);
      this.items.forEach((ele:any)=>{
        ele.listGiaTriCot.forEach((cot:any,index:number)=>{
          this.Tong[index]+= ele.GiaTri_Double||0;
        })
      })
    })
  }
  GetCurrentTime() {
    let date = new Date();
    let year: string | number = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day: string | number = date.getDate();
    if (day<10) {
      day = '0' + day
    }
  }
  
  GetTimeForDropDown() {
    let ngay = 0;
    let thang = 0;
    let nam = 0;
    for (let i = 0; i <= 30; i++) {
      ngay++;
      this.listNgay.push({
        label: ngay<10?`0${ngay}`:ngay.toString(),
        value: ngay
      });
    }
    for (let i = 0; i <= 11; i++) {
      thang++;
      this.listThang.push({
        label: thang<10?`0${thang}`:thang.toString(),
        value: thang
      });
    }
    for (let i = this.currentTime.year - 10; i <= this.currentTime.year + 10; i++) {
      nam = i;
      this.listNam.push({
        label: nam.toString(),
        value: nam
      });
    }
  }

}

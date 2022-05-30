import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';

@Component({
  selector: 'app-ty-le-tieu-chuan-bong-hoi',
  templateUrl: './ty-le-tieu-chuan-bong-hoi.component.html',
  styleUrls: ['./ty-le-tieu-chuan-bong-hoi.component.css']
})
export class TyLeTieuChuanBongHoiComponent extends StoreBase implements OnInit {
  listNam:any=[];
  listThang:any=[];
  listPhanXuong:any=[];
  Thang:number;
  Nam:Number;
  items:any=[];
  constructor(private _service:SanXuatService,public store: StoreService,private toastr:ToastrService) {
    super(store);
  }

  ngOnInit(): void {
    let today = new Date();
    this.Thang = today.getMonth()+1;
    this.Nam = today.getFullYear();
    for(let i = today.getFullYear()-10;i<=today.getFullYear()+10;i++){
      this.listNam.push({label:i,value:i});
    }
    for(let i = 1;i<=12;i++){
      this.listThang.push({
        label:`Tháng ${i}`,
        value:i
      })
    }
    this.GetTyLeTieuChuan();
  }
  GetTyLeTieuChuan(){
    this._service.TyLeTieuChuanBongHoi().Get(this.Nam,this.Thang).subscribe((res:any)=>{
      this.items = res;
      this.listPhanXuong = res.listTenPhanXuong;
    })
  }
  GhiLai(){
    this._service.TyLeTieuChuanBongHoi().Set(this.items).subscribe(res=>{
      console.log(res)
    },
    (er)=>{
      this.toastr.error('Có lỗi xảy ra trong quá trình xử lý');
    },()=>{
      this.GetTyLeTieuChuan();
    })
  }
}

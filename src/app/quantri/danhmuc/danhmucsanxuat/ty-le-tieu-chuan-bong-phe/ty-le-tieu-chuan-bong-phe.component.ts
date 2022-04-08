import { Component, OnInit } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-ty-le-tieu-chuan-bong-phe',
  templateUrl: './ty-le-tieu-chuan-bong-phe.component.html',
  styleUrls: ['./ty-le-tieu-chuan-bong-phe.component.css']
})
export class TyLeTieuChuanBongPheComponent implements OnInit {
  listNam:any=[];
  listThang:any=[];
  listPhanXuong:any=[];
  Thang:number;
  Nam:Number;
  items:any=[];
  constructor(private _service:SanXuatService) { 

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
    this.GetListPhanXuong();
  }
  GetTyLeTieuChuan(){
    this._service.TyLeTieuChuanBongPhe().Get(this.Nam,this.Thang).subscribe(res=>{
      this.items = res
    })
  }
  GetListPhanXuong(){
    this._service.GetListdmPhanXuong({},true).subscribe(res=>{
      this.listPhanXuong = res
    })
  }
}

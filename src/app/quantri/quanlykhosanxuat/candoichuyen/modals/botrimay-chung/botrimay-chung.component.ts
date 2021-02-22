import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-botrimay-chung',
  templateUrl: './botrimay-chung.component.html',
  styleUrls: ['./botrimay-chung.component.css']
})
export class BotrimayChungComponent implements OnInit {
  checkbutton:any={Ghi:true};
  addonData:any={};
  TenCongDoan:any='';
  listHangHoa:any = [];
  item:any={
  }
  filter:any={};
  newMay:any={};
  lang:any=vn;
   constructor(public activeModal: NgbActiveModal, private _services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal, private _store: StoreService) { }
 
   ngOnInit(): void {
     console.log(this.item);
     this.listHangHoa = mapArrayForDropDown(this.item.listCanBoTri,'Ten','Id')
     this.item.listCanBoTri.forEach(mathang => {
      mathang.SoMayDaBoTri = 0;
     });
     this.newMay={}
     this.TinhSoLuongMatHang()
   }
   GhiLai(){
    this._services.CanDoiChuyen().SetCanDoiChuyen({...this.item,...this.addonData}).subscribe((res:any)=>{
      if(res){
        if(res.State===1){
          this.toastr.success(res.message);
        }else{
          this.toastr.error(res.message);
        }
      }else{
        this.toastr.error('Cập nhật không thành công!');
      }
    })
   }
   TinhSoLuongMatHang(){
     this.item.listCanBoTri.forEach(mathang => {
       mathang.SoMayDaBoTri = this.item.listDaBoTri.filter(may=>may.IdCanDoiChuyen_CanBoTri===mathang.Id)?.length||0;
     });
   }
   ApDungDenNgay(){
    if(validVariable(this.filter.DenNgay)&& validVariable(this.filter.TuNgay)&& this.filter.TuNgay<this.filter.DenNgay){
      this._services.CanDoiChuyen().SetCanDoiChuyen({...this.item,...this.addonData}).subscribe((res:any)=>{
        if(res){
          if(res.State===1){
            // this.toastr.success(res.message);
            let data = {
              ...this.addonData,
              TuNgayUnix:DateToUnix(this.filter.TuNgay),
              DenNgayUnix:DateToUnix(this.filter.DenNgay),
            }
            this._services.CanDoiChuyen().SetCanDoiChuyen_ApDungNgay(data).subscribe(res=>{
              console.log(res);
            })
          }else{
            this.toastr.error(res.message);
          }
        }else{
          this.toastr.error('Cập nhật không thành công!');
        }
      })
    }
    else{
      this.toastr.error('Vui lòng nhập kiểm tra lại khoảng thời gian áp dụng!');
    }
  }

}

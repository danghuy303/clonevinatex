import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { ChonhanghoamodalComponent } from '../../modals/chonhanghoamodal/chonhanghoamodal.component';

@Component({
  selector: 'app-phabongmodal',
  templateUrl: './phabongmodal.component.html',
  styleUrls: ['./phabongmodal.component.css']
})
export class PhabongmodalComponent implements OnInit {
  listBanBong:any = [];
  listTrienKhaiKeHoach:any=[];
  listItems:any=[];
  listProps:any=[];
  listCol:any = [];
  listFixedCol:any=[];
  editVal:any = 0;
  checkbutton:any={};
  opt:any='';
  listLoBong:any=[];
  item:any={
    Id:'',
    listItem:[]
  };
  itemTrienKhaiKeHoach:any={};
  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService, public _modal: NgbModal) { 
    for(let i = 0;i<31;i++){
      this.listBanBong.push({label:`${i}`})
    }
    this.listItems = [];
    for(let i=0;i<23;i++){
      let data = {
        id: i,
        label:`Thành phần ${i}`,
        mic:`${i}`,
        rd:`${i}`,
        pb:`${i}`,
        TyLe:`${i}`,
        Ton:`${i}`,
        TongNgay:`${i}`,
        ConLai:`${i}`
      }
      for(let j = 0;j<31;j++){
        data[`Ban${j}`]={};
        data[`Ban${j}`].SoKien = null;
        data[`Ban${j}`].tabIndex = (j*23)+i+1;
      }
      this.listItems.push(data);
    }
    for(let j = 0;j<31;j++){
      this.listProps.push(`Ban${j}`)
    }
  }

  ngOnInit(): void {
    this.checkbutton={
      Ghi:true,
      Xoa:true,
      ChuyenTiep:true,
      KhongDuyet:true
    }
    this.KiemTraButtonModal();
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      // this.GetLoBongTrongKho();
    }
    this.GetListTrienKhaiKeHoach()
  }
  GetListTrienKhaiKeHoach(){
    let data = {
      CurrentPage:0,
    }
    this._services.TrienKhaiKeHoachSanXuat().GetList(data).subscribe((res:any)=>{
      this.listTrienKhaiKeHoach = mapArrayForDropDown(res,'SoQuyTrinh',"Id")
      if(validVariable(this.item.IdTrienKhaiKeHoachSanXuat)){
        this.GetChiTietTrienKhaiKeHoachForMatHang({value:this.item.IdTrienKhaiKeHoachSanXuat});
      }
    })
  }
  GetChiTietTrienKhaiKeHoachForMatHang(event){
    this._services.TrienKhaiKeHoachSanXuat().Get(event.value,false).subscribe((res:any)=>{
      console.log(res);
      res.listItem.forEach(mathang => {
        mathang.KhoiLuongSanXuat = mathang.KhoiLuongSanXuat/1000;
      });
      this.itemTrienKhaiKeHoach = res;
      this.GetLoBongTrongKho();
    })
  }
  // edit(i,prop){
  //   this.listItems[i][prop].editing=true;
  // }
  // doneEdit(i,prop){
  //   console.log(this.listItems);
  //   this.listItems[i][prop].editing=false;
  // }
  GetLoBongTrongKho(){
    this._services.PhuongAnPhaBong().GetLoBongTrongKho(this.itemTrienKhaiKeHoach.IdDuAn).subscribe(res=>{
      this.listLoBong = res;
    })
  }
  TinhSoBanBong(e?){
    this.item.TongSoKien = e.value;
    if(validVariable(this.item.KhoiLuongBong) && validVariable(this.item.TongSoKien)){
      this.item.SoBanBong = Math.ceil(this.item.KhoiLuongBong /this.item.TongSoKien)
      console.log(this.item.SoBanBong)
    }
  }
  chonHangHoa(){
    let modalRef = this._modal.open(ChonhanghoamodalComponent,{size:'lg',backdrop:'static'});
    modalRef.componentInstance.items = this.itemTrienKhaiKeHoach.listItem||[];
    modalRef.componentInstance.selectedItems = this.item.listItem||[];
    modalRef.componentInstance.opt = "KhoiLuongSanXuat";
    modalRef.result.then(res=>{
      this.item.listItem = res;
      this._services.PhuongAnPhaBong().TinhKhoiLuongBong(res).subscribe((result:any)=>{
        if(result.State===1){
          this.item.KhoiLuongBong = parseFloat(result.message);
          if(validVariable(this.item.TongSoKien)){
            this.TinhSoBanBong({value:this.item.TongSoKien});
          }
        }else{
          this._toastr.error(result.message);
        }
      })
    })
    .catch(er=>{
      console.log(er);
    })
  }
  chonLoBong(){
    let modalRef = this._modal.open(ChonhanghoamodalComponent,{size:'lg',backdrop:'static'});
    modalRef.componentInstance.items = this.listLoBong||[];
    modalRef.componentInstance.selectedItems = this.item.listLoBong||[];
    modalRef.componentInstance.opt = "LoBong";
    modalRef.result.then(res=>{
      this.item.listItem = res;
      this._services.PhuongAnPhaBong().TinhKhoiLuongBong(res).subscribe((result:any)=>{
        if(result.State===1){
          this.item.KhoiLuongBong = parseFloat(result.message);
          if(validVariable(this.item.TongSoKien)){
            this.TinhSoBanBong({value:this.item.TongSoKien});
          }
        }else{
          this._toastr.error(result.message);
        }
      })
    })
    .catch(er=>{
      console.log(er);
    })
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res;
    })
  }
  ChuyenDuyet() {
    this._services.PhuongAnPhaBong().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this._activeModal.close();
        } else {
          this._toastr.error(res.message);
        }
      }
    })
  }
  GetNextSoQuyTrinh() {
    this._services.PhuongAnPhaBong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
}

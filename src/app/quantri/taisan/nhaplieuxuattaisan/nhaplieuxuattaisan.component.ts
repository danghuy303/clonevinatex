import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, formatdate, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalnhaplieuxuattaisanComponent } from '../modal/modalnhaplieuxuattaisan/modalnhaplieuxuattaisan.component';

@Component({
  selector: 'app-nhaplieuxuattaisan',
  templateUrl: './nhaplieuxuattaisan.component.html',
  styleUrls: ['./nhaplieuxuattaisan.component.css']
})
export class NhaplieuxuattaisanComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  listTaiSanRef: any = [];
  filter: any = {};
  listPhanXuong: any = [];
  listTaiSan:any = [];
  IddmPhanXuong: string;
  IdDuAn: number ;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  themmoi: boolean;
  bien_Luu_ThongTin_Tai_San: any = {};
  selectedItems:any=[];
  constructor(public _modal: NgbModal,public store:StoreService, 
    public _toastr: ToastrService, 
    private _serviceTaiSan: TaisanService,
    private _service: SanXuatService, private activatedRoute: ActivatedRoute, 
  ) {}

  ngOnInit(): void {
   
    this.getListPhanXuong();
    let date = new Date();
 this.filter.TuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
 this.filter.DenNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
 this.GetList();
  }

  resetFilter() {
    this.filter = {};
    this.GetList();
  }
  GetListTaiSanDeChon(){
    this._serviceTaiSan.HieuXuatTaiSan().GetListTaiSan(this.filter.IddmPhanXuong).subscribe((res: any)=>{
      this.listTaiSan = mapArrayForDropDown(res.Data, "Ten", 'Id');
      this.listTaiSanRef = res.Data; 
      console.log(this.listTaiSanRef)
    })
  }
  GetList() {
    let data = {
      pageSize: 25,
      CurrentPage: this.paging.CurrentPage, 
        KeyWord: '',
        IdTaiSan: this.filter.IddmTaiSan,
        TuNgay: DateToUnix(this.filter.TuNgay),
        DenNgay: DateToUnix(this.filter.DenNgay),    
    }
    this._serviceTaiSan.HieuXuatTaiSan().GetList(data).subscribe((res: any) => {
      console.log(res.Data)
      this.items = res.Data;
      this.check_ThemMoi()
      this.bien_Luu_ThongTin_Tai_San = this.listTaiSanRef.find( ele => ele.Id === this.filter.IddmTaiSan);
      console.log(this.bien_Luu_ThongTin_Tai_San)
    })
  }

  getListPhanXuong() {
    this._service.GetOptions().GetPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }
  
 add() {
      let modalRef = this._modal.open(ModalnhaplieuxuattaisanComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'add';
      modalRef.componentInstance.item = {IdTaiSan:this.filter.IddmTaiSan,TenDonViTinh:this.bien_Luu_ThongTin_Tai_San.Ten,MaDonViTinh:this.bien_Luu_ThongTin_Tai_San.Ma,IddmDonViTinh:this.bien_Luu_ThongTin_Tai_San.TendmDoViTinh};
      modalRef.componentInstance.title = 'Thêm mới hiệu xuất tài sản';
      modalRef.result.then((res: any) => {
        this._toastr.success('Cập nhật thành công');
        this.GetList();
      })
        .catch(er => { console.log(er) })
  }
  update(item) {
    this._serviceTaiSan.HieuXuatTaiSan().Get(item).subscribe((res: any) => {
      let modalRef = this._modal.open(ModalnhaplieuxuattaisanComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = res;
      modalRef.componentInstance.title = 'Cập nhật hiệu xuất tài sản';
      modalRef.result.then((res: any) => {
        // this._toastr.success('Cập nhật thành công');
        this.GetList();
      })
        .catch(er => { console.log(er) })
    })
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList();
  }
 check_ThemMoi() {
   if(validVariable(this.filter.IddmTaiSan)){
     this.themmoi = true;
   }else{
     this.themmoi = false;
   }
 }
}


import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { XuatkhomodalComponent } from '../xuatkhomodal/xuatkhomodal.component';

@Component({
  selector: 'app-xuatkho',
  templateUrl: './xuatkho.component.html',
  styleUrls: ['./xuatkho.component.css']
})
export class XuatkhoComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{id:5,SoQuyTrinh:'PKK_0000_0000'}];
  filter:any={};
  listLoaiPhuongAn:any=[];
  listKho : any = [];
  listPhanXuong : any = [];
  listMatHang : any = [];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Lô',
      field: 'NoiDung',
      width: 'unset'
    },
    {
      header: 'Số Cont',
      field: 'TenTrangThai',
      width: 'unset'
    },
    {
      header: 'Mã kiện',
      field: 'TenTrangThai',
      width: 'unset'
    },
    {
      header: 'Mã bông',
      field: 'TenTrangThai',
      width: 'unset'
    },
    {
      header: 'Loại bông',
      field: 'TenTrangThai',
      width: 'unset'
    },
    {
      header: 'Ghi chú',
      field: 'TenTrangThai',
      width: 'unset'
    },
  ];
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true,ThemMoi:true};
  colsQuyTrinh: any = [
    {
      header: 'Ngày nhận',
      field: 'NgayKhoiTao',
      width: '150px'
    },
    {
      header: 'Ngày chuyển',
      field: 'SoQuyTrinh',
      width: '150px'
    },
    {
      header: 'Thời gian xử lý',
      field: 'DiaChi',
      width: '200px'
    },
    {
      header: 'Bộ phận xử lý',
      field: 'DienTich',
      width: '150px'
    },
    {
      header: 'Nội dung xử lý',
      field: 'HienTrangSuDung',
      width: '400px'
    },
  ];


  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getListKho();
    this.getListPhanXuong();
    this.activatedRoute.params.subscribe((res:any)=>{
      if(res.id!=='0'){
        let getitem =()=>{return{}};
        this.update(getitem());
      }
    })
    this.KiemTraTabTrangThai();
    // this.GetListQuyTrinh()
  }
  changeParam(id){
    this.router.navigate([`quantri/quanlykhosanxuat/xuatkho/${id}`],{replaceUrl: true})
  }
  add(){
    this.changeParam(0);
    let modalRef = this._modal.open(XuatkhomodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {};
    modalRef.componentInstance.listKho = this.listKho;
    modalRef.componentInstance.listPhanXuong = this.listPhanXuong;
    modalRef.componentInstance.listMatHang = this.listMatHang;
    modalRef.result.then((res: any) => {
      console.log(res);
      this._toastr.success('Cập nhật thành công');
      // this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  update(item){
    let modalRef = this._modal.open(XuatkhomodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.listKho = this.listKho;
    modalRef.componentInstance.listPhanXuong = this.listPhanXuong;
    modalRef.componentInstance.listMatHang = this.listMatHang;
    modalRef.result.then((res: any) => {
      console.log(res);
      this._toastr.success('Cập nhật thành công');
      // this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  changeTab(e){
    // this.trangThai = e.index+1;
    // this.GetListQuyTrinh(true);
  }
  changePage(event){
    // this.paging.CurrentPage = event.page + 1;
    // this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?){
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data={
      PageSize: 25,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter:this.filter.KeyWord,
      TuNgay:DateToUnix(this.filter.TuNgay),
      DenNgay:DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
    }
    this._service.PhieuBanGiaoBongXo().GetList(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.filter={};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai(){
    // this._service.KiemTraButtonThemMoi().subscribe((res:any)=>{
    //   this.checkQuyen = res;
    //   this.GetListQuyTrinh();
    // })
  }
  getListKho(){
    let data = {
      CurrentPage: 0
    }
    this._service.GetListdmKho(data).subscribe((res:any)=>{
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListPhanXuong(){
    let data = {
      CurrentPage: 0
    }
    this._service.GetListdmPhanXuong(data).subscribe((res:any)=>{
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
}

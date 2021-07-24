import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { ModaldanhmucloaihopdongComponent } from '../modal/modaldanhmucloaihopdong/modaldanhmucloaihopdong.component';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';

@Component({
  selector: 'app-danhmucloaihopdong',
  templateUrl: './danhmucloaihopdong.component.html',
  styleUrls: ['./danhmucloaihopdong.component.css']
})
export class DanhmucloaihopdongComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  cols: any = [
    {
      header: 'Mã loại hợp đồng',
      field: 'ma',
      width: '350px',
      align:'center'
    },
    {
      header: 'Tên loại hợp đồng',
      field: 'ten',
      width: '300px',
      align:'center'
    },
    {
      header: 'Ghi chú',
      field: 'ghiChu',
      width: '200px',
      align:'center'
    }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _danhMucHopDong:DanhMucHopDongService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdmLoaiHopDong();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmLoaiHopDong()
  }
  GetListdmLoaiHopDong(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize:20, 
      CurrentPage:this.paging.CurrentPage,
      sFilter:this.keyWord,  
      Ma:"", 
      Ten:""
    };
    this. _danhMucHopDong.DanhMucLoaiHopDong().GetList().subscribe((res:any)=>{
      debugger;
      this.items = res.data.items;
      this.paging.TotalItem = res.data.totalCount;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldanhmucloaihopdongComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'loaihopdong';
    modalRef.componentInstance.title = 'Thêm mới hình thức thanh toán';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmLoaiHopDong()
    }).catch(er=>console.log(er))
    debugger;
  }
  edit(item){
    let modalRef = this._modal.open(ModaldanhmucloaihopdongComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật loại hợp đồng';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.type = 'loaihopdong';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmLoaiHopDong()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._danhMucHopDong.DanhMucLoaiHopDong().Delete([item]).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmLoaiHopDong();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  deleteAll(){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._danhMucHopDong.DanhMucLoaiHopDong().Delete(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmLoaiHopDong();
            this.selectedItems = [];
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListdmLoaiHopDong()
  }
  
  }
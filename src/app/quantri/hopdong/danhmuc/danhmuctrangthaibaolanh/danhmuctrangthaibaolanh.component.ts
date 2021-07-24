import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../modal/modalthongbao/modalthongbao.component';
import { ModalimportexcelComponent } from '../../../modal/modalimportexcel/modalimportexcel.component';
import { ModaldanhmuctrangthaibaolanhComponent } from '../modal/modaldanhmuctrangthaibaolanh/modaldanhmuctrangthaibaolanh.component';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-danhmuctrangthaibaolanh',
  templateUrl: './danhmuctrangthaibaolanh.component.html',
  styleUrls: ['./danhmuctrangthaibaolanh.component.css']
})
export class DanhmuctrangthaibaolanhComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  cols: any = [
    {
      header: 'Mã trạng thái bảo lãnh',
      field: 'MaLoaiHopDong',
      width: '350px',
      align:'center'
    },
    {
      header: 'Tên trạng thái bảo lãnh',
      field: 'TenLoaiHopDong',
      width: '300px'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px'
    }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _danhMucHopDong:DanhMucHopDongService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdmTrangThaiBaoLanh();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmTrangThaiBaoLanh()
  }
  GetListdmTrangThaiBaoLanh(reset?){
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
    this._danhMucHopDong.DanhMucTrangThaiBaoLanh().GetList().subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldanhmuctrangthaibaolanhComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'trangthaibaolanh';
    modalRef.componentInstance.title = 'Thêm mới trạng thái bảo lãnh';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmTrangThaiBaoLanh()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldanhmuctrangthaibaolanhComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật trạng thái bảo hành';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.type = 'trangthaibaohanh';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmTrangThaiBaoLanh()
    }).catch(er=>console.log(er))
  }
  // delete(item){
  //   let modalRef = this._modal.open(ModalthongbaoComponent,{
  //     backdrop:'static'
  //   });
  //   modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
  //   modalRef.result.then(res=>{
  //     this._services.DeletedmTinhTrangTaiSan([item]).subscribe((res: any) => {
  //       if (res) {
  //         if (res.State === 1) {
  //           this._toastr.success(res.message);
  //           this.GetListdmTrangThaiBaoHanh();
  //         } else {
  //           this._toastr.error(res.message);
  //         }
  //       }
  //     })
  //   }).catch(er=>console.log(er))
  // }
  deleteAll(){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._danhMucHopDong.DanhMucTrangThaiBaoLanh().Delete(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmTrangThaiBaoLanh();
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
    this.GetListdmTrangThaiBaoLanh()
  }
  importExcel(){
    let modalRef = this._modal.open(ModalimportexcelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'TrangThaiBaoLanh';
    modalRef.result.then(res=>{
      this.GetListdmTrangThaiBaoLanh();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
}

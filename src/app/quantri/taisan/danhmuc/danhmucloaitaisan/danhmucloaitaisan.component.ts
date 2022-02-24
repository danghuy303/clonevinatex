import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { ModalloaitaisanComponent } from '../../modal/modalloaitaisan/modalloaitaisan.component';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
@Component({
  selector: 'app-danhmucloaitaisan',
  templateUrl: './danhmucloaitaisan.component.html',
  styleUrls: ['./danhmucloaitaisan.component.css']
})
export class DanhmucloaitaisanComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  Keyword:any='';
  paging: any = {  page: 1, totalPages: 1, totalCount: 1 };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '350px',
      align:'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '300px',
      align:'center'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px',
      align:'center'
    }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _danhMucTaiSan:DanhmuctaisanService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdmLoaiTaiSan();
  }
  resetFilter(){
    this.Keyword = '';
    this.GetListdmLoaiTaiSan(true);
  }
  GetListdmLoaiTaiSan(reset?){
    if(reset){
      this.paging.Page=1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize:20, 
      CurrentPage:this.paging.page,
      Keyword:this.Keyword, 
  
    };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res:any)=>{
      console.log(res)
      this.items = res.Data.Items;
      this.paging.totalCount = res.Data.TotalCount;
      this.paging.totalPages = res.Data.TotalPages;
    })
  }
  add(){
    let modalRef = this._modal.open(ModalloaitaisanComponent,{
      backdrop:'static',
      size:'lg',
     
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới loại tài sản';
    modalRef.result.then(res=>{
      this.GetListdmLoaiTaiSan()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModalloaitaisanComponent,{
      backdrop:'static',
      size:'lg',
    
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật loại tài sản';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item)); 
    modalRef.result.then(res=>{
      this.GetListdmLoaiTaiSan()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{   
      this._danhMucTaiSan.DanhMucLoaiTaiSan().Delete(item.Id).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetListdmLoaiTaiSan();
          } else {
            this._toastr.error(res.Message);
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
    const listId=this.selectedItems.map(({Id}) => Id);
    modalRef.result.then(res=>{  
      this._danhMucTaiSan.DanhMucLoaiTaiSan().DeleteList(listId).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetListdmLoaiTaiSan();
            this.selectedItems = [];
          } else {
           this._toastr.error(res.Message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  changePage(event){
    
    this.paging.page = event.page+1;
    this.GetListdmLoaiTaiSan();
  }
  

}

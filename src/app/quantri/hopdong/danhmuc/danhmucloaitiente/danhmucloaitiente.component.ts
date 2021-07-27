import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../modal/modalthongbao/modalthongbao.component';
import { ModalimportexcelComponent } from '../../../modal/modalimportexcel/modalimportexcel.component';
import { ModaldanhmucloaitienteComponent } from '../modal/modaldanhmucloaitiente/modaldanhmucloaitiente.component';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-danhmucloaitiente',
  templateUrl: './danhmucloaitiente.component.html',
  styleUrls: ['./danhmucloaitiente.component.css']
})
export class DanhmucloaitienteComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  cols: any = [
    {
      header: 'Mã tiền tệ',
      field: 'ma',
      width: '350px',
      align:'center'
    },
    {
      header: 'Tên tên tiền tệ',
      field: 'ten',
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
    this.GetListdmLoaiTienTe();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmLoaiTienTe()
  }
  GetListdmLoaiTienTe(reset?){
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
    this. _danhMucHopDong.DanhMucLoaiTienTe().GetList(data).subscribe((res:any)=>{
      debugger;
      this.items = res.data.items;
      this.paging.TotalItem = res.data.totalCount;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldanhmucloaitienteComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'loaitiente';
    modalRef.componentInstance.title = 'Thêm mới loại tiền tệ';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmLoaiTienTe()
    }).catch(er=>console.log(er))
    // debugger;
  }
  edit(item){
    let modalRef = this._modal.open(ModaldanhmucloaitienteComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật loại tiền tệ';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.type = 'loaitiente';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmLoaiTienTe()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._danhMucHopDong.DanhMucLoaiTienTe().Delete([item]).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmLoaiTienTe();
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
    debugger;
    console.log(this.selectedItems)
    modalRef.result.then(res=>{      
      this._danhMucHopDong.DanhMucLoaiTienTe().Delete(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdmLoaiTienTe();
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
    this.GetListdmLoaiTienTe()
  }
}

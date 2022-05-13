import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ImportdanhmucmodelComponent } from '../danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { ModaldmloicatComponent } from '../modal/modaldmloicat/modaldmloicat.component';

@Component({
  selector: 'app-dmchitieuloicat',
  templateUrl: './dmchitieuloicat.component.html',
  styleUrls: ['./dmchitieuloicat.component.css']
})
export class DmchitieuloicatComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord:any='';
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '200px',
      align:'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '300px',
      center:'left'
    },
    {
      header: 'Nhóm chỉ tiêu',
      field: 'NhomChiTieu',
      width: '300px',
      center:'left'
    },
    // {
    //   header: 'Ghi chú',
    //   field: 'GhiChu',
    //   width: 'unset',
    //   center:'center'
    // }
  ];
  selectedItems:any=[];
  listdmNhomKho : any = [];
  IddmNhomKho: any = '';
  constructor(private _modal:NgbModal,private _services:SanXuatService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListDanhMuc();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListDanhMuc()
  }
  GetListDanhMuc(reset?){
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
    this._services.DanhMucLoiCat().GetList(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }

  add(){
    let modalRef = this._modal.open(ModaldmloicatComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.title = 'Thêm mới danh mục chỉ tiêu lỗi cắt';
    modalRef.result.then(res=>{
      // this._toastr.success(res);
      this.GetListDanhMuc()
    }).catch(er=>console.log(er))
  }

  edit(item){
    let modalRef = this._modal.open(ModaldmloicatComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục chỉ tiêu lỗi cắt';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res=>{
      // this._toastr.success(res);
      this.GetListDanhMuc()
    }).catch(er=>console.log(er))
  }

  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DanhMucClassimat().Delete(item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListDanhMuc();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  // deleteAll(){
  //   let modalRef = this._modal.open(ModalthongbaoComponent,{
  //     backdrop:'static'
  //   });
  //   modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
  //   modalRef.result.then(res=>{
  //     this._services.DeletedmKho(this.selectedItems).subscribe((res: any) => {
  //       if (res) {
  //         if (res.State === 1) {
  //           this._toastr.success(res.message);
  //           this.GetListDanhMuc();
  //           this.selectedItems = [];
  //         } else {
  //           this._toastr.error(res.message);
  //         }
  //       }
  //     })
  //   }).catch(er=>console.log(er))
  // }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListDanhMuc();
  }
  // importExcel(){
  //   let modalRef = this._modal.open(ImportdanhmucmodelComponent,{
  //     backdrop:'static',
  //   })
  //   modalRef.componentInstance.importFunc = 'SCM_dmKho';
  //   modalRef.result.then(res=>{
  //     this.GetListDanhMuc();
  //     this._toastr.success(res.mess);
  //   })
  //   .catch(er=>console.log(er))
  // }
  // exportExcel(){
  //   let dataSearch: any = {}
  //   dataSearch.TableName = 'SCM_dmKho';
  //   dataSearch.CurrentPage = 0;
  //   this._services.Exportdm(dataSearch).subscribe((res: any) => {
  //     this._services.download(res.TenFile);
  //   })
  // }
}

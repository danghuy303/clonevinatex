import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../modal/modalthongbao/modalthongbao.component';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { MoldaldinhmucsanxuatComponent } from '../moldaldinhmucsanxuat/moldaldinhmucsanxuat.component';

@Component({
  selector: 'app-dinhmucsanxuat',
  templateUrl: './dinhmucsanxuat.component.html',
  styleUrls: ['./dinhmucsanxuat.component.css']
})
export class DinhmucsanxuatComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  cols: any = [
    {
      header: 'Nhà máy',
      field: 'ma',
      width: '350px',
      align:'center'
    },
    {
      header: 'Phân xưởng',
      field: 'ten',
      width: '300px',
      align:'center'
    },
    
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
      ma:"", 
      ten:""
    };
    this._danhMucHopDong.DanhMucLoaiTienTe().GetList(data).subscribe((res:any)=>{
      debugger;
      this.items = res.data.items;
      this.paging.TotalItem = res.data.totalCount;
    })
  }
  add(){
    let modalRef = this._modal.open(MoldaldinhmucsanxuatComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'loaitiente';
    modalRef.componentInstance.title = 'Thêm mới loại tiền tệ';
    modalRef.result.then(res=>{
      this.GetListdmLoaiTienTe()
    }).catch(er=>console.log(er))
  }
  // edit(item){
  //   let modalRef = this._modal.open(MoldaldinhmucsanxuatComponent,{
  //     backdrop:'static'
  //   });
  //   modalRef.componentInstance.opt='edit';
  //   modalRef.componentInstance.title = '';
  //   modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
  //   modalRef.componentInstance.type = 'loaitiente';
  //   modalRef.result.then(res=>{
  //     this.GetListdmLoaiTienTe()
  //   }).catch(er=>console.log(er))
  // }
  // delete(item){
  //   let modalRef = this._modal.open(ModalthongbaoComponent,{
  //     backdrop:'static'
  //   });
  //   modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
  //   modalRef.result.then(res=>{
  //     // const item=this.selectedItems[0];
  //     this._danhMucHopDong.DanhMucLoaiTienTe().Delete([item.id]).subscribe((res: any) => {
  //       if (res) {
  //         if (res.statusCode === 200) {
  //           this._toastr.success(res.message);
  //           this.GetListdmLoaiTienTe();
  //         } else {
  //           this._toastr.error(res.message);
  //         }
  //       }
  //     })
  //   }).catch(er=>console.log(er))
  // }
 
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListdmLoaiTienTe()
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../modal/modalthongbao/modalthongbao.component';
import { ModalimportexcelComponent } from '../../../modal/modalimportexcel/modalimportexcel.component';
import { ModaldanhmucloaitienteComponent } from '../modal/modaldanhmucloaitiente/modaldanhmucloaitiente.component';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-danhmucthutucthanhtoan',
  templateUrl: './danhmucthutucthanhtoan.component.html',
  styleUrls: ['./danhmucthutucthanhtoan.component.css']
})
export class DanhmucthutucthanhtoanComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  cols: any = [
    // {
    //   header: 'Mã tiền tệ',
    //   field: 'MaTienTe',
    //   width: '350px',
    //   align:'center'
    // },
    {
      header: 'Tên thủ tục',
      field: 'TenThuTuc',
      width: '300px'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '400px'
    }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _danhMucHopDong:DanhMucHopDongService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdmThuTucThanhToan();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdmThuTucThanhToan()
  }
  GetListdmThuTucThanhToan(reset?){
    // if(reset){
    //   this.paging.CurrentPage=1;
    //   this.paginator.changePage(0);
    // }
    // let data = {
    //   PageSize:20, 
    //   CurrentPage:this.paging.CurrentPage,
    //   sFilter:this.keyWord,  
    //   Ma:"", 
    //   Ten:""
    // };
    this._danhMucHopDong.DanhMucThuTucThanhToan().GetList().subscribe((res:any)=>{
      this.items = res.items;
      // this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(ModaldanhmucloaitienteComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'thutucthanhtoan';
    modalRef.componentInstance.title = 'Thêm mới thủ tục thanh toán';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmThuTucThanhToan()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModaldanhmucloaitienteComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật thủ tục thanh toán';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.type = 'thutucthanhtoan';
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdmThuTucThanhToan()
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
  //           this.GetListdmThuTucThanhToan();
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
      // this._danhMucHopDong.DanhMucThuTucThanhToan().Delete(this.selectedItems).subscribe((res: any) => {
      //   if (res) {
      //     if (res.State === 1) {
      //       this._toastr.success(res.message);
      //       this.GetListdmThuTucThanhToan();
      //       this.selectedItems = [];
      //     } else {
      //       this._toastr.error(res.message);
      //     }
      //   }
      // })
    }).catch(er=>console.log(er))
  }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetListdmThuTucThanhToan()
  }
  importExcel(){
    let modalRef = this._modal.open(ModalimportexcelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'ThuTucThanhToan';
    modalRef.result.then(res=>{
      this.GetListdmThuTucThanhToan();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
}


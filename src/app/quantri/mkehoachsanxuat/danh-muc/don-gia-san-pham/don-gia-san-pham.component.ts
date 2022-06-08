import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { DonGiaSanPhamModalComponent } from './don-gia-san-pham-modal/don-gia-san-pham-modal.component';

@Component({
  selector: 'app-don-gia-san-pham',
  templateUrl: './don-gia-san-pham.component.html',
  styleUrls: ['./don-gia-san-pham.component.css']
})
export class DonGiaSanPhamComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  // item: any={};
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  cols: any = [
    {
      header: 'Năm',
      field: 'Nam',
      width: '300px',
      align:'center'
    }    
  ];
  selectedItems:any=[];
  constructor(
    private _modal:NgbModal,
    private _danhMucHopDong:DanhMucHopDongService,
    private _toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.GetList();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetList(true);
  }
  GetList(reset?){
    if(reset){
      this.paging.CurrentPage=1;
      this.paginator.changePage(0);
    }
    this. _danhMucHopDong.DanhMucDonGia().GetList().subscribe((res:any)=>{
      console.log(res);
      this.items = res.Data;
      // this.items = res.Data.Items;
      // this.paging.TotalItem = res.Data.TotalCount;
    })
  }
  add(){
    let modalRef = this._modal.open(DonGiaSanPhamModalComponent,{
      backdrop:'static',
      size:'lg'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới đơn giá sản phẩm';
    modalRef.result.then(res=>{
      this.GetList()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(DonGiaSanPhamModalComponent,{
      backdrop:'static',
      size:'xl'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật đơn giá sản phẩm năm ' +item.Nam;
    modalRef.componentInstance.Nam = item.Nam; 
    modalRef.result.then(res=>{
      this.GetList()
    }).catch(er=>console.log(er))
  }
  delete(item){
    // let modalRef = this._modal.open(ModalthongbaoComponent,{
    //   backdrop:'static'
    // });
    // modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    // modalRef.result.then(res=>{
    //   // const item=this.selectedItems[0];
    //   this._danhMucHopDong.DanhMucTyGia().Delete([item.Id]).subscribe((res: any) => {
    //     if (res) {
    //       if (res.StatusCode === 200) {
    //         this._toastr.success(res.Message);
    //         this.GetList();
    //       } else {
    //         this._toastr.error(res.Message);
    //       }
    //     }
    //   })
    // }).catch(er=>console.log(er))
  }
  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetList()
  }

}

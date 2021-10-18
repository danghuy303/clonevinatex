import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { DanhmuctieuchidanhgiamodalComponent } from './danhmuctieuchidanhgiamodal/danhmuctieuchidanhgiamodal.component';

@Component({
  selector: 'app-danhmuctieuchidanhgia',
  templateUrl: './danhmuctieuchidanhgia.component.html',
  styleUrls: ['./danhmuctieuchidanhgia.component.css']
})
export class DanhmuctieuchidanhgiaComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  cols: any = [
    {
      header: 'Mã tiêu chí đánh giá',
      field: 'ma',
      width: '200px',
      align:'center'
    },
    {
      header: 'Tên tiêu chí đánh giá',
      field: 'ten',
      width: '300px',
      align:'center'
    },
    {
      header: 'Tên tiêu chí đánh giá cha',
      field: 'tendmTieuChiCha',
      width: '300px',
      align:'center'
    },
    {
      header: 'Điểm',
      field: 'diemToiDa',
      align:'center'
    },
    {
      header: 'Ghi chú',
      field: 'ghiChu',
      align:'center'
    }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _danhMucHopDong:HopDongService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdm();
  }
  resetFilter(){
    this.keyWord = '';
    this.GetListdm()
  }
  GetListdm(reset?){
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
    this._danhMucHopDong.dmTieuChiDanhGia().GetList(data).subscribe((res:any)=>{
      this.items = res.data.items;
      this.paging.TotalItem = res.data.totalCount;
    })
  }
  add(){
    let modalRef = this._modal.open(DanhmuctieuchidanhgiamodalComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.title = 'Thêm mới danh mục tiêu chí đánh giá';
    modalRef.result.then(res=>{
      this.GetListdm()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(DanhmuctieuchidanhgiamodalComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục tiêu chí đánh giá';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res=>{
      this.GetListdm()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._danhMucHopDong.dmTieuChiDanhGia().Delete(item.id).subscribe((res: any) => {
        if (res) {
          if (res.statusCode === 200) {
            this._toastr.success(res.message);
            this.GetListdm();
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
    this.GetListdm()
  }
}

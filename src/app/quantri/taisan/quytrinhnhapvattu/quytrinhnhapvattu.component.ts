import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { NhapvattuComponent } from '../nhapvattu/nhapvattu.component';

@Component({
  selector: 'app-quytrinhnhapvattu',
  templateUrl: './quytrinhnhapvattu.component.html',
  styleUrls: ['./quytrinhnhapvattu.component.css']
})
export class QuytrinhnhapvattuComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  Keyword:any='';
  paging: any = {Page: 1, TotalPages: 1, TotalCount: 1 };
  cols: any = [
    {
      header: 'Số quy trình',
      field: 'Ma',
      width: '350px',
      align:'center'
    },
    {
      header: 'Ngày',
      field: 'Ten',
      width: '300px',
      align:'center'
    },
    {
      header: 'Trạng thái',
      field: 'Ten',
      width: '300px',
      align:'center'
    },
    {
      header: 'Nội dung',
      field: 'MoTa',
      width: '200px',
      align:'center'
    }
  ];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _danhMucTaiSan:DanhmuctaisanService,private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.GetListdmDonViTinh();
  }
  resetFilter(){
    this.Keyword = '';
    this.GetListdmDonViTinh(true);
  }
  GetListdmDonViTinh(reset?){
    if(reset){
      this.paging.Page=1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize:20, 
      CurrentPage:this.paging.Page,
      Keyword:this.Keyword,  
      Ma:"", 
      Ten:""    
    };
    this._danhMucTaiSan.DanhMucDonViTinh().GetList(data).subscribe((res:any)=>{
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  add(){
    let modalRef = this._modal.open(NhapvattuComponent,{
      backdrop:'static',
      size: 'fullscreen-100',
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Nhập vật tư';
    modalRef.result.then(res=>{
      this.GetListdmDonViTinh()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(NhapvattuComponent,{
      backdrop:'static',
      size: 'fullscreen-100',
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật nhập vật tư';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item)); 
    modalRef.result.then(res=>{
      this.GetListdmDonViTinh()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{   
      this._danhMucTaiSan.DanhMucDonViTinh().Delete([item.Id]).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetListdmDonViTinh();
          } else {
            this._toastr.error(res.Message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  changePage(event){
    this.paging.Page = event.page+1;
    this.GetListdmDonViTinh()
  }
}

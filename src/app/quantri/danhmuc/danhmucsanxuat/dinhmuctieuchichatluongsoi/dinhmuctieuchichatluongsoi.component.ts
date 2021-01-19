import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DinhmuctieuchichatluongsoimodalComponent } from '../dinhmuctieuchichatluongsoimodal/dinhmuctieuchichatluongsoimodal.component';

@Component({
  selector: 'app-dinhmuctieuchichatluongsoi',
  templateUrl: './dinhmuctieuchichatluongsoi.component.html',
  styleUrls: ['./dinhmuctieuchichatluongsoi.component.css']
})
export class DinhmuctieuchichatluongsoiComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord:any='';
  filter:any={
  };
  cols: any = [   
    {
      header: 'Mã mặt hàng',
      field: 'Ma',
      width: '100px',
      align:'center'
    },
    {
      header: 'Tên mặt hàng',
      field: 'Ten',
      width: '200px',
      align:'center'
    },    
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset',
      align:'left'
    }
  ];
  selectedItems: any = [];
  constructor(private _modal:NgbModal,
    private _services:SanXuatService,
    private _toastr:ToastrService) 
    { }

  ngOnInit(): void {
    this.GetListdm();
  }
  resetFilter(){
    this.filter = {
    };
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
      sFilter:this.filter.keyWord?this.filter.keyWord:'',
      CongDoan:this.filter.CongDoan?this.filter.CongDoan:'',
      Ma:"", 
      Ten:"",
    };
    this._services.GetListDinhMuc(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(DinhmuctieuchichatluongsoimodalComponent,{
      backdrop:'static',
    });
    modalRef.componentInstance.opt='add';

    modalRef.result.then(res=>{
      this.GetListdm()
    }).catch(er=>console.log(er))
  }
  edit(item){
    this._services.GetDinhMuc(item.Id).subscribe((res:any)=>{
    let modalRef = this._modal.open(DinhmuctieuchichatluongsoimodalComponent,{
      backdrop:'static',
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(res));
    modalRef.result.then(res=>{
      this.GetListdm()
    }).catch(er=>console.log(er))
    })
  }

  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    let itemDel : any = {};
    itemDel.Id = item.Id;
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{

      this._services.DeleteDinhMuc(itemDel).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdm();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er=>console.log(er))
  }
  deleteAll(){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static',
      size: 'fullscreen',
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeleteDinhMuc(this.selectedItems).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
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
    this.GetListdm();
  }

}

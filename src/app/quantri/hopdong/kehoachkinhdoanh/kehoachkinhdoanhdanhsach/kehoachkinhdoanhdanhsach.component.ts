import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { ModalkehoachkinhdoanhchitiettaomoiComponent } from '../modal/modalkehoachkinhdoanhchitiettaomoi/modalkehoachkinhdoanhchitiettaomoi.component';
@Component({
  selector: 'app-kehoachkinhdoanhdanhsach',
  templateUrl: './kehoachkinhdoanhdanhsach.component.html',
  styleUrls: ['./kehoachkinhdoanhdanhsach.component.css']
})
export class KehoachkinhdoanhdanhsachComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
    items: any = [];
    // item: any={};
    keyWord:any='';
    paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
    trangThai: any = 1;
    selectedItems:any=[];
    filter: any = {};
    listNhaMay: Array<any> = [];
    idDuAn: string = "";
    showDropDown: boolean = false;
    OSName: string = "HỆ THỐNG Quản lý Nhà – Đất";
    userBtn: any;
    userInfo: any;
    userSub: any;

    constructor(private _modal:NgbModal,private _danhMucHopDong:DanhMucHopDongService,
      private _toastr:ToastrService,
      private _services: SanXuatService,
      private store: StoreService,) { }
  
    ngOnInit(): void {
      this.GetListKeHoachKinhDoanh();
    }
    resetFilter(){
      this.keyWord = '';
      this.GetListKeHoachKinhDoanh(true);
    }
    GetListKeHoachKinhDoanh(reset?){
      if(reset){
        this.paging.CurrentPage=1;
        this.paginator.changePage(0);
      }
      let data = {
        PageSize:20, 
        CurrentPage:this.paging.CurrentPage,
        sFilter:this.keyWord,  
          
      };
      this._danhMucHopDong.DanhSachKeHoachKinhDoanh().GetList(data).subscribe((res:any)=>{
        this.items = res.Data.Items;
        this.paging.TotalItem = res.Data.TotalCount;
      })
    }
    add(){
      let modalRef = this._modal.open(ModalkehoachkinhdoanhchitiettaomoiComponent,{
        backdrop:'static',
        size: 'fullscreen'
      });
      modalRef.componentInstance.opt='add';
      modalRef.componentInstance.type = 'themmoi';
      modalRef.componentInstance.title = 'Thêm mới kế hoạch kinh doanh';
      modalRef.result.then(res=>{
        this.GetListKeHoachKinhDoanh()
      }).catch(er=>console.log(er))

     
    }
  
    changePage(event){
      this.paging.CurrentPage = event.page+1;
      this.GetListKeHoachKinhDoanh()
    }
    
    }

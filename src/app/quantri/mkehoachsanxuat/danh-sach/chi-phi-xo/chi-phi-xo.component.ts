import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { ChiPhiXoModalComponent } from './chi-phi-xo-modal/chi-phi-xo-modal.component';

@Component({
  selector: 'app-chi-phi-xo',
  templateUrl: './chi-phi-xo.component.html',
  styleUrls: ['./chi-phi-xo.component.css']
})
export class ChiPhiXoComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  Nam:number ;
  keyWord:any='';
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 1 };
  userBtn: any;
  userInfo: any;
  userSub: any;
  listNhaMay: Array<any> = [];
  selectedItems:any=[];
  constructor(private _modal:NgbModal,private _danhMucHopDong:DanhMucHopDongService,private _toastr:ToastrService,
    private _auth: AuthenticationService,private _services: SanXuatService,) {this.userInfo = this._auth.currentUserValue; }

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
    this._services
      .GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id)
      .subscribe((res: any) => {
        this.listNhaMay = res;
        // this.idDuAn = res[0].Id;ss
        let data = {
          PageSize:20, 
          CurrentPage:this.paging.CurrentPage,
          sFilter:this.keyWord,  
          
        };
        this._danhMucHopDong.KeHoachKinhDoanh_DonGiaDinhMuc().ChiPhi('Xo').GetList().subscribe((res:any)=>{
          console.log(res);
          this.items = res.Data;
          this.items.filter(obj=>{            
            obj.TenDuAn = this.listNhaMay.find(ele=>ele.Id==obj.IdDuAn).TenDuAn;            
          });
          
          // this.paging.TotalItem = res.Data.TotalCount;
        })
      });   
  }
  
  add(){
    let modalRef = this._modal.open(ChiPhiXoModalComponent,{
      backdrop:'static',
      size:'fullscreen'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = '';
    modalRef.componentInstance.title = 'Thêm mới chi phí xơ';
    modalRef.result.then(res=>{
      this.GetList();
    }).catch(er=>console.log(er))
  }

edit(item){
  this._danhMucHopDong.KeHoachKinhDoanh_DonGiaDinhMuc().ChiPhi('Xo').Get(this.Nam).subscribe((res: any) => {
    // res1.listItem = res1.lstChiTiet;
    let modalRef = this._modal.open(ChiPhiXoModalComponent,{
      backdrop:'static',
      size:'fullscreen'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.type = '';
    modalRef.componentInstance.title = 'Cập nhật chi phí xơ';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item)); 
    modalRef.result.then(res=>{
      this.GetList();
    }).catch(er=>console.log(er))
  })
}

  changePage(event){
    this.paging.CurrentPage = event.page+1;
    this.GetList()
  }
  
}

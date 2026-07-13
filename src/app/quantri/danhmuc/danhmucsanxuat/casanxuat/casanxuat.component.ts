import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalimportexcelComponent } from 'src/app/quantri/modal/modalimportexcel/modalimportexcel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ModalcasanxuatComponent } from './modalcasanxuat/modalcasanxuat.component';
import { ImportdanhmucmodelComponent } from '../modals/importdanhmucmodel/importdanhmucmodel.component';
import { QuantriComponent } from 'src/app/quantri/quantri.component';

@Component({
  selector: 'app-casanxuat',
  templateUrl: './casanxuat.component.html',
  styleUrls: ['./casanxuat.component.css']
})
export class CasanxuatComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord:any='';
  get listCongTy(): any[] {
    return this.quantri.listNhaMay || [];
  }
  IdCongTy: any = null;
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '100px',
      align: 'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '150px',
      align: 'left'
    },
    {
      header: 'Tên công ty',
      field: 'TenCongTy',
      width: '150px',
      align: 'left'
    },
    {
      header: 'Tên nhà máy',
      field: 'TendmPhanXuong',
      width: '150px',
      align: 'left'
    },
    {
      header: 'Số giờ làm việc',
      field: 'SoGioLamViec',
      width: '120px',
      align: 'center'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px',
      align: 'left'
    },
    {
      header: 'Hoạt động',
      field: 'isHoatDong',
      width: '100px',
      align: 'center'
    }
  ];
  selectedItems:any=[];
  constructor(
    private _modal: NgbModal,
    private _services: SanXuatService,
    private _toastr: ToastrService,
    public quantri: QuantriComponent
  ) { }

  ngOnInit(): void {
    this.GetListdm();
  }

  resetFilter(){
    this.keyWord = '';
    this.IdCongTy = null;
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
      Ma:"", 
      Ten:"",
      IdCongTy: this.IdCongTy
    };
    this._services.GetListdmCaSanXuat(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  add(){
    let modalRef = this._modal.open(ModalcasanxuatComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.title = 'Thêm mới danh mục ca sản xuất';
    modalRef.componentInstance.listCongTy = this.listCongTy;
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdm()
    }).catch(er=>console.log(er))
  }
  edit(item){
    let modalRef = this._modal.open(ModalcasanxuatComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.opt='edit';
    modalRef.componentInstance.title = 'Cập nhật danh mục ca sản xuất';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.listCongTy = this.listCongTy;
    modalRef.result.then(res=>{
      this._toastr.success(res);
      this.GetListdm()
    }).catch(er=>console.log(er))
  }
  delete(item){
    let modalRef = this._modal.open(ModalthongbaoComponent,{
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmCaSanXuat(item).subscribe((res: any) => {
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
      backdrop:'static'
    });
    modalRef.componentInstance.message='Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res=>{
      this._services.DeletedmCaSanXuat(this.selectedItems).subscribe((res: any) => {
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
  importExcel(){
    let modalRef = this._modal.open(ImportdanhmucmodelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.importFunc = 'casanxuat';
    modalRef.result.then(res=>{
      this.GetListdm();
      this._toastr.success(res.mess);
    })
    .catch(er=>console.log(er))
  }
  exportExcel(){
    let dataSearch: any = {}
    dataSearch.TableName = 'SCM_dmCaSanXuat';
    dataSearch.CurrentPage = 0;
    this._services.Exportdm(dataSearch).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }
}

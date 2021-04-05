import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { TonkhodanhsachchitietComponent } from '../tonkhodanhsachchitiet/tonkhodanhsachchitiet.component';

@Component({
  selector: 'app-tonkho',
  templateUrl: './tonkho.component.html',
  styleUrls: ['./tonkho.component.css']
})
export class TonkhoComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{id:5,SoQuyTrinh:'PNK_0000_0000'}];
  filter:any={};
  listdmKho:any=[];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: 'unset'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset'
    },
    {
      header: 'Số lượng',
      field: 'SoLuong',
      width: 'unset'
    },
    {
      header: 'Trọng lượng',
      field: 'TongTrongLuong',
      width: 'unset'
    },
  ];
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true,ThemMoi:true};
  listPhanXuong: any = [];
  listCaSanXuat: any = [];
  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.filter.KeyWord = '';
    this.getListdmKho();
    this.getListCaSanXuat();
    this.getListPhanXuong();
  }
  getListdmKho() {
    let data = {
      CurrentPage : 0
    }
    this._service.GetListdmKho(data).subscribe((res: any) => {
      this.listdmKho = res;
      if(this.listdmKho.length > 0 && this.listdmKho !== undefined){
        this.filter.IddmKho = this.listdmKho[3].Id;
        this.listdmKho[3].select = true
        this.GetListQuyTrinh();
      }
    })
  }
  getListCaSanXuat() {
    this._service.GetListOptdmCaSanXuatThucTe().subscribe((res: any) => {
      this.listCaSanXuat = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListPhanXuong() {
    this._service.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  
  changeTab(e){
    this.trangThai = e.index+1;
    this.GetListQuyTrinh(true);
  }
  changePage(event){
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?, item : any= {}){
    if(item.Id !== undefined){
      this.listdmKho.forEach(element => {
        element.select = false;
      });
      item.select = true;
    }

    if (reset) {
      this.paging.CurrentPage = 1;
      this.filter.IddmKho = item.Id;
    }
    let data: any = {
      IddmKho: this.filter.IddmKho,
      CurrentPage: this.paging.CurrentPage,
      sFilter: this.filter.KeyWord
    }
    // this._service.getLuuKhoKhac(this.filter.IddmKho, '', this.paging.CurrentPage, this.filter.KeyWord).subscribe((res: any) => {
    this._service.GetLuuKhoTheKho(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.filter={};
    this.GetListQuyTrinh(true);
  }
  GetTheKho(item) {
    item.IddmKho = this.filter.IddmKho
    let modalRef = this._modal.open(TonkhodanhsachchitietComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) 
        this.GetListQuyTrinh();
    })
  }
}

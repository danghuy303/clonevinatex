import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { KehoachsanxuatmodalComponent } from '../kehoachsanxuatmodal/kehoachsanxuatmodal.component';

@Component({
  selector: 'app-kehoachsanxuat',
  templateUrl: './kehoachsanxuat.component.html',
  styleUrls: ['./kehoachsanxuat.component.css']
})
export class KehoachsanxuatComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter:any={};
  listLoaiPhuongAn:any=[];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Đơn vị',
      field: '',
      width: 'unset'
    },
    {
      header: 'Tổng sản lượng',
      field: 'NoiDung',
      width: 'unset'
    },
    {
      header: 'Tổng số ca',
      field: 'TenTrangThai',
      width: 'unset'
    },
    {
      header: 'Ghi chú',
      field: 'TenTrangThai',
      width: 'unset'
    },
  ];
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true,ThemMoi:true};

  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((res:any)=>{
      if(res.id!=='0'){
        let getitem =()=>{return{}};
        this.update(getitem());
      }
    })
    this.KiemTraTabTrangThai();
    this.GetListQuyTrinh()
  }
  changeParam(id){
    this.router.navigate([`quantri/kehoachsanxuat/giaokehoachsanxuat/${id}`],{replaceUrl: true})
  }
  add(){
    this.changeParam(0);
    let modalRef = this._modal.open(KehoachsanxuatmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {
      listKienHang:[]
      // ID:null,
      // TepDinhKems:[],
      // templistTaiSanQuyTrinh:[],
      // listTaiSanQuyTrinh:[]
    }
    modalRef.result.then((res: any) => {
      console.log(res);
      this._toastr.success('Cập nhật thành công');
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  update(item){
    let modalRef = this._modal.open(KehoachsanxuatmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
      console.log(res);
      this._toastr.success('Cập nhật thành công');
      this.GetListQuyTrinh();
    })
      .catch(er => { console.log(er) })
  }
  changeTab(e){
    this.trangThai = e.index+1;
    this.GetListQuyTrinh(true);
  }
  changePage(event){
    this.paging.CurrentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?){
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data={
      PageSize: 25,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter:this.filter.KeyWord,
      TuNgay:(new Date(this.filter.TuNgay).getTime()/1000)||0,
      DenNgay:(new Date(this.filter.DenNgay).getTime()/1000)||0,
      Ma: "",
      Ten: "",
    }
    this._service.GiaoKeHoachSanXuat().GetList(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.filter={};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai(){
    // this._service.KiemTraButtonThemMoi().subscribe((res:any)=>{
    //   this.checkQuyen = res;
    //   this.GetListQuyTrinh();
    // })
  }
}

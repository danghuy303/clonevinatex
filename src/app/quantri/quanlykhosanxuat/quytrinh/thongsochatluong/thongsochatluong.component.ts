import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';
import { ThongsochatluongmodalComponent } from '../thongsochatluongmodal/thongsochatluongmodal.component';

@Component({
  selector: 'app-thongsochatluong',
  templateUrl: './thongsochatluong.component.html',
  styleUrls: ['./thongsochatluong.component.css']
})
export class ThongsochatluongComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  eAction: any = "PHIEUNHAPCHATLUONG";
  items: any = [{id:5,SoQuyTrinh:'PNK_0000_0000'}];
  filter:any={};
  listLoaiPhuongAn:any=[];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Mã PO/Hợp đồng',
      field: 'SoQuyTrinh',
      width: 'unset'
    },
    {
      header: 'Lô',
      field: 'NoiDung',
      width: 'unset'
    },
    {
      header: 'Tổng Cont',
      field: 'TenTrangThai',
      width: 'unset'
    },
    {
      header: 'Mã bông',
      field: 'TenTrangThai',
      width: 'unset'
    },
    {
      header: 'Loại bông',
      field: 'TenTrangThai',
      width: 'unset'
    },
    {
      header: 'Tổng số kiện',
      field: 'TenTrangThai',
      width: 'unset'
    },
    {
      header: 'Tổng khối lượng',
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
  colsQuyTrinh: any = [
    {
      header: 'Ngày nhận',
      field: 'NgayKhoiTao',
      width: '150px'
    },
    {
      header: 'Ngày chuyển',
      field: 'SoQuyTrinh',
      width: '150px'
    },
    {
      header: 'Thời gian xử lý',
      field: 'DiaChi',
      width: '200px'
    },
    {
      header: 'Bộ phận xử lý',
      field: 'DienTich',
      width: '150px'
    },
    {
      header: 'Nội dung xử lý',
      field: 'HienTrangSuDung',
      width: '400px'
    },
  ];


  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    // this.activatedRoute.params.subscribe((res:any)=>{
    //   if(res.id!=='0'){
    //     // let getitem =()=>{return this.items.filter(ele=>ele.id === res.id.toString())[0]};
    //     this.update(res.id);
    //   }
    // })
    this.KiemTraTabTrangThai();
    this.GetListQuyTrinh()
  }
  changeParam(id){
    if(this._modal.hasOpenModals()){
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/quanlykhosanxuat/thongsochatluong/${id}`],{replaceUrl: true})
  }
  add(){
    this.changeParam(0);
    let modalRef = this._modal.open(ThongsochatluongmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      console.log(res);
      this._toastr.success('Cập nhật thành công');
    })
      .catch(er => { console.log(er) })
  }
  update(item){
    let modalRef = this._modal.open(ThongsochatluongmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
      console.log(res);
      this._toastr.success('Cập nhật thành công');
    })
      .catch(er => { console.log(er) })
  }
  changeTab(e){
    // this.trangThai = e.index+1;
    // this.GetListQuyTrinh(true);
  }
  changePage(event){
    // this.paging.CurrentPage = event.page + 1;
    // this.GetListQuyTrinh();
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
      TuNgay:DateToUnix(this.filter.TuNgay),
      DenNgay:DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
    }
    this._service.GetListPhieuNhapChatLuong(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.filter={};
    this.GetListQuyTrinh(true);
  }
  KiemTraTabTrangThai(){
  //  this._service.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
  //     this.checkQuyen = res;
  //     this.GetListQuyTrinh();
  //   })
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { LobongmodalComponent } from '../lobongmodal/lobongmodal.component';

@Component({
  selector: 'app-lobong',
  templateUrl: './lobong.component.html',
  styleUrls: ['./lobong.component.css']
})
export class LobongComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  filter:any={};
  listLoaiPhuongAn:any=[];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '150px'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '150px'
    },
    {
      header: 'Ngày',
      field: 'Ngay',
      width: '150px',
      type:'date'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px'
    },
  ];
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true,ThemMoi:true};

  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,
    private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.GetListQuyTrinh()
  }
  update(item){
    let modalRef = this._modal.open(LobongmodalComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
      this.GetListQuyTrinh();
    })
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
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      sFilter:this.filter.KeyWord,
      TuNgay:DateToUnix(this.filter.TuNgay),
      DenNgay:DateToUnix(this.filter.DenNgay),
      Ma: "",
      Ten: "",
    }
    this._service.GetListLoBong(data).subscribe((res:any)=>{
      this.items = res.items;
      this.paging = res.paging;
    })
  }
  resetFilter(){
    this.filter={};
    this.GetListQuyTrinh(true);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { KehoachkinhdoanhnammodalComponent } from './kehoachkinhdoanhnammodal/kehoachkinhdoanhnammodal.component';

@Component({
  selector: 'app-kehoachkinhdoanhnam',
  templateUrl: './kehoachkinhdoanhnam.component.html',
  styleUrls: ['./kehoachkinhdoanhnam.component.css']
})
export class KehoachkinhdoanhnamComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  listKeHoach: any = [];
  keyWord: any = '';
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 1 };
  trangThai: any = 1;
  checkQuyen: any = {};
  constructor(
    public _modal: NgbModal,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private _danhMucHopDong: DanhMucHopDongService
  ) {
  }

  ngOnInit(): void {
    this.resetFilter();
  }

  
  resetFilter() {
    this.getListKeHoachKinhDoanh(true)
  }
  
  getListKeHoachKinhDoanh(reset?) {
    if (reset) {
      this.paging.Page = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.Page,
      sFilter: this.keyWord,
      TabTrangThai: this.trangThai

    };
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh().GetList(data).subscribe((res: any) => {
      this.listKeHoach = res.Data.Items;
      console.log("listKeHoach", this.listKeHoach);
      
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }

  changeParam(item) {
    let modalRef = this._modal.open(KehoachkinhdoanhnammodalComponent, {
      size: "fullscreen",
      backdrop: "static",
    })
    modalRef.componentInstance.kehoach = item;
    modalRef.result
      .then((res: any) => {

      })
      .catch((error: any) => {

      })
      .finally(() => {})
  }
  
  add() {
    let modalRef = this._modal.open(KehoachkinhdoanhnammodalComponent, {
      size: "fullscreen",
      backdrop: "static",
    })
    modalRef.result
      .then((res: any) => {

      })
      .catch((error: any) => {

      })
      .finally(() => {})
  }

  changeTab(e) {

  }

  changePage(event) {
    this.paging.Page = event.page + 1;
    this.getListKeHoachKinhDoanh()
  }
}

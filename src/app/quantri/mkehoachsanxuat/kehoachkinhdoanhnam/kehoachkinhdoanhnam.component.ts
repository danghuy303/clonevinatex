import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { KehoachkinhdoanhnammodalComponent } from './kehoachkinhdoanhnammodal/kehoachkinhdoanhnammodal.component';

@Component({
  selector: 'app-kehoachkinhdoanhnam',
  templateUrl: './kehoachkinhdoanhnam.component.html',
  styleUrls: ['./kehoachkinhdoanhnam.component.css']
})
export class KehoachkinhdoanhnamComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  filter: any = {};
  listKeHoach: any = [];
  keyWord: any = '';
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 1 };
  trangThai: any = 1;
  checkQuyen: any = {};
  years: any = [];
  eAction = "QUYTRINHKEHOACHSANLUONGNAM";

  constructor(
    public _modal: NgbModal,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private _services: SanXuatService,
    private _danhMucHopDong: DanhMucHopDongService
  ) {
  }

  ngOnInit(): void {
    this.getYearsForDropDown();
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        console.log(res);
        
        this._danhMucHopDong
          .DanhSachKeHoachKinhDoanh()
          .Get(res.id)
          .subscribe((res: any) => {
            this.update(res);
          });
      }
    });
    this.resetFilter();
    this.KiemTraTabTrangThai();
  }

  resetFilter() {
    this.filter = {};
    this.getListKeHoachKinhDoanh(true)
  }

  getYearsForDropDown() {
    let date = new Date().getFullYear() - 1;
    for (let i = 0; i <= 20; i++) {
      date++;
      this.years.push({
        label: date,
        value: date
      });
    }
  }
  
  getListKeHoachKinhDoanh(reset?) {
    if (reset) {
      this.paging.Page = 1;
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.Page,
      sFilter: this.filter.keyword,
      TabTrangThai: this.trangThai,
      Nam: this.filter.Nam || 0
    };
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh().GetList(data).subscribe((res: any) => {
      this.listKeHoach = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  
  changeParam(id) {
    this.router.navigate([`quantri/mkehoachsanxuat/kehoachkinhdoanhnam/${id}`], {
      replaceUrl: true,
    });
  }

  update(item) {
    let modalRef = this._modal.open(KehoachkinhdoanhnammodalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.kehoach = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.title = 'Cập nhật kế hoạch kinh doanh';
    modalRef.result
      .then((res: any) => {})
      .catch((error: any) => {})
      .finally(() => {
        this.getListKeHoachKinhDoanh();
        this.changeParam(0);
      })
  }
  
  add() {
    let modalRef = this._modal.open(KehoachkinhdoanhnammodalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.result
      .then((res: any) => {})
      .catch((error: any) => {})
      .finally(() => {
        this.getListKeHoachKinhDoanh();
      })
  }

  KiemTraTabTrangThai() {
    this._services.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.getListKeHoachKinhDoanh();
    });
  }

  changeTab(e) {
    this.trangThai = e.index + 1;
    this.getListKeHoachKinhDoanh(true);
  }

  changePage(event) {
    this.paging.Page = event.page + 1;
    this.getListKeHoachKinhDoanh()
  }
}

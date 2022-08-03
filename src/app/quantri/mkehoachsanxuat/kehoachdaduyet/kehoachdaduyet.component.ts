import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { KehoachkinhdoanhnammodalComponent } from '../kehoachkinhdoanhnam/kehoachkinhdoanhnammodal/kehoachkinhdoanhnammodal.component';
import { KeHoachDaDuyetModalComponent } from './ke-hoach-da-duyet-modal/ke-hoach-da-duyet-modal.component';

@Component({
  selector: 'app-kehoachdaduyet',
  templateUrl: './kehoachdaduyet.component.html',
  styleUrls: ['./kehoachdaduyet.component.css']
})
export class KehoachdaduyetComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  listKeHoach: any = [];
  filter: any = {};
  years: any = [];
  keyWord: any = '';
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 1 };
  trangThai: any = 1;
  checkQuyen: any = {};
  eAction = "PHUONGANPHABONG";

  constructor(
    public _modal: NgbModal,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _services: SanXuatService,
    private _danhMucHopDong: DanhMucHopDongService
  ) { }

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
      // this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.Page,
      sFilter: this.filter.keyword,
      Nam: this.filter.Nam
      // TabTrangThai: this.trangThai
    };
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh().GetKeHoachKinhDoanhDaDuyet(data).subscribe((res: any) => {
      this.listKeHoach = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }

  changeParam(id) {
    this.router.navigate([`quantri/mkehoachsanxuat/kehoachdaduyet/${id}`], {
      replaceUrl: true,
    });
  }

  update(item) {
    let modalRef = this._modal.open(KeHoachDaDuyetModalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    })
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.kehoach = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.title = 'Cập nhật kế hoạch kinh doanh';
    modalRef.result
      .then((res: any) => {
        // this.changeParam(res.Data.Id);
        // console.log("res", res);
        if (res) {
          this.changeParam(res)
        } else {
          this.changeParam(0)
        }
      }).then(
    )
      .catch((error: any) => {
        this.changeParam(0)
       })
      .finally(() => {
        this.getListKeHoachKinhDoanh();
      })
  }

  add() {
    let modalRef = this._modal.open(KeHoachDaDuyetModalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.result
      .then((res: any) => { })
      .catch((error: any) => { })
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { LapChiPhiModalComponent } from './lap-chi-phi-modal/lap-chi-phi-modal.component';

@Component({
  selector: 'app-lap-chi-phi',
  templateUrl: './lap-chi-phi.component.html',
  styleUrls: ['./lap-chi-phi.component.css']
})
export class LapChiPhiComponent implements OnInit {

  filter: any = {};
  listKeHoach: any = [];
  paging: any = { 
    Page: 1, 
    TotalPages: 1, 
    TotalCount: 1 
  };
  trangThai: any = 1;
  checkQuyen: any = {};
  eAction = "QUYTRINHKEHOACHCHIPHINAM";
  years: any = [];

  constructor(
    public _modal: NgbModal,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private _services: SanXuatService,
    private _danhMucHopDong: DanhMucHopDongService
  ) { }

  ngOnInit(): void {
    // this.initData();
    this.getYearsForDropDown();
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._danhMucHopDong
          .KeHoachChiPhi()
          .GetById(res.id)
          .subscribe((res: any) => {
            this.update(res);
          });
      }
    });
    this.resetFilter();
    this.KiemTraTabTrangThai();
  }

  resetFilter() {
    this.getListKeHoachChiPhi(true)
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

  getListKeHoachChiPhi(reset?) {
    if (reset) {
      this.paging.page = 1;
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.page,
      KeyWord: this.filter.keyword,
      TabTrangThai: this.trangThai,
      Nam: this.filter.Nam || 0
      // TuNgay: DateToUnix(this.filter.tuNgay),
      // DenNgay: DateToUnix(this.filter.denNgay),
      // IdDuAn: 0,
    };
    this._danhMucHopDong.KeHoachChiPhi().GetAll(data).subscribe((res: any) => {
      this.listKeHoach = res.Data.Items;
      console.log("listKeHoach", this.listKeHoach);
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }

  changeParam(id) {
    this.router.navigate([`quantri/mkehoachsanxuat/kehoachchiphi/${id}`], {
      replaceUrl: true,
    });
  }

  update(item) {
    let modalRef = this._modal.open(LapChiPhiModalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    })
    modalRef.componentInstance.kehoach = item;
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.kehoach = JSON.parse(JSON.stringify(item));
    modalRef.result
      .then((res: any) => {})
      .catch((error: any) => {})
      .finally(() => {
        this.getListKeHoachChiPhi();
        this.changeParam(0);
      })
  }
  
  add() {
    let modalRef = this._modal.open(LapChiPhiModalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.result
      .then((res: any) => {})
      .catch((error: any) => {})
      .finally(() => {
        this.getListKeHoachChiPhi();
      })
  }

  KiemTraTabTrangThai() {
    this._services.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.getListKeHoachChiPhi();
    });
  }

  changeTab(e) {
    this.trangThai = e.index + 1;
    this.getListKeHoachChiPhi(true);
  }

  changePage(event) {
    this.paging.page = event.page + 1;
    this.getListKeHoachChiPhi()
  }

}


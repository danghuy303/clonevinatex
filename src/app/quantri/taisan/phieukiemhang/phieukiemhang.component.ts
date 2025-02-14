import { Component, OnInit, ViewChild } from '@angular/core';
import { PhieukiemhangmodalComponent } from './phieukiemhangmodal/phieukiemhangmodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from '../../../services/Taisan/taisan.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { Subscription } from 'rxjs';
import {DateToUnix} from '../../../services/globalfunction';
import { SanXuatService } from '../../../services/callApiSanXuat';

@Component({
  selector: 'app-phieukiemhang',
  templateUrl: './phieukiemhang.component.html',
  styleUrls: ['./phieukiemhang.component.css']
})
export class PhieukiemhangComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  IdTrangThai: string = "";
  Keyword: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  selectedItems: any = [];
  filter: any = {};
  showDropDown: boolean = false;
  trangThai: any = 1;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true };
  eAction = "PHIEUKIEMHANG";
  listPhanXuong: any = [];
  $sub!: Subscription;

  constructor(
    private _modal: NgbModal,
    private _serviceTaiSan: TaisanService,
    private _services: SanXuatService,
    private _toastr: ToastrService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
        this.ngOnInit()
      }
    })
  }

  ngOnInit(): void {
    this.GetList();
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._serviceTaiSan
          .PhieuKiemHang()
          .GetById(res.id)
          .subscribe((res: any) => {
            this.update(res);
          });
      }
    });
    this.KiemTraTabTrangThai()
  }
  changeParam(id) {
    this.router.navigate([`quantri/taisan/phieukiemhang/${id}`], {
      replaceUrl: true,
    });
  }
  resetFilter() {
    this.Keyword = '';
    this.filter = {};
    this.GetList(true);
  }
  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      Keyword: this.filter.Keyword,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      TabTrangThai: this.trangThai
    };
    this._serviceTaiSan.PhieuKiemHang().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }

  add() {
    let modalRef = this._modal.open(PhieukiemhangmodalComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard: false
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Phiếu kiểm hàng';
    modalRef.componentInstance.item = {
      Id: '', IdTrangThai: '', TenTrangThai: "", SoQuyTrinh: '',
      isKetThuc: false, listTaiSan: [], IdDuAn: 0
    };
    modalRef.result.then(res => {

    }).catch(er => console.log(er))
      .finally(() => {
        this.GetList();
        this.changeParam(0);
      })
  }
  update(item) {
    let modalRef = this._modal.open(PhieukiemhangmodalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Phiếu kiểm hàng';
    modalRef.componentInstance.quyTrinh = JSON.parse(JSON.stringify(item.Data));
    modalRef.result
      .then(data => {
      })
      .catch(er => {
      })
      .finally(() => {
        this.GetList();
        this.changeParam(0);
      });
  }

  //xử lí tab 
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetList(true);
  }

  KiemTraTabTrangThai() {
    this._services.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetList();
    });
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }
}

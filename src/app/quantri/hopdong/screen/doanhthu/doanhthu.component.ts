import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { TinhdoanhthumodalComponent } from '../../modals/tinhdoanhthumodal/tinhdoanhthumodal.component';

@Component({
  selector: 'app-doanhthu',
  templateUrl: './doanhthu.component.html',
  styleUrls: ['./doanhthu.component.css']
})
export class DoanhthuComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  IdTrangThai: string = "";
  keyWord: any = '';
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 1 };
  filter: any = {};
  listNhaMay: Array<any> = [];
  userInfo: any;
  trangThai: any = 1;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true };
  eAction = "DOANHTHU";


  constructor(private _modal: NgbModal, private _danhMucHopDong: DanhMucHopDongService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute, private router: Router,
    private _auth: AuthenticationService) { this.userInfo = this._auth.currentUserValue; }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._danhMucHopDong
          .DanhSachKeHoachKinhDoanh()
          .Get(res.id)
          .subscribe((res: any) => {
            this.update(res);
          });
      }
    });
    this.GetListKeHoachKinhDoanh();
    this.KiemTraTabTrangThai();
  }
  changeParam(id) {
    this.router.navigate([`quantri/hopdongsanxuat/doanhthu/${id}`], {
      replaceUrl: true,
    });
  }
  resetFilter() {
    this.keyWord = '';
    this.GetListKeHoachKinhDoanh(true);
  }
  GetListKeHoachKinhDoanh(reset?) {
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
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  add() {

    let modalRef = this._modal.open(TinhdoanhthumodalComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard:false
    });
    modalRef.componentInstance.opt = 'add';
    // modalRef.componentInstance.type = 'themmoi';
    // modalRef.componentInstance.title = 'Thêm mới kế hoạch kinh doanh';
    modalRef.componentInstance.item = {
      Id: '', IdTrangThai: '', SoQuyTrinh: ""
    };
    modalRef.result.then(res => {
      this.GetListKeHoachKinhDoanh()
    }).catch(er => console.log(er))
  }

  update(item) {
    let modalRef = this._modal.open(TinhdoanhthumodalComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    // modalRef.componentInstance.type = 'capnhat';
    // modalRef.componentInstance.title = 'Cập nhật kế hoạch kinh doanh';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result
      .finally(() => {
        this.GetListKeHoachKinhDoanh();
        this.changeParam(0);
      });
  }

  //xử lí tab 
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetListKeHoachKinhDoanh(true);
  }

  KiemTraTabTrangThai() {
    this._services.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetListKeHoachKinhDoanh();
    });
  }

  changePage(event) {
    this.paging.Page = event.page + 1;
    this.GetListKeHoachKinhDoanh()
  }

}

import { number } from '@amcharts/amcharts4/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DateToUnix, UnixToDate } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-danhsachhopdongvattuphu',
  templateUrl: './danhsachhopdongvattuphu.component.html',
  styleUrls: ['./danhsachhopdongvattuphu.component.css']
})
export class DanhsachhopdongvattuphuComponent implements OnInit {
  @ViewChild("paginator") paginator: any;
  items: any = [];
  listVatTu: any = {};
  newTableItem: any = {};
  filter: any = {};
  tuNgay: number = 0;
  title:string
  denNgay: number = 0;
  listLoaiPhuongAn: any = [];
  trangThai: any = 1;
  paging: any = { currentPage: 1, totalPages: 1, TotalItem: number };
  hopDong: any = {};

  
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  listQuyCachDongGoi: any = [];
  loaiTab : any = 0;
  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _service: HopDongService,
  ) { }

  ngOnInit(): void {
    this.GetListQuyTrinh();
  }
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.loaiTab = e.index;
    this.GetListQuyTrinh(true);
  }
  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.GetListQuyTrinh();
  }
  GetListQuyTrinh(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    let data = {
      pageSize: 20,
      currentPage: this.paging.currentPage,
      tabTrangThai: 3,
      keyWord: this.filter.keyWord,
      tuNgay: DateToUnix(this.filter.TuNgay),
      denNgay: DateToUnix(this.filter.DenNgay),
      Loai:23
    };
    if(this.loaiTab == 0){
      this._service.QuyTrinhHopDong().GetList(data).subscribe((res: any) => {
        this.items = res.data?.items;
        this.paging.TotalItem = res.data?.totalCount;
        this.items.forEach(element => {
          element.ngayKy = UnixToDate(element.ngayKyUnix);
        });
      });
    }
    else if(this.loaiTab === 1){
      this._service.QuyTrinhHopDong().GetListHopDongSapHetHanBanGiao(data).subscribe((res: any) => {
        this.items = res.data?.items;
        this.paging.TotalItem = res.data?.totalCount;
        this.items.forEach(element => {
          element.ngayKy = UnixToDate(element.ngayKyUnix);
        });
      });
    }
    else if(this.loaiTab === 2){
      this._service.QuyTrinhHopDong().GetListHopDongSapDenHanTT(data).subscribe((res: any) => {
        this.items = res.data?.items;
        this.paging.TotalItem = res.data?.totalCount;
        this.items.forEach(element => {
          element.ngayKy = UnixToDate(element.ngayKyUnix);
        });
      });
    }
    else if(this.loaiTab === 3){
      this._service.QuyTrinhHopDong().GetListHopDongQuaHanBanGiao(data).subscribe((res: any) => {
        this.items = res.data?.items;
        this.paging.TotalItem = res.data?.totalCount;
        this.items.forEach(element => {
          element.ngayKy = UnixToDate(element.ngayKyUnix);
        });
      });
    }
    else if(this.loaiTab === 4){
      this._service.QuyTrinhHopDong().GetListHopDongQuaHanTT(data).subscribe((res: any) => {
        this.items = res.data?.items;
        this.paging.TotalItem = res.data?.totalCount;
        this.items.forEach(element => {
          element.ngayKy = UnixToDate(element.ngayKyUnix);
        });
      });
    }
  }

  resetFilter() {
    this.filter = {};
    this.GetListQuyTrinh(true);
  }
}

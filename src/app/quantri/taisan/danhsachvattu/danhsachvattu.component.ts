import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { DateToUnix, formatdate, mapArrayForDropDown, } from "src/app/services/globalfunction";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DanhmuctaisanService } from "src/app/services/Taisan/danhmuctaisan.service";
import { TreeNode } from 'primeng/api';
import { ModalthongtinchitiettaisanComponent } from "../modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component";
import { Label } from "@amcharts/amcharts4/core";
import { vn } from "src/app/services/const";
import { ThanhtoanhopdongsoimodalComponent } from "../../hopdong/screen/thuchienhopdong/thanhtoanhopdongsoi/thanhtoanhopdongsoimodal/thanhtoanhopdongsoimodal.component";

@Component({
  selector: 'app-danhsachvattu',
  templateUrl: './danhsachvattu.component.html',
  styleUrls: ['./danhsachvattu.component.css']
})
export class DanhsachvattuComponent implements OnInit {

  filter: any = {};
  eAction: any = "";
  loaiTab: any = 0;
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  items: TreeNode[];
  listLoaiTaiSan: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;


  labelThang: any[];
  thang='1';

  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _serviceHopDong: HopDongService,
    private _serviceDungChung: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
    private router: Router
  ) {
    this.labelThang = [];
  }

  ngOnInit(): void {
    this.labelThang =[];
    for(let i = 1;i<=12;i++){
this.labelThang.push({name:i,value:i})    }
    // if (this.item.NgayThuHoiUnix !== 0) {
    //   this.item.NgayThuHoi = UnixToDate(this.item.NgayThuHoiUnix);
    // }
    this.GetList();
  }
  resetFilter() {
    this.filter = {};
    this.GetList(true);
  }

  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      tabTrangThai: 3,
      KeyWord: this.filter.KeyWord,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      Loai: 0,
    };
    this._serviceTaiSan.ListDanhSachVatTu().GetList(data).subscribe((res: any) => {
      // this.paging.CurrentPage = res.Data.Page;
      //   this.paging.TotalPages = res.Data.TotalPages;
      //   this.paging.TotalCount = res.Data.TotalCount;
      // this.listLoaiTaiSan = mapArrayForDropDown(res.Data.Items, "TenLoaiTaiSan", 'IddmLoaiTaiSan');
      //  let items = [];
      //  this.items = [];
      //  items = res.Data.Items;
      //  items.forEach(obj => {
      //   obj.NgayNhap = obj.NgayNhapUnix > 0 ? formatdate(obj.NgayNhap, false) : null;
      //      let obj_copy: any = {};
      //      if (obj?.listTaiSan) {
      //        obj_copy.children = [];
      //        obj.listTaiSan.forEach(element => {
      //          console.log(element)
      //          obj_copy.children.push({ data: element });
      //        });
      //        obj.listTaiSan=undefined;
      //      }
      //      obj_copy.data = obj;
      //      this.items.push({ data: obj_copy.data, children: obj_copy.children });
      //  });
    });
  }
  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetList();
    })
  }
  ChiTietThongTin(item) {
    let modalRef = this._modal.open(ModalthongtinchitiettaisanComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = item;

    modalRef.result
      .then((res: any) => {
        this.GetList();
      })
      .catch((er) => {
      });
  }
  changeTab(e) {
    // this.trangThai = e.index + 1;
    console.log(e)
    this.loaiTab = e.index;
    this.GetList(true);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList();
  }
}

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
  items: any = [];
  listLoaiTaiSan: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listNam: any = [];
  labelThang: any[];
  checkList: any = [];
  thang = '1';
  checkedAll: boolean = false;

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
    this.labelThang = [];
    for (let i = 1; i <= 12; i++) {
      this.labelThang.push({ name: i, value: i })
    }
    this.GetList();
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
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
      KeyWord: this.filter.KeyWord,
      IddmLoaiTaiSan: "",
      Nam: 0,
      Thang: 0,
      QuaHan: true,
    };
    this._serviceTaiSan.ListDanhSachVatTu().GetList(data).subscribe((res: any) => {
      this.paging.CurrentPage = res.Data.Page;
      this.paging.TotalPages = res.Data.TotalPages;
      this.paging.TotalCount = res.Data.TotalCount;
      this.items = res.Data.Items;
    });
  }
  checked(item) {
    this.checkList.push(item);
    console.log(item.checked);

  }
  KiemTraNCC() {
    let data = {
      ...this.checkList,
    };
    this._serviceTaiSan.ListDanhSachVatTu().KiemTraNCC(data).subscribe((res: any) => {
    })
  }
  checkAll(e) {
    this.items.forEach(ele => {
      ele.checked = e.checked
    })

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
    this.loaiTab = e.index;
    this.GetList(true);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList();
  }
}

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
import { fakeData } from "./datafake"

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
  itemsTonKho: any = [];
  listLoaiTaiSan: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listNam: any = [];
  listBoPhanSuDung: any = [];
  labelThang: any[];
  checkList: any = [];
  thang = '1';
  checkedAll: boolean = false;

  listVatTuDaChon: any = [];

  constructor(
    public _modal: NgbModal,
    private _serviceDungChung: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private router: Router,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) {
    this.labelThang = [];
  }

  ngOnInit(): void {


    let data = { PageSize: 20, CurrentPage: this.paging.page, Keyword: this.filter.Keyword, };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(res.Data.Items, "Ten", "Id");
    })
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listBoPhanSuDung = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.labelThang = [];
    for (let i = 1; i <= 12; i++) {
      this.labelThang.push({ label: i, value: i })
    }
    this.GetListTonKho();
    this.GetList();
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    this.filter.Nam = new Date().getFullYear();
    this.filter.Thang = new Date().getMonth() + 1;
  }

  resetFilter() {
    this.filter = {};
    this.GetListTonKho(true);
  }

  GetListTonKho(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      KeyWord: this.filter.KeyWord,
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan,
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
    };
    this._serviceTaiSan.ListDanhSachVatTu().GetListVatTuChuaBanGiao(data).subscribe((res: any) => {
      this.paging.CurrentPage = res.Data.Page;
      this.paging.TotalPages = res.Data.TotalPages;
      this.paging.TotalCount = res.Data.TotalCount;
      this.itemsTonKho = res.Data.Items;
      this.itemsTonKho.forEach(item => {
        item.ThanhTien = 0;
        item.ThanhTien = (item.NguyenGia || 0) * (item.SoLuong || 0);

      })
    })
  }

  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      KeyWord: this.filter.KeyWord,
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan,
      Nam: this.filter.Nam,
      Thang: this.filter.Thang,
      QuaHan: this.filter.QuaHan,
    };
    this._serviceTaiSan.ListDanhSachVatTu().GetList(data).subscribe((res: any) => {
      this.paging.CurrentPage = res.Data.Page;
      this.paging.TotalPages = res.Data.TotalPages;
      this.paging.TotalCount = res.Data.TotalCount;
      this.items = res.Data.Items;
      this.items.forEach(item => {
        item.ThanhTien = 0;
        item.ThanhTien = (item.NguyenGia || 0) * (item.SoLuong || 0);

      })
      this.CheckExist(this.items);
      this.TimCheck();
    });

  }


  KiemTraNCC() {
    // let data = {
    //   ...this.checkList,
    // };
    this._serviceTaiSan.ListDanhSachVatTu().KiemTraNCC(this.listVatTuDaChon.map(ele => ele.Id)).subscribe((res: any) => {
      if (res.StatusCode !== 200 || !res.StatusCode) {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      } else {
        this.toastr.success(res.Message);
        // this.activeModal.close();
      }
    }, (er) => {
      this.toastr.error("Có lỗi trong quá trình xử lý!!!");
    })
  }

  checked() {
    this.items.forEach(ele => {
      let exist = this.listVatTuDaChon.find(obj => obj.Id === ele.Id);
      if (ele.checked) {
        if (!!!exist) { // Kiểm tra mảng tạm nhớ, nếu chưa có thì push vào
          this.listVatTuDaChon.push(ele)
        }
        // if (!this.listVatTuDaChon.includes(ele.Id)) { // Kiểm tra mảng tạm nhớ, nếu chưa có thì push vào
        //   this.listVatTuDaChon.push(ele)
        // }
      } else {
        if (!!exist) { // Kiểm tra mảng tạm nhớ, nếu đã có, mà ta bỏ check thì xóa ra khỏi mảng
          let index = this.listVatTuDaChon.findIndex(a => a.Id === ele.Id);
          if (index !== -1) {
            this.listVatTuDaChon.splice(index, 1)
          }
        }
      }
    });
    this.TimCheck();
  }

  CheckExist(items) {
    items.forEach(ele => {
      let exist = this.listVatTuDaChon.find(obj => obj.Id === ele.Id);
      ele.checked = !!exist;
    })
  }
  TimCheck() {
    this.checkedAll = this.items.every(ele => ele.checked);
  }

  checkAll(e) {
    this.items.forEach(ele => {
      ele.checked = e.checked;
    })
    this.checked();
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
    this.loaiTab = e.index;
    this.GetList(true);
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList();
  }

  exportExcel() {
    let data = this.listVatTuDaChon.map(ele => {
      return {
        "Ma": ele.Ma,
        "Ten": ele.Ten,
        "SoLuongTon": ele.TonKho,
        "SoLuongCanThayThe": ele.TonKho,
        "TuoiTho": ele.TuoiTho,
        "NhaCungCap": ele.TenNhaCungCap,
        "DonGiaNhapGanNhat": ele.NguyenGia,
        "ThanhTien": ele.ThanhTien,
      }
    })
    this._serviceTaiSan.ListDanhSachVatTu().exportExcel(data).subscribe((res: any) => {
      this._danhMucTaiSan.DanhMucLoaiTaiSan().download(res.Data);
    })
  }

}

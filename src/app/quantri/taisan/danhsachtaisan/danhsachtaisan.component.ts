import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { DateToUnix, UnixToDate, formatdate, mapArrayForDropDown, mapTreeForDropDown } from "src/app/services/globalfunction";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DanhmuctaisanService } from "src/app/services/Taisan/danhmuctaisan.service";
import { TreeNode } from 'primeng/api';
// import { ModalthongtinchitiettaisanComponent } from "../modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component";
import { DanhMucHopDongService } from "src/app/services/Hopdong/danhmuchopdong.service";
import { ModalthongtinchitiettaisanComponent } from "../modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";
import { API } from "../../../services/host";
import { handleHTTPResponse } from "../../../services/globalfunction";
// import { ModalcapnhattaisanComponent } from "../modal/modalcapnhattaisan/modalcapnhattaisan.component";

@Component({
  selector: 'app-danhsachtaisan',
  templateUrl: './danhsachtaisan.component.html',
  styleUrls: ['./danhsachtaisan.component.css']
})
export class DanhsachtaisanComponent implements OnInit, OnDestroy {

  filter: any = {};
  Keyword: any = '';
  eAction: any = "";
  loaiTab: any = 0;
  namHienTai: number = new Date().getFullYear();
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  items: TreeNode[];
  listLoaiTaiSan: any = [];
  listPhanXuong: any = [];
  $sub!: Subscription;

  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _serviceDungChung: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _servicesSanXuat: SanXuatService,
    private _danhMucTaiSan: DanhmuctaisanService,
    private router: Router,
    private store: StoreService
  ) {
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
        this.filter.IdBoPhanSuDung = null;
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    let data = { PageSize: 1000, CurrentPage: 0, Keyword: this.Keyword };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      let rawLoaiTaiSan = Array.isArray(res?.Data) ? res.Data : (res?.Data?.Items || []);
      this.listLoaiTaiSan = rawLoaiTaiSan.map((item: any) => ({
        label: item.Ma ? `${item.Ma} - ${item.Ten}` : (item.Ten || ''),
        value: item.Id
      }));
    });
    this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS().subscribe((res: any) => {
      let treeMapped = mapTreeForDropDown(res, 'Ten', 'Id');
      let nhaMay = [
        {
          label: 'Chưa có bộ phận sử dụng',
          value: 'Chưa có bộ phận sử dụng',
          level: 0
        }
      ];
      this.listPhanXuong = [...treeMapped, ...nhaMay];
    });
    this.Loaddata();
  }

  ngOnDestroy(): void {
    if (this.$sub) {
      this.$sub.unsubscribe();
    }
  }

  resetFilter() {
    this.filter = {};
    this.Loaddata(true);
  }

  normalizeItem(obj: any) {
    if (!obj) return;
    if (obj.NgayCapGiayChungNhanDangKyUnix && !obj.NgayCapGiayChungNhanDangKy) {
      obj.NgayCapGiayChungNhanDangKy = UnixToDate(obj.NgayCapGiayChungNhanDangKyUnix);
    } else if (typeof obj.NgayCapGiayChungNhanDangKy === 'string') {
      obj.NgayCapGiayChungNhanDangKy = UnixToDate(obj.NgayCapGiayChungNhanDangKy) || new Date(obj.NgayCapGiayChungNhanDangKy);
    } else if (obj.NgayCapDangKyUnix && !obj.NgayCapGiayChungNhanDangKy) {
      obj.NgayCapGiayChungNhanDangKy = UnixToDate(obj.NgayCapDangKyUnix);
    } else if (typeof obj.NgayCapDangKy === 'string' && !obj.NgayCapGiayChungNhanDangKy) {
      obj.NgayCapGiayChungNhanDangKy = UnixToDate(obj.NgayCapDangKy) || new Date(obj.NgayCapDangKy);
    }

    if (obj.ThoiGianDaiTuGanNhatUnix && !obj.ThoiGianDaiTuGanNhat) {
      obj.ThoiGianDaiTuGanNhat = UnixToDate(obj.ThoiGianDaiTuGanNhatUnix);
    } else if (typeof obj.ThoiGianDaiTuGanNhat === 'string') {
      obj.ThoiGianDaiTuGanNhat = UnixToDate(obj.ThoiGianDaiTuGanNhat) || new Date(obj.ThoiGianDaiTuGanNhat);
    }

    if (obj.ThoiGianDuaVaoSuDungUnix && !obj.ThoiGianDuaVaoSuDung) {
      obj.ThoiGianDuaVaoSuDung = UnixToDate(obj.ThoiGianDuaVaoSuDungUnix);
    }

    if (obj.NgaySanXuatUnix && !obj.NgaySanXuat) {
      obj.NgaySanXuat = UnixToDate(obj.NgaySanXuatUnix);
    }

    if (obj.SoGiayChungNhanDangKy === undefined && obj.SoDangKy !== undefined) {
      obj.SoGiayChungNhanDangKy = obj.SoDangKy;
    }
    if (obj.ThoiGianKhauHaoConLai === undefined && obj.SoNamKhauHaoConLai !== undefined) {
      obj.ThoiGianKhauHaoConLai = obj.SoNamKhauHaoConLai;
    }
  }

  Loaddata(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      tabTrangThai: this.loaiTab,
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan,
      Keyword: this.filter.Keyword,
      isGiaTriCao: this.filter.isGiaTriCao,
      isCanDuTru: this.filter.isCanDuTru,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      Loai: 0,
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
      isDenHan: this.loaiTab === 1,
      isQuaHan: this.loaiTab === 2,
    };
    this._serviceTaiSan.ListDanhSachTaiSan().GetList(data).subscribe((res: any) => {
      this.paging.CurrentPage = res.Data.Page || 1;
      this.paging.TotalPages = res.Data.TotalPages;
      this.paging.TotalCount = res.Data.TotalCount;
      // this.listLoaiTaiSan = mapArrayForDropDown(res.Data.Items, "TenLoaiTaiSan", 'IddmLoaiTaiSan');
      let items = [];
      this.items = [];
      items = res.Data?.Items || [];
      const curPage = this.paging.CurrentPage || 1;
      items.forEach((obj, index) => {
        this.normalizeItem(obj);
        obj.isCha = true;
        obj.STT = (curPage - 1) * 20 + index + 1;
        let obj_copy: any = {};
        if (obj?.listTaiSan) {
          obj_copy.children = [];
          obj.listTaiSan.forEach((element, cIndex) => {
            this.normalizeItem(element);
            element.STT = `${obj.STT}.${cIndex + 1}`;
            obj_copy.children.push({ data: element });
          });
          obj.listTaiSan = undefined;
        }
        obj_copy.data = obj;
        this.items.push({ data: obj_copy.data, children: obj_copy.children });
      });
    })
  }

  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.Loaddata();
    })
  }

  ChiTietThongTin(item) {
    let modalRef = this._modal.open(ModalthongtinchitiettaisanComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.getId = item.Id;
    modalRef.result
      .then((res: any) => {
        this.Loaddata();
      })
      .catch((er) => {

      });
  }

  delte(item) {

  }
  changeTab(e) {
    console.log(e);
    // this.trangThai = e.index + 1;
    this.loaiTab = e.index;
    this.Loaddata(true);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.Loaddata();
  }

  handlExcel() {
    this._serviceTaiSan.ExportFileMauNhapVatTu().subscribe((res: any) => {
      if (res.StatusCode === 200) {
        window.open(`${API.imgURL}${res.Data}`)
        this._toastr.success(res.Message);
      } else this._toastr.error(res.Message);
    })
  }

  handleUpload(e: any) {
    this._serviceTaiSan.ImportdsTaiSan(e.Name, this.store.getCurrent()).subscribe((res: any) => {
      handleHTTPResponse(res, this._toastr, () => {
        if (res.StatusCode === 200) {
          this.Loaddata();
          this._toastr.success(res.Message);
        } else {
          this._toastr.error(res.Message);
        }
      })
    })
  }

}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DateToUnix, mapArrayForDropDown } from "src/app/services/globalfunction";
import { vn } from "src/app/services/const";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-hieuquaxemay",
  templateUrl: "./hieuquaxemay.component.html",
  styleUrls: ["./hieuquaxemay.component.css"],
})
export class HieuquaxemayComponent implements OnInit, OnDestroy {
  filter = {
    IdBoPhanSuDung: "",
    LoaiThoiGian: 0,
    TuNgay: new Date(),
    DenNgay: new Date(),
    nam: new Date().getFullYear(),
  };

  listNam: any = [];
  lang: any = vn;
  yearRange: string = `${new Date().getFullYear() - 60}:${new Date().getFullYear() + 60}`;

  PhanXuong: any = [];
  LoaiThoiGian = [
    { label: "Ngày", value: 0 },
    { label: "Năm", value: 3 },
  ];

  filterTable = {
    NhanHieuBienSoDangKy: "",
    NguoiSuDung: "",
    KhauHaoCoBan: "",
    TongChiPhiSuaChua: "",
    ChiPhiNhienLieuSanXuat: "",
    LuongLaiXeMay: "",
    CongChiPhi: "",
    DoanhThu: "",
    HieuQua: "",
    DonViTinh: "",
    KhoiLuongHoatDong: "",
    GhiChu: "",
  };

  items: any[] = [];
  filteredItems: any[] = [];
  paging = {
    CurrentPage: 1,
    TotalCount: 0,
  };

  $sub!: Subscription;

  constructor(
    private _servicesSanXuat: SanXuatService,
    private taisanService: TaisanService,
    private store: StoreService
  ) {
    this.$sub = this.store.getNhaMay().subscribe((res) => {
      if (res) {
        this.loadDuAnData();
      }
    });
  }

  ngOnInit(): void {
    for (let i = new Date().getFullYear() - 10; i <= new Date().getFullYear() + 20; i++) {
      this.listNam.push({ value: i, label: i });
    }

    let date = new Date();
    this.filter.nam = date.getFullYear();

    this.loadDuAnData();
  }

  loadDuAnData() {
    this._servicesSanXuat.GetListdmPhanXuong(null, false).subscribe((res: any) => {
      this.PhanXuong = mapArrayForDropDown(res, "Ten", "Id");
      if (res && res.length > 0) {
        this.filter.IdBoPhanSuDung = res[0].Id;
      }
    });
    this.getDataBaoCao();
  }

  ngOnDestroy(): void {
    if (this.$sub) {
      this.$sub.unsubscribe();
    }
  }

  getDataBaoCao() {
    let payload: any = {
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
      LoaiThoiGian: this.filter.LoaiThoiGian,
      IdDuAn: this.store.getCurrent(),
    };

    if (this.filter.LoaiThoiGian === 0) {
      payload.TuNgay = DateToUnix(this.filter.TuNgay);
      payload.DenNgay = DateToUnix(this.filter.DenNgay);
    } else if (this.filter.LoaiThoiGian === 3) {
      payload.nam = this.filter.nam;
    }

    this.taisanService.GetListHieuQuaXeMay(payload).subscribe((res: any) => {
      this.items = res.Data || [];
      this.paging.TotalCount = res.TotalCount || this.items.length;
      this.filterData();
    });

    this.filterData();
  }

  isGroup(item: any): boolean {
    return (
      !item.NhanHieuBienSoDangKy &&
      !item.KhauHaoCoBan &&
      !item.TongChiPhiSuaChua &&
      !item.ChiPhiNhienLieuSanXuat &&
      !item.LuongLaiXeMay &&
      !item.CongChiPhi &&
      !item.DoanhThu &&
      !item.HieuQua &&
      item.NhanHieuBienSoDangKy !== "CỘNG" &&
      item.NhanHieuBienSoDangKy !== "Tổng cộng"
    );
  }

  isTongCong(item: any): boolean {
    return (
      item.NhanHieuBienSoDangKy === "CỘNG" ||
      item.NhanHieuBienSoDangKy === "Tổng cộng"
    );
  }

  filterData() {
    this.filteredItems = this.items.filter((item) => {
      const matchTen = (item.NhanHieuBienSoDangKy || "")
        .toLowerCase()
        .includes(this.filterTable.NhanHieuBienSoDangKy.toLowerCase());
      const matchUser = (item.NguoiSuDung || "")
        .toLowerCase()
        .includes(this.filterTable.NguoiSuDung.toLowerCase());
      const matchKhauHao =
        item.KhauHaoCoBan === null || item.KhauHaoCoBan === undefined
          ? true
          : String(item.KhauHaoCoBan).includes(this.filterTable.KhauHaoCoBan);
      const matchSuaChua =
        item.TongChiPhiSuaChua === null || item.TongChiPhiSuaChua === undefined
          ? true
          : String(item.TongChiPhiSuaChua).includes(this.filterTable.TongChiPhiSuaChua);
      const matchNhienLieu =
        item.ChiPhiNhienLieuSanXuat === null || item.ChiPhiNhienLieuSanXuat === undefined
          ? true
          : String(item.ChiPhiNhienLieuSanXuat).includes(this.filterTable.ChiPhiNhienLieuSanXuat);
      const matchLuong =
        item.LuongLaiXeMay === null || item.LuongLaiXeMay === undefined
          ? true
          : String(item.LuongLaiXeMay).includes(this.filterTable.LuongLaiXeMay);
      const matchCong =
        item.CongChiPhi === null || item.CongChiPhi === undefined
          ? true
          : String(item.CongChiPhi).includes(this.filterTable.CongChiPhi);
      const matchDoanhThu =
        item.DoanhThu === null || item.DoanhThu === undefined
          ? true
          : String(item.DoanhThu).includes(this.filterTable.DoanhThu);
      const matchHieuQua =
        item.HieuQua === null || item.HieuQua === undefined
          ? true
          : String(item.HieuQua).includes(this.filterTable.HieuQua);
      const matchDVT = (item.DonViTinh || "")
        .toLowerCase()
        .includes(this.filterTable.DonViTinh.toLowerCase());
      const matchKhoiLuong =
        item.KhoiLuongHoatDong === null || item.KhoiLuongHoatDong === undefined
          ? true
          : String(item.KhoiLuongHoatDong).includes(this.filterTable.KhoiLuongHoatDong);
      const matchGhiChu = (item.GhiChu || "")
        .toLowerCase()
        .includes(this.filterTable.GhiChu.toLowerCase());

      return (
        matchTen &&
        matchUser &&
        matchKhauHao &&
        matchSuaChua &&
        matchNhienLieu &&
        matchLuong &&
        matchCong &&
        matchDoanhThu &&
        matchHieuQua &&
        matchDVT &&
        matchKhoiLuong &&
        matchGhiChu
      );
    });
  }

  changePage(event: any) {
    this.paging.CurrentPage = event.page + 1;
  }
}

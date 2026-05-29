import { Component, OnInit, OnDestroy } from "@angular/core";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DateToUnix, mapArrayForDropDown } from "src/app/services/globalfunction";
import { vn } from "src/app/services/const";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-ketquathanhlythietbixemay",
  templateUrl: "./ketquathanhlythietbixemay.component.html",
  styleUrls: ["./ketquathanhlythietbixemay.component.css"],
})
export class KetquathanhlythietbixemayComponent implements OnInit, OnDestroy {
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
    LoaiNhanHieu: "",
    KieuChuyenDung: "",
    NuocSanXuat: "",
    BienSoDangKy: "",
    GiaTriBanDau: "",
    GiaTriConLai: "",
    GiaTriDaBanThanhLy: "",
    NamSanXuat: "",
    ThoiGianMua: "",
    DiaDiem: "",
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

    this.taisanService.GetListBaoCaoThanhLy(payload).subscribe((res: any) => {
      this.items = res.Data || [];
      this.paging.TotalCount = res.TotalCount || this.items.length;
      this.filterData();
    });

    this.filterData();
  }

  isGroup(item: any): boolean {
    return (
      !item.BienSoDangKy &&
      !item.KieuChuyenDung &&
      !item.GiaTriBanDau &&
      !item.GiaTriConLai &&
      !item.GiaTriDaBanThanhLy &&
      item.LoaiNhanHieu !== "CỘNG" &&
      item.LoaiNhanHieu !== "Tổng cộng"
    );
  }

  isTongCong(item: any): boolean {
    return (
      item.LoaiNhanHieu === "CỘNG" ||
      item.LoaiNhanHieu === "Tổng cộng"
    );
  }

  filterData() {
    this.filteredItems = this.items.filter((item) => {
      const matchLoai = (item.LoaiNhanHieu || "")
        .toLowerCase()
        .includes(this.filterTable.LoaiNhanHieu.toLowerCase());
      const matchKieu = (item.KieuChuyenDung || "")
        .toLowerCase()
        .includes(this.filterTable.KieuChuyenDung.toLowerCase());
      const matchNuoc = (item.NuocSanXuat || "")
        .toLowerCase()
        .includes(this.filterTable.NuocSanXuat.toLowerCase());
      const matchBien = (item.BienSoDangKy || "")
        .toLowerCase()
        .includes(this.filterTable.BienSoDangKy.toLowerCase());
      const matchGiaTriDau =
        item.GiaTriBanDau === null || item.GiaTriBanDau === undefined
          ? true
          : String(item.GiaTriBanDau).includes(this.filterTable.GiaTriBanDau);
      const matchGiaTriConLai =
        item.GiaTriConLai === null || item.GiaTriConLai === undefined
          ? true
          : String(item.GiaTriConLai).includes(this.filterTable.GiaTriConLai);
      const matchDaBanThanhLy =
        item.GiaTriDaBanThanhLy === null || item.GiaTriDaBanThanhLy === undefined
          ? true
          : String(item.GiaTriDaBanThanhLy).includes(this.filterTable.GiaTriDaBanThanhLy);
      const matchNamSx =
        item.NamSanXuat === null || item.NamSanXuat === undefined
          ? true
          : String(item.NamSanXuat).includes(this.filterTable.NamSanXuat);
      const matchThoiGianMua = (item.ThoiGianMua || "")
        .toLowerCase()
        .includes(this.filterTable.ThoiGianMua.toLowerCase());
      const matchDiaDiem = (item.DiaDiem || "")
        .toLowerCase()
        .includes(this.filterTable.DiaDiem.toLowerCase());

      return (
        matchLoai &&
        matchKieu &&
        matchNuoc &&
        matchBien &&
        matchGiaTriDau &&
        matchGiaTriConLai &&
        matchDaBanThanhLy &&
        matchNamSx &&
        matchThoiGianMua &&
        matchDiaDiem
      );
    });
  }

  changePage(event: any) {
    this.paging.CurrentPage = event.page + 1;
  }
}

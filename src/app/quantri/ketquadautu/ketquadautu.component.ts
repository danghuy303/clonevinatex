import { Component, OnInit, OnDestroy } from "@angular/core";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DateToUnix, mapArrayForDropDown } from "src/app/services/globalfunction";
import { vn } from "src/app/services/const";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-ketquadautu",
  templateUrl: "./ketquadautu.component.html",
  styleUrls: ["./ketquadautu.component.css"],
})
export class KetquadautuComponent implements OnInit, OnDestroy {
  filter = {
    LoaiThoiGian: 0,
    TuNgay: new Date(),
    DenNgay: new Date(),
    nam: new Date().getFullYear(),
  };

  listNam: any = [];
  lang: any = vn;
  yearRange: string = `${new Date().getFullYear() - 60}:${new Date().getFullYear() + 60}`;

  LoaiThoiGian = [
    { label: "Ngày", value: 0 },
    { label: "Năm", value: 3 },
  ];

  filterTable = {
    MoTaChiTiet: "",
    DonViTinh: "",
    SoLuongMua: "",
    SoLuongKeHoach: "",
    DonGia: "",
    ThanhTienUSD: "",
    ThanhTienKip: "",
    ThanhTienVND: "",
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
        this.getDataBaoCao();
      }
    });
  }

  ngOnInit(): void {
    for (let i = new Date().getFullYear() - 10; i <= new Date().getFullYear() + 20; i++) {
      this.listNam.push({ value: i, label: i });
    }

    let date = new Date();
    this.filter.nam = date.getFullYear();

    this.getDataBaoCao();
  }

  ngOnDestroy(): void {
    if (this.$sub) {
      this.$sub.unsubscribe();
    }
  }

  getDataBaoCao() {
    let payload: any = {
      LoaiThoiGian: this.filter.LoaiThoiGian,
      IdDuAn: this.store.getCurrent(),
    };

    if (this.filter.LoaiThoiGian === 0) {
      payload.TuNgay = DateToUnix(this.filter.TuNgay);
      payload.DenNgay = DateToUnix(this.filter.DenNgay);
    } else if (this.filter.LoaiThoiGian === 3) {
      payload.nam = this.filter.nam;
    }

    this.taisanService.GetListBaoCaoKetQuaDauTu(payload).subscribe((res: any) => {
      this.items = res.Data || [];
      this.paging.TotalCount = res.TotalCount || this.items.length;
      this.filterData();
    });

    this.filterData();
  }

  isGroup(item: any): boolean {
    return (
      !item.DonViTinh &&
      !item.DonGia &&
      !item.SoLuongMua &&
      !item.SoLuongKeHoach &&
      !item.ThanhTienUSD &&
      !item.ThanhTienKip &&
      !item.ThanhTienVND &&
      item.MoTaChiTiet !== "CỘNG" &&
      item.MoTaChiTiet !== "Tổng cộng"
    );
  }

  isTongCong(item: any): boolean {
    return (
      item.MoTaChiTiet === "CỘNG" ||
      item.MoTaChiTiet === "Tổng cộng"
    );
  }

  filterData() {
    this.filteredItems = this.items.filter((item) => {
      const matchTen = (item.MoTaChiTiet || "")
        .toLowerCase()
        .includes(this.filterTable.MoTaChiTiet.toLowerCase());
      const matchDVT = (item.DonViTinh || "")
        .toLowerCase()
        .includes(this.filterTable.DonViTinh.toLowerCase());
      const matchSoLuongMua =
        item.SoLuongMua === null || item.SoLuongMua === undefined
          ? true
          : String(item.SoLuongMua).includes(this.filterTable.SoLuongMua);
      const matchSoLuongKeHoach =
        item.SoLuongKeHoach === null || item.SoLuongKeHoach === undefined
          ? true
          : String(item.SoLuongKeHoach).includes(this.filterTable.SoLuongKeHoach);
      const matchDonGia =
        item.DonGia === null || item.DonGia === undefined
          ? true
          : String(item.DonGia).includes(this.filterTable.DonGia);
      const matchUSD =
        item.ThanhTienUSD === null || item.ThanhTienUSD === undefined
          ? true
          : String(item.ThanhTienUSD).includes(this.filterTable.ThanhTienUSD);
      const matchKip =
        item.ThanhTienKip === null || item.ThanhTienKip === undefined
          ? true
          : String(item.ThanhTienKip).includes(this.filterTable.ThanhTienKip);
      const matchVND =
        item.ThanhTienVND === null || item.ThanhTienVND === undefined
          ? true
          : String(item.ThanhTienVND).includes(this.filterTable.ThanhTienVND);
      const matchGhiChu = (item.GhiChu || "")
        .toLowerCase()
        .includes(this.filterTable.GhiChu.toLowerCase());

      return (
        matchTen &&
        matchDVT &&
        matchSoLuongMua &&
        matchSoLuongKeHoach &&
        matchDonGia &&
        matchUSD &&
        matchKip &&
        matchVND &&
        matchGhiChu
      );
    });
  }

  changePage(event: any) {
    this.paging.CurrentPage = event.page + 1;
  }
}

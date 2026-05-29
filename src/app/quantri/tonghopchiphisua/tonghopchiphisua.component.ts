import { Component, OnInit, OnDestroy } from "@angular/core";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DateToUnix } from "src/app/services/globalfunction";
import { mapArrayForDropDown } from "src/app/services/globalfunction";
import { vn } from "src/app/services/const";
import * as moment from "moment";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-tonghopchiphisua",
  templateUrl: "./tonghopchiphisua.component.html",
  styleUrls: ["./tonghopchiphisua.component.css"],
})
export class TonghopchiphisuaComponent implements OnInit, OnDestroy {
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
    TT: "",
    TenPhuongTien: "",
    BienSo: "",
    KieuChuyenDung: "",
    NguoiSuDung: "",
    VatTu: "",
    NhienLieu: "",
    NhanCong: "",
    VAT: "",
    Cong: "",
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
    };

    if (this.filter.LoaiThoiGian === 0) {
      payload.TuNgay = DateToUnix(this.filter.TuNgay);
      payload.DenNgay = DateToUnix(this.filter.DenNgay);
    } else if (this.filter.LoaiThoiGian === 3) {
      payload.nam = this.filter.nam;
    }

    payload.IdDuAn = this.store.getCurrent();

    this.taisanService.GetLisChiPhiSuaChuaPhuongTien(payload).subscribe((res: any) => {
      this.items = res.Data || [];
      this.paging.TotalCount = res.TotalCount || this.items.length;
      this.filterData();
    });

    this.filterData();
  }

  isGroup(item: any): boolean {
    return (
      !item.BienSo &&
      !item.Cong &&
      !item.VatTu &&
      !item.NhienLieu &&
      !item.NhanCong &&
      !item.VAT &&
      item.TenPhuongTien !== "CỘNG" &&
      item.TenPhuongTien !== "Tổng cộng"
    );
  }

  isTongCong(item: any): boolean {
    return item.TenPhuongTien === "CỘNG" || item.TenPhuongTien === "Tổng cộng";
  }

  filterData() {
    this.filteredItems = this.items.filter((item) => {
      const matchTen = (item.TenPhuongTien || "").toLowerCase().includes(this.filterTable.TenPhuongTien.toLowerCase());
      const matchBienSo = (item.BienSo || "").toLowerCase().includes(this.filterTable.BienSo.toLowerCase());
      const matchKieu = (item.KieuChuyenDung || "").toLowerCase().includes(this.filterTable.KieuChuyenDung.toLowerCase());
      const matchUser = (item.NguoiSuDung || "").toLowerCase().includes(this.filterTable.NguoiSuDung.toLowerCase());
      const matchVatTu = item.VatTu === null || item.VatTu === undefined
        ? true
        : String(item.VatTu).includes(this.filterTable.VatTu);
      const matchNhienLieu = item.NhienLieu === null || item.NhienLieu === undefined
        ? true
        : String(item.NhienLieu).includes(this.filterTable.NhienLieu);
      const matchNhanCong = item.NhanCong === null || item.NhanCong === undefined
        ? true
        : String(item.NhanCong).includes(this.filterTable.NhanCong);
      const matchVAT = item.VAT === null || item.VAT === undefined
        ? true
        : String(item.VAT).includes(this.filterTable.VAT);
      const matchCong = item.Cong === null || item.Cong === undefined
        ? true
        : String(item.Cong).includes(this.filterTable.Cong);
      const matchGhiChu = (item.GhiChu || "").toLowerCase().includes(this.filterTable.GhiChu.toLowerCase());

      return (
        matchTen &&
        matchBienSo &&
        matchKieu &&
        matchUser &&
        matchVatTu &&
        matchNhienLieu &&
        matchNhanCong &&
        matchVAT &&
        matchCong &&
        matchGhiChu
      );
    });
  }

  changePage(event: any) {
    this.paging.CurrentPage = event.page + 1;
  }
}

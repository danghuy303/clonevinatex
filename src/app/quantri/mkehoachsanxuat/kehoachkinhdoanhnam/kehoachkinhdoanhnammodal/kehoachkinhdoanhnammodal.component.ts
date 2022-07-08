import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ConfirmationService } from 'src/app/services/confirmation.service';
import { vn } from 'src/app/services/const';
import { DateToUnix, handleHTTPResponse, merge } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { PintableDirective } from 'voi-lib';
import { ChitietthangComponent } from '../chitietthang/chitietthang.component';
import { DanhmucmathangComponent } from '../danhmucmathang/danhmucmathang.component';
import { HopdongsanphammodalComponent } from '../hopdongsanphammodal/hopdongsanphammodal.component';

@Component({
  selector: 'app-kehoachkinhdoanhnammodal',
  templateUrl: './kehoachkinhdoanhnammodal.component.html',
  styleUrls: ['./kehoachkinhdoanhnammodal.component.css']
})
export class KehoachkinhdoanhnammodalComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  opt: any = ""
  userInfo: any;
  checkbutton: any = {
    Ghi: true,
    Xoa: true,
    KhongDuyet: true,
    ChuyenTiep: true,
  };
  listMatHang: any = [];
  listNhaMay: any[] = [];
  kehoach: any = {};
  years: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  lang: any = vn;
  listDonViTienTe: Array<any> = [{ value: 'VND', label: 'Việt Nam Đồng' }, { value: 'USD', label: 'USD' }];
  labelThang: Array<string> = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12',];
  propThang: Array<string> = ['Thang1', 'Thang2', 'Thang3', 'Thang4', 'Thang5', 'Thang6', 'Thang7', 'Thang8', 'Thang9', 'Thang10', 'Thang11', 'Thang12',];

  constructor(
    public activeModal: NgbActiveModal,
    private _modal: NgbModal,
    public toastr: ToastrService,
    private _danhMucHopDong: DanhMucHopDongService,
    private _services: SanXuatService,
    private store: StoreService,
    private _confirmService: ConfirmationService,
    private _auth: AuthenticationService) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.getYearsForDropDown();
    this.KiemTraButton();
    if (this.opt === 'add') {
      this.kehoach.TenNguoiLap = this.userInfo.TenNhanVien;
      this.kehoach.lstKH_KeHoachKinhDoanh_SanPham = [];
      this.GetNextSoQuyTrinh();
      this.GetListSanPhamHoaDon();
    } else {
      this.GetNhaMay();
      this.CountTongSanLuong();
    }
  }

  GetNhaMay() {
    this._services.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res: any) => {
      this.listNhaMay = res;
      this.kehoach.lstKH_KeHoachKinhDoanh_SanPham?.forEach((sanpham: any) => {
        sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TenNhaMay = this.listNhaMay.find(ele =>
          ele.Id === sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].IdDuAn
        )?.TenDuAn;
      })
    })
  }

  getYearsForDropDown() {
    let date = new Date().getFullYear() - 11;
    for (let i = 0; i <= 20; i++) {
      date++;
      this.years.push({
        label: date,
        value: date
      });
    }
  }

  GetNextSoQuyTrinh() {
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh().NextQuyTrinh().subscribe((res: any) => {
      this.kehoach.SoQuyTrinh = res.Data;
    })
  }

  KiemTraButton() {
    this._services.KiemTraButton(this.kehoach.Id || '', this.kehoach.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  GetListSanPhamHoaDon() {
    this._services.GetOptions().GetChiTietMatHangChoKHKD().subscribe((res: any) => {
      this.kehoach.lstKH_KeHoachKinhDoanh_SanPham = res;
      this.kehoach.lstKH_KeHoachKinhDoanh_SanPham = this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.map(ele => {
        return {
          TenSanPham: ele.Ten,
          IdSanPham: ele.Id,
          lstKH_KeHoachKinhDoanh_SanPham_NhaMay: [
            {
              Id: "",
              IdSanPham: ele.Id,
              IdDuAn: this.store.getCurrent(),
              TongSanLuongThang: 0,
              lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH: this.RenderThang(ele)
            }
          ],
          lstKH_KeHoachKinhDoanh_SanPham_ThoiGianHopDong: ele.lstThoiGianHopDong
        }
      })
      this.GetNhaMay();
      this.CountTongSanLuong();
      console.log("this.kehoach", this.kehoach);
    })
  }

  RenderThang(sanpham) {
    let data = [];
    for (let i = 1; i <= 12; i++) {
      data.push({
        ChiPhi: null,
        ChiPhiDinhMuc1Kg: null,
        ChiPhiQuyDoiNe: null,
        DoanhThu: null,
        DonGia: null,
        IdDuAn: this.store.getCurrent(),
        IdSanPham: sanpham.Id,
        Nam: 0,
        NangLucSanXuatNhaMay: 0,
        Ne: null,
        SanLuongThang: 0,
        SanLuongThangQuyNe: null,
        Thang: i,
        ThongTinThang_SanPham: {
          Thang: i,
          TongSoCa: 0,
          SoMayCon: 0,
          SoNgayLamViec: 0,
          SanLuongMotCa: 0,
          HieuSuat: 0,
          SanLuongQuyDoi: 0,
          IdLoaiContainer: "",
          IdLoaiPhuongThucVanChuyen: "",
          CachThuc: ""
        },
      })
    }
    return data;
  }

  ValidateData() {
    return true;
  }

  SetData() {
    this.kehoach.NgayLapUnix = DateToUnix(this.kehoach.NgayLap);
    let data = {
      ...this.kehoach,
      IdTrangThai: "",
    }
    return data;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._danhMucHopDong.DanhSachKeHoachKinhDoanh().Set(this.SetData()).subscribe((res: any) => {
        // console.log("res", res);
        handleHTTPResponse(res, this.toastr, () => {
          this.kehoach = res.Data;
          this.GetNhaMay();
          this.KiemTraButton();
        })
      })
    }
    console.log("this.kehoach", this.kehoach);
    
  }

  XoaQuyTrinh() {
    this._confirmService.show({
      message: 'Bạn chắc chắn muốn xóa quy trình này?'
    }, () => {
      this._danhMucHopDong.DanhSachKeHoachKinhDoanh().Delete(this.kehoach).subscribe((res: any) => {
        handleHTTPResponse(res, this.toastr, () => {
          this.activeModal.close();
        })
      })
    })
  }

  ChuyenDuyet() {
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh().ChuyenTiep(this.kehoach).subscribe((res: any) => {
      handleHTTPResponse(res, this.toastr, () => {
        this.activeModal.close();
      })
    })
  }

  KhongDuyet() {
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh().KhongDuyet(this.kehoach).subscribe((res: any) => {
      handleHTTPResponse(res, this.toastr, () => {
        this.activeModal.close();
      })
    })
  }

  AddSanPham() {
    let modalRef = this._modal.open(DanhmucmathangComponent, {
      size: 'fullscreen',
      backdrop: 'static',
    });
    let listIdSanPham = this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.filter(ele => ele.isKhongHopDong).map(ele => ele.IdSanPham) || [];
    modalRef.componentInstance.listIdSanPham = listIdSanPham;
    modalRef.result
      .then((res: any) => {
        console.log("res", res);
        let listKhongHD = this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.filter(ele => ele.isKhongHopDong);
        listKhongHD = merge([...res], listKhongHD, 'IdSanPham');
        console.log("listKhongHD", listKhongHD);
        this.kehoach.lstKH_KeHoachKinhDoanh_SanPham = this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.filter(ele => !ele.isKhongHopDong)
        this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.push(...listKhongHD);
        this.GetNhaMay();
      })
      .catch((error: any) => {})
      .finally(() => {})
    // console.log("res", res);
  }

  SeeHopDongDetail(sanpham) {
    let modalRef = this._modal.open(HopdongsanphammodalComponent, {
      size: 'xl',
      backdrop: 'static',
    })
    modalRef.componentInstance.listHopDong = [...sanpham.lstKH_KeHoachKinhDoanh_SanPham_ThoiGianHopDong];
    modalRef.componentInstance.tenSanPham = sanpham.TenSanPham
    modalRef.componentInstance.nam = this.kehoach.Nam
    modalRef.result
      .then((res: any) => {
        modalRef.componentInstance.listHopDong = sanpham.lstKH_KeHoachKinhDoanh_SanPham_ThoiGianHopDong;
      })
      .catch((error: any) => {

      })
      .finally(() => { })
  }

  SeeMonthDetail(sanpham, itemThang) {
    let modalRef = this._modal.open(ChitietthangComponent, {
      size: 'xl',
      backdrop: 'static',
    })
    modalRef.componentInstance.itemThang = itemThang.ThongTinThang_SanPham;
    modalRef.result
      .then((res: any) => {
        itemThang.ThongTinThang_SanPham = res;
        itemThang.SanLuongThang = itemThang.ThongTinThang_SanPham.TongSanLuong;
        this.CountTongSanLuong();
        this.CheckForAllMonth(sanpham, itemThang);
      })
      .catch((error: any) => {

      })
      .finally(() => { })
  }

  CheckForAllMonth(sanpham, itemThang) {
    // console.log(sanpham);
    let data = itemThang;
    if (itemThang.ThongTinThang_SanPham.checkForAll) {
      sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH = [];
      for (let i = 0; i < 12; i++) {
        sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH.push({
          ...itemThang,
          Thang: i,
          SanLuongThang: data.SanLuongThang,
          ThongTinThang_SanPham: {
            ...data.ThongTinThang_SanPham,
            Thang: i,
            Id: ""
          }
        })
      }
      this.CountTongSanLuong();
      console.log("san pham", sanpham);

    }
  }

  CountTongSanLuong() {
    this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.forEach(item => {
      item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSanLuongThang = 0;
      item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH.forEach(thang => {
        item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSanLuongThang += (thang.SanLuongThang || 0);
      })
    })
  }

  DeleteSanPham(index) {
    console.log(index);
    this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.splice(index, 1)
  }

}

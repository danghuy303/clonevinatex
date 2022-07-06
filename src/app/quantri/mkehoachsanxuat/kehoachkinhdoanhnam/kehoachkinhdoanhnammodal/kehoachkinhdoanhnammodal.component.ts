import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ConfirmationService } from 'src/app/services/confirmation.service';
import { vn } from 'src/app/services/const';
import { DateToUnix, handleHTTPResponse } from 'src/app/services/globalfunction';
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
      console.log("listNhaMay", this.listNhaMay);
      this.kehoach.lstKH_KeHoachKinhDoanh_SanPham?.forEach((sanpham: any) => {
        sanpham.TenNhaMay = this.listNhaMay.find(ele => 
          ele.Id===sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].IdDuAn
        )?.TenDuAn;
      })
      console.log("this.kehoach", this.kehoach);
    })
  }

  getYearsForDropDown() {
    let date = new Date().getFullYear() -11;
    for(let i = 0; i <= 20; i++) {
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
      
    })
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
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
        }
      })
    }
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
    this._services.GetOptions().GetMatHangKhongHopDongChoKHKD().subscribe((res: any) => {
      // console.log("res", res);
    })
    modalRef.result
    .then((res: any) => {

    })
    .catch((error: any) => {

    })
    .finally(() => {})
  }

  SeeHopDongDetail() {
    let modalRef = this._modal.open(HopdongsanphammodalComponent, {
      size: 'xl',
      backdrop: 'static',
    })
    modalRef.componentInstance.nam = this.kehoach.Nam
    modalRef.result
      .then((res: any) => {

      })
      .catch((error: any) => {

      })
      .finally(() => {})
  }

  SeeMonthDetail(sanpham, itemThang) {
    let modalRef = this._modal.open(ChitietthangComponent, {
      size: 'xl',
      backdrop: 'static',
    })
    modalRef.componentInstance.itemThang = itemThang.ThongTinThang_SanPham; 
    modalRef.result
      .then((res: any) => {
        itemThang.SanLuongThang = itemThang.ThongTinThang_SanPham.TongSanLuong;
        this.CountTongSanLuong();
        this.CheckForAllMonth(sanpham, itemThang);
      })
      .catch((error: any) => {

      })
      .finally(() => {})
  }

  CheckForAllMonth(sanpham, itemThang) {
    // console.log(sanpham);
    let data = itemThang;
    if (itemThang.ThongTinThang_SanPham.checkForAll) {
      sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH = [];
      for(let i = 0; i < 12; i++) {
        sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH.push({
          Thang: i,
          SanLuongThang: data.SanLuongThang,
          ThongTinThang_SanPham: {
            // Thang: i,
            // SanLuongMotCa: data.ThongTinThang_SanPham.SanLuongMotCa,
            // HieuSuat: data.ThongTinThang_SanPham.HieuSuat,
            // SanLuongQuyDoi: data.ThongTinThang_SanPham.SanLuongQuyDoi,
            // IdLoaiContainer: data.ThongTinThang_SanPham.IdLoaiContainer,
            // IdLoaiPhuongThucVanChuyen: data.ThongTinThang_SanPham.IdLoaiPhuongThucVanChuyen,
            // IdSanPham: 
            // SoMayCon: data.ThongTinThang_SanPham.SoMayCon,
            // SoNgayLamViec: data.ThongTinThang_SanPham.SoNgayLamViec,
            // TongSanLuong: data.ThongTinThang_SanPham.TongSanLuong,
            ...data.ThongTinThang_SanPham,
            Thang: i,
            Id: ""
          }
        })
      }
      console.log("san pham", sanpham);
      
    }
  }

  CountTongSanLuong() {
    this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.forEach(item => {
      item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH.forEach(thang => {
        item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSanLuongThang += thang.SanLuongThang;
      })
    })
  }

  DeleteSanPham(index) {
    console.log(index);
    this.kehoach.ListSanPham.splice(index, 1)
  }

}

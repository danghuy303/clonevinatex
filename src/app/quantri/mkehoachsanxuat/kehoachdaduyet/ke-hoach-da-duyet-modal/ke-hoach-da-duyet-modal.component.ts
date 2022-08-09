import { replace } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { formatNumber } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ConfirmationService } from 'src/app/services/confirmation.service';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, handleHTTPResponse, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { PintableDirective } from 'voi-lib';
import { ChitietthangComponent } from '../../kehoachkinhdoanhnam/chitietthang/chitietthang.component';
import { DanhmucmathangComponent } from '../../kehoachkinhdoanhnam/danhmucmathang/danhmucmathang.component';
import { HopdongsanphammodalComponent } from '../../kehoachkinhdoanhnam/hopdongsanphammodal/hopdongsanphammodal.component';

@Component({
  selector: 'app-ke-hoach-da-duyet-modal',
  templateUrl: './ke-hoach-da-duyet-modal.component.html',
  styleUrls: ['./ke-hoach-da-duyet-modal.component.css']
})
export class KeHoachDaDuyetModalComponent implements OnInit {

  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  opt: any = ""
  userInfo: any;
  isVuotSanLuong: boolean;
  sanLuongVuot: any = 0;
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
  labelThang: Array<string> = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',];
  propThang: Array<string> = ['Thang1', 'Thang2', 'Thang3', 'Thang4', 'Thang5', 'Thang6', 'Thang7', 'Thang8', 'Thang9', 'Thang10', 'Thang11', 'Thang12',];
  checkThang: any = [];
  soMayConAllMonth: any = [];
  sanLuongAllMonth: any = [];
  sanLuongForAllMonth: any;
  sanLuongConLaiAllMonth: any;
  tongSoMayCon: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _modal: NgbModal,
    public toastr: ToastrService,
    private _danhMucHopDong: DanhMucHopDongService,
    private _services: SanXuatService,
    private store: StoreService,
    private _confirmService: ConfirmationService,
    private _auth: AuthenticationService,
    private router: Router
    ) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.getYearsForDropDown();
    this.KiemTraButton();
    if (this.opt === 'add') {
      this.kehoach.Nam = new Date().getFullYear() + 1;
      this.kehoach.NgayLap = new Date();
      this.kehoach.TenNguoiLap = this.userInfo.TenNhanVien;
      this.kehoach.MaDonViTienTe = 'VND';
      this.kehoach.lstKH_KeHoachKinhDoanh_SanPham = [];
      this.GetNextSoQuyTrinh();
      this.GetListSanPhamHoaDon();
    } else {
      this.kehoach.NgayLap = UnixToDate(this.kehoach.NgayLapUnix);
    }
    this.CheckThangForWarning();
    this.GetNhaMay();
    this.CountAll();
    this.GetTongSoMayCon();
  }

  CheckThangForWarning() {
    this.checkThang = [];
    let month =  new Date().getMonth() + 1;
    let year =  new Date().getFullYear();
    let currentTime = new Date(`${year},${month} 00:00:00`);
    for(let i = 0; i < 12; i++) {
      let checkTime = new Date(`${this.kehoach.Nam}, 0${i+1} 00:00:00`);
      this.checkThang[i] = checkTime > currentTime;
    }
    // console.log("checkThang", this.checkThang)
  }

  GetTongSoMayCon() {
    this._danhMucHopDong.KeHoachSanXuat().GetTongSoMayCon(this.kehoach.IdDuAn).subscribe((res: any) => {
      this.tongSoMayCon = res;
    })
  }

  GetNhaMay() {
    this._services.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res: any) => {
      this.listNhaMay = mapArrayForDropDown(res, 'TenDuAn', 'Id');
    })
  }

  getYearsForDropDown() {
    let date = new Date().getFullYear() - 1;
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
    this._danhMucHopDong.KeHoachSanXuat()
      .GetChiTietMatHangChoKHKD(this.kehoach.IdDuAn)
      .subscribe((res: any) => {
        this.kehoach.lstKH_KeHoachKinhDoanh_SanPham = res;
        this.kehoach.lstKH_KeHoachKinhDoanh_SanPham = this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.map(ele => {
          return {
            TenSanPham: ele.Ten,
            IdSanPham: ele.Id,
            lstKH_KeHoachKinhDoanh_SanPham_NhaMay: [
              {
                Id: "",
                IdSanPham: ele.Id,
                TongSanLuongThang: ele.TongSanLuong || 0,
                TongSanLuongConLai: 0,
                lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH: this.RenderThang(ele)
              }
            ],
            lstKH_KeHoachKinhDoanh_SanPham_ThoiGianHopDong: ele.lstThoiGianHopDong
          }
        })
        this.GetNhaMay();
        this.CountAll();
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
    }
    return data;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._danhMucHopDong.DanhSachKeHoachKinhDoanh().Set(this.SetData()).subscribe((res: any) => {
        handleHTTPResponse(res, this.toastr, () => {
          this.kehoach = res.Data;
          this.activeModal.close(this.kehoach.Id);
        })
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
        this.KiemTraButton();
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
    modalRef.componentInstance.IdDuAn = this.kehoach.IdDuAn;
    modalRef.componentInstance.listIdSanPham = listIdSanPham;
    modalRef.result
      .then((res: any) => {
        let listKhongHD = this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.filter(ele => ele.isKhongHopDong);
        listKhongHD = merge([...res], listKhongHD, 'IdSanPham');
        this.kehoach.lstKH_KeHoachKinhDoanh_SanPham = this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.filter(ele => !ele.isKhongHopDong)
        this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.push(...listKhongHD);
        this.GetNhaMay();
        this.CountTongSanLuongConLai();
      })
      .catch((error: any) => { })
      .finally(() => { })
  }

  SeeHopDongDetail(sanpham) {
    let modalRef = this._modal.open(HopdongsanphammodalComponent, {
      size: 'xl',
      backdrop: 'static',
    })
    modalRef.componentInstance.listHopDong = deepCopy(sanpham.lstKH_KeHoachKinhDoanh_SanPham_ThoiGianHopDong)
    modalRef.componentInstance.tenSanPham = sanpham.TenSanPham
    modalRef.componentInstance.nam = this.kehoach.Nam
    modalRef.result
      .then((res: any) => {
        sanpham.lstKH_KeHoachKinhDoanh_SanPham_ThoiGianHopDong = res;
        this.CountTongSanLuongConLai();
      })
      .catch((error: any) => {

      })
      .finally(() => { })
  }

  SeeMonthDetail(sanpham, itemThang) {
  
    if (this.checkThang[itemThang.Thang - 1]) {
      let modalRef = this._modal.open(ChitietthangComponent, {
        size: 'xl',
        backdrop: 'static',
      })
      modalRef.componentInstance.opt = this.opt;
      modalRef.componentInstance.NeGoc = this.kehoach.NeGoc;
      modalRef.componentInstance.IdDuAn = this.kehoach.IdDuAn;
      modalRef.componentInstance.nam = this.kehoach.Nam;
      modalRef.componentInstance.Ne = itemThang.Ne || sanpham.Ne;
      modalRef.componentInstance.idSanPham = sanpham.IdSanPham;
      modalRef.componentInstance.thang = itemThang.Thang;
      modalRef.componentInstance.tenSanPham = sanpham.TenSanPham;
      modalRef.componentInstance.itemThang = {...itemThang.ThongTinThang_SanPham};
      modalRef.componentInstance.itemThang.TongSanLuong = itemThang.SanLuongThang || 0;
      modalRef.result
        .then((res: any) => {
          itemThang.ThongTinThang_SanPham = res;
          itemThang.SanLuongThang = itemThang.ThongTinThang_SanPham.TongSanLuong;
          this.CheckForAllMonth(sanpham, itemThang);
          this.CountAll();
          
        })
        .catch((error: any) => {
  
        })
        .finally(() => { })
    } else {
      this.toastr.error('Tháng đã thực hiện!');
    }
  }

  CheckForAllMonth(sanpham, itemThang) {
    let data = { ...itemThang };
    // console.log("sanpham",sanpham);
    // console.log("itemThang",itemThang);
    if (itemThang.ThongTinThang_SanPham.checkForAll) {
      for (let i = itemThang.Thang - 1; i < 12; i++) {
        data.Thang = i + 1;
        sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH[i] = { ...data };
        sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH[i].ThongTinThang_SanPham
        = {...data.ThongTinThang_SanPham};
      }
      this.CountAll();
    }
  }

  CountAll() {
    this.CountTongSanLuongConLai();
    this.CountSoMayConBoTri();
    this.CountTongSanLuong();
    this.CountAllMonth();
  }

  CountSoMayConBoTri() {
    this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.forEach(item => {
      if (validVariable(item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0])) {
        item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSoMayConBoTri = 0;
        item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH?.forEach(thang => {
          item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSoMayConBoTri += (thang.ThongTinThang_SanPham.SoMayConBoTri || 0);
        })
      }
    })
  }

  CountTongSanLuongConLai() {
    this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.forEach(sanpham => {
      sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSanLuongConLai
        = sanpham.lstKH_KeHoachKinhDoanh_SanPham_ThoiGianHopDong.reduce((total, hopdong) => {
          return total + hopdong.SanLuongConLai;
        }, 0)
    })
  }

  CountTongSanLuong() {
    console.log("this kehoach", this.kehoach);
    this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.forEach(item => {
      if (validVariable(item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0])) {
        // debugger
        item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSanLuongThang = 0;
        item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH?.forEach(thang => {
          item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSanLuongThang += (thang.SanLuongThang || 0);
        })
        item.isVuotSanLuong = !!(item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSanLuongThang > item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSanLuongConLai);
        let slvuot = item.isVuotSanLuong ? (item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSanLuongThang - item.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSanLuongConLai) : 0;
        // console.log("slvuot", slvuot);
        item.sanLuongVuot = `Vượt quá sản lượng còn lại ${formatNumber(slvuot, 'en-US', '0.0-0')} tấn`;
      }
    })
  }

  CountAllMonth() {
    console.log("kehoach", this.kehoach);
    for(let i = 0; i < 12; i++) {
      this.sanLuongAllMonth[i]=0;
      this.soMayConAllMonth[i]=0;
    }
    this.sanLuongConLaiAllMonth = this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.reduce((total, ele) => {
      return total + ele.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSanLuongConLai;
    }, 0);
    this.sanLuongForAllMonth = this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.reduce((total, ele) => {
      return total + ele.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].TongSanLuongThang;
    }, 0)
    this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.forEach((sanpham) => {
      for(let i = 0; i < 12; i++) {
        this.sanLuongAllMonth[i] += sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH[i].SanLuongThang;
        this.soMayConAllMonth[i] += sanpham.lstKH_KeHoachKinhDoanh_SanPham_NhaMay[0].lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH[i].ThongTinThang_SanPham.SoMayConBoTri;
      }
    })
    console.log("sanLuongAllMonth", this.sanLuongAllMonth);
    
  }

  DeleteSanPham(index) {
    this._confirmService.show({
      message: 'Bạn chắc chắn muốn xóa mặt hàng này?'
    }, () => {
      this.kehoach.lstKH_KeHoachKinhDoanh_SanPham.splice(index, 1)
    })
  }

  DieuChinh() {
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh().DieuChinh(this.kehoach.Id).subscribe((res: any) => {
      this.kehoach = res;
      this.CheckThangForWarning();
      this.GetNhaMay();
      this.CountAll();
      this.GetTongSoMayCon();
      this.KiemTraButton();
      this.GetNhaMay();
    })
  }

}

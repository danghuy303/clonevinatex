import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ConfirmationService } from 'src/app/services/confirmation.service';
import { vn } from 'src/app/services/const';
import { DateToUnix, handleHTTPResponse, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-lap-doanh-thu-modal',
  templateUrl: './lap-doanh-thu-modal.component.html',
  styleUrls: ['./lap-doanh-thu-modal.component.css']
})
export class LapDoanhThuModalComponent implements OnInit {

  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  opt: any = "";
  filter: any = {};
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  lang: any = vn;
  kehoach: any = {};
  listKeHoachDaDuyet: any = [];
  listDoanhThu: any = [];
  listLableThang: any = [];
  checkButton: any = {};
  verticalSum: any = [];
  horizontalSum: any = 0;

  constructor(
    private _danhMucHopDong: DanhMucHopDongService,
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private toastr: ToastrService,
    private confirmService: ConfirmationService,
    private _auth: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.initData();
    // console.log("kehoach", this.kehoach);
  }

  initData() {
    if (this.opt === 'add') {
      this.kehoach.TenNguoiLap = this._auth.currentUserValue.TenNhanVien;
      this.getNext();
      this.kehoach.NgayLap = new Date();
    } else {
      this.kehoach.NgayLap = UnixToDate(this.kehoach.NgayLapUnix)
    }
    this.kiemTraButton();
    this.getLabelThang();
    this.getKeHoachDaDuyet();
    this.countAllSum();
  }

  kiemTraButton() {
    this._services.KiemTraButton(this.kehoach.Id || '', this.kehoach.IdTrangThai || '')
      .subscribe(res => {
        this.checkButton = res;
      })
  }

  countAllSum() {
    this.countDoanhThu();
    this.countVerticalSum();
    this.countHorizontalSum();
  }

  countDoanhThu() {
    this.kehoach.lstGiaSanPham.forEach(sanpham => {
      sanpham.lstChiTietGia.forEach(thang => {
        thang.DoanhThu = (thang.DonGia || 0) * (thang.SanLuong || 0);
      })
    })
  }

  countVerticalSum() {
    for (let i = 0; i < 12; i++) {
      this.verticalSum[i] = 0;
      this.kehoach.lstGiaSanPham.forEach((sanpham) => {
        this.verticalSum[i] += sanpham.lstChiTietGia[i].DoanhThu;
      })
    }
    this.verticalSum[12] = this.verticalSum.reduce((total, ele, index) => {
      return (index < 12 ? (total + ele) : total);
    }, 0)
    console.log("this.kehoach.lstGiaSanPham", this.kehoach.lstGiaSanPham);
    console.log("this.verticalSum,", this.verticalSum);
  }

  countHorizontalSum() {
    this.kehoach.lstGiaSanPham.forEach((sanpham) => {
      sanpham.TongDoanhThu = sanpham.lstChiTietGia.reduce((total, thang) => {
        return total + thang.DoanhThu;
      }, 0)
    })
  }

  getNext() {
    this._danhMucHopDong.KeHoachDoanhThu()
      .GetNextSo().subscribe((res: any) => {
        this.kehoach.SoQuyTrinh = res.Data;
      })
  }

  getLabelThang() {
    for (let i = 1; i <= 12; i++) {
      this.listLableThang.push(`Tháng ${i}`);
    }
  }

  getKeHoachDaDuyet() {
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh()
      .GetKeHoachKinhDoanhDangThucHien()
      .subscribe((res: any) => {
        this.listKeHoachDaDuyet = mapArrayForDropDown(res.Data, 'TenKeHoach', 'Id');
      })
  }

  getSanPham() {
    let data = this.kehoach.IdLapKeHoachKinhDoanhNam;
    this._danhMucHopDong.KeHoachDoanhThu()
      .GetSanPhamByIdKeHoach(data).subscribe((res: any) => {
        this.kehoach = {
          ...res,
          TenKeHoach: this.kehoach.TenKeHoach || "",
          TenNguoiLap: this.kehoach.TenNguoiLap,
          NgayLap: this.kehoach.NgayLap
        };
        this.countAllSum();
      })
  }

  validateData() {
    if (!validVariable(this.kehoach.IdLapKeHoachKinhDoanhNam)) {
      this.toastr.error('Vui lòng chọn kế hoạch sản lượng!');
      return false;
    } else if (!validVariable(this.kehoach.TenKeHoach)) {
      this.toastr.error('Vui lòng nhập tên kế hoạch!');
      return false;
    }
    return true;
  }

  setData() {
    let data = {
      ...this.kehoach,
      NgayLapUnix: DateToUnix(this.kehoach.NgayLap)
    };
    return data;
  }

  ghiLai() {
    if (this.validateData()) {
      this._danhMucHopDong.KeHoachDoanhThu()
        .Set(this.setData()).subscribe((res: any) => {
          handleHTTPResponse(res, this.toastr, () => {
            this.kehoach = res.Data;
            this.kehoach.NgayLap = UnixToDate(this.kehoach.NgayLapUnix);
            this.kiemTraButton();
            this.countAllSum();
          })
        })
    }
  }

  khongDuyet() {
    this._danhMucHopDong.KeHoachDoanhThu()
      .KhongDuyet(this.kehoach).subscribe((res: any) => {
        handleHTTPResponse(res, this.toastr, () => {
          this.activeModal.close();
        })
      })
  }

  chuyenDuyet() {
    this._danhMucHopDong.KeHoachDoanhThu()
      .ChuyenTiep(this.kehoach).subscribe((res: any) => {
        handleHTTPResponse(res, this.toastr, () => {
          this.activeModal.close();
        })
      })
  }

  xoa() {
    this.confirmService.show({
      message: 'Bạn chắc chắn muốn xóa quy trình này?'
    }, () => {
      this._danhMucHopDong.KeHoachDoanhThu()
        .Delete(this.kehoach).subscribe((res: any) => {
          handleHTTPResponse(res, this.toastr, () => {
            this.activeModal.close();
          })
        })
    })
  }

  dieuChinh() {
    this._danhMucHopDong.KeHoachDoanhThu().DieuChinh(this.kehoach.Id).subscribe((res: any) => {
      this.kehoach = res;
      this.kiemTraButton();
    })
  }

}

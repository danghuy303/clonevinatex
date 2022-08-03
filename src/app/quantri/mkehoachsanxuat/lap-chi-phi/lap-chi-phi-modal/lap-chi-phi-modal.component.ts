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
  selector: 'app-lap-chi-phi-modal',
  templateUrl: './lap-chi-phi-modal.component.html',
  styleUrls: ['./lap-chi-phi-modal.component.css']
})
export class LapChiPhiModalComponent implements OnInit {

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
  userInfo: any = {};


  constructor(
    private _danhMucHopDong: DanhMucHopDongService,
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private toastr: ToastrService,
    private confirmService: ConfirmationService,
    private _authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initData();
    // console.log("kehoach", this.kehoach);
  }

  initData() {
    if (this.opt === 'add') {
      this.userInfo = this._authService.currentUserValue;
      this.kehoach.TenNguoiLap = this.userInfo.TenNhanVien;
      this.getNext();
      this.kehoach.NgayLap = new Date();
    } else {
      this.kehoach.NgayLap = UnixToDate(this.kehoach.NgayLapUnix)
    }
    this.kiemTraButton();
    this.getLabelThang();
    this.getKeHoachDaDuyet();
  }

  kiemTraButton() {
    this._services.KiemTraButton(this.kehoach.Id || '', this.kehoach.IdTrangThai || '')
      .subscribe(res => {
        this.checkButton = res;
      })
  }

  getNext() {
    this._danhMucHopDong.KeHoachChiPhi()
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
    let data = this.kehoach.IdLapKeHoachSanLuongNam;
    this._danhMucHopDong.KeHoachChiPhi()
      .GetSanPhamByIdKeHoach(data).subscribe((res: any) => {
        this.kehoach = {
          ...res,
          TenNguoiLap: this.kehoach.TenNguoiLap,
          NgayLap: this.kehoach.NgayLap
        };
        // console.log("this.kehoach", this.kehoach);
        // this.countAllSum();
      })
  }

  validate() {
    if (!validVariable(this.kehoach.IdLapKeHoachSanLuongNam)) {
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
    if (this.validate()) {
      this._danhMucHopDong.KeHoachChiPhi()
        .Set(this.setData()).subscribe((res: any) => {
          handleHTTPResponse(res, this.toastr, () => {
            this.kehoach = res.Data;
            this.kehoach.NgayLap = UnixToDate(this.kehoach.NgayLapUnix);
            this.kiemTraButton();
            // this.countAllSum();
          })
        })
    }
  }

  khongDuyet() {
    this._danhMucHopDong.KeHoachChiPhi()
      .KhongDuyet(this.kehoach).subscribe((res: any) => {
        handleHTTPResponse(res, this.toastr, () => {
          this.activeModal.close();
        })
      })
  }

  chuyenDuyet() {
    this._danhMucHopDong.KeHoachChiPhi()
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
      this._danhMucHopDong.KeHoachChiPhi()
        .Delete(this.kehoach).subscribe((res: any) => {
          handleHTTPResponse(res, this.toastr, () => {
            this.activeModal.close();
          })
        })
    })
  }

  dieuChinh() {
    this._danhMucHopDong.KeHoachChiPhi().DieuChinh(this.kehoach.Id).subscribe((res: any) => {
      this.kehoach = res;
      this.kiemTraButton();
    })
  }

}

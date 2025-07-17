import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-hopdongvattuphumodal',
  templateUrl: './hopdongvattuphumodal.component.html',
  styleUrls: ['./hopdongvattuphumodal.component.css']
})
export class HopdongvattuphumodalComponent implements OnInit {
  opt: any = "add";
  title: string
  item: any = {};
  hopDong: any = {};
  listDieuKhoanThanhToan: any = [];
  listHangHoaSoi: any = []
  userInfo: any;
  newItem: any = {};
  lang: any = vn;
  filter: any = {
    keyWord: "",
  };
  isVatTuPhu: any = true;
  isSoi: any = true;
  checkedAll: boolean = false;
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }

  yearRange: string = `${new Date().getFullYear()}:${new Date().getFullYear() + 5
    }`;
  constructor(
    public activeModal: NgbActiveModal,
    private _auth: AuthenticationService,
    public _modal: NgbModal,
    private _service: HopDongService,
    private _servicesSanXuat: SanXuatService,
    private _toastr: ToastrService
  ) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
      this.title = 'Thêm mới hợp đồng vật tư phụ';
    } else {
      this.title = "Chỉnh sửa hợp đồng vật tư phụ";
      this.KiemTraButtonModal();
      this.GetQuyTrinh(this.item.HopDong.Id);
    }
  }

  KiemTraButtonModal() {
    this._servicesSanXuat
      .KiemTraButton(this.item.HopDong.Id || "", this.item.HopDong.IdTrangThai || "")
      .subscribe((res: any) => {
        this.checkbutton = res;
      });
  }
  GetQuyTrinh(id) {
    this._service.QuyTrinhHopDong().Get(id).subscribe((res1: any) => {
      this.item = res1.Data
      this.item.HopDong.IdTrangThai = res1.Data.HopDong.IdTrangThai;
      this.item.HopDong.Id = res1.Data.HopDong.Id;
      this.item.HopDong.NgayKy = UnixToDate(this.item.HopDong.NgayKyUnix);
      this.item.HopDong.NgayHieuLuc = UnixToDate(this.item.HopDong.NgayHieuLucUnix);
      this.item.HopDong.NgayGiaoHang = UnixToDate(this.item.HopDong.NgayGiaoHangUnix);
      if (this.item.listHangHoa.length > 0) {
        this.item.listHangHoa.forEach(element => {
          this.item.HopDong.ThanhTien = (this.item.HopDong.ThanhTien || 0) + ((element.SoLuong || 0) * (element.DonGia || 0))
        });
      }
      if (this.item.HopDong.isBenBanChiu) {
        this.item.HopDong.BenBanChiu = this.item.HopDong.isBenBanChiu;
        this.item.HopDong.BenMuaChiu = !this.item.HopDong.BenBanChiu;
      }
      else {
        this.item.HopDong.BenMuaChiu = !this.item.HopDong.isBenBanChiu;
        this.item.HopDong.BenBanChiu = !this.item.HopDong.BenMuaChiu;
      }
      this.KiemTraButtonModal();
      if (this.item.listDieuKhoanThanhToan.length > 0) {
        this.item.listDieuKhoanThanhToan.forEach(element => {
          element.NgayThanhToan = UnixToDate(element.NgayThanhToanUnix);
          if (element.listThanhToanThuTuc === null)
            element.listThanhToanThuTuc = [];
        });
      }
      if (this.item.listBaoLanh.length > 0) {
        this.item.listBaoLanh.forEach(element => {
          element.HieuLucBaoLanh = UnixToDate(element.HieuLucBaoLanhUnix);
        });
      }
      if (validVariable(this.item.HopDong.IdHopDong)) {
        this.item.HopDong.isPhuLuc = true;
      }
    })
  }
  GetNextSoQuyTrinh() {
    this._service.QuyTrinhHopDong().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.HopDong.SoQuyTrinh = res.Data;
    });
  }

  ValidData() {
    if (!validVariable(this.item.HopDong.tenHopDong)) {
      this._toastr.error("Vui lòng chọn tên hợp đồng");
      return false;
    }
    if (!validVariable(this.item.HopDong.SoHopDong)) {
      this._toastr.error("Vui lòng chọn số hợp đồng");
      return false;
    }
    return true;
  }
  GhiLai() {
    this.item.HopDong.NgayKyUnix = DateToUnix(this.item.HopDong.NgayKy);
    this.item.HopDong.NgayHieuLucUnix = DateToUnix(this.item.HopDong.NgayHieuLuc);
    this.item.HopDong.NgayGiaoHangUnix = DateToUnix(this.item.HopDong.NgayGiaoHang);
    if (this.item.HopDong.BenBanChiu) {
      this.item.HopDong.isBenBanChiu = true;
    }
    if (this.ValidData()) {
      this._service.QuyTrinhHopDong().Set(this.item).subscribe((res: any) => {
        console.log(this.item);
        if (res) {
          if (res?.statusCode === 200) {
            this.item.Loai = 2
            this._toastr.success(res.Message);
            this.GetQuyTrinh(res.Data)
          } else {
            this._toastr.error(res.Message);
          }
        }
      });
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message =
      "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._service
          .QuyTrinhHopDong()
          .Deletes(this.item.HopDong.Id)
          .subscribe((res: any) => {
            console.log(res);
            if (res?.statusCode === 200) {
              this.activeModal.close();
              this._toastr.success(res.Message);
            } else {
              this._toastr.error(res.Message);
            }
          });
      })
      .catch((er) => console.log(er));
  }
  ChuyenTiep() {
    this.item.HopDong.NgayKyUnix = DateToUnix(this.item.HopDong.NgayKy);
    this.item.HopDong.NgayHieuLucUnix = DateToUnix(this.item.HopDong.NgayHieuLuc);
    this.item.HopDong.NgayGiaoHangUnix = DateToUnix(this.item.HopDong.NgayGiaoHang);
    if (this.item.HopDong.BenBanChiu) {
      this.item.HopDong.isBenBanChiu = true;
    }
    this._service.QuyTrinhHopDong().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res?.statusCode === 200) {
          this._toastr.success(res.Message)
          this.activeModal.close();
        } else {
          this._toastr.error(res.Message);
        }
      }
    })

  }
  KhongDuyet() {
    this.item.HopDong.NgayKyUnix = DateToUnix(this.item.HopDong.NgayKy);
    this.item.HopDong.NgayHieuLucUnix = DateToUnix(this.item.HopDong.NgayHieuLuc);
    this.item.HopDong.NgayGiaoHangUnix = DateToUnix(this.item.HopDong.NgayGiaoHang);
    if (this.item.HopDong.BenBanChiu) {
      this.item.HopDong.isBenBanChiu = true;
    }
    this._service.QuyTrinhHopDong().KhongDuyet(this.item).subscribe((res: any) => {
      if (res) {
        if (res?.statusCode === 200) {
          this._toastr.success(res.Message)
          this.activeModal.close();
        } else {
          this._toastr.error(res.Message);
        }
      }
    })
  }
}

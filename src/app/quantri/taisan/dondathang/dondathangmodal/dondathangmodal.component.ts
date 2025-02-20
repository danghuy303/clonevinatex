import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ChitietdondathangComponent } from '../chitietdondathang/chitietdondathang.component';

@Component({
  selector: 'app-dondathangmodal',
  templateUrl: './dondathangmodal.component.html',
  styleUrls: ['./dondathangmodal.component.css']
})
export class DondathangmodalComponent implements OnInit {

  title: string = '';
  opt: string = '';
  quyTrinh: any = {};
  checkButton: any = {};
  listDuAn: any = [];
  listBoPhan: any = [];

  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  userInfo: any = {};

  constructor(
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
    public toastr: ToastrService,
    public store: StoreService,
    public _modal: NgbModal,
    private _services: SanXuatService,
    private _auth: AuthenticationService
  ) { this.userInfo = this._auth.currentUserValue; }

  ngOnInit(): void {
    this.KiemTraButton();
    if (this.opt === 'add') {
      this.quyTrinh.Ngay = new Date();
      this.quyTrinh.NgayGiaoHang = new Date();
      this.GetNextSoQuyTrinh();
    } else {
      this.GetById();
      if (!this.quyTrinh.SoQuyTrinh) {
        this.GetNextSoQuyTrinh();
      }
    }
  }

  GetById() {
    this.quyTrinh = {
      ...this.quyTrinh,
      NgayGiaoHang: UnixToDate(this.quyTrinh.NgayGiaoHangUnix),
      Ngay: UnixToDate(this.quyTrinh.NgayUnix),
      listItem: this.quyTrinh.listItem.map(ele => {
        return {
          ...ele,
          ThanhTien: (ele.DonGia || 0) * (ele.SoLuong || 0)
        }
      })
    }
    this.quyTrinh.GiaTri = this.quyTrinh.listItem.reduce((a, b) => a + (b.ThanhTien || 0), 0);
  }

  KiemTraButton() {
    this._services.KiemTraButton(this.quyTrinh.Id || "", this.quyTrinh.IdTrangThai || "").subscribe((res: any) => {
      this.checkButton = res;
    });
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.DonDatHang().GetNextSo().subscribe((res: any) => {
      this.quyTrinh.SoQuyTrinh = res.Data;
    })
  }

  ThemMoiDonHang() {
    // this._serviceTaiSan.GetlistdmItem({ currentpage: 0 }).subscribe((res: any) => {
    //   let modalRef = this._modal.open(ChitietdondathangComponent, {
    //     size: 'lg',
    //     backdrop: 'static',
    //   })
    //   modalRef.componentInstance.listItem = res.Data || [];
    //   modalRef.componentInstance.listDaChon = [];
    //   modalRef.result
    //     .then((res: any) => {
    //       this.quyTrinh.listItem = res;
    //     })
    //     .catch((error: any) => { })
    // })
  }

  xoaItem(idx) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?";
    modalRef.result.then((res) => {
      this.quyTrinh.listItem.splice(idx, 1);
    })
      .catch((er) => console.log(er));
  }

  setData() {
    let data = {
      ...this.quyTrinh,
      eAction: 'DONDATHANG',
      NgayGiaoHangUnix: DateToUnix(this.quyTrinh.NgayGiaoHang),
      NgayUnix: DateToUnix(this.quyTrinh.Ngay)
    }
    return data;
  }

  ValidateData() {
    // if (!validVariable(this.quyTrinh.NoiDung)) {
    //   this.toastr.error("Yêu cầu nhập nội dung!");
    //   return false;
    // }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.DonDatHang().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.quyTrinh = {
            ...res.Data,
            NgayGiaoHang: UnixToDate(res.Data.NgayGiaoHangUnix),
            Ngay: UnixToDate(res.Data.NgayUnix),
            listItem: res.Data.listItem.map(ele => {
              return {
                ...ele,
                ThanhTien: (ele.DonGia || 0 * ele.SoLuong || 0)
              }
            })
          }
          this.KiemTraButton();
          this.toastr.success(res.Message);
        } else this.toastr.error(res.Message);
      })
    }
  }

  KhongDuyet() {
    this._serviceTaiSan.DonDatHang().KhongDuyet(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  ChuyenDuyet() {
    this._serviceTaiSan.DonDatHang().ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._serviceTaiSan.DonDatHang().Delete(this.setData()).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.Message);
          }
        })
      })
      .catch((er) => console.log(er));
  }

  ChiTietPhieu() {
    this._serviceTaiSan.GetChiTietDonDatHang(this.setData()).subscribe((res: any) => {
      let modalRef = this._modal.open(ChitietdondathangComponent, {
        size: 'xl',
        backdrop: 'static',
      })
      modalRef.componentInstance.listPhieuKiemHang = res.Data.listPhieuKiemHang || [];
      modalRef.componentInstance.listPhieuDNCU = res.Data.listPhieuDNCU || [];
      modalRef.result
        .then((res: any) => {
        })
        .catch((error: any) => { })
    })
  }

  tinhThanhTien(item) {
    item.ThanhTien = (item.SoLuong || 0) * (item.DonGia || 0);
    this.quyTrinh.listItem = [...this.quyTrinh.listItem];
    this.quyTrinh.GiaTri = this.quyTrinh.listItem.reduce((a, b) => a + (b.ThanhTien || 0), 0);
  }

}
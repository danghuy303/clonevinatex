import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../../quantri/modal/modalthongbao/modalthongbao.component';
import { vn } from '../../../../services/const';
import { DateToUnix, deepCopy, getSTT, mapArrayForDropDown, merge, UnixToDate, validVariable } from '../../../../services/globalfunction';
import { StoreService } from '../../../../services/store.service';
import { TaisanService } from '../../../../services/Taisan/taisan.service';
import { DanhsachtaisanpopupComponent } from '../../kiemdinhtaisan/danhsachtaisanpopup/danhsachtaisanpopup.component';
import { ConfirmationService } from '../../../../services/confirmation.service';
import { DanhmuctaisanService } from '../../../../services/Taisan/danhmuctaisan.service';

@Component({
  selector: 'app-theodoihoatmodal',
  templateUrl: './theodoihoatmodal.component.html',
  styleUrls: ['./theodoihoatmodal.component.css']
})
export class TheodoihoatmodalComponent implements OnInit {

  quyTrinh: any = { listTaiSan: [] };
  type = '';
  checkbutton: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listTaiSan: any = [];
  title: any = '';
  eAction: string = '';
  listBoPhan: any = [];
  listCaSanXuat: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
    public toastr: ToastrService,
    public store: StoreService,
    public _modal: NgbModal,
    private _confirmService: ConfirmationService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    if (this.type === 'themmoi') {
      this.GetNextSoQuyTrinh();
      this.quyTrinh.Ngay = new Date();
    } else {
      if (this.quyTrinh.NgayUnix) {
        this.quyTrinh.Ngay = UnixToDate(this.quyTrinh.NgayUnix);
      } else if (this.quyTrinh.Ngay) {
        this.quyTrinh.Ngay = UnixToDate(this.quyTrinh.Ngay) || new Date(this.quyTrinh.Ngay);
      }
      this.getListCaSanXuat();
      if (this.quyTrinh.listTaiSan) {
        this.quyTrinh.listTaiSan.forEach((ele: any) => {
          this.getSanLuongDropdownForAsset(ele);
        });
      }
    }
    this.KiemTraButtonModal();
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.TheoDoiHoatDong().GetNextSo().subscribe((res: any) => {
      this.quyTrinh.SoQuyTrinh = res.Data;
    })
  }

  KiemTraButtonModal() {
    this._serviceTaiSan.KiemTraButton(this.quyTrinh.Id || "", this.quyTrinh.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  ValidateData() {
    return true;
  }

  setData() {
    let data = {
      ...this.quyTrinh,
      eAction: this.eAction,
      IdDuAn: this.store.getCurrent(),
      NgayUnix: DateToUnix(this.quyTrinh.Ngay),
      listTaiSan: this.quyTrinh.listTaiSan.map((ele: any) => {
        return {
          ...ele,
          NgayBatDauUnix: DateToUnix(this.quyTrinh.Ngay),
          NgayKetThucUnix: DateToUnix(this.quyTrinh.Ngay),
          // Remove client-only dropdown lists to keep data save payload clean
          listSanLuongDropdown: undefined,
          rawSanLuongList: undefined,
        }
      })
    }
    return data;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.TheoDoiHoatDong().SetQuyTrinh(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.quyTrinh = {
            ...res.Data,
            Ngay: UnixToDate(res.Data.NgayUnix || res.Data.Ngay),
          }
          this.getListCaSanXuat();
          if (this.quyTrinh.listTaiSan) {
            this.quyTrinh.listTaiSan.forEach((ele: any) => {
              this.getSanLuongDropdownForAsset(ele);
            });
          }
          this.KiemTraButtonModal();
          this.toastr.success(res.Message);
        }
        else this.toastr.error(res.Message)
      })
    }
  }

  ChuyenDuyet() {
    this._serviceTaiSan.TheoDoiHoatDong().ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }

  KhongDuyet() {
    this._serviceTaiSan.TheoDoiHoatDong().ChuyenTiep(this.setData()).subscribe((res: any) => {
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
        this._serviceTaiSan.TheoDoiHoatDong().Delete(this.quyTrinh.Id).subscribe((res: any) => {
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

  // handle xử lý riêng

  getListTaiSanDangSuDung() {
    this._serviceTaiSan.GetListTaiSanDangSuDung({ CurrentPage: 0, IdBoPhanSuDung: this.quyTrinh.IddmPhanXuong }).subscribe((res: any) => {
      if (res.Data?.length) {
        this.listTaiSan = res.Data;
      }
    })
  }

  delete(item: any) {
    this._confirmService.show({
      message: 'Bạn chắc chắn muốn xóa máy/thiết bị này?'
    }, () => {
      this.quyTrinh.listTaiSan = this.quyTrinh.listTaiSan?.filter((ele: any) => ele.IdTaiSan !== item.IdTaiSan);
    })
  }

  handleThemTaiSan() {
    if (!this.quyTrinh.IddmPhanXuong) {
      this.toastr.error('Vui lòng chọn bộ phận');
      return;
    }
    this.getListTaiSanDangSuDung();
    let modalRef = this._modal.open(DanhsachtaisanpopupComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.listDaChon = this.quyTrinh.listTaiSan ? this.quyTrinh.listTaiSan.map((ele: any) => ele.IdTaiSan) : [],
      modalRef.componentInstance.listView = this.listTaiSan;
    modalRef.componentInstance.title = 'Danh sách máy/thiết bị';
    modalRef.result.then((res: any) => {
      const _list = this.quyTrinh.listTaiSan || [];
      this.quyTrinh.listTaiSan = res.map((ele: any) => {
        let _newObj = _list.find((x: any) => x.IdTaiSan === ele.IdTaiSan);
        if (!_newObj) {
          _newObj = { ...ele };
          this.getSanLuongDropdownForAsset(_newObj);
        }
        return _newObj;
      })
    })
      .catch((er) => {
      });
  }

  onChangeBoPhan() {
    this.getListCaSanXuat();
    this.quyTrinh.IddmCaSanXuat = null;
  }

  getListCaSanXuat() {
    if (!this.quyTrinh.IddmPhanXuong) {
      this.listCaSanXuat = [];
      return;
    }
    let data = {
      CurrentPage: 1,
      PageSize: 1000,
      IddmPhanXuong: this.quyTrinh.IddmPhanXuong
    };
    this._danhMucTaiSan.DanhMucCaSanXuat().GetList(data).subscribe((res: any) => {
      const items = res.Data?.Items || res.Data || res.items || res || [];
      this.listCaSanXuat = mapArrayForDropDown(items, 'Ten', 'Id');
    });
  }

  onChangeCaSanXuat() {
    if (this.listCaSanXuat && this.quyTrinh.IddmCaSanXuat) {
      const selected = this.listCaSanXuat.find((x: any) => x.value === this.quyTrinh.IddmCaSanXuat);
      if (selected) {
        this.quyTrinh.TendmCaSanXuat = selected.label;
      }
    } else {
      this.quyTrinh.TendmCaSanXuat = '';
    }
  }

  getSanLuongDropdownForAsset(item: any) {
    if (!item.IdTaiSan) return;
    this._serviceTaiSan.GetSanLuongMay(item.IdTaiSan).subscribe((res: any) => {
      const list = res.Data || res || [];
      item.listSanLuongDropdown = mapArrayForDropDown(list, 'Ten', 'Id');
      item.rawSanLuongList = list;

      // Look up and restore SanLuong if IdSanLuong is already selected
      if (item.IdSanLuong) {
        const selected = list.find((x: any) => x.Id === item.IdSanLuong);
        if (selected) {
          item.SanLuong = selected.SanLuong || 0;
          item.DinhMuc = selected.SanLuong || 0;
          item.TieuHaoDinhMuc = selected.SanLuong || 0;
        }
      }
    });
  }

  onChangeSanLuong(item: any) {
    if (item.rawSanLuongList && item.IdSanLuong) {
      const selected = item.rawSanLuongList.find((x: any) => x.Id === item.IdSanLuong);
      if (selected) {
        item.SanLuong = selected.SanLuong || 0;
        item.DonViTinh_SanLuong = selected.DonViTinh_SanLuong;
        item.DinhMuc = selected.SanLuong || 0;
        item.TieuHaoDinhMuc = selected.SanLuong || 0;
        item.DonViTinh_NhienLieu = selected.DonViTinh_NhienLieu;
        item.TendmLoaiNhienLieu = selected.TendmLoaiNhienLieu;
      }
    } else {
      item.SanLuong = 0;
      item.DinhMuc = 0;
      item.TieuHaoDinhMuc = 0;
    }
  }
}

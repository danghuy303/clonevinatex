import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../../quantri/modal/modalthongbao/modalthongbao.component';
import { vn } from '../../../../services/const';
import { DateToUnix, deepCopy, getSTT, mapArrayForDropDown, merge, parseLocaleNumber, UnixToDate, validVariable } from '../../../../services/globalfunction';
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
    if (!this.quyTrinh || typeof this.quyTrinh !== 'object') {
      this.quyTrinh = { listTaiSan: [] };
    }
    if (!Array.isArray(this.quyTrinh.listTaiSan)) {
      this.quyTrinh.listTaiSan = [];
    }
    if (this.type === 'themmoi') {
      this.GetNextSoQuyTrinh();
      this.quyTrinh.Ngay = new Date();
    } else {
      if (this.quyTrinh.NgayUnix) {
        this.quyTrinh.Ngay = UnixToDate(this.quyTrinh.NgayUnix);
      } else if (this.quyTrinh.Ngay) {
        this.quyTrinh.Ngay = UnixToDate(this.quyTrinh.Ngay);
      }
      if ((!this.quyTrinh.Ngay || this.quyTrinh.Ngay.getFullYear() <= 1970) && this.quyTrinh.Created) {
        this.quyTrinh.Ngay = UnixToDate(this.quyTrinh.Created);
      }
      this.getListCaSanXuat();
    }
    if (this.quyTrinh.listTaiSan) {
      this.quyTrinh.listTaiSan.forEach((ele: any) => {
        this.normalizeTaiSanItem(ele);
        this.getSanLuongDropdownForAsset(ele);
      });
    }
    if (!this.quyTrinh.IdBoPhanSuDung && this.quyTrinh.IddmPhanXuong) {
      this.quyTrinh.IdBoPhanSuDung = this.quyTrinh.IddmPhanXuong;
    }
    if (this.quyTrinh.IdBoPhanSuDung) {
      this.getListTaiSanDangSuDung();
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
      IdBoPhanSuDung: this.quyTrinh.IdBoPhanSuDung,
      IddmPhanXuong: this.quyTrinh.IdBoPhanSuDung,
      eAction: this.eAction,
      IdDuAn: this.store.getCurrent(),
      NgayUnix: DateToUnix(this.quyTrinh.Ngay),
        listTaiSan: (this.quyTrinh.listTaiSan || []).map((ele: any) => {
          const listCongViecClean = (ele.listCongViec || []).map((cv: any) => {
            const cvTuGioUnix = cv.TuGio instanceof Date ? DateToUnix(cv.TuGio) : (typeof cv.TuGio === 'number' ? cv.TuGio : undefined);
            const cvDenGioUnix = cv.DenGio instanceof Date ? DateToUnix(cv.DenGio) : (typeof cv.DenGio === 'number' ? cv.DenGio : undefined);
            const cvThanhTien = (parseLocaleNumber(cv.ThucTe) || 0) * (parseLocaleNumber(cv.DonGia) || 0);
            return {
              ...cv,
              TuGioUnix: cvTuGioUnix,
              DenGioUnix: cvDenGioUnix,
              ThanhTien: cvThanhTien,
            };
          });

          const firstCv = listCongViecClean[0] || {};
          const thanhTien = (parseLocaleNumber(firstCv.ThucTe) || 0) * (parseLocaleNumber(firstCv.DonGia) || 0);

          return {
            ...ele,
            listCongViec: listCongViecClean,
            IdSanLuong: firstCv.IdSanLuong || ele.IdSanLuong,
            DonViTinh_SanLuong: firstCv.DonViTinh_SanLuong || ele.DonViTinh_SanLuong,
            DonViTinh: firstCv.DonViTinh || ele.DonViTinh,
            DinhMuc: firstCv.DinhMuc !== undefined ? firstCv.DinhMuc : ele.DinhMuc,
            TuGio: firstCv.TuGio,
            TuGioUnix: firstCv.TuGioUnix,
            DenGio: firstCv.DenGio,
            DenGioUnix: firstCv.DenGioUnix,
            GioQuyDoi: firstCv.GioQuyDoi,
            ThucTe: firstCv.ThucTe,
            DonGia: firstCv.DonGia,
            ThanhTien: thanhTien,
            NguoiVanHanh: firstCv.NguoiVanHanh || ele.NguoiVanHanh,
            GhiChu: firstCv.GhiChu || ele.GhiChu,
            NgayBatDauUnix: DateToUnix(this.quyTrinh.Ngay),
            NgayKetThucUnix: DateToUnix(this.quyTrinh.Ngay),
            // Remove client-only dropdown lists to keep data save payload clean
            listSanLuongDropdown: undefined,
            rawSanLuongList: undefined,
        };
      })
  };
    return data;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.TheoDoiHoatDong().SetQuyTrinh(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          const dataObj = (res.Data && typeof res.Data === 'object') ? res.Data : this.quyTrinh;
          this.quyTrinh = {
            ...this.quyTrinh,
            ...dataObj,
            listTaiSan: Array.isArray(dataObj.listTaiSan) ? dataObj.listTaiSan : (this.quyTrinh.listTaiSan || []),
            Ngay: UnixToDate(dataObj.NgayUnix || dataObj.Ngay) || this.quyTrinh.Ngay,
          };
          this.getListCaSanXuat();
          if (this.quyTrinh.listTaiSan) {
            this.quyTrinh.listTaiSan.forEach((ele: any) => {
              this.normalizeTaiSanItem(ele);
              this.getSanLuongDropdownForAsset(ele);
            });
          }
          this.KiemTraButtonModal();
          this.toastr.success(res.Message);
        } else {
          this.toastr.error(res.Message);
        }
      });
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

getListTaiSanDangSuDung(callback ?: () => void) {
  if (!this.quyTrinh?.IdBoPhanSuDung) {
    this.listTaiSan = [];
    if (callback) callback();
    return;
  }
  this._serviceTaiSan.GetListTaiSanDangSuDung({ CurrentPage: 0, IdBoPhanSuDung: this.quyTrinh.IdBoPhanSuDung }).subscribe((res: any) => {
    this.listTaiSan = res.Data || [];
    if (callback) callback();
  }, (err: any) => {
    if (callback) callback();
  });
}

delete (item: any) {
  this._confirmService.show({
    message: 'Bạn chắc chắn muốn xóa máy/thiết bị này?'
  }, () => {
    this.quyTrinh.listTaiSan = this.quyTrinh.listTaiSan?.filter((ele: any) => (ele.IdTaiSan || ele.Id) !== (item.IdTaiSan || item.Id));
  })
}

handleThemTaiSan() {
  if (!this.quyTrinh?.IdBoPhanSuDung) {
    this.toastr.error('Vui lòng chọn bộ phận');
    return;
  }
  this.getListTaiSanDangSuDung(() => {
    let modalRef = this._modal.open(DanhsachtaisanpopupComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.listDaChon = this.quyTrinh.listTaiSan ? this.quyTrinh.listTaiSan.map((ele: any) => ele.IdTaiSan || ele.Id) : [];
    modalRef.componentInstance.listView = this.listTaiSan || [];
    modalRef.componentInstance.title = 'Danh sách máy/thiết bị';
    modalRef.result.then((res: any) => {
      const _list = this.quyTrinh.listTaiSan || [];
      this.quyTrinh.listTaiSan = res.map((ele: any) => {
        const assetId = ele.IdTaiSan || ele.Id;
        let _newObj = _list.find((x: any) => {
          const xId = x.IdTaiSan || x.Id;
          return xId && xId === assetId;
        });
        if (!_newObj) {
          _newObj = {
            ...ele,
            Id: ele.Id,
            IdTaiSan: assetId,
            MaTaiSan: ele.MaTaiSan || ele.Ma || '',
            TenTaiSan: ele.TenTaiSan || ele.Ten || '',
            Ma: ele.Ma || ele.MaTaiSan || '',
            Ten: ele.Ten || ele.TenTaiSan || '',
            NguoiVanHanh: ele.NguoiVanHanh || '',
            GhiChu: ele.GhiChu || '',
            DonViTinh: ele.DonViTinh || ele.DonViNangSuat || '',
            DonViNangSuat: ele.DonViNangSuat || '',
            SoLuong: ele.SoLuong || 1,
            Modem: ele.Modem || '',
            SoSeri: ele.SoSeri || '',
            NuocSanXuat: ele.NuocSanXuat || '',
            HangSanXuat: ele.HangSanXuat || '',
            TenVietTat: ele.TenVietTat || '',
            BienSo: ele.BienSo || '',
            KieuChuyenDung: ele.KieuChuyenDung || '',
            NguyenGia: ele.NguyenGia || 0,
            GiaTriConLai: ele.GiaTriConLai || 0,
            ThoiGianDuaVaoSuDung: ele.ThoiGianDuaVaoSuDung,
            ThoiGianDuaVaoSuDungUnix: ele.ThoiGianDuaVaoSuDungUnix,
            listCongViec: []
          };
          this.addCongViec(_newObj);
          this.getSanLuongDropdownForAsset(_newObj);
        } else {
          this.normalizeTaiSanItem(_newObj);
        }
        return _newObj;
      });
    }).catch((er) => { });
  });
}

addCongViec(item: any) {
  if (!item) return;
  if (!Array.isArray(item.listCongViec)) {
    item.listCongViec = [];
  }
    const newCv: any = {
      IdSanLuong: null,
      DonViTinh_SanLuong: item.DonViTinh_SanLuong || item.DonViTinh || item.DonViNangSuat || '',
      DonViTinh: item.DonViTinh_SanLuong || item.DonViTinh || item.DonViNangSuat || '',
      DinhMuc: item.DinhMuc || 0,
      TuGio: null,
      DenGio: null,
      GioQuyDoi: 0,
      ThucTe: null,
      DonGia: null,
      ThanhTien: 0,
      NguoiVanHanh: item.NguoiVanHanh || '',
      GhiChu: item.GhiChu || ''
    };
  item.listCongViec.push(newCv);
  if (item.rawSanLuongList && item.rawSanLuongList.length === 1) {
    newCv.IdSanLuong = item.rawSanLuongList[0].Id;
    this.onChangeSanLuong(newCv, item);
  }
}

deleteCongViec(item: any, index: number) {
  if (item && Array.isArray(item.listCongViec) && index >= 0 && index < item.listCongViec.length) {
    item.listCongViec.splice(index, 1);
  }
}

  parseToDate(val: any): Date | null {
    if (val === null || val === undefined || val === '') return null;
    if (val instanceof Date) {
      return isNaN(val.getTime()) ? null : val;
    }
    if (typeof val === 'number') {
      if (val === 0) return null;
      if (val > 1e11) return new Date(val);
      if (val > 1e7) return new Date(val * 1000);
      return UnixToDate(val);
    }
    if (typeof val === 'string') {
      const str = val.trim();
      if (!str) return null;

      // ASP.NET JSON Date "/Date(1234567890)/"
      const aspMatch = str.match(/\/Date\((\d+)\)\//);
      if (aspMatch) {
        return new Date(parseInt(aspMatch[1], 10));
      }

      // Time string like "08:30" or "08:30:00" or "8:30"
      const timeMatch = str.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);
      if (timeMatch && !str.includes('-') && !str.includes('/')) {
        const d = new Date();
        d.setHours(parseInt(timeMatch[1], 10), parseInt(timeMatch[2], 10), timeMatch[3] ? parseInt(timeMatch[3], 10) : 0, 0);
        return d;
      }

      // Numeric timestamp string
      if (!isNaN(Number(str)) && !str.includes('-') && !str.includes(':') && !str.includes('/')) {
        const n = Number(str);
        if (n === 0) return null;
        return n > 1e11 ? new Date(n) : new Date(n * 1000);
      }

      // Vietnamese date format "DD/MM/YYYY" or "DD/MM/YYYY HH:mm"
      if (str.includes('/')) {
        const spaceParts = str.split(' ');
        const dateParts = spaceParts[0].split('/');
        if (dateParts.length === 3) {
          let h = 0, m = 0, s = 0;
          if (spaceParts[1] && spaceParts[1].includes(':')) {
            const timeParts = spaceParts[1].split(':');
            h = parseInt(timeParts[0], 10) || 0;
            m = parseInt(timeParts[1], 10) || 0;
            s = parseInt(timeParts[2], 10) || 0;
          }
          const d = new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[0], 10), h, m, s);
          if (!isNaN(d.getTime())) return d;
        }
      }

      // Standard ISO / Date string
      const d = new Date(str);
      if (!isNaN(d.getTime())) {
        return d;
      }
    }
    return null;
  }

  tinhGioQuyDoi(cv: any) {
    if (!cv) return;
    const getMinutes = (val: any): number | null => {
      if (!val) return null;
      const d = this.parseToDate(val);
      if (d && !isNaN(d.getTime())) {
        return d.getHours() * 60 + d.getMinutes();
      }
      return null;
    };

    const tuMin = getMinutes(cv.TuGio);
    const denMin = getMinutes(cv.DenGio);

    if (tuMin !== null && denMin !== null) {
      let diffMin = denMin - tuMin;
      if (diffMin < 0) {
        diffMin += 24 * 60; // Qua đêm
      }
      cv.GioQuyDoi = parseFloat((diffMin / 60).toFixed(2));
    }
  }

  normalizeTaiSanItem(ele: any) {
    if (!ele) return;
    if (!Array.isArray(ele.listCongViec)) {
      ele.listCongViec = [];
    }

    const parentTuGio = this.parseToDate(ele.TuGio ?? ele.TuGioUnix ?? ele.tuGio ?? ele.tuGioUnix);
    const parentDenGio = this.parseToDate(ele.DenGio ?? ele.DenGioUnix ?? ele.denGio ?? ele.denGioUnix);

    // If listCongViec is empty, migrate from root ele if it has job fields
    if (ele.listCongViec.length === 0) {
      if (ele.IdSanLuong || ele.ThucTe || ele.DonGia || ele.NguoiVanHanh || parentTuGio || parentDenGio) {
        ele.listCongViec.push({
          IdSanLuong: ele.IdSanLuong,
          DonViTinh_SanLuong: ele.DonViTinh_SanLuong || ele.DonViTinh,
          DonViTinh: ele.DonViTinh_SanLuong || ele.DonViTinh,
          DinhMuc: ele.DinhMuc,
          TuGio: parentTuGio,
          DenGio: parentDenGio,
          GioQuyDoi: ele.GioQuyDoi,
          ThucTe: ele.ThucTe,
          DonGia: ele.DonGia,
          ThanhTien: ele.ThanhTien,
          NguoiVanHanh: ele.NguoiVanHanh,
          GhiChu: ele.GhiChu
        });
      }
    }

    ele.listCongViec.forEach((cv: any) => {
      const rawTu = cv.TuGio ?? cv.TuGioUnix ?? cv.tuGio ?? cv.tuGioUnix ?? ele.TuGio ?? ele.TuGioUnix;
      const rawDen = cv.DenGio ?? cv.DenGioUnix ?? cv.denGio ?? cv.denGioUnix ?? ele.DenGio ?? ele.DenGioUnix;

      cv.TuGio = this.parseToDate(rawTu);
      cv.DenGio = this.parseToDate(rawDen);

      this.tinhGioQuyDoi(cv);
      this.tinhThanhTien(cv);
    });
  }

onChangeBoPhan() {
  if (!this.quyTrinh || typeof this.quyTrinh !== 'object') {
    this.quyTrinh = { listTaiSan: [] };
  }
  this.getListCaSanXuat();
  this.quyTrinh.IddmCaSanXuat = null;
  this.listTaiSan = [];
  this.getListTaiSanDangSuDung();
}

getListCaSanXuat() {
  const idBoPhan = this.quyTrinh?.IdBoPhanSuDung;
  if (!idBoPhan) {
    this.listCaSanXuat = [];
    return;
  }
  let data = {
    CurrentPage: 1,
    PageSize: 1000,
    IdBoPhanSuDung: idBoPhan,
    IddmPhanXuong: idBoPhan
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

      if (Array.isArray(item.listCongViec)) {
        item.listCongViec.forEach((cv: any) => {
          if (!cv.IdSanLuong && list.length === 1) {
            cv.IdSanLuong = list[0].Id;
          }
          if (cv.IdSanLuong) {
            const selected = list.find((x: any) => x.Id === cv.IdSanLuong);
            if (selected) {
              cv.SanLuong = selected.SanLuong || 0;
              cv.DonViTinh_SanLuong = selected.DonViTinh_SanLuong || selected.DonViTinh || cv.DonViTinh_SanLuong || cv.DonViTinh || '';
              cv.DonViTinh = cv.DonViTinh_SanLuong;
              cv.DinhMuc = selected.SanLuong || 0;
              cv.TieuHaoDinhMuc = selected.SanLuong || 0;
            }
          }
        });
      }
    });
}

    onChangeSanLuong(cv: any, item ?: any) {
      const parent = item || this.quyTrinh?.listTaiSan?.find((x: any) => x.listCongViec?.includes(cv));
      if (parent?.rawSanLuongList && cv?.IdSanLuong) {
        const selected = parent.rawSanLuongList.find((x: any) => x.Id === cv.IdSanLuong);
        if (selected) {
          cv.SanLuong = selected.SanLuong || 0;
          cv.DonViTinh_SanLuong = selected.DonViTinh_SanLuong || selected.DonViTinh || '';
          cv.DonViTinh = cv.DonViTinh_SanLuong;
          cv.DinhMuc = selected.SanLuong || 0;
          cv.TieuHaoDinhMuc = selected.SanLuong || 0;
          cv.DonViTinh_NhienLieu = selected.DonViTinh_NhienLieu;
          cv.TendmLoaiNhienLieu = selected.TendmLoaiNhienLieu;
        }
      } else if (cv) {
        cv.SanLuong = 0;
        cv.DonViTinh_SanLuong = '';
        cv.DonViTinh = '';
        cv.DinhMuc = 0;
        cv.TieuHaoDinhMuc = 0;
      }
    }

      tinhThanhTien(cv: any) {
        if (!cv) return;
        cv.ThanhTien = (parseLocaleNumber(cv.ThucTe) || 0) * (parseLocaleNumber(cv.DonGia) || 0);
      }
    }

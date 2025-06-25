import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './../host';
import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root'
})
export class DanhmuctaisanService {

  constructor(private http: HttpClient, public store: StoreService) { }

  DanhMucTinhTrangTaiSan() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListTinhTrangTaiSan?Keyword=${data.Keyword}&CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/SetdmTinhTrangTaiSan`, data, httpOptions)
      },
      Delete: (id) => {
        return this.http.get(`${url}DanhMuc/DeletedmTinhTrangTaiSan?id=${id}`, httpOptions)
      }
    }
  }
  DanhMucLoaiKhauHao() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListLoaiKhauHao?Keyword=${data.Keyword}&CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/SetdmLoaiKhauHao`, data, httpOptions)
      },
      Delete: (id) => {
        return this.http.get(`${url}DanhMuc/DeletedmLoaiKhauHao?id=${id}`, httpOptions)
      }
    }
  }

  DanhMucDonViTinh() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListDonViTinh?Keyword=${data.Keyword}&CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/SetdmDonViTinh`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmDonViTinh?Id=${Id}`, httpOptions)
      }
    }
  }

  GetlistdmKho() {
    let url = API.CungUng
    return {
      GetList: (data) => {
        return this.http.post(`${url}DanhMuc/GetlistdmKho`, data, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/SetdmKho`, data, httpOptions)
      },
      Delete: (data) => {
        return this.http.post(`${url}DanhMuc/DeletedmKho`, data, httpOptions)
      }
    }
  }

  DanhMucLoaiBaoDuong() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.post(`${url}DanhMuc/GetListdmLoaiBaoDuong`, data, httpOptions)
      },
      GetListdmLoaiBaoDuongForDanhMuc: (data) => {
        return this.http.post(`${url}DanhMuc/GetListdmLoaiBaoDuongForDanhMuc`, data, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/SetdmLoaiBaoDuong`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmLoaiBaoDuong?Id=${Id}`, httpOptions)
      },
      Get: (Id) => {
        return this.http.get(`${url}/DanhMuc/GetdmLoaiBaoDuongById?Id=${Id}`, httpOptions);
      },
      DeleteList: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmLoaiBaoDuong`, data, httpOptions)
      },
      Importdm: (FileName) => {

        return this.http.get(`${url}DanhMuc/ImportdmLoaiBaoDuong?FileName=${FileName}`, httpOptions)
      },
      Exportdm: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/ExportdmLoaiBaoDuong`, data, httpOptions)
      },
      download: (url) => {
        window.open(API.imgURL + url);
      },
    }
  }

  DoiBaoDuong() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.post(`${url}DanhMuc/GetListdmCongDoan_DoiBaoDuong`, data, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/SetdmCongDoan_DoiBaoDuong`, data, httpOptions)
      },
      Get: (Id) => {
        return this.http.get(`${url}/DanhMuc/GetdmCongDoan_DoiBaoDuong?Id=${Id}`, httpOptions);
      },
      DeleteList: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmCongDoan_DoiBaoDuong`, data, httpOptions)
      },
    }
  }

  LoaiThucHienBaoDuong() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.post(`${url}DanhMuc/GetListdmLoaiThucHienBaoDuong`, data, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/SetdmLoaiThucHienBaoDuong`, data, httpOptions)
      },
      Delete: (id) => {
        return this.http.get(`${url}DanhMuc/DeletedmLoaiThucHienBaoDuong?id=${id}`, httpOptions)
      },
      DeleteList: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmLoaiThucHienBaoDuong`, data, httpOptions)
      },
      Importdm: (FileName) => {
        return this.http.get(`${url}DanhMuc/ImportdmLoaiThucHienBaoDuong?FileName=${FileName}`, httpOptions)
      },
      Exportdm: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/ExportdmLoaiThucHienBaoDuong`, data, httpOptions)
      },
      download: (url) => {
        window.open(API.imgURL + url);
      },
    }
  }


  DanhMucLoaiTaiSan() {
    let url = API.TaiSan
    return {
      // GetList: (data) => {
      //   return this.http.post(`${url}DanhMuc/GetListdmLoaiTaiSan`, data, httpOptions)
      // },
      GetListdmLoaiTaiSanForDanhMuc: (data) => {
        return this.http.post(`${url}DanhMuc/GetListdmLoaiTaiSanForDanhMuc`, data, httpOptions)
      },
      GetList: (data) => {
        return this.http.post(`${url}DanhMuc/GetListdmLoaiTaiSan`, data, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/SetdmLoaiTaiSan`, data, httpOptions)
      },
      Delete: (id) => {
        return this.http.get(`${url}DanhMuc/DeletedmLoaiTaiSan?id=${id}`, httpOptions)
      },
      DeleteList: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmLoaiTaiSan`, data, httpOptions)
      },
      Importdm: (FileName) => {

        return this.http.get(`${url}DanhMuc/ImportdmLoaiTaiSan?FileName=${FileName}`, httpOptions)
      },
      Exportdm: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/ExportdmLoaiTaiSan`, data, httpOptions)
      },
      download: (url) => {
        window.open(API.imgURL + url);
      },
    }
  }

  DanhMucLoaiSuCo() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.post(`${url}DanhMuc/GetListdmLoaiSuCo`, data, httpOptions)
      },
      GetListdmLoaiSuCoForDanhMuc: (data) => {
        return this.http.post(`${url}DanhMuc/GetListdmLoaiSuCoForDanhMuc`, data, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/SetdmLoaiSuCo`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmLoaiSuCo?Id=${Id}`, httpOptions)
      },
      DeleteList: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmLoaiSuCo`, data, httpOptions)
      },
      Importdm: (FileName) => {
        return this.http.get(`${url}DanhMuc/ImportdmLoaiSuCo?FileName=${FileName}`, httpOptions)
      },
      Exportdm: (data) => {
        return this.http.post(`${url}DanhMuc/ExportdmLoaiSuCo`, data, httpOptions)
      },
      download: (url) => {
        window.open(API.imgURL + url);
      },
    }
  }

  DanhMucMucDoUuTien() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.post(`${url}DanhMuc/GetListdmMucDoUuTien`, data, httpOptions)
      },
      GetListdmMucDoUuTienForDanhMuc: (data) => {
        return this.http.post(`${url}DanhMuc/GetListdmMucDoUuTienForDanhMuc`, data, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/SetdmMucDoUuTien`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmMucDoUuTien?Id=${Id}`, httpOptions)
      },
      DeleteList: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmMucDoUuTien`, data, httpOptions)
      },
      Importdm: (FileName) => {
        return this.http.get(`${url}DanhMuc/ImportdmMucDoUuTien?FileName=${FileName}`, httpOptions)
      },
      Exportdm: (data) => {
        return this.http.post(`${url}DanhMuc/ExportdmMucDoUuTien`, data, httpOptions)
      },
      download: (url) => {
        window.open(API.imgURL + url);
      },
    }
  }

  DanhMucDonViNangSuat() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListDonViNangSuat?Keyword=${data.Keyword}&CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/SetdmDonViNangSuat`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmDonViNangSuat?Id=${Id}`, httpOptions)
      }
    }
  }
  DanhMucNhaCungCap() {
    let url = API.TaiSan2
    return {
      GetList: (data) => {
        return this.http.post(`${url}DanhMuc/GetlistdmNhaCungUng`, data, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/SetdmNhaCungCap`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeleteDmNhaCungCapById?Id=${Id}`, httpOptions)
      },
      DeleteList: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmNhaCungCap`, data, httpOptions)
      },
      Importdm: (FileName) => {
        return this.http.get(`${url}DanhMuc/ImportdmNhaCungCap?FileName=${FileName}`, httpOptions)
      },
      Exportdm: (data) => {
        return this.http.post(`${url}DanhMuc/ExportdmNhaCungCap`, data, httpOptions)
      },
      download: (url) => {
        window.open(API.imgURL + url);
      },
    }
  }

  DanhMucHangSanXuat() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListNhaSanXuat?Keyword=${data.Keyword}&CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/SetdmNhaSanXuat`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmNhaSanXuat?Id=${Id}`, httpOptions)
      }
    }
  }
  GetlistCongDoan() {
    let url = API.TaiSan
    return {
      GetList: () => {
        return this.http.get(`${url}DanhMuc/GetListCongDoan`, httpOptions)
      },
    }
  }

  GetListdmCongDoan_DoiBaoDuong(data) {
    return this.http.post(`${API.TaiSan}DanhMuc/GetListdmCongDoan_DoiBaoDuong`, data, httpOptions)
  }

  GetDanhSachCongViecByIddmLoaiBaoDuong(data) {
    return this.http.post(`${API.TaiSan}DanhMuc/GetDanhSachCongViecByIddmLoaiBaoDuong `, data, httpOptions)
  }

  GetBoPhanNhanSu() {
    return this.http.get(`${API.auth}CoCauNhanSu/GetBoPhanNhanSu`, httpOptions)
  }

  SetQRCODE(data) {
    return this.http.post(`${API.SCM}DanhMuc/SetQRCODE`, data, httpOptions)
  }
  SetQRCODELoBong(data) {
    return this.http.post(`${API.SCM}DanhMuc/SetQRCODELoBong`, data, httpOptions)
  }
  InQrCodeLoHang(MaQR, SoLuong, KichThuoc) {
    return this.http.get(`${API.SCM}DanhMuc/InQrCodeLoHang?MaQR=${MaQR}&SoLuong=${SoLuong}&KichThuoc=${KichThuoc}`, httpOptions)
  }
  GetListQRCODE(data) {
    return this.http.post(`${API.SCM}DanhMuc/GetListQRCODE`, data, httpOptions)
  }
  InQrCodeLoBong(IdLoBong, KichThuoc) {
    return this.http.get(`${API.SCM}DanhMuc/InQrCodeLoBong?IdLoBong=${IdLoBong}&KichThuoc=${KichThuoc}`, httpOptions)
  }

  InQrCode(data) {
    return this.http.post(`${API.SCM}DanhMuc/InQrCode`, data, httpOptions)
  }

  GetlistLoaiQR() {
    return this.http.get(`${API.SCM}DanhMuc/GetlistLoaiQR`, httpOptions)
  }


  DanhMucTaiSan() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.post(`${url}QuanLyTaiSan/GetListdmTaiSan`, data, httpOptions)
      },
      ById: (id) => {
        return this.http.get(`${url}QuanLyTaiSan/GetdmTaiSanById?id=${id}`, httpOptions)
      },
      Set: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}QuanLyTaiSan/SetdmTaiSan`, data, httpOptions)
      },
      Delete: (data) => {
        return this.http.post(`${url}QuanLyTaiSan/DeleteListdmLoaiTaiSan`, data, httpOptions)
      },
      DeleteList: (ListId) => {
        return this.http.get(`${url}QuanLyTaiSan/DeletedmTaiSanById?ListId=${ListId}`, httpOptions)
      },
      Importdm: (FileName) => {
        return this.http.get(`${url}QuanLyTaiSan/ImportdmLoaiTaiSan?FileName=${FileName}`, httpOptions)
      },
      Exportdm: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}QuanLyTaiSan/ExportdmLoaiTaiSan`, data, httpOptions)
      }
    }
  }

}

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
        return this.http.post(`${url}DanhMuc/SetdmDonViTinh`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmDonViTinh?Id=${Id}`, httpOptions)
      }
    }
  }

  DanhMucLoaiBaoDuong() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListLoaiBaoDuong?Keyword=${data.Keyword}&CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
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
    }
  }

  DanhMucLoaiTaiSan() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListLoaiTaiSan?Keyword=${data.Keyword}&CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmLoaiTaiSan`, data, httpOptions)
      },
      Delete: (id) => {
        return this.http.get(`${url}DanhMuc/DeletedmLoaiTaiSan?id=${id}`, httpOptions)
      },
      DeleteList: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmLoaiTaiSan`, data, httpOptions)
    },
    }
  }

  DanhMucLoaiSuCo() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListLoaiSuCo?Keyword=${data.Keyword}&CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmLoaiSuCo`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmLoaiSuCo?Id=${Id}`, httpOptions)
      },
      DeleteList: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmLoaiSuCo`, data, httpOptions)
    },
    }
  }

  DanhMucMucDoUuTien() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListMucDoUuTien?Keyword=${data.Keyword}&CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmMucDoUuTien`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmMucDoUuTien?Id=${Id}`, httpOptions)
      },
      DeleteList: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmNhaCungCap`, data, httpOptions)
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
        return this.http.post(`${url}DanhMuc/SetdmDonViNangSuat`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmDonViNangSuat?Id=${Id}`, httpOptions)
      }
    }
  }
  DanhMucNhaCungCap() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetAllPagingDmNhaCungCap?Keyword=${data.Keyword}&CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmNhaCungCap`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeleteDmNhaCungCapById?Id=${Id}`, httpOptions)
      },
      DeleteList: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmNhaCungCap`, data, httpOptions)
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
        return this.http.post(`${url}DanhMuc/SetdmNhaSanXuat`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmNhaSanXuat?Id=${Id}`, httpOptions)
      }
    }
  }
}

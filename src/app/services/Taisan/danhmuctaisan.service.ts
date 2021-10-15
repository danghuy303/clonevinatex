import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './../host';
import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root'
})
export class DanhmuctaisanService {

  constructor(private http: HttpClient, public store: StoreService) { }

  DanhMucBoPhanSuDung() {
    let url = API.TaiSan
    return {
      GetListAll: () => {
        return this.http.get(url + `DanhMuc/GetListAlldmBoPhanSuDung`, httpOptions);
      },
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListdmBoPhanSuDung?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmBoPhanSuDung`, data, httpOptions)
      },
      Delete: (id) => {
        return this.http.get(`${url}DanhMuc/DeletedmBoPhanSuDung?id=${id}`, httpOptions)
      }
    }
  }

  DanhMucDonViTinh() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListDonViTinh?keyword=${data.keyword}&CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
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
      GetListAll: () => {
        return this.http.get(url + `DanhMuc/GetListAlldmDonViTinh`, httpOptions);
      },
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListdmDonViTinh?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmDonViTinh`, data, httpOptions)
      },
      Delete: (id) => {
        return this.http.get(`${url}DanhMuc/DeletedmDonViTinh?id=${id}`, httpOptions)
      }
    }
  }

  DanhMucLoaiTaiSan() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListLoaiTaiSan?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmLoaiTaiSan`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmLoaiTaiSan?Id=${Id}`, httpOptions)
      }
    }
  }

  DanhMucDonViNangSuat() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListDonViNangSuat?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        return this.http.post(`${url}DanhMuc/SetDonViNangSuat`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmDonViNangSuat?Id=${Id}`, httpOptions)
      }
    }
  }

  DanhMucHangSanXuat() {
    let url = API.TaiSan
    return {
      GetList: (data) => {
        return this.http.get(`${url}DanhMuc/GetListNhaSanXuat?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`, httpOptions)
      },
      Set: (data) => {
        return this.http.post(`${url}DanhMuc/SetNhaSanXuat`, data, httpOptions)
      },
      Delete: (Id) => {
        return this.http.get(`${url}DanhMuc/DeletedmNhaSanXuat?Id=${Id}`, httpOptions)
      }
    }
  }
}

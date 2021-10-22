import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './../host';
import { StoreService } from '../store.service';

@Injectable({
  providedIn: 'root'
})
export class TaisanService {

  constructor(private http: HttpClient, public store: StoreService) { }

  NhapTaiSan() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}NhapTaiSan/GetNextQuyTrinhNhapTaiSan`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}NhapTaiSan/GetAllNhapTaiSan`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}NhapTaiSan/GetNhapTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}NhapTaiSan/SetQuyTrinhNhapTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}NhapTaiSan/KhongDuyetQuyTrinhNhapTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}NhapTaiSan/ChuyenTiepQuyTrinhNhapTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}NhapTaiSan/DeleteNhapTaiSanById?Id=${Id}`, httpOptions);
      },
    };
  }

  BanGiaoTaiSan() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}BanGiaoTaiSan/GetNextQuyTrinhBanGiao`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}BanGiaoTaiSan/GetAllBanGiaoTaiSan`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}BanGiaoTaiSan/GetBanGiaoTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}BanGiaoTaiSan/SetQuyTrinhBanGiaoTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}BanGiaoTaiSan/KhongDuyetQuyTrinhBanGiaoTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}BanGiaoTaiSan/ChuyenTiepQuyTrinhBanGiaoTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}BanGiaoTaiSan/DeleteBanGiaoTaiSanById?Id=${Id}`, httpOptions);
      },
    };
  }

  GetOptions() {
    let url = API.TaiSan;
    return {
      GetListTaiSanChuaBanGiao: () => {
        return this.http.get(`${url}TaiSan/GetListTaiSanChuaBanGiao`, httpOptions);
      },
    }
  }

}

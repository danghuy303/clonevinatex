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

  PhieuThuHoiTaiSan() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}ThuHoiTaiSan/GetNextQuyTrinhThuHoi`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}ThuHoiTaiSan/GetAllThuHoiTaiSan`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}ThuHoiTaiSan/GetThuHoiTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}ThuHoiTaiSan/SetQuyTrinhThuHoiTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}ThuHoiTaiSan/KhongDuyetQuyTrinhThuHoiTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}ThuHoiTaiSan/ChuyenTiepQuyTrinhThuHoiTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}ThuHoiTaiSan/DeleteThuHoiTaiSanById?Id=${Id}`, httpOptions);
      },
    };
  }

  ThanhLyTaiSan() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}ThanhLyTaiSan/GetNextThanhLyTaiSan`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}ThanhLyTaiSan/GetAllThanhLyTaiSan`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}ThanhLyTaiSan/GetThanhLyTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}ThanhLyTaiSan/SetQuyTrinhThanhLyTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}ThanhLyTaiSan/KhongDuyetQuyTrinhThanhLyTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}ThanhLyTaiSan/ChuyenTiepQuyTrinhThanhLyTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}ThanhLyTaiSan/DeleteThanhLyTaiSanById?Id=${Id}`, httpOptions);
      },
    };
  }

  HieuXuatTaiSan() {
    let url = API.TaiSan;
    return {
      GetList: (data) => {
        return this.http.post(`${url}TaiSan/GetListHieuSuatTaiSanTheoThoiGian`,data, httpOptions);
      },
      GetListTaiSan: (IddmPhanXuong) => {
        return this.http.get(`${url}TaiSan/GetListTaiSanNhapHieuSuat?IdDuAn=${this.store.getCurrent()}&IddmPhanXuong=${IddmPhanXuong}`, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}TaiSan/GetListHieuSuatTaiSanTheoThoiGianById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}TaiSan/SetHieuSuatTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}TaiSan/DeleteHieuSuatTaiSanTheoThoiGianById?Id=${Id}`, httpOptions);
      },
    };
  }

  SuCoSuaChua() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}SuCoSuaChua/GetNextQuyTrinhSuCoSuaChuaTaiSan`, httpOptions);
      },
      GetList: (data) => {        
        return this.http.post(`${url}SuCoSuaChua/GetAllSuCoSuaChua`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}SuCoSuaChua/GetSuCoSuaChuaTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}SuCoSuaChua/SetQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}SuCoSuaChua/KhongDuyetQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}SuCoSuaChua/ChuyenTiepQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}SuCoSuaChua/DeleteSuCoSuaChuaTaiSanById?Id=${Id}`, httpOptions);
      },
    };
  }

  GetOptions() {
    let url = API.TaiSan;
    return {
      GetListTaiSanChuaBanGiao: () => {
        return this.http.get(`${url}TaiSan/GetListTaiSanChuaBanGiao`, httpOptions);
      },
      ListBaoDuongTaiSan: (IdTaiSan, IddmDonViTinh) => {
        return this.http.get(`${url}TaiSan/ListBaoDuongTaiSan?IdTaiSan=${IdTaiSan}&IddmDonViTinh=${IddmDonViTinh}`, httpOptions);
      },
      GetListTaiSan: (IddmPhanXuong) => {
        return this.http.get(`${url}TaiSan/GetListTaiSanNhapHieuSuat?IdDuAn=${this.store.getCurrent()}&IddmPhanXuong=${IddmPhanXuong}`, httpOptions);
      },

    }
  }

}

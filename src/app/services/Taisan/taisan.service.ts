import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './../host';
import { StoreService } from '../store.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaisanService {

  constructor(private http: HttpClient, public store: StoreService) { }

  NhapTaiSan() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}QuanLyTaiSan/GetNextQuyTrinhNhapTaiSan`, httpOptions);
      },
      GetList: (data) => { 
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}QuanLyTaiSan/GetListQuyTrinhNhapTaiSan`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}QuanLyTaiSan/GetQuyTrinhNhapTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}QuanLyTaiSan/SetQuyTrinhNhapTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}QuanLyTaiSan/ChuyenTiepQuyTrinhNhapTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}QuanLyTaiSan/ChuyenTiepQuyTrinhNhapTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}QuanLyTaiSan/DeleteNhapTaiSanById?Id=${Id}`, httpOptions);
      },
      GetListTaiSan: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/GetListTaiSanForLapKeHoachLichXich`, data, httpOptions);
      },
    };
  }

  LichXich() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}BaoDuongTaiSan/GetNextLapKeHoachLichXichNam`, httpOptions);
      },
      GetList: (data) => { 
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}BaoDuongTaiSan/GetListLapKeHoachLichXichNam`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}BaoDuongTaiSan/GetLapKeHoachLichXichById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/SetLapKeHoachLichXichNam`, data, httpOptions);
      }, 
      KhongDuyet: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/KhongDuyetLapKeHoachLichXich`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}BaoDuongTaiSan/ChuyenTiepLapKeHoachLichXich`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}BaoDuongTaiSan/DeleteLapKeHoachLichXichById?Id=${Id}`, httpOptions);
      },
    };
  }

  BanGiaoTaiSan() {
    let url = API.TaiSan;
    return {
      GetNextSoQuyTrinh: () => {
        // return this.http.get(`${url}BanGiaoTaiSan/GetNextQuyTrinhBanGiao`, httpOptions);
        return this.http.get(`${url}NhatKySuDung/GetNextQuyTrinhBanGiaoTaiSan`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        // return this.http.post(`${url}BanGiaoTaiSan/GetAllBanGiaoTaiSan`, data, httpOptions);
        return this.http.post(`${url}NhatKySuDung/GetListQuyTrinhBanGiaoTaiSan`, data, httpOptions);
      },
      Get: (Id) => {
        // return this.http.get(`${url}NhatKySuDung/GetBanGiaoTaiSanById?Id=${Id}`, httpOptions);
        return this.http.get(`${url}NhatKySuDung/GetQuyTrinhBanGiaoTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}NhatKySuDung/SetQuyTrinhBanGiaoTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}NhatKySuDung/KhongDuyetQuyTrinhBanGiaoTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}NhatKySuDung/ChuyenTiepQuyTrinhBanGiaoTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}NhatKySuDung/DeleteQuyTrinhBanGiaoTaiSanById?Id=${Id}`, httpOptions);
      },
    };
  }

  PhieuThuHoiTaiSan() {
    let url = API.TaiSan;
    return {
      // GetNextSoQuyTrinh: () => {
      //   return this.http.get(`${url}ThuHoiTaiSan/GetNextQuyTrinhThuHoi`, httpOptions);
      // },
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}NhatKySuDung/GetNextQuyTrinhThuHoiTaiSan`, httpOptions);
      },
      // GetList: (data) => {
      //   data.idDuAn = this.store.getCurrent();
      //   return this.http.post(`${url}QuanLyTaiSan/GetListTaiSanThuHoi`, data, httpOptions);
      // },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}NhatKySuDung/GetListQuyTrinhThuHoiTaiSan`, data, httpOptions);
      },
      // Get: (Id) => {
      //   return this.http.get(`${url}ThuHoiTaiSan/GetThuHoiTaiSanById?Id=${Id}`, httpOptions);
      // },
      Get: (Id) => {
        return this.http.get(`${url}NhatKySuDung/GetQuyTrinhThuHoiTaiSanById?Id=${Id}`, httpOptions);
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
        return this.http.post(`${url}TaiSan/GetListHieuSuatTaiSanTheoThoiGian`, data, httpOptions);
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
        return this.http.get(`${url}GetNextQuyTrinhSuCoSuaChuaTaiSan`, httpOptions);
      },
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}GetAllSuCoSuaChua`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}GetSuCoSuaChuaTaiSanById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}SetQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}KhongDuyetQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}ChuyenTiepQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
      },
      Delete: (Id) => {
        return this.http.get(`${url}DeleteSuCoSuaChuaTaiSanById?Id=${Id}`, httpOptions);
      },
    };
  }

  GetListTaiSanThuHoi() {
    let url = API.TaiSan;
    return {
      GetListTaiSan : (IddmPhanXuong) => {
        return this.http.get(`${url}TaiSan/GetListTaiSanThuHoi?IddmPhanXuong=${IddmPhanXuong}`, httpOptions);
      },
    };
  }

  ListDanhSachTaiSan() {
    let url = API.TaiSan;
    return {
      GetList: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}TaiSan/ListDanhSachTaiSan`, data, httpOptions);
      },
      // Get: (Id) => {
      //   return this.http.get(`${url}TaiSan/GetChiTietTaiSanById?IdTaiSan=${Id}`, httpOptions);
      // },
      Get: (Id) => {
        return this.http.get(`${url}QuanLyTaiSan/GetQuyTrinhNhapTaiSanById?Id=${Id}`, httpOptions);
      },
    }
  }

  ListDanhSachBienDong() {
    let url = API.TaiSan;
    return {
      Get: (data) => {
        return this.http.post(`${url}TaiSan/GetListBienDongTaiSanById`,data, httpOptions);
      },
    }
  }

  ListDanhSachSuCo() {
    let url = API.TaiSan;
    return {
      Get: (data) => {
        return this.http.post(`${url}TaiSan/GetListSuCoByIdTaiSan`,data, httpOptions);
      },
    }
  }

  NhomNhaCungUng() {
    let url = API.CungUng;
    return {
      GetListdmNhomNhaCungung: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/GetlistdmNhomNhaCungung`, data, httpOptions);
      },
      SetdmNhomNhaCungUng: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmNhomNhaCungUng`, data, httpOptions);
      },
      GetdmNhomNhaCungUng: (Id) => {
        return this.http.get(`${url}DanhMuc/GetdmNhomNhaCungUng?Id=${Id}`, httpOptions)
      },
      DeleteListNhomCungUng: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmNhomNhaCungUng`, data, httpOptions)
      },
      ExportNhomNhaCungUng: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/ExportdmNhomNhaCungUng`, data, httpOptions)
      },
      ImportFile: (data) => {
        return this.http.get(`${url}DanhMuc/ImportdmNhomNhaCungUng?FileName=${data.Name}`, httpOptions)
      }
    }
  }

  NhaCungUng() {
    let url = API.CungUng;
    return {
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/GetlistdmNhaCungUng`, data, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmNhaCungUng`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}DanhMuc/GetdmNhaCungUng?Id=${Id}`, httpOptions)
      },
      DeleteList: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmNhaCungUng`, data, httpOptions)
      },
      Export: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/ExportdmNhaCungUng`, data, httpOptions)
      },
      Import: (data) => {
        return this.http.get(`${url}DanhMuc/ImportdmNhaCungUng?FileName=${data.Name}`, httpOptions)
      },
      GetListItem: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/GetlistdmItem`, data, httpOptions);
      },
      SetItem: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmItem`, data, httpOptions);
      },
      GetItem: (Id) => {
        return this.http.get(`${url}DanhMuc/GetdmItem?Id=${Id}`, httpOptions)
      },
      DeleteListItem: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmItem`, data, httpOptions)
      },
      ExportItem: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/ExportdmItem`, data, httpOptions)
      },
      ImportItem: (data) => {
        return this.http.get(`${url}DanhMuc/ImportdmItem?FileName=${data.Name}`, httpOptions)
      },
    }
  }

  DanhGiaNhaCungUng() {
    let url = API.CungUng;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(`${url}QuanLyNhaCungUng/GetNextSoQuyTrinhDanhGia`, httpOptions);
      },
      GetList: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}QuanLyNhaCungUng/GetListQuyTrinhDanhGia`, data, httpOptions);
      },
      Get: (Id) => {
        // return this.http.get(`${url}NhatKySuDung/GetBanGiaoTaiSanById?Id=${Id}`, httpOptions);
        return this.http.get(`${url}QuanLyNhaCungUng/GetQuyTrinhDanhGia?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}QuanLyNhaCungUng/SetQuyTrinhDanhGia`, data, httpOptions);
      },
      KhongDuyet: (data) => {
        return this.http.post(`${url}QuanLyNhaCungUng/KhongDuyetQuyTrinhDanhGia`, data, httpOptions);
      },
      ChuyenTiep: (data) => {
        return this.http.post(`${url}QuanLyNhaCungUng/ChuyenTiepQuyTrinhDanhGia`, data, httpOptions);
      },
      Delete: (data) => {
        return this.http.post(`${url}/QuanLyNhaCungUng/DeleteQuyTrinhDanhGia`, data, httpOptions);
      },
    };
  }

  TieuChiDanhGia() {
    let url = API.CungUng;
    return {
      GetList: (data) => {
        data.idDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/GetlistdmTieuChiDanhGia`, data, httpOptions);
      },
      Set: (data) => {
        return this.http.post(`${url}DanhMuc/SetdmTieuChiDanhGia`, data, httpOptions);
      },
      Get: (Id) => {
        return this.http.get(`${url}DanhMuc/GetdmTieuChiDanhGia?Id=${Id}`, httpOptions)
      },
      Delete: (data) => {
        return this.http.post(`${url}DanhMuc/DeleteListdmTieuChiDanhGia`, data, httpOptions)
      },
      Export: (data) => {
        data.IdDuAn = this.store.getCurrent();
        return this.http.post(`${url}DanhMuc/ExportdmTieuChiDanhGia`, data, httpOptions)
      },
      Import: (data) => {
        return this.http.get(`${url}DanhMuc/ImportdmTieuChiDanhGia?FileName=${data.Name}`, httpOptions)
      }
    }
  }

  // SuCoSuaChua() {
  //   let url = API.TaiSan;
  //   return {
  //     GetNextSoQuyTrinh: () => {
  //       return this.http.get(`${url}SuCoSuaChua/GetNextQuyTrinhSuCoSuaChuaTaiSan`, httpOptions);
  //     },
  //     GetList: (data) => {
  //       return this.http.post(`${url}SuCoSuaChua/GetAllSuCoSuaChua`, data, httpOptions);
  //     },
  //     Get: (Id) => {
  //       return this.http.get(`${url}SuCoSuaChua/GetSuCoSuaChuaTaiSanById?Id=${Id}`, httpOptions);
  //     },
  //     Set: (data) => {
  //       return this.http.post(`${url}SuCoSuaChua/SetQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
  //     },
  //     KhongDuyet: (data) => {
  //       return this.http.post(`${url}SuCoSuaChua/KhongDuyetQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
  //     },
  //     ChuyenTiep: (data) => {
  //       return this.http.post(`${url}SuCoSuaChua/ChuyenTiepQuyTrinhSuCoSuaChuaTaiSan`, data, httpOptions);
  //     },
  //     Delete: (Id) => {
  //       return this.http.get(`${url}SuCoSuaChua/DeleteSuCoSuaChuaTaiSanById?Id=${Id}`, httpOptions);
  //     },
  //   };
  // }



  GetOptions() {
    let url = API.TaiSan;
    return {
      // GetListTaiSanChuaBanGiao: () => {
      //   return this.http.get(`${url}TaiSan/GetListTaiSanChuaBanGiao`, httpOptions);
      // },
      GetListTaiSanChuaBanGiao: () => {
        return this.http.post(`${url}NhatKySuDung/GetListTaiSanChuaBanGiao`, httpOptions);
      },
      GetListTaiSanDaBanGiao: (IddmPhanXuong) => {
        return this.http.get(`${url}TaiSan/GetListTaiSanDaBanGiao?IddmPhanXuong=${IddmPhanXuong}`, httpOptions);
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

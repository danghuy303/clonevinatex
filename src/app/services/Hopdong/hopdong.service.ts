import { StoreService } from "./../store.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { httpOptions, API } from "./../host";
import { number } from "@amcharts/amcharts4/core";
@Injectable({
  providedIn: "root",
})
export class HopDongService {
  constructor(private http: HttpClient, public store: StoreService) { }

  QuyTrinhHopDong() {
    let url = API.HopDong;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(
          url + "HopDong/GetNextSoQuyTrinhHopDong",
          httpOptions
        );
      },
      GetOptionsVatLieu: () => {
        return this.http.get(url + `DanhMuc/GetListAlldmLoaiNguyenVatLieu`, httpOptions);
    },
      GetList: (data) => {
        data.idDuAn = 53
        return this.http.post(
          url + "HopDong/GetListQuyTrinhHopDong",
          data,
          httpOptions
        );
      },
      Get: (Id) => {
        return this.http.get(
          url + `HopDong/GetQuyTrinhHopDong?Id=${Id}`,
          httpOptions
        );
      },
      GetListVatTu: (IdHopDong) => {
        return this.http.get(
          url + `HopDong/GetListHopDongVatTu?IdHopDong=${IdHopDong}`,
          httpOptions
        );
      },
      Set: (data) => {
        return this.http.post(
          url + "HopDong/SetQuyTrinhHopDong",
          data,
          httpOptions
        );
      },

      Deletes: (Id) => {
        return this.http.get(
          url + `HopDong/DeleteQuyTrinhHopDong?Id=${Id}`,
          httpOptions
        );

      },
      KhongDuyet: (data) => {
        return this.http.post(
          url + "HopDong/KhongDuyetQuyTrinhHopDong",
          data,
          httpOptions
        );
      },
      ChuyenTiep: (data) => {
        return this.http.post(
          url + "HopDong/ChuyenTiepQuyTrinhHopDong",
          data,
          httpOptions
        );
      },
      // get all danh sach hop dong theo ten
      GetListAll: () => {
        return this.http.get(url + `HopDong/GetAllQuyTrinhHopDong_Opt`, httpOptions);
      },
    };
  }


  GiaHanHopDong() {
    let url = API.HopDong;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(
          url + "GiaHanHopDong/GetNextSoQuyTrinh",
          httpOptions
        );
      },
      GetList: (data) => {
        data.idDuAn = 53
        return this.http.post(
          url + "GiaHanHopDong/GetListQuyTrinh",
          data,
          httpOptions
        );
      },
      Get: (Id) => {
        return this.http.get(
          url + `GiaHanHopDong/GetById?Id=${Id}`,
          httpOptions
        );
      },
      Set: (data) => {
        return this.http.post(
          url + "GiaHanHopDong/SetQuyTrinh",
          data,
          httpOptions
        );
      },
      KhongDuyet: (data) => {
        return this.http.post(
          url + "GiaHanHopDong/KhongDuyetQuyTrinh",
          data,
          httpOptions
        );
      },
      ChuyenTiep: (data) => {
        return this.http.post(
          url + "GiaHanHopDong/ChuyenTiepQuyTrinh",
          data,
          httpOptions
        );
      },
      Delete: (data) => {
        return this.http.post(
          url + "GiaHanHopDong/PhatHopDong/DeleteQuyTrinh",
          data,
          httpOptions
        );
      },


    };
  }


  QuyetToanHopDong() {
    let url = API.HopDong;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(
          url + "QuyetToan/GetNextSoQuyTrinh",
          httpOptions
        );
      },
      GetList: (data) => {
        data.idDuAn = 53
        return this.http.post(
          url + "QuyetToan/GetListQuyTrinh",
          data,
          httpOptions
        );
      },
      Get: (Id) => {
        return this.http.get(
          url + `QuyetToan/GetById?Id=${Id}`,
          httpOptions
        );
      },
      Set: (data) => {
        return this.http.post(
          url + "QuyetToan/SetQuyTrinh",
          data,
          httpOptions
        );
      },
      KhongDuyet: (data) => {
        return this.http.post(
          url + "QuyetToan/KhongDuyetQuyTrinh",
          data,
          httpOptions
        );
      },
      ChuyenTiep: (data) => {
        return this.http.post(
          url + "QuyetToan/ChuyenTiepQuyTrinh",
          data,
          httpOptions
        );
      },
      Delete: (data) => {
        return this.http.post(
          url + "QuyetToan/DeleteQuyTrinh",
          data,
          httpOptions
        );
      },


      GGetThongTinQuyetToanByHopDonget: (IdHopDong) => {
        return this.http.get(
          url + `QuyetToan/GetThongTinQuyetToanByHopDong?IdHopDong=${IdHopDong}`,
          httpOptions
        );
      },

    };
  }

  PhatHopDong() {
    let url = API.HopDong;
    return {
      PhatHopDong: (data) => {
        return this.http.post(url + "PhatHopDong", data, httpOptions);
      },
      GetNextSoQuyTrinh: () => {
        return this.http.get(
          url + "PhatHopDong/GetNextSoQuyTrinh",
          httpOptions
        );
      },
      GetList: (data) => {
        data.IdDuAn = 53
        return this.http.post(
          url + "PhatHopDong/GetListQuyTrinh",
          data,
          httpOptions
        );
      },
      Get: (Id) => {
        return this.http.get(url + `PhatHopDong/GetById?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        data.idDuAn = 53
        return this.http.post(
          url + "PhatHopDong/SetQuyTrinh",
          data,
          httpOptions
        );
      },
      Delete: (data) => {
        return this.http.post(
          url + "PhatHopDong/DeleteQuyTrinh",
          data,
          httpOptions
        );
      },
      KhongDuyet: (data) => {
        return this.http.post(
          url + "PhatHopDong/KhongDuyetQuyTrinh",
          data,
          httpOptions
        );
      },
      ChuyenTiep: (data) => {
        return this.http.post(
          url + "PhatHopDong/ChuyenTiepQuyTrinh",
          data,
          httpOptions
        );
      },
    };
  }


  QuyTrinhThanhToan() {
    let url = API.HopDong;
    return {
      GetList: (data) => {
        data.idDuAn = 53
        return this.http.post(
          url + "ThanhToan/GetListQuyTrinh",
          data,
          httpOptions
        );
      },
      Get: (Id) => {
        return this.http.get(
          url + `ThanhToan/GetById?Id=${Id}`,
          httpOptions
        );
      },
      Set: (data) => {
        data.idDuAn = 53
        return this.http.post(
          url + "ThanhToan/SetQuyTrinh",
          data,
          httpOptions
        );
      },
      Delete: (Id) => {
        return this.http.get(
          url + `ThanhToan/DeleteQuyTrinh?Id=${Id}`,
          httpOptions
        );

      },
      KhongDuyet: (data) => {
        return this.http.post(
          url + "ThanhToan/KhongDuyetQuyTrinh",
          data,
          httpOptions
        );
      },
      ChuyenTiep: (data) => {
        return this.http.post(
          url + "ThanhToan/ChuyenTiepQuyTrinh",
          data,
          httpOptions
        );
      },
    };
  }


}

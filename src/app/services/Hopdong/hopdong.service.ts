import { StoreService } from "./../store.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { httpOptions, API } from "./../host";
import { number } from "@amcharts/amcharts4/core";
@Injectable({
  providedIn: "root",
})
export class HopDongService {
  constructor(private http: HttpClient, public store: StoreService) {}

  QuyTrinhHopDong() {
    let url = API.HopDong;
    return {
      GetNextSoQuyTrinh: () => {
        return this.http.get(url + 'HopDong/GetNextSoQuyTrinhHopDong', httpOptions);
    },
      GetList: (data) => {
        data.idDuAn = parseInt(this.store.getCurrent());
        return this.http.post(
          url + "HopDong/GetListQuyTrinhHopDong",
          data,
          httpOptions
        );
      },
      Get: (id) => {
        return this.http.get(
          url + `HopDong/GetQuyTrinhHopDong?Id=${id}`,
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
      Deletes: (data) => {
        return this.http.post(
          url + "HopDong/DeleteQuyTrinhHopDong",
          data,
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
      GetList: (data) => {
        data.IdDuAn = parseInt(this.store.getCurrent());
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
        data.idDuAn = parseInt(this.store.getCurrent());
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
        data.idDuAn = parseInt(this.store.getCurrent());
        return this.http.post(
          url + "HopDong/GetListQuyTrinhThanhToan",
          data,
          httpOptions
        );
      },
      Get: (Id) => {
        return this.http.get(url + `HopDong/GetQuyTrinhThanhToan?Id=${Id}`, httpOptions);
      },
      Set: (data) => {
        data.idDuAn = parseInt(this.store.getCurrent());
        return this.http.post(
          url + "HopDong/SetQuyTrinhThanhToan",
          data,
          httpOptions
        );
      },
      Delete: (data) => {
        return this.http.post(
          url + "HopDong/DeleteQuyTrinhThanhToan",
          data,
          httpOptions
        );
      },

    };
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { API, httpOptions } from './host';

@Injectable({
  providedIn: 'root'
})
export class QuytrinhServiceService {

  constructor(private http: HttpClient, public store: StoreService) { }

  SetTraoDoiQuyTrinh(data: any) {
    return this.http.post(`${API.auth}DanhMuc/SetTraoDoiQuyTrinh`, data, httpOptions);
  }
  TraoDoiQuyTrinh(data: any) {
    return this.http.post(`${API.auth}DanhMuc/TraoDoiQuyTrinh`, data, httpOptions);
  }

  XemTruocTaiLIeuTraoDoi(IdFileDinhKem: any, Module: string) {
    let url = `${API.imgURL}/${Module ? Module : 'SmartEOSAPI'}/DanhMuc/XemTruocTaiLIeu?IdFileDinhKem=${IdFileDinhKem}`;
    return this.http.get(url, httpOptions);
  }
  GetListdmNhomTaiLieu(data: any) {
    return this.http.post(`${API.auth}PSM/DanhMuc/GetListdmNhomTaiLieu`, data, httpOptions);
  }

  SetFileDinhKemDownload(IdFileDinhKem: any, Module?: string) {
    let url = `${API.imgURL}/${Module}/DanhMuc/SetFileDinhKemDownload?IdFileDinhKem=${IdFileDinhKem}`;
    return this.http.get(url, httpOptions);
  }

  XemTruocTaiLIeu(IdFileDinhKem: any, Module: string) {
    let url = `${API.imgURL}/${Module ? Module : 'BM'}/DanhMuc/XemTruocTaiLIeu?IdFileDinhKem=${IdFileDinhKem}`;
    return this.http.get(url);
  }


}

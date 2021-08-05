import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './../host';
@Injectable({
    providedIn: 'root'
})
export class DanhMucHopDongService {
    constructor(private http: HttpClient) { }
    //Example (Ví dụ)
    //POST
    POST(data) {
        let url = API.HopDong + 'endpoint';
        return this.http.post(url, data, httpOptions);
    }
    //GET
    GET(Id) {
        let url = API.HopDong + `endpoint?Id=${Id}`;
        return this.http.get(url, httpOptions);
    }

    DanhMucThuTucThanhToan(){
        let url = API.HopDong
        return {
            GetListAll: () => {
                return this.http.get(url + `DanhMuc/GetListAlldmThuTucThanhToan`, httpOptions);
            },
            GetList:(data)=>{
                return this.http.get(`${url}DanhMuc/GetListdmThuTucThanhToan?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmThuTucThanhToan`,data,httpOptions)
            },
            DeleteList:(data)=>{
                return this.http.post(`${url}DanhMuc/DeleteListdmThuTucThanhToan`,data,httpOptions)
            },
            Delete:(id)=>{
                return this.http.get(`${url}DanhMuc/DeletedmThuTucThanhToan?id=${id}`,httpOptions)
            } 
        }
    }

    //
    DanhMucLoaiTienTe(){
        let url = API.HopDong
        return {
            GetListAll: () => {
                return this.http.get(url + `DanhMuc/GetListAlldmLoaiTienTe`, httpOptions);
            },
            GetList:(data)=>{
                return this.http.get(`${url}DanhMuc/GetListdmLoaiTienTe?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmLoaiTienTe`,data,httpOptions)
            },
            DeleteList:(data)=>{
                return this.http.post(`${url}DanhMuc/DeleteListdmLoaiTienTe`,data,httpOptions)
            },
            Delete:(id)=>{
                return this.http.get(`${url}DanhMuc/DeletedmLoaiTienTe?id=${id}`,httpOptions)
            } 
        }
    }

    //
    DanhMucLoaiHopDong(){
        let url = API.HopDong
        return {
            GetListAll: () => {
                return this.http.get(url + `DanhMuc/GetListAlldmLoaiHopDong`, httpOptions);
            },
          
            GetList:(data)=>{
                return this.http.get(`${url}DanhMuc/GetListdmLoaiHopDong?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}` ,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmLoaiHopDong`,data,httpOptions)
            },
            DeleteList:(data)=>{
                return this.http.post(`${url}DanhMuc/DeleteListdmLoaiHopDong`,data,httpOptions)
            },
            Delete:(id)=>{
                return this.http.get(`${url}DanhMuc/DeletedmLoaiHopDong?id=${id}`,httpOptions)
            }   
          
        }
    }

    //
    DanhMucHinhThucThanhToan(){
        let url = API.HopDong
        return {
            GetListAll: () => {
                return this.http.get(url + `DanhMuc/GetListAlldmHinhThucThanhToan`, httpOptions);
            },
            GetList:(data)=>{
                return this.http.get(`${url}DanhMuc/GetListdmHinhThucThanhToan?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}` ,httpOptions)
            },
            Set:(data)=>{
    
                return this.http.post(`${url}DanhMuc/SetdmHinhThucThanhToan`,data,httpOptions)
            },
            DeleteList:(data)=>{
                return this.http.post(`${url}DanhMuc/DeleteListdmHinhThucThanhToan`,data,httpOptions)
            },
            Delete:(id)=>{
                return this.http.get(`${url}DanhMuc/DeletedmHinhThucThanhToan?id=${id}`,httpOptions)
            }   
        }
    }

    //
    DanhMucTrangThaiBaoLanh(){
        let url = API.HopDong
        return {
            GetList:(data)=>{
                return this.http.get(`${url}DanhMuc/GetListdmTrangThaiBaoLanh?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmTrangThaiBaoLanh`,data,httpOptions)
            },
            DeleteList:(data)=>{
                debugger;
                return this.http.post(`${url}DanhMuc/DeleteListdmTrangThaiBaoLanh`,data,httpOptions)
            },
            Delete:(id)=>{
                return this.http.get(`${url}DanhMuc/DeletedmTrangThaiBaoLanh?id=${id}`,httpOptions)
            }
        }
    }

}

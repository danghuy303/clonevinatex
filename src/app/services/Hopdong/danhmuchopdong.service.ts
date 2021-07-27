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
            GetList:()=>{
                return this.http.get(`${url}DanhMuc/GetListdmThuTucThanhToan`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmThuTucThanhToan`,data,httpOptions)
            },
            Delete:(data)=>{
                return this.http.post(`${url}DanhMuc/DeletedmThuTucThanhToan`,data,httpOptions)
            }
        }
    }

    //
    DanhMucLoaiTienTe(){
        let url = API.HopDong
        return {
            GetList:()=>{
                return this.http.get(`${url}DanhMuc/GetListdmLoaiTienTe`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmLoaiTienTe`,data,httpOptions)
            },
            Delete:(data)=>{
                return this.http.post(`${url}DanhMuc/DeletedmLoaiTienTe`,data,httpOptions)
            }
        }
    }

    //
    DanhMucLoaiHopDong(){
        let url = API.HopDong
        return {
            GetList:(data)=>{
                return this.http.get(`${url}DanhMuc/GetListdmLoaiHopDong?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}` ,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmLoaiHopDong`,data,httpOptions)
            },
            // Delete:(Id)=>{
            //     debugger;
            //     return this.http.get(`${url}DanhMuc/DeletedmLoaiHopDong`,httpOptions)
            // },         
            
            DeleteList:(data)=>{
                debugger;
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
            GetList:()=>{
                return this.http.get(`${url}HopDong/DanhMuc/GetListdmHinhThucThanhToan`,httpOptions)
            },
            Set:(data)=>{
    
                return this.http.post(`${url}DanhMuc/SetdmHinhThucThanhToan`,data,httpOptions)
            },
            Delete:(data)=>{
                return this.http.post(`${url}DanhMuc/DeletedmHinhThucThanhToan`,data,httpOptions)
            }
        }
    }

    //
    DanhMucTrangThaiBaoLanh(){
        let url = API.HopDong
        return {
            GetList:()=>{
                return this.http.get(`${url}DanhMuc/GetListdmTrangThaiBaoLanh`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmTrangThaiBaoLanh`,data,httpOptions)
            },
            Delete:(data)=>{
                return this.http.post(`${url}DanhMuc/DeletedmTrangThaiBaoLanh`,data,httpOptions)
            }
        }
    }

}

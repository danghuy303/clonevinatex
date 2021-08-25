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

    GetListAlldmTheoLoaiThanhToan() {
        let url = API.HopDong + 'DanhMuc/GetListAlldmTheoLoaiThanhToan';
        return this.http.get(url, httpOptions);
    }

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
            GetListAlldmLoaiBaoLanh: () => {
                return this.http.get(url + `DanhMuc/GetListAlldmLoaiBaoLanh`, httpOptions);
              },
            GetdmTrangThaiBaoLanh: () => {
                return this.http.get(url + `DanhMuc/GetListAlldmTrangThaiBaoLanh`, httpOptions);
              },
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
// Modal danh mục kế hoạch
    //
    DanhMucVatTuPhu(){
        let url = API.KeHoach
        return {
            GetList:(data)=>{
                return this.http.get(`${url}DanhMuc/GetListdmVatTuPhu?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmVatTuPhu`,data,httpOptions)
            },
            DeleteList:(data)=>{
                debugger;
                return this.http.post(`${url}DanhMuc/DeleteListdmVatTuPhu`,data,httpOptions)
            },
            Delete:(id)=>{
                return this.http.get(`${url}DanhMuc/DeletedmVatTuPhu?id=${id}`,httpOptions)
            }
        }
    }
    //
    DanhMucCoCauNhanSu(){
        let url = API.KeHoach
        return {
            GetList:(data)=>{
                return this.http.get(`${url}DanhMuc/GetListdmCoCauNhanSu?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmCoCauNhanSu`,data,httpOptions)
            },
            DeleteList:(data)=>{
                debugger;
                return this.http.post(`${url}DanhMuc/DeleteListdmCoCauNhanSu`,data,httpOptions)
            },
            Delete:(id)=>{
                return this.http.get(`${url}DanhMuc/DeletedmCoCauNhanSu?id=${id}`,httpOptions)
            }
        }
    }
    //
    DanhMucDinhMucMatHang(){
        let url = API.KeHoach
        return {
            GetList:(data)=>{
                return this.http.get(`${url}DanhMuc/GetListdmDinhMucMatHang?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmDinhMucMatHang`,data,httpOptions)
            },
            DeleteList:(data)=>{
                debugger;
                return this.http.post(`${url}DanhMuc/DeleteListdmDinhMucMatHang`,data,httpOptions)
            },
            Delete:(id)=>{
                return this.http.get(`${url}DanhMuc/DeletedmDinhMucMatHang?id=${id}`,httpOptions)
            }
        }
    }
    //
    DanhMucChiPhiBanHang(){
        let url = API.KeHoach
        return {
            GetList:(data)=>{
                return this.http.get(`${url}DanhMuc/GetListdmChiPhiBanHang?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmChiPhiBanHang`,data,httpOptions)
            },
            DeleteList:(data)=>{
                debugger;
                return this.http.post(`${url}DanhMuc/DeleteListdmChiPhiBanHang`,data,httpOptions)
            },
            Delete:(id)=>{
                return this.http.get(`${url}DanhMuc/DeletedmChiPhiBanHang?id=${id}`,httpOptions)
            }
        }
    }
    //
    DanhMucTaiSan(){
        let url = API.KeHoach
        return {
            GetList:(data)=>{
                return this.http.get(`${url}DanhMuc/GetListdmTaiSan?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmTaiSan`,data,httpOptions)
            },
            DeleteList:(data)=>{
                debugger;
                return this.http.post(`${url}DanhMuc/DeleteListdmTaiSan`,data,httpOptions)
            },
            Delete:(id)=>{
                return this.http.get(`${url}DanhMuc/DeletedmTaiSan?id=${id}`,httpOptions)
            }
        }
    }
    //
    DanhMucTinhLuong(){
        let url = API.KeHoach
        return {
            GetList:(data)=>{
                return this.http.get(`${url}DanhMuc/GetListdmTinhLuong?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DanhMuc/SetdmTinhLuong`,data,httpOptions)
            },
            DeleteList:(data)=>{
                debugger;
                return this.http.post(`${url}DanhMuc/DeleteListdmTinhLuong`,data,httpOptions)
            },
            Delete:(id)=>{
                return this.http.get(`${url}DanhMuc/DeletedmTinhLuong?id=${id}`,httpOptions)
            }
        }
    }

    //.......... quantri/danhmuc ......................

    //
   DinhMucMatHangTheoNam(){
        let url = API.KeHoach
        return {
            GetList:(data)=>{
                return this.http.get(`${url}DinhMucMatHangHangNam/GetAllPaging?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}DinhMucMatHangHangNam/AddDinhMucMatHangHangNam`,data,httpOptions)
            },
            // DeleteList:(data)=>{
            //     debugger;
            //     return this.http.post(`${url}DanhMuc/DeleteListdmTinhLuong`,data,httpOptions)
            // },
            // Delete:(id)=>{
            //     return this.http.get(`${url}DanhMuc/DeletedmTinhLuong?id=${id}`,httpOptions)
            // }
        }
    }
/////
    DanhSachKeHoachKinhDoanh(){
        let url = API.KeHoach
        return {
            GetList:(data)=>{
                return this.http.get(`${url}KeHoachKinhDoanh/GetListQuyTrinh?CurrentPage=${data.CurrentPage}&PageSize=${data.PageSize}`,httpOptions)
            },
            Set:(data)=>{
                return this.http.post(`${url}KeHoachKinhDoanh/SetQuyTrinh`,data,httpOptions)
            },
            // DeleteList:(data)=>{
            //     debugger;
            //     return this.http.post(`${url}DanhMuc/DeleteListdmTinhLuong`,data,httpOptions)
            // },
            // Delete:(id)=>{
            //     return this.http.get(`${url}DanhMuc/DeletedmTinhLuong?id=${id}`,httpOptions)
            // }
        }
    }

}

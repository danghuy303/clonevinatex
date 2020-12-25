import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './host';

@Injectable({
    providedIn: 'root'
})
export class SanXuatService {
    constructor(private http: HttpClient) { }
    //Cấp bông
    GetListOptdmCapBong() {
        let url = API.SCMDanhMuc + 'GetListdmCapBong';
        return this.http.get(url, httpOptions);
    }
    GetListdmCapBong(data) {
        let url = API.SCMDanhMuc + 'GetListdmCapBong';
        return this.http.post(url, data, httpOptions);
    }
    SetdmCapBong(data) {
        let url = API.SCMDanhMuc + 'SetdmCapBong';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmCapBong(data) {
        let url = API.SCMDanhMuc + 'DeletedmCapBong';
        return this.http.post(url, data, httpOptions);
    }

    //Ca sản xuất
    GetListOptdmCaSanXuat() {
        let url = API.SCMDanhMuc + 'GetListdmCaSanXuat';
        return this.http.get(url, httpOptions);
    }
    GetListdmCaSanXuat(data) {
        let url = API.SCMDanhMuc + 'GetListdmCaSanXuat';
        return this.http.post(url, data, httpOptions);
    }
    SetdmCaSanXuat(data) {
        let url = API.SCMDanhMuc + 'SetdmCaSanXuat';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmCaSanXuat(data) {
        let url = API.SCMDanhMuc + 'DeletedmCaSanXuat';
        return this.http.post(url, data, httpOptions);
    }


    // Loại bông
    GetListdmLoaiBong(data) {
        let url = API.SCMDanhMuc + 'GetListdmLoaiBong';
        return this.http.post(url, data, httpOptions);
    }
    SetdmLoaiBong(data) {
        let url = API.SCMDanhMuc + 'SetdmLoaiBong';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmLoaiBong(data) {
        let url = API.SCMDanhMuc + 'DeletedmLoaiBong';
        return this.http.post(url, data, httpOptions);
    }


    //máy
    GetListOptdmMay() {
        let url = API.SCM + 'GetListdmMay';
        return this.http.get(url, httpOptions);
    }
    GetListdmMay(data) {
        let url = API.SCMDanhMuc + 'GetListdmMay';
        return this.http.post(url, data, httpOptions);
    }
    SetdmMay(data) {
        let url = API.SCMDanhMuc + 'SetdmMay';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmMay(data) {
        let url = API.SCMDanhMuc + 'DeletedmMay';
        return this.http.post(url, data, httpOptions);
    }

    //#region  mặt hàng

    GetListdmItem(data) {
        let url = API.SCMDanhMuc + 'GetListdmItem';
        return this.http.post(url, data, httpOptions);
    }
    SetdmItem(data) {
        let url = API.SCMDanhMuc + 'SetdmItem';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmItem(data) {
        let url = API.SCMDanhMuc + 'DeletedmItem';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion
    
    //#region  phân xưởng
    GetListdmPhanXuongOpt() {
        let url = API.SCMDanhMuc + 'GetListdmPhanXuong';
        return this.http.get(url, httpOptions);
    }
    GetListdmPhanXuong(data) {
        let url = API.SCMDanhMuc + 'GetListdmPhanXuong';
        return this.http.post(url, data, httpOptions);
    }
    SetdmPhanXuong(data) {
        let url = API.SCMDanhMuc + 'SetdmPhanXuong';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmPhanXuong(data) {
        let url = API.SCMDanhMuc + 'DeletedmPhanXuong';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion

    //#region  loại sợi
    GetListOptdmLoaiSoi() {
        let url = API.SCMDanhMuc + 'GetListdmLoaiSoi';
        return this.http.get(url, httpOptions);
    }
    GetListdmLoaiSoi(data) {
        let url = API.SCMDanhMuc + 'GetListdmLoaiSoi';
        return this.http.post(url, data, httpOptions);
    }
    SetdmLoaiSoi(data) {
        let url = API.SCMDanhMuc + 'SetdmLoaiSoi';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmLoaiSoi(data) {
        let url = API.SCMDanhMuc + 'DeletedmLoaiSoi';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion
     
    //#region  nhóm kho
    GetListdmNhomKho(data) {
        let url = API.SCMDanhMuc + 'GetListdmNhomKho';
        return this.http.post(url, data, httpOptions);
    }
    SetdmNhomKho(data) {
        let url = API.SCMDanhMuc + 'SetdmNhomKho';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmNhomKho(data) {
        let url = API.SCMDanhMuc + 'DeletedmNhomKho';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion
    
    //#region lô bông
    GetListdmLoBong(data) {
        let url = API.SCMDanhMuc + 'GetListdmLoBong';
        return this.http.post(url, data, httpOptions);
    }
    SetdmLoBong(data) {
        let url = API.SCMDanhMuc + 'SetdmLoBong';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmLoBong(data) {
        let url = API.SCMDanhMuc + 'DeletedmLoBong';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion

    //Dùng chung
    GetListCongDoan() {
        let url = API.SCMDanhMuc + 'GetListCongDoan';
        return this.http.get(url, httpOptions);
    }
    KiemTraTabTrangThai(eAction) {
        let url = API.auth + `QuanTriQuyTrinh/KiemTraTabTrangThai?eAction=${eAction}`;
        return this.http.get(url, httpOptions);
    }

    KiemTraButton(IdTable,IdTrangThai){
        let url = API.auth +`QuanTriQuyTrinh/KiemTraButton?IdTrangThai=${IdTrangThai}&IdTable=${IdTable}`;
        return this.http.get(url, httpOptions);
    }
    KiemTraButtonUser(IdTrangThai,IdTable,IdUser){
        let url = API.auth +`QuanTriQuyTrinh/KiemTraButtonUser?IdTrangThai=${IdTrangThai}&IdTable=${IdTable}&IdUser=${IdUser}`;
        return this.http.get(url, httpOptions);
    }
    GetOptions(){
        return {
            GetMatHang:()=>{
                return this.http.post(`${API.SCMDanhMuc}GetListdmItem`,{Loai:1},httpOptions)
            },
            GetNhaMay:()=>{
                return this.http.post(`${API.auth}DanhMuc/GetDanhSachDuAn_Advance`,{},httpOptions)
            },
            GetPhanXuong:(IdDuAn)=>{
                return this.http.get(`${API.SCMDanhMuc}GetListdmPhanXuongForIdDuAn?IdDuAn=${IdDuAn}`,httpOptions)
            },
            GetListGiaoKeHoachSanXuatChuaLapKeHoach:(Ngay)=>{
                return this.http.get(`${API.SCMQuanLyKho}GetListGiaoKeHoachSanXuatChuaLapKeHoach?Ngay=${Ngay}`,httpOptions)
            },
            GetListMatHangChuaLapKeHoach:(IdGiaoKeHoachSanXuat)=>{
                return this.http.get(`${API.SCMQuanLyKho}GetListMatHangChuaLapKeHoach?IdGiaoKeHoachSanXuat=${IdGiaoKeHoachSanXuat}`,httpOptions)
            },
            GetListCongDoanTheoMatHang:(IddmMatHang)=>{
                return this.http.get(`${API.SCMQuanLyKho}GetListCongDoanTheoMatHang?IddmMatHang=${IddmMatHang}`,httpOptions)
            },
            GetListMayTheoCongDoan:(CongDoan,IddmPhanXuong)=>{
                return this.http.get(`${API.SCMQuanLyKho}GetListMayTheoCongDoan?CongDoan=${CongDoan}&IddmPhanXuong=${IddmPhanXuong}`,httpOptions)
            },
            GetDanhSachDuAnByIdUser:(IdUser)=>{
                return this.http.get(`${API.auth}DanhMuc/GetDanhSachDuAnByIdUser?IdUser=${IdUser}`,httpOptions)
            },
            // SmartEOSAPI/DanhMuc/GetDanhSachDuAnByIdUser?IdUser=5d8c24c9-77f9-42aa-801b-df506280e6ce
        }
    }

    //GiaoKeHoachSanXuat
    GiaoKeHoachSanXuat() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhGiaoKeHoachSanXuat', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListGiaoKeHoachSanXuat', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetGiaoKeHoachSanXuat?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetGiaoKeHoachSanXuat', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteGiaoKeHoachSanXuat', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepGiaoKeHoachSanXuat', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetGiaoKeHoachSanXuat', data, httpOptions)
            },
        }
    }
    TrienKhaiKeHoachSanXuat() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhTrienKhaiKeHoachSanXuat', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListTrienKhaiKeHoachSanXuat', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetTrienKhaiKeHoachSanXuat?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetTrienKhaiKeHoachSanXuat', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteTrienKhaiKeHoachSanXuat', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepTrienKhaiKeHoachSanXuat', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetTrienKhaiKeHoachSanXuat', data, httpOptions)
            },
        }
    }
//#region  NhapLoBong
GetNextSoQuyTrinhPhieuNhapLoBong() {
    let url = API.SCMQuanLyKho + 'GetNextSoQuyTrinhPhieuNhapLoBong';
    return this.http.get(url, httpOptions);
}
GetListPhieuNhapLoBong(data) {
    let url = API.SCMQuanLyKho + 'GetListPhieuNhapLoBong';
    return this.http.post(url, data, httpOptions);
}
GetPhieuNhapLoBong(id) {
    let url = API.SCMQuanLyKho + 'GetPhieuNhapLoBong?Id='+ id;
    return this.http.get(url, httpOptions);
}
SetPhieuNhapLoBong(data) {
    let url = API.SCMQuanLyKho + 'SetPhieuNhapLoBong';
    return this.http.post(url, data, httpOptions);
}
DeletePhieuNhapLoBong(data) {
    let url = API.SCMQuanLyKho + 'DeletePhieuNhapLoBong';
    return this.http.post(url, data, httpOptions);
}
ChuyenTiepPhieuNhapLoBong(data) {
    let url = API.SCMQuanLyKho + 'ChuyenTiepPhieuNhapLoBong';
    return this.http.post(url, data, httpOptions);
}
KhongDuyetPhieuNhapLoBong(data) {
    let url = API.SCMQuanLyKho + 'KhongDuyetPhieuNhapLoBong';
    return this.http.post(url, data, httpOptions);
}
//#endregion

//#region  NhapChatLuong
GetNextSoQuyTrinhPhieuNhapChatLuong() {
    let url = API.SCMQuanLyKho + 'GetNextSoQuyTrinhPhieuNhapChatLuong';
    return this.http.get(url, httpOptions);
}
GetListPhieuNhapChatLuong(data) {
    let url = API.SCMQuanLyKho + 'GetListPhieuNhapChatLuong';
    return this.http.post(url, data, httpOptions);
}
GetPhieuNhapChatLuong(id) {
    let url = API.SCMQuanLyKho + 'GetPhieuNhapChatLuong?Id='+ id;
    return this.http.get(url, httpOptions);
}
SetPhieuNhapChatLuong(data) {
    let url = API.SCMQuanLyKho + 'SetPhieuNhapChatLuong';
    return this.http.post(url, data, httpOptions);
}
DeletePhieuNhapChatLuong(data) {
    let url = API.SCMQuanLyKho + 'DeletePhieuNhapChatLuong';
    return this.http.post(url, data, httpOptions);
}
ChuyenTiepPhieuNhapChatLuong(data) {
    let url = API.SCMQuanLyKho + 'ChuyenTiepPhieuNhapChatLuong';
    return this.http.post(url, data, httpOptions);
}
KhongDuyetPhieuNhapChatLuong(data) {
    let url = API.SCMQuanLyKho + 'KhongDuyetPhieuNhapChatLuong';
    return this.http.post(url, data, httpOptions);
}
//#endregion

}

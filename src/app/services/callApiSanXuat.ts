import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpOptions, API } from './host';
import { StoreService } from './store.service';

@Injectable({
    providedIn: 'root'
})
export class SanXuatService {
    constructor(private http: HttpClient, private store: StoreService) {

    }
    //Cấp bông
    //this.store.getCurrent();
    //data.IdNhaMay =this.store.getCurrent().toString()
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
    //#region  Danh Muc Kho
    GetListdmKho(data) {
        let url = API.SCMDanhMuc + 'GetListdmKho';
        return this.http.post(url, data, httpOptions);
    }
    SetdmKho(data) {
        let url = API.SCMDanhMuc + 'SetdmKho';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmKho(data) {
        let url = API.SCMDanhMuc + 'DeletedmKho';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion

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
    GetListdmLoaiBongHoiPhe() {
        let url = API.SCMDanhMuc + 'GetListdmLoaiBongHoiPhe';
        return this.http.get(url, httpOptions);
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
        data.IdDuAn = this.store.getCurrent();
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
    GetListLoBong(data) {
        let url = API.SCMDanhMuc + 'GetListLoBong';
        return this.http.post(url, data, httpOptions);
    }
    SetLoBong(data) {
        let url = API.SCMDanhMuc + 'SetLoBong';
        return this.http.post(url, data, httpOptions);
    }
    DeleteLoBong(data) {
        let url = API.SCMDanhMuc + 'DeleteLoBong';
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

    KiemTraButton(IdTable, IdTrangThai) {
        let url = API.auth + `QuanTriQuyTrinh/KiemTraButton?IdTrangThai=${IdTrangThai}&IdTable=${IdTable}`;
        return this.http.get(url, httpOptions);
    }
    KiemTraButtonUser(IdTrangThai, IdTable, IdUser) {
        let url = API.auth + `QuanTriQuyTrinh/KiemTraButtonUser?IdTrangThai=${IdTrangThai}&IdTable=${IdTable}&IdUser=${IdUser}`;
        return this.http.get(url, httpOptions);
    }
    GetOptions() {
        return {
            GetMatHang: () => {
                return this.http.post(`${API.SCMDanhMuc}GetListdmItem`, { Loai: 1 }, httpOptions)
            },
            GetNhaMay: () => {
                return this.http.post(`${API.auth}DanhMuc/GetDanhSachDuAn_Advance`, {}, httpOptions)
            },
            GetPhanXuong: (IdDuAn) => {
                return this.http.get(`${API.SCMDanhMuc}GetListdmPhanXuongForIdDuAn?IdDuAn=${IdDuAn}`, httpOptions)
            },
            GetListGiaoKeHoachSanXuatChuaLapKeHoach: () => {
                return this.http.get(`${API.SCMQuanLyKho}GetListGiaoKeHoachSanXuatChuaLapKeHoach`, httpOptions)
            },
            GetListMatHangChuaLapKeHoach: (IdGiaoKeHoachSanXuat) => {
                return this.http.get(`${API.SCMQuanLyKho}GetListMatHangChuaLapKeHoach?IdGiaoKeHoachSanXuat=${IdGiaoKeHoachSanXuat}`, httpOptions)
            },
            GetListCongDoanTheoMatHang: (IddmMatHang) => {
                return this.http.get(`${API.SCMQuanLyKho}GetListCongDoanTheoMatHang?IddmMatHang=${IddmMatHang}`, httpOptions)
            },
            GetListMayTheoCongDoan: (IddmPhanXuong, TuNgay, DenNgay) => {
                return this.http.get(`${API.SCMQuanLyKho}GetListMayTheoCongDoan?IddmPhanXuong=${IddmPhanXuong}&TuNgay=${TuNgay}&DenNgay=${DenNgay}`, httpOptions)
            },
            GetDanhSachDuAnByIdUser: (IdUser) => {
                return this.http.get(`${API.auth}DanhMuc/GetDanhSachDuAnByIdUser?IdUser=${IdUser}`, httpOptions)
            },
            GetListTinhTrangMay: (Id,IddmPhanXuong, TuNgay, DenNgay) => {
                return this.http.get(`${API.SCMQuanLyKho}GetListTinhTrangMay?Id=${Id}&IddmPhanXuong=${IddmPhanXuong}&TuNgay=${TuNgay}&DenNgay=${DenNgay}`, httpOptions)
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
            Get: (Id,ChiTiet?) => {
                return this.http.get(url + `GetTrienKhaiKeHoachSanXuat?Id=${Id}&ChiTiet=${ChiTiet===false?false:true}`, httpOptions);
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
    QuyTrinhPhieuNhapLoBong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapLoBong', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuNhapLoBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapLoBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapLoBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapLoBong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapLoBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapLoBong', data, httpOptions)
            },
            GetNextSoLoBong: (IddmLoaiBong, IddmCapBong) => {
                return this.http.get(url + `GetNextSoLoBong?IddmLoaiBong=${IddmLoaiBong}&IddmCapBong=${IddmCapBong}`, httpOptions)
            },
        }
    }
    //#endregion

    //#region  NhapChatLuong
    PhieuNhapLoBong_ChatLuong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapLoBong_ChatLuong', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuNhapLoBong_ChatLuong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapLoBong_ChatLuong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapLoBong_ChatLuong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapLoBong_ChatLuong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapLoBong_ChatLuong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapLoBong_ChatLuong', data, httpOptions)
            },
            Import: (Id, FileName) => {
                return this.http.get(url + `ImportExcelPhieuNhapLoBong_ChatLuong?Id=${Id}&FileName=${FileName}`, httpOptions)
            },
        }
    }
    //#endregion

    //#region  phiếu bàn giao bông xơ
    PhieuBanGiaoBongXo() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuBanGiaoBongXo', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuBanGiaoBongXo', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuBanGiaoBongXo?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuBanGiaoBongXo', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuBanGiaoBongXo', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuBanGiaoBongXo', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuBanGiaoBongXo', data, httpOptions)
            },
        }
    }
    //#endregion

    //#region  phiếu hạ cấp
    PhieuHaCap() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuHaCap', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuHaCap', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuHaCap?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuHaCap', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuHaCap', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuHaCap', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuHaCap', data, httpOptions)
            },
        }
    }
    //#endregion

    
    //#region  phiếu điều chuyển
    PhieuDieuChuyen() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuDieuChuyen', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuDieuChuyen', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuDieuChuyen?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuDieuChuyen', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuDieuChuyen', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuDieuChuyen', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuDieuChuyen', data, httpOptions)
            },
        }
    }
    //#endregion

    ThongKeSanLuong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhThongKeSanLuong', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListThongKeSanLuong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetThongKeSanLuong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetThongKeSanLuong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteThongKeSanLuong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepThongKeSanLuong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetThongKeSanLuong', data, httpOptions)
            },
            GetMatHang: (IddmPhanXuong, Ngay, CongDoan) => {
                return this.http.get(url + `GetMatHangThongKeSanLuong?IddmPhanXuong=${IddmPhanXuong}&Ngay=${Ngay}&CongDoan=${CongDoan}`, httpOptions)
            },
        }
    }
    //Pha bông
    PhuongAnPhaBong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhuongAnPhaBong', httpOptions);
            },
            GetLoBongTrongKho:(IdDuAn)=>{
                return this.http.get(url + `GetLoBongTrongKho?IdDuAn=${IdDuAn}`, httpOptions)
            },
            TinhKhoiLuongBong:(data)=>{
                return this.http.post(url+'TinhKhoiLuongBong',data,httpOptions)
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhuongAnPhaBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnPhaBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetPhuongAnPhaBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhuongAnPhaBong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhuongAnPhaBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhuongAnPhaBong', data, httpOptions)
            },
        }
    }


    Importdm(TableName,FileName){
        let IdDuAn =this.store.getCurrent().toString()
        let url = API.SCMDanhMuc + `ImportDanhMuc?IdDuAn=${IdDuAn}&TableName=${TableName}&FileName=${FileName}`;
        return this.http.get(url, httpOptions);
    }
    Exportdm(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + `ExportDanhMuc`;
        return this.http.post(url, data, httpOptions);
    }
    download(url) {
        window.open(API.imgURL + url);
    }
    getLuuKho(IddmKho, CurrentPage, sFilter){
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `GetLuuKho?IdDuAn=0&IddmKho=${IddmKho}&CurrentPage=${CurrentPage}&sFilter=${sFilter}`;
        return this.http.get(url,httpOptions);
    }
    KhoiTaoItem() {
        let url = API.SCMDanhMuc + 'KhoiTaoItem';
        return this.http.get(url, httpOptions);
    }
}

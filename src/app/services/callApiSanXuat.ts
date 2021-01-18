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

    //#region  Danh mục máy biến áp
    DMMayBienAp() {
        let url = API.ThongKeDien;
        return {
            GetList: () => {
                return this.http.get(url + 'GetDanhSachMayBienAp', httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemMayBienAp?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemMayBienAp', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteMayBienAp', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục loại điện
    dmLoaiDienKV() {
        let url = API.ThongKeDien;
        return {
            GetList: () => {
                return this.http.get(url + 'GetDanhSachLoaiDienKV', httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemLoaiDienKV?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemLoaiDienKV', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteLoaiDienKV', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục nhóm công tơ
    dmNhomCongToDien() {
        let url = API.ThongKeDien;
        return {
            GetList: () => {
                return this.http.get(url + 'GetDanhSachNhomCongToDien', httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemNhomCongToDien?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemNhomCongToDien', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteNhomCongToDien', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục nhóm công tơ
    dmQuyCachDongGoi() {
        let url = API.SCMDanhMuc;
        return {
            GetList: () => {
                return this.http.get(url + 'GetListdmQuyCachDongGoi', httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetListdmQuyCachDongGoi?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetdmQuyCachDongGoi', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletedmQuyCachDongGoi', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục nhóm công tơ
    dmPhanNhomMaySanXuat() {
        let url = API.SCMDanhMuc;
        return {
            GetList: () => {
                return this.http.get(url + 'GetListdmPhanNhomMaySanXuat', httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetdmPhanNhomMay?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetdmPhanNhomMay', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletedmPhanNhomMaySanXuat', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục tiêu chí chất lượng sợi
    dmTieuChiChatLuongsoi() {
        let url = API.SCMKiemTraChatLuong;
        return {
            GetList: () => {
                return this.http.get(url + 'GetDanhSachChiTieuChatLuong', httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemChiTieuChatLuong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemChiTieuChatLuong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteChiTieuChatLuong', data, httpOptions);
            },
        }
    }
    //#endregion

    //#region  Danh mục công tơ
    dmCongToDien() {
        let url = API.ThongKeDien;
        return {
            GetList: (idMayBienAp) => {
                return this.http.get(url + `GetDanhSachCongToDien?idMayBienAp=${idMayBienAp}`, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetItemCongToDien?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetItemCongToDien', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteCongToDien', data, httpOptions);
            },
        }
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
            GetListTinhTrangMay: (Id, IddmPhanXuong, TuNgay, DenNgay) => {
                return this.http.get(`${API.SCMQuanLyKho}GetListTinhTrangMay?Id=${Id}&IddmPhanXuong=${IddmPhanXuong}&TuNgay=${TuNgay}&DenNgay=${DenNgay}`, httpOptions)
            },
            GetTonKhoCuaNguyenLieu: (idKho, idNguyenLieu) => {
                return this.http.get(`${API.KeHoachNguyenLieu}GetTonKhoCuaNguyenLieu?idKho=${idKho}&idNguyenLieu=${idNguyenLieu}`, httpOptions)
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
            Get: (Id, ChiTiet?) => {
                return this.http.get(url + `GetTrienKhaiKeHoachSanXuat?Id=${Id}&ChiTiet=${ChiTiet === false ? false : true}`, httpOptions);
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

    //#region nhập kế hoạch nguyên liệu
    NhapKeHoachNguyenLieu() {
        let url = API.KeHoachNguyenLieu;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhKeHoachNhapNguyenLieu', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListKeHoachNhapNguyenLieu', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetKeHoachNhapNguyenLieu?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetKeHoachNhapNguyenLieu', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteKeHoachNhapNguyenLieu', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepKeHoachNhapNguyenLieu', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetKeHoachNhapNguyenLieu', data, httpOptions)
            },
        }
    }

    //#region nhập kế hoạch nguyên liệu
    KeHoachXuatHang() {
        let url = API.KeHoachNguyenLieu;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhKeHoachXuatNguyenLieu', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListKeHoachXuatNguyenLieu', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetKeHoachXuatNguyenLieu?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetKeHoachXuatNguyenLieu', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeleteKeHoachXuatNguyenLieu', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepKeHoachXuatNguyenLieu', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetKeHoachXuatNguyenLieu', data, httpOptions)
            },
        }
    }
    //#endregion

    //#region thống kê điện
    ThongKeDien() {
        let url = API.ThongKeDien;
        return {
            GetList: (data) => {
                return this.http.post(url + 'GetListThongKeDien', data, httpOptions);
            },
            Get: (data) => {
                return this.http.post(url + `GetThongKeDien`, data, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetThongKeDien', data, httpOptions);
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
            GetLoBongTrongKho: (IdDuAn) => {
                return this.http.get(url + `GetLoBongTrongKho?IdDuAn=${IdDuAn}`, httpOptions)
            },
            TinhKhoiLuongBong: (data) => {
                return this.http.post(url + 'TinhKhoiLuongBong', data, httpOptions)
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



    Importdm(TableName, FileName) {
        let IdDuAn = this.store.getCurrent().toString()
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
    getLuuKho(IddmKho, IddmViTri, CurrentPage, sFilter) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `GetLuuKho?IdDuAn=0&IddmKho=${IddmKho}&IddmViTri=${IddmViTri}&CurrentPage=${CurrentPage}&sFilter=${sFilter}`;
        return this.http.get(url, httpOptions);
    }
    getLuuKhoKhac(IddmKho,IddmViTri, CurrentPage, sFilter) {
        // let IdDuAn =this.store.getCurrent();
        let url = API.SCMQuanLyKho + `GetLuuKhoKhac?IdDuAn=0&IddmKho=${IddmKho}&IddmViTri=${IddmViTri}&CurrentPage=${CurrentPage}&sFilter=${sFilter}`;
        return this.http.get(url, httpOptions);
    }
    KhoiTaoItem() {
        let url = API.SCMDanhMuc + 'KhoiTaoDinhMuc';
        return this.http.get(url, httpOptions);
    }
    PhieuNhapThanhPham() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapThanhPham', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuNhapThanhPham', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapThanhPham?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapThanhPham', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapThanhPham', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapThanhPham', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapThanhPham', data, httpOptions)
            },
        }
    }
    PhieuNhapHoiAm() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuNhapHoiAm', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuNhapHoiAm', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuNhapHoiAm?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuNhapHoiAm', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuNhapHoiAm', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuNhapHoiAm', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuNhapHoiAm', data, httpOptions)
            },
            GetListMatHang: (data) => {
                return this.http.post(url + 'GetlistdmMatHangHoiAm', data, httpOptions)
            },
        }
    }
    PhieuChatLuongSoi() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuChatLuongSoi', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuChatLuongSoi', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuChatLuongSoi?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuChatLuongSoi', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuChatLuongSoi', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuChatLuongSoi', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuChatLuongSoi', data, httpOptions)
            },
        }
    }

    TimBong() {
        let url = API.SCMQuanLyKho;
        return {
            // GetNextSo: () => {
            //     return this.http.get(url + 'GetNextSoQuyTrinhGiaoKeHoachSanXuat', httpOptions);
            // },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhuongAnTimBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnTimBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetPhuongAnTimBong', data, httpOptions);
            },
            // Delete: (data) => {
            //     return this.http.post(url + 'DeleteGiaoKeHoachSanXuat', data, httpOptions);
            // },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhuongAnTimBong', data, httpOptions)
            },
            // KhongDuyet: (data) => {
            //     return this.http.post(url + 'KhongDuyetGiaoKeHoachSanXuat', data, httpOptions)
            // },
            GetListKienBong: (data) => {
                return this.http.post(url + `GetListKienLoBong`, data, httpOptions)
            }
        }
    }

    SanXuat() {
        let url = API.SCMQuanLyKho;
        return {
            // GetNextSo: () => {
            //     return this.http.get(url + 'GetNextSoQuyTrinhGiaoKeHoachSanXuat', httpOptions);
            // },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhuongAnSanXuat', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnSanXuat?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetPhuongAnSanXuat', data, httpOptions);
            },
            // Delete: (data) => {
            //     return this.http.post(url + 'DeleteGiaoKeHoachSanXuat', data, httpOptions);
            // },
            // ChuyenTiep: (data) => {
            //     return this.http.post(url + 'ChuyenTiepPhuongAnSanXuat', data, httpOptions)
            // },
            // KhongDuyet: (data) => {
            //     return this.http.post(url + 'KhongDuyetGiaoKeHoachSanXuat', data, httpOptions)
            // },
            GetListKienBong: (data) => {
                return this.http.post(url + `GetListKienLoBong`, data, httpOptions)
            }
        }
    }

    XepBanBong() {
        let url = API.SCMQuanLyKho;
        return {
            // GetNextSo: () => {
            //     return this.http.get(url + 'GetNextSoQuyTrinhGiaoKeHoachSanXuat', httpOptions);
            // },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhuongAnXepBanBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnXepBanBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                return this.http.post(url + 'SetPhuongAnXepBanBong', data, httpOptions);
            },
            // Delete: (data) => {
            //     return this.http.post(url + 'DeleteGiaoKeHoachSanXuat', data, httpOptions);
            // },
            // ChuyenTiep: (data) => {
            //     return this.http.post(url + 'ChuyenTiepPhuongAnSanXuat', data, httpOptions)
            // },
            // KhongDuyet: (data) => {
            //     return this.http.post(url + 'KhongDuyetGiaoKeHoachSanXuat', data, httpOptions)
            // },
            // GetListKienBong: (data) => {
            //     return this.http.post(url + `GetListKienLoBong`, data, httpOptions)
            // }
        }
    }

    //#region  định lượng

    GetListDinhMuc(data) {
        let url = API.SCMDanhMuc + 'GetListDinhMuc';
        return this.http.post(url, data, httpOptions);
    }
    GetDinhMuc(Id) {
        let url = API.SCMDanhMuc + `GetDinhMuc?Id=${Id}`;
        return this.http.get(url, httpOptions);
    }
    SetDinhMuc(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + 'SetDinhMuc';
        return this.http.post(url, data, httpOptions);
    }
    DeleteDinhMuc(data) {
        let url = API.SCMDanhMuc + 'DeleteDinhMuc';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion
    PhieuKiemKeKho() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuKiemKeKho', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuKiemKeKho', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuKiemKeKho?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuKiemKeKho', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuKiemKeKho', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuKiemKeKho', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuKiemKeKho', data, httpOptions)
            },
        }
    }
    //#region  định lượng

    GetListdmViTri(data) {
        let url = API.SCMDanhMuc + 'GetListdmViTri';
        return this.http.post(url, data, httpOptions);
    }
    GetListdmViTriOpt() {
        let url = API.SCMDanhMuc + `GetListdmViTri`;
        return this.http.get(url, httpOptions);
    }
    SetdmViTri(data) {
        data.IdDuAn = this.store.getCurrent();
        let url = API.SCMDanhMuc + 'SetdmViTri';
        return this.http.post(url, data, httpOptions);
    }
    DeletedmViTri(data) {
        let url = API.SCMDanhMuc + 'DeletedmViTri';
        return this.http.post(url, data, httpOptions);
    }
    //#endregion
    PhieuXuatSanXuat() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuXuatBong', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuXuatBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuXuatBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuXuatBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuXuatBong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuXuatBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuXuatBong', data, httpOptions)
            },
        }
    }
    PhuongAnDieuChinhTimBong() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhuongAnDieuChinhTimBong', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhuongAnDieuChinhTimBong', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhuongAnDieuChinhTimBong?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhuongAnDieuChinhTimBong', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhuongAnDieuChinhTimBong', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhuongAnDieuChinhTimBong', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhuongAnDieuChinhTimBong', data, httpOptions)
            },
            GetKienLoBong: (IdPhuongAnPhaBong, IdLoBong, IddmKho) => {
                return this.http.get(url + `GetKienLoBongDieuChinh?IdPhuongAnPhaBong=${IdPhuongAnPhaBong}&IdLoBong=${IdLoBong}&IddmKho=${IddmKho}`, httpOptions)
            },
        }
    }
    PhieuXuatKhoXo() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuXuatXo', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuXuatXo', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuXuatXo?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuXuatXo', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuXuatXo', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'ChuyenTiepPhieuXuatXo', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuXuatXo', data, httpOptions)
            },
        }
    }
    PhieuXuatBongPhe() {
        let url = API.SCMQuanLyKho;
        return {
            GetNextSo: () => {
                return this.http.get(url + 'GetNextSoQuyTrinhPhieuXuatBongPhe', httpOptions);
            },
            GetList: (data) => {
                return this.http.post(url + 'GetListPhieuXuatBongPhe', data, httpOptions);
            },
            Get: (Id) => {
                return this.http.get(url + `GetPhieuXuatBongPhe?Id=${Id}`, httpOptions);
            },
            Set: (data) => {
                data.IdDuAn = this.store.getCurrent();
                return this.http.post(url + 'SetPhieuXuatBongPhe', data, httpOptions);
            },
            Delete: (data) => {
                return this.http.post(url + 'DeletePhieuXuatBongPhe', data, httpOptions);
            },
            ChuyenTiep: (data) => {
                return this.http.post(url + 'ChuyenTiepPhieuXuatBongPhe', data, httpOptions)
            },
            KhongDuyet: (data) => {
                return this.http.post(url + 'KhongDuyetPhieuXuatBongPhe', data, httpOptions)
            },
        }
    }
}

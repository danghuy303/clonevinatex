import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { VoiLibModule } from 'voi-lib';
import { TaisanRoutingModule } from './taisan-routing.module';
import { TaisanComponent } from './taisan.component';
import { DanhsachtaisanComponent } from './danhsachtaisan/danhsachtaisan.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from 'src/app/services/loader.interceptor';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { Dat09Service } from 'src/app/services/callApi';
import { LoaderService } from 'src/app/services/loader.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TreeTableModule } from 'primeng/treetable';
import { DanhmucloaibaoduongComponent } from './danhmuc/danhmucloaibaoduong/danhmucloaibaoduong.component';
import { DanhmucdonvitinhComponent } from './danhmuc/danhmucdonvitinh/danhmucdonvitinh.component';
import { DanhmucloaitaisanComponent } from './danhmuc/danhmucloaitaisan/danhmucloaitaisan.component';
import { DonvinangsuatComponent } from './danhmuc/donvinangsuat/donvinangsuat.component';
import { HangsanxuatComponent } from './danhmuc/hangsanxuat/hangsanxuat.component';
import { NhaptaisanComponent } from './nhaptaisan/nhaptaisan.component';
import { BiendongComponent } from './biendong/biendong.component';
import { LichbaoduongComponent } from './lichbaoduong/lichbaoduong.component';
import { SucosuachuaComponent } from './sucosuachua/sucosuachua.component';
import { ThongtinchungComponent } from './thongtinchung/thongtinchung.component';
import { LoaikhauhaoComponent } from './danhmuc/loaikhauhao/loaikhauhao.component';
import { TinhtrangtaisanComponent } from './danhmuc/tinhtrangtaisan/tinhtrangtaisan.component';
import { ThongtitaisanchaComponent } from './screen/thongtitaisancha/thongtitaisancha.component';
import { SharedModule } from './../../shared/shared.module';
import { BangiaotaisanComponent } from './bangiaotaisan/bangiaotaisan.component';
import { PhieuthuhoitaisanComponent } from './thuhoitaisan/phieuthuhoitaisan/phieuthuhoitaisan.component';
import { ThanhlytaisanComponent } from './thanhlytaisan/thanhlytaisan.component';
import { NhaplieuxuattaisanComponent } from './nhaplieuxuattaisan/nhaplieuxuattaisan.component';
import { LoaisucoComponent } from './danhmuc/loaisuco/loaisuco.component';
import { QRCodeModule } from 'angularx-qrcode';
import { Sucosuachua2Component } from './sucosuachua2/sucosuachua2.component';
import { TaomoilichbaoduongComponent } from './screen/taomoilichbaoduong/taomoilichbaoduong.component';
import { AntoanComponent } from './screen/antoan/antoan.component';
import { ThongsokythuatComponent } from './screen/thongsokythuat/thongsokythuat.component';

// import { LichbaoduongcopyComponent } from './lichbaoduongcopy/lichbaoduongcopy.component';
import { TaomoilichbaoduongcopyComponent } from './taomoilichbaoduongcopy/taomoilichbaoduongcopy.component';

import { VattudutruComponent } from './vattudutru/vattudutru.component';
import { VattugiatricaoComponent } from './vattugiatricao/vattugiatricao.component';
import { DanhsachvattuComponent } from './danhsachvattu/danhsachvattu.component';
import { QuytrinhnhapvattuComponent } from './quytrinhnhapvattu/quytrinhnhapvattu.component';
import { NhapvattuComponent } from './nhapvattu/nhapvattu.component';
import { QuytrinhdenghithayvattuComponent } from './quytrinhdenghithayvattu/quytrinhdenghithayvattu.component';
import { VattucanthayComponent } from './vattucanthay/vattucanthay.component';
import { LichxichnamComponent } from './lichxichnam/lichxichnam.component';
import { LichxichthangComponent } from './lichxichthang/lichxichthang.component';
import { LapkehoachlichxichnamComponent } from './lapkehoachlichxichnam/lapkehoachlichxichnam.component';
import { DenghixulisucoComponent } from './denghixulisuco/denghixulisuco.component';
import { LapkehoachthangComponent } from './lapkehoachthang/lapkehoachthang.component';
import { QuytrinhlapkehoachlichxichnamComponent } from './quytrinhlapkehoachlichxichnam/quytrinhlapkehoachlichxichnam.component';
import { DanhGiaNhaCungUngComponent } from './danh-gia-nha-cung-ung/danh-gia-nha-cung-ung.component';
import { KhauHaoTaiSanQuyTrinhComponent } from './khau-hao-tai-san-quy-trinh/khau-hao-tai-san-quy-trinh.component';
import { DanhmucmucdouutienComponent } from './danhmuc/danhmucmucdouutien/danhmucmucdouutien.component';
import { DanhmucnhacungcapComponent } from './danhmuc/danhmucnhacungcap/danhmucnhacungcap.component';
import { ThongtinthemmoitaisanComponent } from './screen/thongtinthemmoitaisan/thongtinthemmoitaisan.component';

import { ModalloaisucoComponent } from './modal/modalloaisuco/modalloaisuco.component';
import { ModalchontaisanThanhlyCopyComponent } from './modal/modalchontaisan-thanhly-copy/modalchontaisan-thanhly-copy.component';
import { ModalcapnhatbaoduongcopyyComponent } from './modalcapnhatbaoduongcopyy/modalcapnhatbaoduongcopyy.component';
import { ModaldonvitinhComponent } from './modal/modaldonvitinh/modaldonvitinh.component';
import { ModalloaitaisanComponent } from './modal/modalloaitaisan/modalloaitaisan.component';
import { ModalbaoduongComponent } from './modal/modalbaoduong/modalbaoduong.component';
import { ModaldonvinangsuatComponent } from './modal/modaldonvinangsuat/modaldonvinangsuat.component';
import { ModalcapnhattaisanComponent } from './modal/modalcapnhattaisan/modalcapnhattaisan.component';
import { ModalhangsanxuatComponent } from './modal/modalhangsanxuat/modalhangsanxuat.component';
import { ModalthongtinchitiettaisanComponent } from './modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component';
import { ModalcapnhatbaoduongComponent } from './modal/modalcapnhatbaoduong/modalcapnhatbaoduong.component';
import { ModalcapnhatsuachuabaoduongComponent } from './modal/modalcapnhatsuachuabaoduong/modalcapnhatsuachuabaoduong.component';
import { ModalloaikhauhaoComponent } from './modal/modalloaikhauhao/modalloaikhauhao.component';
import { ModaltinhtrangtaisanComponent } from './modal/modaltinhtrangtaisan/modaltinhtrangtaisan.component';
import { ModalcapnhattaisanconComponent } from './modal/modalcapnhattaisancon/modalcapnhattaisancon.component';
import { ModalthuhoitaisanComponent } from './modal/modalthuhoitaisan/modalthuhoitaisan.component';
import { ModalcapnhatbaogiaComponent } from './modal/modalcapnhatbaogia/modalcapnhatbaogia.component';
import { ModalchontaisanComponent } from './modal/modalchontaisan/modalchontaisan.component';
import { ModalthanhlytaisanComponent } from './modal/modalthanhlytaisan/modalthanhlytaisan.component';
import { ModalchontaisanCopyComponent } from './modal/modalchontaisan-copy/modalchontaisan-copy.component';
import { ModaltaolichbaoduongComponent } from './modal/modaltaolichbaoduong/modaltaolichbaoduong.component';
import { ModalnhaplieuxuattaisanComponent } from './modal/modalnhaplieuxuattaisan/modalnhaplieuxuattaisan.component';
import { ModaldenghixulisucoComponent } from './modaldenghixulisuco/modaldenghixulisuco.component';
import { ModalmucdouutienComponent } from './danhmuc/modalmucdouutien/modalmucdouutien.component';
import { ModaldmnhacungcapComponent } from './danhmuc/modaldmnhacungcap/modaldmnhacungcap.component';
import { ModalthemmoiluachontaisanComponent } from './modal/modalthemmoiluachontaisan/modalthemmoiluachontaisan.component';
import { ModalluachontaisantheolichxichComponent } from './modal/modalluachontaisantheolichxich/modalluachontaisantheolichxich.component';
import { KhauHaoTaiSanModalComponent } from './khau-hao-tai-san-quy-trinh/khau-hao-tai-san-modal/khau-hao-tai-san-modal.component';
import { NhomNhaCungUngDanhMucComponent } from './nhom-nha-cung-ung-danh-muc/nhom-nha-cung-ung-danh-muc.component';
import { NhomNhaCungUngModalComponent } from './nhom-nha-cung-ung-danh-muc/nhom-nha-cung-ung-modal/nhom-nha-cung-ung-modal.component';
import { NhaCungUngDanhMucComponent } from './nha-cung-ung-danh-muc/nha-cung-ung-danh-muc.component';
import { NhaCungUngModalComponent } from './nha-cung-ung-danh-muc/nha-cung-ung-modal/nha-cung-ung-modal.component';
import { DanhGiaNhaCungUngModalComponent } from './danh-gia-nha-cung-ung/danh-gia-nha-cung-ung-modal/danh-gia-nha-cung-ung-modal.component';
import { ThongTinHangHoaModalComponent } from './nha-cung-ung-danh-muc/thong-tin-hang-hoa-modal/thong-tin-hang-hoa-modal.component';
import { ThemNhaCungUngModalComponent } from './danh-gia-nha-cung-ung/them-nha-cung-ung-modal/them-nha-cung-ung-modal.component';
import { SuaNhaCungUngModalComponent } from './danh-gia-nha-cung-ung/sua-nha-cung-ung-modal/sua-nha-cung-ung-modal.component';
import { TieuChiDanhGiaNhaComponent } from './tieu-chi-danh-gia-nha/tieu-chi-danh-gia-nha.component';
import { TieuChiDanhGiaModalComponent } from './tieu-chi-danh-gia-nha/tieu-chi-danh-gia-modal/tieu-chi-danh-gia-modal.component';
import { ModalquytrinhbaoduongComponent } from './modal/modalquytrinhbaoduong/modalquytrinhbaoduong.component';
import { ModalbaoduongluachontaisanComponent } from './modal/modalbaoduongluachontaisan/modalbaoduongluachontaisan.component';
import { ModalnhapvattuluachontaisanComponent } from './modal/modalnhapvattuluachontaisan/modalnhapvattuluachontaisan.component';
import { ModalluachonloaibaoduongComponent } from './modal/modalluachonloaibaoduong/modalluachonloaibaoduong.component';
import { DieuChuyenTaiSanModalComponent } from './dieu-chuyen-tai-san/dieu-chuyen-tai-san-modal/dieu-chuyen-tai-san-modal.component';
import { ThoihancungcapvattuComponent } from './thoihancungcapvattu/thoihancungcapvattu.component';
import { ThoihancungcapvattumodalComponent } from './thoihancungcapvattumodal/thoihancungcapvattumodal.component';
import { ModalluachontaisantheolichthangComponent } from './modal/modalluachontaisantheolichthang/modalluachontaisantheolichthang.component';
import { ChonTaiSanDieuChuyenModalComponent } from './dieu-chuyen-tai-san/chon-tai-san-dieu-chuyen-modal/chon-tai-san-dieu-chuyen-modal.component';
import { ChonTaiSanKhauHaoModalComponent } from './khau-hao-tai-san-quy-trinh/chon-tai-san-khau-hao-modal/chon-tai-san-khau-hao-modal.component';
import { ThoihancungcapmodalluachonComponent } from './modal/thoihancungcapmodalluachon/thoihancungcapmodalluachon.component';
import { LuachontaisannhaptaisanComponent } from './modal/luachontaisannhaptaisan/luachontaisannhaptaisan.component';
import { XulysucoluachontaisanComponent } from './modal/xulysucoluachontaisan/xulysucoluachontaisan.component';
import { DenghisulyluachonthemvattuComponent } from './modal/denghisulyluachonthemvattu/denghisulyluachonthemvattu.component';
import { ModalluachontaisantheolichxichthangComponent } from './modal/modalluachontaisantheolichxichthang/modalluachontaisantheolichxichthang.component';
import { ModalluachonbaoduonglichxichtheothangComponent } from './modal/modalluachonbaoduonglichxichtheothang/modalluachonbaoduonglichxichtheothang.component';
import { ThemMoiVatTuModalComponent } from './screen/vattu/them-moi-vat-tu-modal/them-moi-vat-tu-modal.component';

import { ThongTinHangHoaComponent } from './nha-cung-ung-danh-muc/thong-tin-hang-hoa/thong-tin-hang-hoa.component';
import { ThongTinChungComponent } from './nha-cung-ung-danh-muc/thong-tin-chung/thong-tin-chung.component';
import { ThongTinDanhGiaComponent } from './nha-cung-ung-danh-muc/thong-tin-danh-gia/thong-tin-danh-gia.component';
import { ThongTinHopDongComponent } from './nha-cung-ung-danh-muc/thong-tin-hop-dong/thong-tin-hop-dong.component';

import { QuytrinhlapkehoachlichxichthangComponent } from './quytrinhlapkehoachlichxichthang/quytrinhlapkehoachlichxichthang.component';
import { ThongTinDanhGiaNcuComponent } from './danh-gia-nha-cung-ung/thong-tin-danh-gia-ncu/thong-tin-danh-gia-ncu.component';
import { QuytrinhbaoduongComponent } from './quytrinhbaoduong/quytrinhbaoduong.component';
import { NhancongComponent } from './screen/nhancong/nhancong.component';
import { VattuComponent } from './screen/vattu/vattu.component';
import { ChiphikhacComponent } from './screen/chiphikhac/chiphikhac.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThongtinkhauhaoComponent } from './screen/thongtinkhauhao/thongtinkhauhao.component';
// import { ThongtinkhauhaoComponent } from './screen/thongtinkhauhao/thongtinkhauhao.component';
import { DieuChuyenTaiSanComponent } from './dieu-chuyen-tai-san/dieu-chuyen-tai-san.component';
import { TaisanbaoduongComponent } from './quytrinhbaoduong/taisanbaoduong/taisanbaoduong.component';
import { VattuthaythelichxichnamComponent } from './screenLichXich/vattuthaythelichxichnam/vattuthaythelichxichnam.component';
import { ChiphilichxichnamComponent } from './screenLichXich/chiphilichxichnam/chiphilichxichnam.component';
import { ChonComponent } from './screen/chon/chon.component';
import { ChiphilichxichnamchonthemComponent } from './screenLichXich/chiphilichxichnamchonthem/chiphilichxichnamchonthem.component';
import { LichSuSuDungComponent } from './lich-su-su-dung/lich-su-su-dung.component';
import { DenghixulysuconhancongComponent } from './screen/denghixulysuconhancong/denghixulysuconhancong.component';
import { DenghixulysucochiphikhacComponent } from './screen/denghixulysucochiphikhac/denghixulysucochiphikhac.component';
import { DenghixulysucovattuComponent } from './screen/denghixulysucovattu/denghixulysucovattu.component';
import { VattulichxichthangComponent } from './screenLichXich/vattulichxichthang/vattulichxichthang.component';
import { ChiphilichxichthangComponent } from './screenLichXich/chiphilichxichthang/chiphilichxichthang.component';
import { TaisanlichxichthangComponent } from './screenLichXich/taisanlichxichthang/taisanlichxichthang.component';
import { CapnhatthuvienComponent } from './capnhatthuvien/capnhatthuvien.component';
import { CapnhatthuvientaisanchitietComponent } from './capnhatthuvientaisanchitiet/capnhatthuvientaisanchitiet.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TestQuyTrinhComponent } from './bangiaotaisan/test-quy-trinh/test-quy-trinh.component';
import { NhapvattumodalthemvattuComponent } from './nhapvattu/nhapvattumodalthemvattu/nhapvattumodalthemvattu.component';
import { KiemDinhTaiSanComponent } from './kiem-dinh-tai-san/kiem-dinh-tai-san.component';
import { KiemDinhTaiSanModalComponent } from './kiem-dinh-tai-san/kiem-dinh-tai-san-modal/kiem-dinh-tai-san-modal.component';
import { KiemDinhTaiSanPopupThemMoiComponent } from './kiem-dinh-tai-san/kiem-dinh-tai-san-popup-them-moi/kiem-dinh-tai-san-popup-them-moi.component';
import { BaoHanhComponent } from './screen/bao-hanh/bao-hanh.component';
import { BaoHiemComponent } from './bao-hiem/bao-hiem.component';
import { BaoHiemModalComponent } from './bao-hiem/bao-hiem-modal/bao-hiem-modal.component';
import { BaoHiemPopupThemmoiComponent } from './bao-hiem/bao-hiem-popup-themmoi/bao-hiem-popup-themmoi.component';
import { BaoHanhPopupComponent } from './screen/bao-hanh/bao-hanh-popup/bao-hanh-popup.component';
import { LoaiCongViecBaoDuongComponent } from './danhmuc/loai-cong-viec-bao-duong/loai-cong-viec-bao-duong.component';
import { LoaiCongViecBaoDuongModalComponent } from './modal/loai-cong-viec-bao-duong-modal/loai-cong-viec-bao-duong-modal.component';
import { AccordionModule } from 'primeng/accordion';
import { BaoDuongPopupComponent } from './modal/bao-duong-popup/bao-duong-popup.component';
import { ChonVatTuThayTheComponent } from './screen/chon-vat-tu-thay-the/chon-vat-tu-thay-the.component';
import { XuatKhoVatTuComponent } from './modal/xuat-kho-vat-tu/xuat-kho-vat-tu.component';
import { XuatKhoVatTuDanhSachComponent } from './xuat-kho-vat-tu-danh-sach/xuat-kho-vat-tu-danh-sach.component';
import { ChonVatTuPopupComponent } from './modal/xuat-kho-vat-tu/chon-vat-tu-popup/chon-vat-tu-popup.component';

@NgModule({
  declarations: [TaisanComponent,
    DanhsachtaisanComponent,
    DanhmucloaibaoduongComponent,
    DanhmucdonvitinhComponent,
    DanhmucloaitaisanComponent,
    DonvinangsuatComponent,
    ModaldonvitinhComponent,
    ModalloaitaisanComponent,
    // ModalbaoduongComponent,
    ModaldonvinangsuatComponent,
    HangsanxuatComponent,
    ModalhangsanxuatComponent,
    ModalcapnhattaisanComponent,
    NhaptaisanComponent,
    // ModalthongtinchitiettaisanComponent,
    // BiendongComponent,
    LichbaoduongComponent,
    SucosuachuaComponent,
    ThongtinchungComponent,
    ModalcapnhatbaoduongComponent,
    ModalcapnhatsuachuabaoduongComponent,
    LoaikhauhaoComponent,
    TinhtrangtaisanComponent,
    ModalloaikhauhaoComponent,
    ModaltinhtrangtaisanComponent,
    ThongtitaisanchaComponent,
    ModalcapnhattaisanconComponent,
    BangiaotaisanComponent,
    PhieuthuhoitaisanComponent,
    ModalthuhoitaisanComponent,
    ModalcapnhatbaogiaComponent,
    ModalchontaisanComponent,
    ThanhlytaisanComponent,
    ModalthanhlytaisanComponent,
    ModalchontaisanCopyComponent,
    ModaltaolichbaoduongComponent,
    NhaplieuxuattaisanComponent,
    ModalnhaplieuxuattaisanComponent,
    LoaisucoComponent,
    ModalloaisucoComponent,
    ModalchontaisanThanhlyCopyComponent,
    Sucosuachua2Component,
    TaomoilichbaoduongComponent,
    // AntoanComponent,
    // ThongsokythuatComponent,
    // LichbaoduongcopyComponent,
    TaomoilichbaoduongcopyComponent,
    ModalcapnhatbaoduongcopyyComponent,
    VattudutruComponent,
    VattugiatricaoComponent,
    DanhsachvattuComponent,
    QuytrinhnhapvattuComponent,
    NhapvattuComponent,
    QuytrinhdenghithayvattuComponent,
    VattucanthayComponent,
    LichxichnamComponent,
    LichxichthangComponent,
    LapkehoachlichxichnamComponent,
    DenghixulisucoComponent,
    LapkehoachthangComponent,
    ModaldenghixulisucoComponent,
    DanhmucmucdouutienComponent,
    ModalmucdouutienComponent,
    DanhmucnhacungcapComponent,
    ModaldmnhacungcapComponent,
    ModalthemmoiluachontaisanComponent,
    ThongtinthemmoitaisanComponent,
    ModalluachontaisantheolichxichComponent,
    QuytrinhlapkehoachlichxichnamComponent,
    KhauHaoTaiSanQuyTrinhComponent,
    KhauHaoTaiSanModalComponent,
    NhomNhaCungUngDanhMucComponent,
    NhomNhaCungUngModalComponent,
    NhaCungUngDanhMucComponent,
    NhaCungUngModalComponent,
    DanhGiaNhaCungUngComponent,
    DanhGiaNhaCungUngModalComponent,
    ThongTinHangHoaModalComponent,
    ThemNhaCungUngModalComponent,
    SuaNhaCungUngModalComponent,
    TieuChiDanhGiaNhaComponent,
    TieuChiDanhGiaModalComponent,
    ThongTinHangHoaComponent,
    ThongTinChungComponent,
    ThongTinDanhGiaComponent,
    ThongTinHopDongComponent,
    QuytrinhlapkehoachlichxichthangComponent,
    ThongTinDanhGiaNcuComponent,
    QuytrinhbaoduongComponent,
    ModalquytrinhbaoduongComponent,
    ModalbaoduongluachontaisanComponent,
    NhancongComponent,
    VattuComponent,
    ChiphikhacComponent,
    ModalnhapvattuluachontaisanComponent,
    ModalluachonloaibaoduongComponent,
    // ThongtinkhauhaoComponent,
    DieuChuyenTaiSanComponent,
    DieuChuyenTaiSanModalComponent,
    ThoihancungcapvattuComponent,
    ThoihancungcapvattumodalComponent,
    ModalluachontaisantheolichthangComponent,
    ChonTaiSanDieuChuyenModalComponent,
    ChonTaiSanKhauHaoModalComponent,
    ThoihancungcapmodalluachonComponent,
    VattuthaythelichxichnamComponent,
    ChiphilichxichnamComponent,
    ChonComponent,
    LuachontaisannhaptaisanComponent,
    LichSuSuDungComponent,
    ChiphilichxichnamchonthemComponent,
    DenghixulysuconhancongComponent,
    DenghixulysucochiphikhacComponent,
    DenghixulysucovattuComponent,
    XulysucoluachontaisanComponent,
    DenghisulyluachonthemvattuComponent,
    TaisanbaoduongComponent,
    ModalluachontaisantheolichxichthangComponent,
    ModalluachonbaoduonglichxichtheothangComponent,
    VattulichxichthangComponent,
    ChiphilichxichthangComponent,
    TaisanlichxichthangComponent,
    CapnhatthuvienComponent,
    CapnhatthuvientaisanchitietComponent,
    ThemMoiVatTuModalComponent,
    TestQuyTrinhComponent,
    NhapvattumodalthemvattuComponent,
    KiemDinhTaiSanComponent,
    KiemDinhTaiSanModalComponent,
    KiemDinhTaiSanPopupThemMoiComponent,
    BaoHanhComponent,
    BaoHiemComponent,
    BaoHiemModalComponent,
    BaoHiemPopupThemmoiComponent,
    BaoHanhPopupComponent,
    LoaiCongViecBaoDuongComponent,
    LoaiCongViecBaoDuongModalComponent,
    BaoDuongPopupComponent,
    ChonVatTuThayTheComponent,
    XuatKhoVatTuComponent,
    XuatKhoVatTuDanhSachComponent,
    ChonVatTuPopupComponent,
  ],
  imports: [
    CommonModule,
    TaisanRoutingModule,
    FormsModule,
    NgbModule,
    NgbProgressbarModule,
    FileUploadModule,
    ButtonModule,
    CalendarModule,
    ChartModule,
    CheckboxModule,
    ColorPickerModule,
    DialogModule,
    DynamicDialogModule,
    GalleriaModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    MenuModule,
    MultiSelectModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    ProgressBarModule,
    RadioButtonModule,
    SidebarModule,
    SplitButtonModule,
    TableModule,
    TabViewModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    VoiLibModule,
    TreeTableModule,
    SharedModule,
    QRCodeModule,
    SelectButtonModule,
    ToggleButtonModule,
    AccordionModule
  ],
  providers: [
    LoaderService,
    SanXuatService,
    Dat09Service,
    TaisanService,
    DanhmuctaisanService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true, },
    // { provide: LOCALE_ID, useValue: 'vi-VN' },
  ],

  entryComponents: [
    ModaldonvinangsuatComponent,
    ModaldonvitinhComponent,
    ModalloaitaisanComponent,
    ModalcapnhattaisanComponent,
    // ModalthongtinchitiettaisanComponent,
    ModalcapnhatbaoduongComponent,
    ModalcapnhatsuachuabaoduongComponent,
    ModalhangsanxuatComponent,
    ModaltinhtrangtaisanComponent,
    ModalloaikhauhaoComponent,
    ModalcapnhattaisanconComponent,
    ModalthuhoitaisanComponent,
    ModalcapnhatbaogiaComponent,
    ModalchontaisanComponent,
    ModalchontaisanCopyComponent,
    ModalthanhlytaisanComponent,
    ModaltaolichbaoduongComponent,
    ModalnhaplieuxuattaisanComponent,
    ModalloaisucoComponent,
    ModalchontaisanThanhlyCopyComponent,
    ModalcapnhatbaoduongcopyyComponent,
    NhapvattuComponent,
    VattucanthayComponent,
    ModaldenghixulisucoComponent,
    ModalmucdouutienComponent,
    ModaldmnhacungcapComponent,
    ModalthemmoiluachontaisanComponent,
    ThongtinthemmoitaisanComponent,
    ModalluachontaisantheolichxichComponent,
    LapkehoachlichxichnamComponent,
    ModalquytrinhbaoduongComponent,
    ModalbaoduongluachontaisanComponent,
    ThoihancungcapvattumodalComponent,
    ThoihancungcapmodalluachonComponent,
    ChonComponent,
    LuachontaisannhaptaisanComponent,
    ChiphilichxichnamchonthemComponent,
    XulysucoluachontaisanComponent,
    DenghisulyluachonthemvattuComponent,
    ModalluachontaisantheolichxichthangComponent,
    CapnhatthuvientaisanchitietComponent,
    ModalthongtinchitiettaisanComponent,
    ModalluachonloaibaoduongComponent,
    ModalluachonbaoduonglichxichtheothangComponent,
    NhomNhaCungUngModalComponent,
    ModalloaisucoComponent,
    ModalchontaisanThanhlyCopyComponent,
    ModalcapnhatbaoduongcopyyComponent,
    ModalbaoduongComponent,
    ModalhangsanxuatComponent,
    ModalthongtinchitiettaisanComponent,
    ModalcapnhatsuachuabaoduongComponent,
    ModalloaikhauhaoComponent,
    ModaltinhtrangtaisanComponent,
    ModalcapnhattaisanconComponent,
    ModalthuhoitaisanComponent,
    ModalcapnhatbaogiaComponent,
    ModalchontaisanComponent,
    ModalthanhlytaisanComponent,
    ModalchontaisanCopyComponent,
    ModaltaolichbaoduongComponent,
    ModalnhaplieuxuattaisanComponent,
    ModaldenghixulisucoComponent,
    ModalmucdouutienComponent,
    ModaldmnhacungcapComponent,
    ModalthemmoiluachontaisanComponent,
    ModalluachontaisantheolichxichComponent,
    KhauHaoTaiSanModalComponent,
    NhomNhaCungUngDanhMucComponent,
    NhomNhaCungUngModalComponent,
    NhaCungUngDanhMucComponent,
    NhaCungUngModalComponent,
    DanhGiaNhaCungUngModalComponent,
    ThongTinHangHoaModalComponent,
    ThemNhaCungUngModalComponent,
    SuaNhaCungUngModalComponent,
    TieuChiDanhGiaNhaComponent,
    TieuChiDanhGiaModalComponent,
    ModalquytrinhbaoduongComponent,
    ModalbaoduongluachontaisanComponent,
    ModalnhapvattuluachontaisanComponent,
    ModalluachonloaibaoduongComponent,
    DieuChuyenTaiSanModalComponent,
    ThoihancungcapvattuComponent,
    ThoihancungcapvattumodalComponent,
    ModalluachontaisantheolichthangComponent,
    ChonTaiSanDieuChuyenModalComponent,
    ChonTaiSanKhauHaoModalComponent,
    ThoihancungcapmodalluachonComponent,
    LuachontaisannhaptaisanComponent,
    XulysucoluachontaisanComponent,
    DenghisulyluachonthemvattuComponent,
    ModalluachontaisantheolichxichthangComponent,
    ModalluachonbaoduonglichxichtheothangComponent,
    ThemMoiVatTuModalComponent,
    TestQuyTrinhComponent
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class TaisanModule { }

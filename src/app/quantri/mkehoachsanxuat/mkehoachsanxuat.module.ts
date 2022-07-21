import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MkehoachsanxuatRoutingModule } from './mkehoachsanxuat-routing.module';
import { MkehoachsanxuatComponent } from './mkehoachsanxuat.component';
import { KehoachkinhdoanhnamComponent } from './kehoachkinhdoanhnam/kehoachkinhdoanhnam.component';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KehoachkinhdoanhnammodalComponent } from './kehoachkinhdoanhnam/kehoachkinhdoanhnammodal/kehoachkinhdoanhnammodal.component';
import { PaginatorModule } from 'primeng/paginator';
import { CalendarModule } from 'primeng/calendar';
import { VoiLibModule } from 'voi-lib';
import { InputNumberModule } from 'primeng/inputnumber';
import { HopdongsanphammodalComponent } from './kehoachkinhdoanhnam/hopdongsanphammodal/hopdongsanphammodal.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ChitietthangComponent } from './kehoachkinhdoanhnam/chitietthang/chitietthang.component';
import { DanhmucmathangComponent } from './kehoachkinhdoanhnam/danhmucmathang/danhmucmathang.component';
import { KehoachkinhdoanhthangComponent } from './kehoachkinhdoanhthang/kehoachkinhdoanhthang.component';
import { ChitietkehoachthangmodalComponent } from './kehoachkinhdoanhthang/chitietkehoachthangmodal/chitietkehoachthangmodal.component';
import { BaocaokehoachkinhdoanhComponent } from './bao-cao-ke-hoach-kinh-doanh/baocaokehoachkinhdoanh.component';
import { ChartModule } from 'primeng/chart';
import { KeHoachSanXuatNamComponent } from './ke-hoach-san-xuat-nam/ke-hoach-san-xuat-nam.component';
import { KeHoachSanXuatThangComponent } from './ke-hoach-san-xuat-thang/ke-hoach-san-xuat-thang.component';
import { DonGiaSanPhamComponent } from './danh-muc/don-gia-san-pham/don-gia-san-pham.component';
import { TyGiaNgoaiTeComponent } from './danh-muc/ty-gia-ngoai-te/ty-gia-ngoai-te.component';
import { CoCauNhanSuComponent } from './danh-muc/co-cau-nhan-su/co-cau-nhan-su.component';
import { DinhMucMatHangComponent } from './danh-muc/dinh-muc-mat-hang/dinh-muc-mat-hang.component';
import { HinhThucThanhToanComponent } from './danh-muc/hinh-thuc-thanh-toan/hinh-thuc-thanh-toan.component';
import { LoaiHopDongComponent } from './danh-muc/loai-hop-dong/loai-hop-dong.component';
import { LoaiTienTeComponent } from './danh-muc/loai-tien-te/loai-tien-te.component';
import { ChiPhiBanHangComponent } from './danh-muc/chi-phi-ban-hang/chi-phi-ban-hang.component';
import { TaiSanComponent } from './danh-muc/tai-san/tai-san.component';
import { ThuTucThanhToanComponent } from './danh-muc/thu-tuc-thanh-toan/thu-tuc-thanh-toan.component';
import { TieuChiDanhGiaComponent } from './danh-muc/tieu-chi-danh-gia/tieu-chi-danh-gia.component';
import { TinhLuongComponent } from './danh-muc/tinh-luong/tinh-luong.component';
import { TrangThaiBaoLanhComponent } from './danh-muc/trang-thai-bao-lanh/trang-thai-bao-lanh.component';
import { VatTuPhuComponent } from './danh-muc/vat-tu-phu/vat-tu-phu.component';
import { TieuChiChatLuongHopDongComponent } from './danh-muc/tieu-chi-chat-luong-hop-dong/tieu-chi-chat-luong-hop-dong.component';
import { ChiPhiBongComponent } from './danh-sach/chi-phi-bong/chi-phi-bong.component';
import { ChiPhiDienComponent } from './danh-sach/chi-phi-dien/chi-phi-dien.component';
import { ChiPhiXoComponent } from './danh-sach/chi-phi-xo/chi-phi-xo.component';
import { DoanhThuComponent } from './doanh-thu/doanh-thu.component';
import { DinhMucSanXuatComponent } from './dinh-muc-san-xuat/dinh-muc-san-xuat.component';
import { MucLuongCoCauNhanSuComponent } from './danh-sach/muc-luong-co-cau-nhan-su/muc-luong-co-cau-nhan-su.component';
import { KeHoachSanXuatNamModalComponent } from './ke-hoach-san-xuat-nam/ke-hoach-san-xuat-nam-modal/ke-hoach-san-xuat-nam-modal.component';
import { DonGiaSanPhamModalComponent } from './danh-muc/don-gia-san-pham/don-gia-san-pham-modal/don-gia-san-pham-modal.component';
import { TyGiaNgoaiTeModalComponent } from './danh-muc/ty-gia-ngoai-te/ty-gia-ngoai-te-modal/ty-gia-ngoai-te-modal.component';
import { DoanhThuModalComponent } from './doanh-thu/doanh-thu-modal/doanh-thu-modal.component';
import { ChiPhiBongModalComponent } from './danh-sach/chi-phi-bong/chi-phi-bong-modal/chi-phi-bong-modal.component';
import { ChiPhiDienModalComponent } from './danh-sach/chi-phi-dien/chi-phi-dien-modal/chi-phi-dien-modal.component';
import { ChiPhiXoModalComponent } from './danh-sach/chi-phi-xo/chi-phi-xo-modal/chi-phi-xo-modal.component';
import { VatTuPhuModalComponent } from './danh-muc/vat-tu-phu/vat-tu-phu-modal/vat-tu-phu-modal.component';
import { CoCauNhanSuModalComponent } from './danh-muc/co-cau-nhan-su/co-cau-nhan-su-modal/co-cau-nhan-su-modal.component';
import { TaiSanModalComponent } from './danh-muc/tai-san/tai-san-modal/tai-san-modal.component';
import { DanhSachTinhLuongComponent } from './danh-sach/danh-sach-tinh-luong/danh-sach-tinh-luong.component';
import { ChiPhiBanHangTheoNamComponent } from './danh-sach/chi-phi-ban-hang-theo-nam/chi-phi-ban-hang-theo-nam.component';
import { ChiPhiBanHangTheoNamModalComponent } from './danh-sach/chi-phi-ban-hang-theo-nam/chi-phi-ban-hang-theo-nam-modal/chi-phi-ban-hang-theo-nam-modal.component';
import { DanhSachTinhLuongModalComponent } from './danh-sach/danh-sach-tinh-luong/danh-sach-tinh-luong-modal/danh-sach-tinh-luong-modal.component';
import { MucLuongCoCauNhanSuModalComponent } from './danh-sach/muc-luong-co-cau-nhan-su/muc-luong-co-cau-nhan-su-modal/muc-luong-co-cau-nhan-su-modal.component';
import { LoaiContainerComponent } from './danh-muc/loai-container/loai-container.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhuongThucVanChuyenComponent } from './danh-muc/phuong-thuc-van-chuyen/phuong-thuc-van-chuyen.component';
import { ChiPhiXuatHangComponent } from './danh-muc/chi-phi-xuat-hang/chi-phi-xuat-hang.component';
import { ChiPhiBangTienComponent } from './danh-muc/chi-phi-bang-tien/chi-phi-bang-tien.component';
import { ChiPhiLaiVayComponent } from './danh-muc/chi-phi-lai-vay/chi-phi-lai-vay.component';
import { ChiPhiNhanCongComponent } from './danh-muc/chi-phi-nhan-cong/chi-phi-nhan-cong.component';
import { LoaiContainerModalComponent } from './danh-muc/loai-container/loai-container-modal/loai-container-modal.component';
import { PhuongThucVanChuyenModalComponent } from './danh-muc/phuong-thuc-van-chuyen/phuong-thuc-van-chuyen-modal/phuong-thuc-van-chuyen-modal.component';
import { ChiPhiXuatHangModalComponent } from './danh-muc/chi-phi-xuat-hang/chi-phi-xuat-hang-modal/chi-phi-xuat-hang-modal.component';
import { ChiPhiBangTienModalComponent } from './danh-muc/chi-phi-bang-tien/chi-phi-bang-tien-modal/chi-phi-bang-tien-modal.component';
import { ChiPhiLaiVayModalComponent } from './danh-muc/chi-phi-lai-vay/chi-phi-lai-vay-modal/chi-phi-lai-vay-modal.component';
import { ChiPhiNhanCongModalComponent } from './danh-muc/chi-phi-nhan-cong/chi-phi-nhan-cong-modal/chi-phi-nhan-cong-modal.component';
import { BangGiaVtpComponent } from './nhap-lieu/bang-gia-vtp/bang-gia-vtp.component';
import { BangGiaVtpModalComponent } from './nhap-lieu/bang-gia-vtp/bang-gia-vtp-modal/bang-gia-vtp-modal.component';
import { ChiPhiNhanCongHangThangComponent } from './nhap-lieu/chi-phi-nhan-cong-hang-thang/chi-phi-nhan-cong-hang-thang.component';
import { ChiPhiNhanCongHangThangModalComponent } from './nhap-lieu/chi-phi-nhan-cong-hang-thang/chi-phi-nhan-cong-hang-thang-modal/chi-phi-nhan-cong-hang-thang-modal.component';
import { ChiPhiBangTienHangThangComponent } from './nhap-lieu/chi-phi-bang-tien-hang-thang/chi-phi-bang-tien-hang-thang.component';
import { ChiPhiBangTienHangThangModalComponent } from './nhap-lieu/chi-phi-bang-tien-hang-thang/chi-phi-bang-tien-hang-thang-modal/chi-phi-bang-tien-hang-thang-modal.component';
import { ChiPhiLaiVayHangThangComponent } from './nhap-lieu/chi-phi-lai-vay-hang-thang/chi-phi-lai-vay-hang-thang.component';
import { ChiPhiLaiVayHangThangModalComponent } from './nhap-lieu/chi-phi-lai-vay-hang-thang/chi-phi-lai-vay-hang-thang-modal/chi-phi-lai-vay-hang-thang-modal.component';
import { GiaSanPhamTheoThangComponent } from './nhap-lieu/gia-san-pham-theo-thang/gia-san-pham-theo-thang.component';
import { GiaSanPhamTheoThangModalComponent } from './nhap-lieu/gia-san-pham-theo-thang/gia-san-pham-theo-thang-modal/gia-san-pham-theo-thang-modal.component';
import { ChiPhiLaiVayDaiHanComponent } from './nhap-lieu/chi-phi-lai-vay-dai-han/chi-phi-lai-vay-dai-han.component';
import { ChiPhiLaiVayDaiHanModalComponent } from './nhap-lieu/chi-phi-lai-vay-dai-han/chi-phi-lai-vay-dai-han-modal/chi-phi-lai-vay-dai-han-modal.component';
import { BaoCaoNhuCauSuDungBongComponent } from './bao-cao-nhu-cau-su-dung-bong/bao-cao-nhu-cau-su-dung-bong.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KehoachdaduyetComponent } from './kehoachdaduyet/kehoachdaduyet.component';
import { KeHoachDaDuyetModalComponent } from './kehoachdaduyet/ke-hoach-da-duyet-modal/ke-hoach-da-duyet-modal.component';
import { BaoCaoNhuCauComponent } from './bao-cao-nhu-cau/bao-cao-nhu-cau.component';
import { TooltipModule } from 'primeng/tooltip';
import { LapDoanhThuComponent } from './lap-doanh-thu/lap-doanh-thu.component';
import { LapChiPhiComponent } from './lap-chi-phi/lap-chi-phi.component';
import { LapDoanhThuModalComponent } from './lap-doanh-thu/lap-doanh-thu-modal/lap-doanh-thu-modal.component';
import { LapChiPhiModalComponent } from './lap-chi-phi/lap-chi-phi-modal/lap-chi-phi-modal.component';
@NgModule({
  declarations: [
    MkehoachsanxuatComponent,
    KehoachkinhdoanhnamComponent,
    KehoachkinhdoanhnammodalComponent,
    HopdongsanphammodalComponent,
    ChitietthangComponent,
    DanhmucmathangComponent,
    KehoachkinhdoanhthangComponent,
    ChitietkehoachthangmodalComponent,
    BaocaokehoachkinhdoanhComponent,
    KeHoachSanXuatNamComponent,
    KeHoachSanXuatThangComponent,
    DonGiaSanPhamComponent,
    TyGiaNgoaiTeComponent,
    CoCauNhanSuComponent,
    DinhMucMatHangComponent,
    HinhThucThanhToanComponent,
    LoaiHopDongComponent,
    LoaiTienTeComponent,
    ChiPhiBanHangComponent,
    TaiSanComponent,
    ThuTucThanhToanComponent,
    TieuChiDanhGiaComponent,
    TinhLuongComponent,
    TrangThaiBaoLanhComponent,
    VatTuPhuComponent,
    TieuChiChatLuongHopDongComponent,
    ChiPhiBongComponent,
    ChiPhiDienComponent,
    ChiPhiXoComponent,
    DoanhThuComponent,
    DinhMucSanXuatComponent,
    MucLuongCoCauNhanSuComponent,
    KeHoachSanXuatNamModalComponent,
    DonGiaSanPhamModalComponent,
    TyGiaNgoaiTeModalComponent,
    DoanhThuModalComponent,
    ChiPhiBongModalComponent,
    ChiPhiDienModalComponent,
    ChiPhiXoModalComponent,
    VatTuPhuModalComponent,
    CoCauNhanSuModalComponent,
    TaiSanModalComponent,
    DanhSachTinhLuongComponent,
    ChiPhiBanHangTheoNamComponent,
    ChiPhiBanHangTheoNamModalComponent,
    DanhSachTinhLuongModalComponent,
    MucLuongCoCauNhanSuModalComponent,
    LoaiContainerComponent,
    PhuongThucVanChuyenComponent,
    ChiPhiXuatHangComponent,
    ChiPhiBangTienComponent,
    ChiPhiLaiVayComponent,
    ChiPhiNhanCongComponent,
    LoaiContainerModalComponent,
    PhuongThucVanChuyenModalComponent,
    ChiPhiXuatHangModalComponent,
    ChiPhiBangTienModalComponent,
    ChiPhiLaiVayModalComponent,
    ChiPhiNhanCongModalComponent,
    BangGiaVtpComponent,
    BangGiaVtpModalComponent,
    ChiPhiNhanCongHangThangComponent,
    ChiPhiNhanCongHangThangModalComponent,
    ChiPhiBangTienHangThangComponent,
    ChiPhiBangTienHangThangModalComponent,
    ChiPhiLaiVayHangThangComponent,
    ChiPhiLaiVayHangThangModalComponent,
    GiaSanPhamTheoThangComponent,
    GiaSanPhamTheoThangModalComponent,
    ChiPhiLaiVayDaiHanComponent,
    ChiPhiLaiVayDaiHanModalComponent,
    BaoCaoNhuCauSuDungBongComponent,
    KehoachdaduyetComponent,
    KeHoachDaDuyetModalComponent,
    BaoCaoNhuCauComponent,
    LapDoanhThuComponent,
    LapChiPhiComponent,
    LapDoanhThuModalComponent,
    LapChiPhiModalComponent,
  ],
  imports: [
    CommonModule,
    MkehoachsanxuatRoutingModule,
    TabViewModule,
    PanelModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    CalendarModule,
    VoiLibModule,
    InputNumberModule,
    CheckboxModule,
    ChartModule,
    SharedModule,
    NgbModule,
    InputTextareaModule,
    TooltipModule,
    SharedModule
  ],
  exports: [
    KehoachkinhdoanhnamComponent
  ],
  entryComponents: [

  ]
})
export class MkehoachsanxuatModule { }

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
    ChartModule
  ],
  exports: [
    KehoachkinhdoanhnamComponent
  ],
  entryComponents: [

  ]
})
export class MkehoachsanxuatModule { }

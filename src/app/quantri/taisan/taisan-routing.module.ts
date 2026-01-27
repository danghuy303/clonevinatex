import { BaoHiemComponent } from './bao-hiem/bao-hiem.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BangiaotaisanComponent } from './bangiaotaisan/bangiaotaisan.component';
import { DanhmucdonvitinhComponent } from './danhmuc/danhmucdonvitinh/danhmucdonvitinh.component';
import { DanhmucloaibaoduongComponent } from './danhmuc/danhmucloaibaoduong/danhmucloaibaoduong.component';
import { DanhmucloaitaisanComponent } from './danhmuc/danhmucloaitaisan/danhmucloaitaisan.component';
import { DanhmucmucdouutienComponent } from './danhmuc/danhmucmucdouutien/danhmucmucdouutien.component';
import { DanhmucnhacungcapComponent } from './danhmuc/danhmucnhacungcap/danhmucnhacungcap.component';

import { DonvinangsuatComponent } from './danhmuc/donvinangsuat/donvinangsuat.component';
import { HangsanxuatComponent } from './danhmuc/hangsanxuat/hangsanxuat.component';
import { LoaikhauhaoComponent } from './danhmuc/loaikhauhao/loaikhauhao.component';
import { LoaisucoComponent } from './danhmuc/loaisuco/loaisuco.component';
import { TinhtrangtaisanComponent } from './danhmuc/tinhtrangtaisan/tinhtrangtaisan.component';
import { DanhsachtaisanComponent } from './danhsachtaisan/danhsachtaisan.component';
import { DanhsachvattuComponent } from './danhsachvattu/danhsachvattu.component';
import { DenghixulisucoComponent } from './denghixulisuco/denghixulisuco.component';
import { KhauHaoTaiSanQuyTrinhComponent } from './khau-hao-tai-san-quy-trinh/khau-hao-tai-san-quy-trinh.component';
import { LapkehoachlichxichnamComponent } from './lapkehoachlichxichnam/lapkehoachlichxichnam.component';
import { LapkehoachthangComponent } from './lapkehoachthang/lapkehoachthang.component';
import { LichxichnamComponent } from './lichxichnam/lichxichnam.component';
import { LichxichthangComponent } from './lichxichthang/lichxichthang.component';
import { NhaplieuxuattaisanComponent } from './nhaplieuxuattaisan/nhaplieuxuattaisan.component';
import { NhaptaisanComponent } from './nhaptaisan/nhaptaisan.component';
import { QuytrinhbaoduongComponent } from './quytrinhbaoduong/quytrinhbaoduong.component';
import { NhomNhaCungUngDanhMucComponent } from './nhom-nha-cung-ung-danh-muc/nhom-nha-cung-ung-danh-muc.component';
import { NhaCungUngDanhMucComponent } from './nha-cung-ung-danh-muc/nha-cung-ung-danh-muc.component';
import { DanhGiaNhaCungUngComponent } from './danh-gia-nha-cung-ung/danh-gia-nha-cung-ung.component';
import { QuytrinhdenghithayvattuComponent } from './quytrinhdenghithayvattu/quytrinhdenghithayvattu.component';
import { QuytrinhlapkehoachlichxichnamComponent } from './quytrinhlapkehoachlichxichnam/quytrinhlapkehoachlichxichnam.component';
import { QuytrinhlapkehoachlichxichthangComponent } from './quytrinhlapkehoachlichxichthang/quytrinhlapkehoachlichxichthang.component';
import { QuytrinhnhapvattuComponent } from './quytrinhnhapvattu/quytrinhnhapvattu.component';
import { SucosuachuaComponent } from './sucosuachua/sucosuachua.component';
import { Sucosuachua2Component } from './sucosuachua2/sucosuachua2.component';
import { TaisanComponent } from './taisan.component';
import { ThanhlytaisanComponent } from './thanhlytaisan/thanhlytaisan.component';
import { PhieuthuhoitaisanComponent } from './thuhoitaisan/phieuthuhoitaisan/phieuthuhoitaisan.component';
import { VattudutruComponent } from './vattudutru/vattudutru.component';
import { VattugiatricaoComponent } from './vattugiatricao/vattugiatricao.component';
import { TieuChiDanhGiaNhaComponent } from './tieu-chi-danh-gia-nha/tieu-chi-danh-gia-nha.component';
import { DieuChuyenTaiSanComponent } from './dieu-chuyen-tai-san/dieu-chuyen-tai-san.component';

import { ThoihancungcapvattuComponent } from './thoihancungcapvattu/thoihancungcapvattu.component';
import { LichSuSuDungComponent } from './lich-su-su-dung/lich-su-su-dung.component';
import { CapnhatthuvienComponent } from './capnhatthuvien/capnhatthuvien.component';
// import { KiemDinhTaiSanComponent } from './kiem-dinh-tai-san/kiem-dinh-tai-san.component';
import { LoaiCongViecBaoDuongComponent } from './danhmuc/loai-cong-viec-bao-duong/loai-cong-viec-bao-duong.component';
import { XuatKhoVatTuDanhSachComponent } from './xuat-kho-vat-tu-danh-sach/xuat-kho-vat-tu-danh-sach.component';
import { DanhMucQrComponent } from './danhmuc/danh-muc-qr/danh-muc-qr.component';
import { DanhMucDoiBaoDuongComponent } from './danhmuc/danh-muc-doi-bao-duong/danh-muc-doi-bao-duong.component';
import { TheKhoVatTuComponent } from './the-kho-vat-tu/the-kho-vat-tu.component';
import { KiemKeKhoVatTuComponent } from './kiem-ke-kho-vat-tu/kiem-ke-kho-vat-tu.component';
import { DanhSachVatTuCanThayTheComponent } from './danh-sach-vat-tu-can-thay-the/danh-sach-vat-tu-can-thay-the.component';
import { DenghicungungvattuComponent } from './denghicungungvattu/denghicungungvattu.component';
import { DondathangComponent } from './dondathang/dondathang.component';
import { PheduyetgiahanghoaComponent } from './pheduyetgiahanghoa/pheduyetgiahanghoa.component';
import { DanhsachvattuphaimuaComponent } from './danhsachvattuphaimua/danhsachvattuphaimua.component';
import { PhieukiemhangComponent } from './phieukiemhang/phieukiemhang.component';
import { BaocaonhaphangComponent } from './baocaothumua/baocaonhaphang/baocaonhaphang.component';
import { TonghopdondathangnccComponent } from './baocaothumua/tonghopdondathangncc/tonghopdondathangncc.component';
import { BaocaonhapxuattonComponent } from './baocaothumua/baocaonhapxuatton/baocaonhapxuatton.component';
import { BaocaotonghopgiamuahangComponent } from './baocaothumua/baocaotonghopgiamuahang/baocaotonghopgiamuahang.component';
import { DanhmuckhocungungComponent } from './danhmuc/danhmuckhocungung/danhmuckhocungung.component';
import { DanhmuctaisanComponent } from './danhmuc/danhmuctaisan/danhmuctaisan.component';
import { LoaidinhmucComponent } from './danhmuc/loaidinhmuc/loaidinhmuc.component';
import { NhienlieuComponent } from './danhmuc/nhienlieu/nhienlieu.component';
import { KiemDinhTaiSanComponent } from './kiemdinhtaisan/kiemdinhtaisan.component';
import { NoidangkiemComponent } from './danhmuc/noidangkiem/noidangkiem.component';
import { BaohiemtaisanComponent } from './baohiemtaisan/baohiemtaisan.component';
import { TheodoihoatdongComponent } from './theodoihoatdong/theodoihoatdong.component';
import { TieuhaonhienlieuComponent } from './tieuhaonhienlieu/tieuhaonhienlieu.component';
import { DonvibaohiemComponent } from './danhmuc/donvibaohiem/donvibaohiem.component';
import { LoaihinhbaohiemComponent } from './danhmuc/loaihinhbaohiem/loaihinhbaohiem.component';

const routes: Routes = [
  { path: '', component: TaisanComponent },
  { path: 'nhaptaisan/:id', component: NhaptaisanComponent },
  { path: 'bangiaotaisan/:id', component: BangiaotaisanComponent },
  { path: 'sucosuachua', component: SucosuachuaComponent },
  { path: 'danhsachtaisan', component: DanhsachtaisanComponent },
  { path: 'danhsachvattudutru', component: VattudutruComponent },
  { path: 'danhsachvattugiatricao', component: VattugiatricaoComponent },
  { path: 'danhmuc/danhmucloaibaoduong', component: DanhmucloaibaoduongComponent },
  { path: 'danhmuc/danhmucloaicongviecbaoduong', component: LoaiCongViecBaoDuongComponent },
  { path: 'danhmuc/danhmucdonvitinh', component: DanhmucdonvitinhComponent },
  { path: 'danhmuc/danhmucloaitaisan', component: DanhmucloaitaisanComponent },
  { path: 'danhmuc/danhmuctaisan', component: DanhmuctaisanComponent },
  { path: 'danhmuc/donvinangsuat', component: DonvinangsuatComponent },
  { path: 'danhmuc/hangsannxuat', component: HangsanxuatComponent },
  { path: 'danhmuc/tinhtrangtaisan', component: TinhtrangtaisanComponent },
  { path: 'danhmuc/loaikhauhao', component: LoaikhauhaoComponent },
  { path: 'thuhoitaisan/:id', component: PhieuthuhoitaisanComponent },
  { path: 'thanhlytaisan/:id', component: ThanhlytaisanComponent },
  { path: 'nhaplieuxuattaisan', component: NhaplieuxuattaisanComponent },
  { path: 'danhmuc/loaisuco', component: LoaisucoComponent },
  { path: 'danhmuc/nhacungcap', component: DanhmucnhacungcapComponent },
  { path: 'sucosuachua2', component: Sucosuachua2Component },
  { path: 'danhmuc/mucdouutien', component: DanhmucmucdouutienComponent },
  { path: 'quytrinhnhapvattu/:id', component: QuytrinhnhapvattuComponent },
  { path: 'danhsachvattu', component: DanhsachvattuComponent },
  // { path: 'quantritaisan/danhsachvattucanthaythe', component: DanhSachVatTuCanThayTheComponent },
  { path: 'quytrinhdenghithayvattu/:id', component: QuytrinhdenghithayvattuComponent },
  { path: 'quytrinhlapkehoachnam/:id', component: QuytrinhlapkehoachlichxichnamComponent },
  { path: 'lapkehoachlichxichnam', component: LapkehoachlichxichnamComponent },
  { path: 'quytrinhlapkehoachthang/:id', component: QuytrinhlapkehoachlichxichthangComponent },
  { path: 'lapkehoachlichxichthang', component: LapkehoachthangComponent },
  { path: 'lichxichnam', component: LichxichnamComponent },
  { path: 'lichxichthang', component: LichxichthangComponent },
  { path: 'denghixulisuco/:id', component: DenghixulisucoComponent },
  { path: 'quytrinhbaoduong/:id', component: QuytrinhbaoduongComponent },
  { path: 'khauhaotaisan/:id', component: KhauHaoTaiSanQuyTrinhComponent },
  { path: 'nhomnhacungung', component: NhomNhaCungUngDanhMucComponent },
  { path: 'danhmucnhacungung', component: NhaCungUngDanhMucComponent },
  { path: 'danhgianhacungung/:id', component: DanhGiaNhaCungUngComponent },
  { path: 'tieuchidanhgia/:id', component: TieuChiDanhGiaNhaComponent },
  { path: 'dieuchuyentaisan/:id', component: DieuChuyenTaiSanComponent },
  { path: 'thoihancungcapvattu/:id', component: ThoihancungcapvattuComponent },
  { path: 'lichsusudungtaisan/:id', component: LichSuSuDungComponent },
  { path: 'capnhatthuvien/:id', component: CapnhatthuvienComponent },
  { path: 'kiem-dinh-tai-san/:id', component: KiemDinhTaiSanComponent },
  { path: 'bao-hiem/:id', component: BaoHiemComponent },
  { path: 'xuat-kho/:id', component: XuatKhoVatTuDanhSachComponent },
  { path: 'danhmuc/maqr', component: DanhMucQrComponent },
  { path: 'danhmuc/doibaoduong', component: DanhMucDoiBaoDuongComponent },
  { path: 'the-kho-vat-tu', component: TheKhoVatTuComponent },
  { path: 'kiem-ke-kho-vat-tu/:id', component: KiemKeKhoVatTuComponent },
  { path: 'denghicungungvattu/:id', component: DenghicungungvattuComponent },
  { path: 'dondathang/:id', component: DondathangComponent },
  { path: 'pheduyetgiahanghoa/:id', component: PheduyetgiahanghoaComponent },
  { path: 'danhsachvattuphaimua', component: DanhsachvattuphaimuaComponent },
  { path: 'phieukiemhang/:id', component: PhieukiemhangComponent },
  { path: 'baocaonhaphang', component: BaocaonhaphangComponent },
  { path: 'baocaonhapxuatton', component: BaocaonhapxuattonComponent },
  { path: 'baocaotonghopgiamuahang', component: BaocaotonghopgiamuahangComponent },
  { path: 'tonghopdondathangncc', component: TonghopdondathangnccComponent },
  { path: 'danhmuc/khocungung', component: DanhmuckhocungungComponent },
  { path: 'danhmuc/loaidinhmuc', component: LoaidinhmucComponent },
  { path: 'danhmuc/nhienlieu', component: NhienlieuComponent },
  { path: 'danhmuc/noidangkiem', component: NoidangkiemComponent },
  { path: 'danhmuc/donvibaohiem', component: DonvibaohiemComponent },
  { path: 'danhmuc/loaihinhbaohiem', component: LoaihinhbaohiemComponent },

  { path: 'kiemdinhtaisan/:id', component: KiemDinhTaiSanComponent },
  { path: 'baohiemtaisan/:id', component: BaohiemtaisanComponent },
  { path: 'theodoihoatdong/:id', component: TheodoihoatdongComponent },
  { path: 'tieuhaonhienlieu/:id', component: TieuhaonhienlieuComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaisanRoutingModule { }

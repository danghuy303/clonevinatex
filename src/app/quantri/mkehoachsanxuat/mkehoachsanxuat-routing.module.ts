import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaocaokehoachkinhdoanhComponent } from './bao-cao-ke-hoach-kinh-doanh/baocaokehoachkinhdoanh.component';
import { BaoCaoNhuCauSuDungBongComponent } from './bao-cao-nhu-cau-su-dung-bong/bao-cao-nhu-cau-su-dung-bong.component';
import { BaoCaoNhuCauComponent } from './bao-cao-nhu-cau/bao-cao-nhu-cau.component';
import { ChiPhiBanHangComponent } from './danh-muc/chi-phi-ban-hang/chi-phi-ban-hang.component';
import { ChiPhiBangTienComponent } from './danh-muc/chi-phi-bang-tien/chi-phi-bang-tien.component';
import { ChiPhiLaiVayComponent } from './danh-muc/chi-phi-lai-vay/chi-phi-lai-vay.component';
import { ChiPhiNhanCongComponent } from './danh-muc/chi-phi-nhan-cong/chi-phi-nhan-cong.component';
import { ChiPhiXuatHangComponent } from './danh-muc/chi-phi-xuat-hang/chi-phi-xuat-hang.component';
import { CoCauNhanSuComponent } from './danh-muc/co-cau-nhan-su/co-cau-nhan-su.component';
import { DonGiaSanPhamComponent } from './danh-muc/don-gia-san-pham/don-gia-san-pham.component';
import { LoaiContainerComponent } from './danh-muc/loai-container/loai-container.component';
import { PhuongThucVanChuyenComponent } from './danh-muc/phuong-thuc-van-chuyen/phuong-thuc-van-chuyen.component';
import { TaiSanComponent } from './danh-muc/tai-san/tai-san.component';
import { TinhLuongComponent } from './danh-muc/tinh-luong/tinh-luong.component';
import { TyGiaNgoaiTeComponent } from './danh-muc/ty-gia-ngoai-te/ty-gia-ngoai-te.component';
import { VatTuPhuComponent } from './danh-muc/vat-tu-phu/vat-tu-phu.component';
import { ChiPhiBanHangTheoNamComponent } from './danh-sach/chi-phi-ban-hang-theo-nam/chi-phi-ban-hang-theo-nam.component';
import { ChiPhiBongComponent } from './danh-sach/chi-phi-bong/chi-phi-bong.component';
import { ChiPhiDienComponent } from './danh-sach/chi-phi-dien/chi-phi-dien.component';
import { ChiPhiXoComponent } from './danh-sach/chi-phi-xo/chi-phi-xo.component';
import { MucLuongCoCauNhanSuComponent } from './danh-sach/muc-luong-co-cau-nhan-su/muc-luong-co-cau-nhan-su.component';
import { DinhMucSanXuatComponent } from './dinh-muc-san-xuat/dinh-muc-san-xuat.component';
import { DoanhThuComponent } from './doanh-thu/doanh-thu.component';
import { KeHoachSanXuatNamComponent } from './ke-hoach-san-xuat-nam/ke-hoach-san-xuat-nam.component';
import { KehoachdaduyetComponent } from './kehoachdaduyet/kehoachdaduyet.component';
import { KehoachkinhdoanhnamComponent } from './kehoachkinhdoanhnam/kehoachkinhdoanhnam.component';
import { KehoachkinhdoanhthangComponent } from './kehoachkinhdoanhthang/kehoachkinhdoanhthang.component';
import { LapChiPhiComponent } from './lap-chi-phi/lap-chi-phi.component';
import { LapDoanhThuComponent } from './lap-doanh-thu/lap-doanh-thu.component';
import { MkehoachsanxuatComponent } from './mkehoachsanxuat.component';
import { BangGiaVtpComponent } from './nhap-lieu/bang-gia-vtp/bang-gia-vtp.component';
import { ChiPhiBangTienHangThangComponent } from './nhap-lieu/chi-phi-bang-tien-hang-thang/chi-phi-bang-tien-hang-thang.component';
import { ChiPhiLaiVayDaiHanComponent } from './nhap-lieu/chi-phi-lai-vay-dai-han/chi-phi-lai-vay-dai-han.component';
import { ChiPhiLaiVayHangThangComponent } from './nhap-lieu/chi-phi-lai-vay-hang-thang/chi-phi-lai-vay-hang-thang.component';
import { ChiPhiNhanCongHangThangComponent } from './nhap-lieu/chi-phi-nhan-cong-hang-thang/chi-phi-nhan-cong-hang-thang.component';
import { GiaSanPhamTheoThangComponent } from './nhap-lieu/gia-san-pham-theo-thang/gia-san-pham-theo-thang.component';

const routes: Routes = [
  { path: '', component: MkehoachsanxuatComponent },
  { path: 'kehoachkinhdoanhnam/:id', component: KehoachkinhdoanhnamComponent },
  { path: 'kehoachkinhdoanhthang/:id', component: KehoachkinhdoanhthangComponent },
  { path: 'kehoachsanxuatnam/:id', component: KeHoachSanXuatNamComponent },
  { path: 'baocaokehoachkinhdoanh', component: BaocaokehoachkinhdoanhComponent },
  { path: 'danhmuc/dongiasanpham/:id', component: DonGiaSanPhamComponent },
  { path: 'danhmuc/tygiangoaite/:id', component: TyGiaNgoaiTeComponent },
  { path: 'doanhthutheokehoach/:id', component: DoanhThuComponent },
  { path: 'danhsach/chiphibongnam/:id', component: ChiPhiBongComponent },
  { path: 'danhsach/chiphixonam/:id', component: ChiPhiXoComponent },
  { path: 'danhsach/chiphidiennam/:id', component: ChiPhiDienComponent },
  { path: 'danhmuc/vattuphu', component: VatTuPhuComponent },
  { path: 'danhmuc/cocaunhansu/:id', component: CoCauNhanSuComponent },
  { path: 'danhmuc/taisan/:id', component: TaiSanComponent },
  { path: 'danhmuc/chiphibanhang/:id', component: ChiPhiBanHangComponent },
  { path: 'dinhmucsanxuat/:id', component: DinhMucSanXuatComponent },
  { path: 'danhsach/tinhluong/:id', component: TinhLuongComponent },
  { path: 'danhsach/mucluongcocaunhansu/:id', component: MucLuongCoCauNhanSuComponent },
  { path: 'danhsach/chiphibanhangtheonam/:id', component: ChiPhiBanHangTheoNamComponent },
  { path: 'danhmuc/loaicontainer', component: LoaiContainerComponent },
  { path: 'danhmuc/phuongthucvanchuyen', component: PhuongThucVanChuyenComponent },
  { path: 'danhmuc/chiphixuathang', component: ChiPhiXuatHangComponent },
  { path: 'danhmuc/chiphibangtien', component: ChiPhiBangTienComponent },
  { path: 'danhmuc/chiphilaivay', component: ChiPhiLaiVayComponent },
  { path: 'danhmuc/chiphinhancong', component: ChiPhiNhanCongComponent },
  { path: 'banggiavtp', component: BangGiaVtpComponent },
  { path: 'chiphinhanconghangthang', component: ChiPhiNhanCongHangThangComponent },
  { path: 'chiphibangtienhangthang', component: ChiPhiBangTienHangThangComponent },
  { path: 'chiphilaivayhangthang', component: ChiPhiLaiVayHangThangComponent },
  { path: 'chiphilaivaydaihan', component: ChiPhiLaiVayDaiHanComponent },
  { path: 'giasanphamtheothang', component: GiaSanPhamTheoThangComponent },
  { path: 'baocaonhucausudungbong', component: BaoCaoNhuCauSuDungBongComponent },
  { path: 'baocaonhucau', component: BaoCaoNhuCauComponent },
  { path: 'kehoachdaduyet/:id', component: KehoachdaduyetComponent },
  { path: 'kehoachdoanhthu/:id', component: LapDoanhThuComponent },
  { path: 'kehoachchiphi/:id', component: LapChiPhiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MkehoachsanxuatRoutingModule { }

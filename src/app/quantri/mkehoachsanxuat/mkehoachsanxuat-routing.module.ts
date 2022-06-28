import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaocaokehoachkinhdoanhComponent } from './bao-cao-ke-hoach-kinh-doanh/baocaokehoachkinhdoanh.component';
import { ChiPhiBanHangComponent } from './danh-muc/chi-phi-ban-hang/chi-phi-ban-hang.component';
import { CoCauNhanSuComponent } from './danh-muc/co-cau-nhan-su/co-cau-nhan-su.component';
import { DonGiaSanPhamComponent } from './danh-muc/don-gia-san-pham/don-gia-san-pham.component';
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
import { KehoachkinhdoanhnamComponent } from './kehoachkinhdoanhnam/kehoachkinhdoanhnam.component';
import { KehoachkinhdoanhthangComponent } from './kehoachkinhdoanhthang/kehoachkinhdoanhthang.component';
import { MkehoachsanxuatComponent } from './mkehoachsanxuat.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MkehoachsanxuatRoutingModule { }

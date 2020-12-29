import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuantriComponent } from './quantri.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuanlytaisannhadatComponent } from './quanlytaisannhadat/quanlytaisannhadat.component';
import { YeucausapxepComponent } from './sapxepxuly/yeucausapxep/yeucausapxep.component';
import { QuytrinhsapxepComponent } from './sapxepxuly/quytrinhsapxep/quytrinhsapxep.component';
import { DmdonviComponent } from './danhmuc/dmdonvi/dmdonvi.component';
import { DmhinhthucxulyComponent } from './danhmuc/dmhinhthucxuly/dmhinhthucxuly.component';
import { DmtaisanComponent } from './danhmuc/dmtaisan/dmtaisan.component';
import { BiendongComponent } from './danhmuc/biendong/biendong.component';
import { TinhtrangtaisanComponent } from './danhmuc/tinhtrangtaisan/tinhtrangtaisan.component';
import { DmmucdichsudungComponent } from './danhmuc/dmmucdichsudung/dmmucdichsudung.component';
import { DmnguongocdatComponent } from './danhmuc/dmnguongocdat/dmnguongocdat.component';
import { TinhComponent } from './danhmuc/tinh/tinh.component';
import { QuanComponent } from './danhmuc/quan/quan.component';
import { PhuongComponent } from './danhmuc/phuong/phuong.component';
import { DmcaphangcongtrinhComponent } from './danhmuc/dmcaphangcongtrinh/dmcaphangcongtrinh.component';
import { TheodoithongkebaocaoComponent } from './theodoithongkebaocao/theodoithongkebaocao.component';
import { Bieu1aComponent } from './baocao/bieu1a/bieu1a.component';
import { Bieu1bComponent } from './baocao/bieu1b/bieu1b.component';
import { Bieu1cComponent } from './baocao/bieu1c/bieu1c.component';
import { Bieu2aComponent } from './baocao/bieu2a/bieu2a.component';
import { Bieu2bComponent } from './baocao/bieu2b/bieu2b.component';
import { Bieu3Component } from './baocao/bieu3/bieu3.component';
import { Bieu4Component } from './baocao/bieu4/bieu4.component';
import { Bieu5Component } from './baocao/bieu5/bieu5.component';
import { BaocaochitietcaccosoComponent } from './baocao/baocaochitietcaccoso/baocaochitietcaccoso.component';
import { DmhientrangsudungComponent } from './danhmuc/dmhientrangsudung/dmhientrangsudung.component';
import { DonvisohuudatnhaComponent } from './danhmuc/donvisohuudatnha/donvisohuudatnha.component';
import { DmloaivanbanComponent } from './danhmuc/dmloaivanban/dmloaivanban.component';
import { BaocaotaichinhComponent } from './baocao/baocaotaichinh/baocaotaichinh.component';
import { UploadhdsdComponent } from './uploadhdsd/uploadhdsd.component';
import { DmkhoComponent } from './danhmuc/dmkho/dmkho.component';
import { KiemkekhoComponent } from './quanlykhosanxuat/quytrinh/kiemkekho/kiemkekho.component';
import { NhapkhoComponent } from './quanlykhosanxuat/quytrinh/nhapkho/nhapkho.component';
import { PhabongComponent } from './quanlykhosanxuat/phuongan/phabong/phabong.component';
import { ThongsochatluongComponent } from './quanlykhosanxuat/quytrinh/thongsochatluong/thongsochatluong.component';
import { ThongkesanluongComponent } from './quanlykhosanxuat/thongke/thongkesanluong/thongkesanluong.component';
import { SanluongtonghopComponent } from './quanlykhosanxuat/baocao/sanluongtonghop/sanluongtonghop.component';
import { SanluongchitietComponent } from './quanlykhosanxuat/baocao/sanluongchitiet/sanluongchitiet.component';
import { LoaibongComponent } from './danhmuc/danhmucsanxuat/loaibong/loaibong.component';
import { CapbongComponent } from './danhmuc/danhmucsanxuat/capbong/capbong.component';
import { CasanxuatComponent } from './danhmuc/danhmucsanxuat/casanxuat/casanxuat.component';
import { DanhsachmayComponent } from './danhmuc/danhmucsanxuat/danhsachmay/danhsachmay.component';
import { DieuhanhsanxuatComponent } from './dieuhanhsanxuat/dieuhanhsanxuat.component';
import { KehoachsanxuatComponent } from './quanlykhosanxuat/quytrinh/kehoachsanxuat/kehoachsanxuat.component';
import { XuatkhoComponent } from './quanlykhosanxuat/quytrinh/xuatkho/xuatkho.component';
import { HacapComponent } from './quanlykhosanxuat/quytrinh/hacap/hacap.component';
import { DieuchuyenComponent } from './quanlykhosanxuat/quytrinh/dieuchuyen/dieuchuyen.component';
import { TrienkhaikehoachsanxuatComponent } from './quanlykhosanxuat/quytrinh/trienkhaikehoachsanxuat/trienkhaikehoachsanxuat.component';
import { TimbongComponent } from './quanlykhosanxuat/phuongan/timbong/timbong.component';
import { MathangComponent } from './danhmuc/danhmucsanxuat/mathang/mathang.component';
import { PhanxuongComponent } from './danhmuc/danhmucsanxuat/phanxuong/phanxuong.component';
import { LoaisoiComponent } from './danhmuc/danhmucsanxuat/loaisoi/loaisoi.component';
import { NhomkhoComponent } from './danhmuc/danhmucsanxuat/nhomkho/nhomkho.component';
import { KhoComponent } from './danhmuc/danhmucsanxuat/kho/kho.component';

const routes: Routes = [
  {
    path: '', component: QuantriComponent,
    children: [
      //dieuhanhsanxuat dashboard
      { path: '', redirectTo: 'dieuhanhsanxuat', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'quanlytaisannhadat', component: QuanlytaisannhadatComponent },
      { path: 'sapxepxuly/yeucau', component: YeucausapxepComponent },
      { path: 'sapxepxuly/quytrinh', component: QuytrinhsapxepComponent },
      { path: 'huongdansudung', component: UploadhdsdComponent },

      { path: 'danhmuc/dmdonvi', component: DmdonviComponent },
      { path: 'danhmuc/dmhinhthucxuly', component: DmhinhthucxulyComponent },
      { path: 'danhmuc/dmtaisan', component: DmtaisanComponent },
      { path: 'danhmuc/dmbiendong', component: BiendongComponent},
      { path: 'danhmuc/dmtinhtrangtaisan', component: TinhtrangtaisanComponent },
      { path: 'danhmuc/dmmucdichsudung', component: DmmucdichsudungComponent },
      { path: 'danhmuc/dmnguongocdat', component: DmnguongocdatComponent },
      { path: 'danhmuc/dmtinh', component: TinhComponent },
      { path: 'danhmuc/dmquan', component: QuanComponent },
      { path: 'danhmuc/dmphuong', component: PhuongComponent },
      { path: 'danhmuc/dmcaphangcongtrinh', component: DmcaphangcongtrinhComponent },
      { path: 'danhmuc/dmhientrangsudung', component:DmhientrangsudungComponent },
      { path: 'danhmuc/dmdonvisohuudatnha', component:DonvisohuudatnhaComponent},
      { path: 'danhmuc/dmloaivanban', component:DmloaivanbanComponent},

      
      { path: 'theodoithongkebaocao', component: TheodoithongkebaocaoComponent },
      { path: 'theodoithongkebaocao/bieu1a', component: Bieu1aComponent },
      { path: 'theodoithongkebaocao/bieu1b', component: Bieu1bComponent },
      { path: 'theodoithongkebaocao/bieu1c', component: Bieu1cComponent },
      { path: 'theodoithongkebaocao/bieu2a', component: Bieu2aComponent },
      { path: 'theodoithongkebaocao/bieu2b', component: Bieu2bComponent },
      { path: 'theodoithongkebaocao/bieu3', component: Bieu3Component },
      { path: 'theodoithongkebaocao/bieu4', component: Bieu4Component },
      { path: 'theodoithongkebaocao/bieu5', component: Bieu5Component },
      { path: 'theodoithongkebaocao/baocaochitietcaccoso', component: BaocaochitietcaccosoComponent },
      { path: 'theodoithongkebaocao/baocaodonvi', component: BaocaotaichinhComponent },

      { path: 'dieuhanhsanxuat', component: DieuhanhsanxuatComponent },

      
      { path: 'theodoithongkebaocaosanxuat/sanluongtonghop', component: SanluongtonghopComponent },
      { path: 'theodoithongkebaocaosanxuat/sanluongchitiet', component: SanluongchitietComponent },
      { path: 'danhmucsanxuat/dmkho', component:DmkhoComponent},
      { path: 'danhmucsanxuat/dmloaibong', component:LoaibongComponent},
      { path: 'danhmucsanxuat/dmcapbong', component:CapbongComponent},
      { path: 'danhmucsanxuat/dmcasanxuat', component:CasanxuatComponent},
      { path: 'danhmucsanxuat/dmdsmay', component:DanhsachmayComponent},
      { path: 'danhmucsanxuat/dmmathang', component:MathangComponent},
      { path: 'danhmucsanxuat/dmphanxuong', component:PhanxuongComponent},
      { path: 'danhmucsanxuat/dmloaisoi', component:LoaisoiComponent},
      { path: 'danhmucsanxuat/dmnhomkho', component:NhomkhoComponent},

      { path: 'thongkesanluong/:id', component:ThongkesanluongComponent},
      
      { path: 'trienkhaisanxuat/phabong/:id', component:PhabongComponent},
      { path: 'trienkhaisanxuat/timbong/:id', component:TimbongComponent},
      
      { path: 'quanlykhosanxuat/kiemkekho/:id', component:KiemkekhoComponent},
      { path: 'quanlykhosanxuat/nhapkho/:id', component:NhapkhoComponent},
      { path: 'quanlykhosanxuat/xuatkho/:id', component:XuatkhoComponent},
      { path: 'quanlykhosanxuat/thongsochatluong/:id', component:ThongsochatluongComponent},

      { path: 'kehoachsanxuat/giaokehoachsanxuat/:id', component:KehoachsanxuatComponent},
      { path: 'kehoachsanxuat/trienkhaikehoachsanxuat/:id', component:TrienkhaikehoachsanxuatComponent},
      { path: 'quanlykhosanxuat/hacap/:id', component:HacapComponent},
      { path: 'quanlykhosanxuat/dieuchuyen/:id', component:DieuchuyenComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuantriRoutingModule { }

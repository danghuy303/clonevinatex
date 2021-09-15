import { GiaokehoachsanxuatComponent } from './screen/thuchienhopdong/giaokehoachsanxuat/giaokehoachsanxuat.component';
import { LaphopdongsoiComponent } from './screen/laphopdongsoi/laphopdongsoi.component';
import { LaphopdongbongxoComponent } from './screen/laphopdongbongxo/laphopdongbongxo.component';
import { PhathopdongComponent } from './screen/thuchienhopdong/phathopdong/phathopdong.component';
import { QuyettoanhopdongComponent } from './screen/thuchienhopdong/quyettoanhopdong/quyettoanhopdong.component';
import { GiahanhopdongComponent } from './screen/thuchienhopdong/giahanhopdong/giahanhopdong.component';
import { ThanhtoanhopdongComponent } from './screen/thuchienhopdong/thanhtoanhopdong/thanhtoanhopdong.component';
import { GiaonhanhanghoaComponent } from './screen/thuchienhopdong/giaonhanhanghoa/giaonhanhanghoa.component';
import { DanhsachhopdongbongxoComponent } from './screen/danhsachhopdongbongxo/danhsachhopdongbongxo.component';
import { DmLoaiHopDongComponent } from './danhmuc/dm-loai-hop-dong/dm-loai-hop-dong.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhmuchinhthucthanhtoanComponent } from './danhmuc/danhmuchinhthucthanhtoan/danhmuchinhthucthanhtoan.component';
import { DanhmucloaihopdongComponent } from './danhmuc/danhmucloaihopdong/danhmucloaihopdong.component';
import { DanhmucloaitienteComponent } from './danhmuc/danhmucloaitiente/danhmucloaitiente.component';
import { DanhmucthutucthanhtoanComponent } from './danhmuc/danhmucthutucthanhtoan/danhmucthutucthanhtoan.component';
import { DanhmuctrangthaibaolanhComponent } from './danhmuc/danhmuctrangthaibaolanh/danhmuctrangthaibaolanh.component';


import { HopdongComponent } from './hopdong.component';
import { TheodoihopdongnhapkhauComponent } from './baocao/theodoihopdongnhapkhau/theodoihopdongnhapkhau.component';
import { DanhmucvattuphuComponent } from './danhmuc/danhmucvattuphu/danhmucvattuphu.component';
import { DanhmuccocaunhansuComponent } from './danhmuc/danhmuccocaunhansu/danhmuccocaunhansu.component';
import { DanhmuctinhluongComponent } from './danhmuc/danhmuctinhluong/danhmuctinhluong.component';
import { DanhmuctaisanComponent } from './danhmuc/danhmuctaisan/danhmuctaisan.component';
import { DanhmucphibanhangComponent } from './danhmuc/danhmucphibanhang/danhmucphibanhang.component';
import { DanhmucdinhmucmathangComponent } from './danhmuc/danhmucdinhmucmathang/danhmucdinhmucmathang.component';
import { KehoachnhapbongComponent } from './screen/thuchienhopdong/kehoachnhapbong/kehoachnhapbong.component';
import { NhapkhoComponent } from './screen/thuchienhopdong/nhapkho/nhapkho.component';
import { XuatkhothanhphamhopdongComponent } from './screen/thuchienhopdong/xuatkhothanhphamhopdong/xuatkhothanhphamhopdong.component';
import { KehoachkinhdoanhdanhsachComponent } from './kehoachkinhdoanh/kehoachkinhdoanhdanhsach/kehoachkinhdoanhdanhsach.component';

import { DmtieuchichatluonghopdongComponent } from './danhmuc/dmtieuchichatluonghopdong/dmtieuchichatluonghopdong.component';
import { QuytrinhthanhtoanbongComponent } from './screen/thanhtoanbong/quytrinhthanhtoanbong/quytrinhthanhtoanbong.component';
import { DanhsachtinhluongComponent } from './danhsach/danhsachtinhluong/danhsachtinhluong.component';
import { ThanhtoanhopdongsoiComponent } from './screen/thuchienhopdong/thanhtoanhopdongsoi/thanhtoanhopdongsoi.component';
const routes: Routes = [
  {path:'',component:HopdongComponent},
  {path:'danhmuc/danhmuchinhthucthanhtoan',component:DanhmuchinhthucthanhtoanComponent},
  {path:'danhmuc/danhmucloaihopdong',component:DanhmucloaihopdongComponent},
  {path:'danhmuc/danhmucloaitiente',component:DanhmucloaitienteComponent},
  {path:'danhmuc/danhmuctrangthaibaolanh',component:DanhmuctrangthaibaolanhComponent},
  {path:'danhmuc/danhmucthutucthanhtoan',component:DanhmucthutucthanhtoanComponent},
  {path:'danhmuc/danhmucvattuphu',component: DanhmucvattuphuComponent},
  {path:'danhmuc/danhmuccocaunhansu',component: DanhmuccocaunhansuComponent},
  {path:'danhmuc/danhmuctinhluong',component: DanhmuctinhluongComponent},
  {path:'danhmuc/danhmuctaisan',component: DanhmuctaisanComponent},
  {path:'danhmuc/danhmucphibanhang',component: DanhmucphibanhangComponent},
  {path:'danhmuc/danhmucdinhmucmathang',component: DanhmucdinhmucmathangComponent},

  {path:'danhmuc/kehoachkinhdoanhdanhsach',component: KehoachkinhdoanhdanhsachComponent},
  {path:'danhmuc/danhsachtinhluong',component: DanhsachtinhluongComponent},

  {path:'danhmuc/dmtieuchichatluong',component: DmtieuchichatluonghopdongComponent},



  {path:'theodoihopdongnhapkhau',component:TheodoihopdongnhapkhauComponent},

  { path: 'dmloaihopdong', component: DmLoaiHopDongComponent },
  { path: 'danhsachhopdongbongxo/:id', component: DanhsachhopdongbongxoComponent },
  { path: 'kehoachnhapbong/:id', component: KehoachnhapbongComponent },
  { path: 'nhapkho/:id', component: NhapkhoComponent },  
  { path: 'xuatkhothanhpham/:id', component: XuatkhothanhphamhopdongComponent },
  { path: 'giaonhanhanghoa/:id', component: GiaonhanhanghoaComponent },
  { path: 'thanhtoanhopdong/:id', component: ThanhtoanhopdongComponent },
  { path: 'phathopdong/:id', component: PhathopdongComponent },
  { path: 'giaokehoachsanxuat/:id', component: GiaokehoachsanxuatComponent },
  { path: 'giahanhopdong/:id', component: GiahanhopdongComponent },
  { path: 'quyettoanhopdong/:id', component: QuyettoanhopdongComponent },
  { path: 'laphopdongbongxo/:id', component: LaphopdongbongxoComponent },
  { path: 'laphopdongsoi/:id', component: LaphopdongsoiComponent },
  { path: 'quytrinhthanhtoanbong/:id', component: QuytrinhthanhtoanbongComponent },
  { path: 'quytrinhthanhtoansoi/:id', component: ThanhtoanhopdongsoiComponent },

  //
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HopdongRoutingModule { }

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

const routes: Routes = [
  {path:'',component:HopdongComponent},
  {path:'danhmuc/danhmuchinhthucthanhtoan',component:DanhmuchinhthucthanhtoanComponent},
  {path:'danhmuc/danhmucloaihopdong',component:DanhmucloaihopdongComponent},
  {path:'danhmuc/danhmucloaitiente',component:DanhmucloaitienteComponent},
  {path:'danhmuc/danhmuctrangthaibaolanh',component:DanhmuctrangthaibaolanhComponent},
  {path:'danhmuc/danhmucthutucthanhtoan',component:DanhmucthutucthanhtoanComponent},
  { path: 'dmloaihopdong', component: DmLoaiHopDongComponent },
  { path: 'danhsachhopdongbongxo/:id', component: DanhsachhopdongbongxoComponent },
  { path: 'giaonhanhanghoa/:id', component: GiaonhanhanghoaComponent },
  { path: 'thanhtoanhopdong/:id', component: ThanhtoanhopdongComponent },
  { path: 'phathopdong/:id', component: PhathopdongComponent },
  { path: 'giaokehoachsanxuat/:id', component: GiaokehoachsanxuatComponent },
  { path: 'giahanhopdong/:id', component: GiahanhopdongComponent },
  { path: 'quyettoanhopdong/:id', component: QuyettoanhopdongComponent },
  { path: 'laphopdongbongxo/:id', component: LaphopdongbongxoComponent },
  { path: 'laphopdongsoi/:id', component: LaphopdongsoiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HopdongRoutingModule { }

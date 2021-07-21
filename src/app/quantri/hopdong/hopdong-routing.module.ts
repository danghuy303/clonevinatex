import { DanhsachhopdongbongxoComponent } from './screen/danhsachhopdongbongxo/danhsachhopdongbongxo.component';
import { DmLoaiHopDongComponent } from './danhmuc/dm-loai-hop-dong/dm-loai-hop-dong.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HopdongComponent } from './hopdong.component';

const routes: Routes = [
  {path:'',component:HopdongComponent},
  { path: 'dmloaihopdong', component: DmLoaiHopDongComponent },
  { path: 'danhsachhopdongbongxo', component: DanhsachhopdongbongxoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HopdongRoutingModule { }

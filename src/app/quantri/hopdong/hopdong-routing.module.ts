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
  {path:'danhmuchinhthucthanhtoan',component:DanhmuchinhthucthanhtoanComponent},
  {path:'danhmucloaihopdong',component:DanhmucloaihopdongComponent},
  {path:'danhmucloaitiente',component:DanhmucloaitienteComponent},
  {path:'danhmuctrangthaibaolanh',component:DanhmuctrangthaibaolanhComponent},
  {path:'danhmucthutucthanhtoan',component:DanhmucthutucthanhtoanComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HopdongRoutingModule { }

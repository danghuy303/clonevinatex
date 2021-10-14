import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BophansudungComponent } from './danhmuc/bophansudung/bophansudung.component';
import { DanhmucdonvitinhComponent } from './danhmuc/danhmucdonvitinh/danhmucdonvitinh.component';
import { DanhmucloaibaoduongComponent } from './danhmuc/danhmucloaibaoduong/danhmucloaibaoduong.component';
import { DanhmucloaitaisanComponent } from './danhmuc/danhmucloaitaisan/danhmucloaitaisan.component';
import { DonvinangsuatComponent } from './danhmuc/donvinangsuat/donvinangsuat.component';
import { DanhsachtaisanComponent } from './danhsachtaisan/danhsachtaisan.component';

const routes: Routes = [
  {path:'',component:DanhsachtaisanComponent},
  {path:'danhmuc/danhmucloaibaoduong',component:DanhmucloaibaoduongComponent},
  {path:'danhmuc/bophansudung',component:BophansudungComponent},
  {path:'danhmuc/danhmucdonvitinh',component:DanhmucdonvitinhComponent},
  {path:'danhmuc/danhmucloaitaisan',component:DanhmucloaitaisanComponent},
  {path:'danhmuc/donvinangsuat',component:DonvinangsuatComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaisanRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BangiaotaisanComponent } from './bangiaotaisan/bangiaotaisan.component';
import { DanhmucdonvitinhComponent } from './danhmuc/danhmucdonvitinh/danhmucdonvitinh.component';
import { DanhmucloaibaoduongComponent } from './danhmuc/danhmucloaibaoduong/danhmucloaibaoduong.component';
import { DanhmucloaitaisanComponent } from './danhmuc/danhmucloaitaisan/danhmucloaitaisan.component';
import { DonvinangsuatComponent } from './danhmuc/donvinangsuat/donvinangsuat.component';
import { HangsanxuatComponent } from './danhmuc/hangsanxuat/hangsanxuat.component';
import { LoaikhauhaoComponent } from './danhmuc/loaikhauhao/loaikhauhao.component';
import { LoaisucoComponent } from './danhmuc/loaisuco/loaisuco.component';
import { TinhtrangtaisanComponent } from './danhmuc/tinhtrangtaisan/tinhtrangtaisan.component';
import { DanhsachtaisanComponent } from './danhsachtaisan/danhsachtaisan.component';
import { NhaplieuxuattaisanComponent } from './nhaplieuxuattaisan/nhaplieuxuattaisan.component';
import { NhaptaisanComponent } from './nhaptaisan/nhaptaisan.component';
import { SucosuachuaComponent } from './sucosuachua/sucosuachua.component';
import { Sucosuachua2Component } from './sucosuachua2/sucosuachua2.component';
import { TaisanComponent } from './taisan.component';
import { ThanhlytaisanComponent } from './thanhlytaisan/thanhlytaisan.component';
import { PhieuthuhoitaisanComponent } from './thuhoitaisan/phieuthuhoitaisan/phieuthuhoitaisan.component';

const routes: Routes = [
  {path:'',component:TaisanComponent},
  {path:'nhaptaisan',component:NhaptaisanComponent},
  {path:'bangiaotaisan',component:BangiaotaisanComponent},  
  {path:'sucosuachua',component:SucosuachuaComponent},  
  {path:'danhsachtaisan',component:DanhsachtaisanComponent},
  {path:'danhmuc/danhmucloaibaoduong',component:DanhmucloaibaoduongComponent},
  {path:'danhmuc/danhmucdonvitinh',component:DanhmucdonvitinhComponent},
  {path:'danhmuc/danhmucloaitaisan',component:DanhmucloaitaisanComponent},
  {path:'danhmuc/donvinangsuat',component:DonvinangsuatComponent},
  {path:'danhmuc/hangsannxuat',component:HangsanxuatComponent},
  {path:'danhmuc/tinhtrangtaisan',component:TinhtrangtaisanComponent},
  {path:'danhmuc/loaikhauhao',component:LoaikhauhaoComponent},
  {path:'thuhoitaisan/:id',component:PhieuthuhoitaisanComponent},
  {path:'thanhlytaisan/:id',component:ThanhlytaisanComponent},
  {path:'nhaplieuxuattaisan',component:NhaplieuxuattaisanComponent},
  {path:'danhmuc/loaisuco',component:LoaisucoComponent},
  {path:'sucosuachua2',component:Sucosuachua2Component},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaisanRoutingModule { }

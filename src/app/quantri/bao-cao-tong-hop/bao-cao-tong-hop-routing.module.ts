import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaoCaoTongHopClassimatComponent } from './bao-cao-tong-hop-classimat/bao-cao-tong-hop-classimat.component';
import { BaoCaoTongHopLoiCatComponent } from './bao-cao-tong-hop-loi-cat/bao-cao-tong-hop-loi-cat.component';
import { BaoCaoTongHopComponent } from './bao-cao-tong-hop.component';
import { BaocaodieukhongComponent } from './baocaodieukhong/baocaodieukhong.component';
import { BongChaiTongHopComponent } from './bong-chai-tong-hop/bong-chai-tong-hop.component';
import { GhepThoTongHopComponent } from './ghep-tho-tong-hop/ghep-tho-tong-hop.component';
import { OngTongHopComponent } from './ong-tong-hop/ong-tong-hop.component';
import { SoiConTongHopComponent } from './soi-con-tong-hop/soi-con-tong-hop.component';
import { ThongKeThoiGianDungMayComponent } from './thong-ke-thoi-gian-dung-may/thong-ke-thoi-gian-dung-may.component';

const routes: Routes = [
  { path: '', component: BaoCaoTongHopComponent },
  { path: 'bongchaitonghop', component: BongChaiTongHopComponent },
  { path: 'ghepthotonghop', component: GhepThoTongHopComponent },
  { path: 'soicontonghop', component: SoiConTongHopComponent },
  { path: 'ongtonghop', component: OngTongHopComponent },
  { path: 'thoigiandungmay', component: ThongKeThoiGianDungMayComponent },
  { path: 'loicat', component: BaoCaoTongHopLoiCatComponent },
  { path: 'classimat', component: BaoCaoTongHopClassimatComponent },
  { path: 'dieukhong', component: BaocaodieukhongComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BaoCaoTongHopRoutingModule { }

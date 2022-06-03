import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaocaokehoachkinhdoanhComponent } from './baocaokehoachkinhdoanh/baocaokehoachkinhdoanh.component';
import { KehoachkinhdoanhnamComponent } from './kehoachkinhdoanhnam/kehoachkinhdoanhnam.component';
import { KehoachkinhdoanhthangComponent } from './kehoachkinhdoanhthang/kehoachkinhdoanhthang.component';
import { MkehoachsanxuatComponent } from './mkehoachsanxuat.component';

const routes: Routes = [
  { path: '', component: MkehoachsanxuatComponent },
  { path: 'danhmuc/kehoachkinhdoanhnam/:id', component: KehoachkinhdoanhnamComponent },
  { path: 'danhmuc/kehoachkinhdoanhthang/:id', component: KehoachkinhdoanhthangComponent },
  { path: 'danhmuc/baocaokehoachkinhdoanh', component: BaocaokehoachkinhdoanhComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MkehoachsanxuatRoutingModule { }

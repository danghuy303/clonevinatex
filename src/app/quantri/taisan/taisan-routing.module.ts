import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhsachtaisanComponent } from './danhsachtaisan/danhsachtaisan.component';

const routes: Routes = [
  {path:'danhsachtaisan',component:DanhsachtaisanComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaisanRoutingModule { }

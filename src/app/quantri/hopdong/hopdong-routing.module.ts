import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HopdongComponent } from './hopdong.component';

const routes: Routes = [
  {path:'',component:HopdongComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HopdongRoutingModule { }

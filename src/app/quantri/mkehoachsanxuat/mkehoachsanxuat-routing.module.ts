import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KehoachkinhdoanhnamComponent } from './kehoachkinhdoanhnam/kehoachkinhdoanhnam.component';
import { MkehoachsanxuatComponent } from './mkehoachsanxuat.component';

const routes: Routes = [
  { path: '', component: MkehoachsanxuatComponent },
  { path: 'danhmuc/kehoachkinhdoanhnam/:id', component: KehoachkinhdoanhnamComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MkehoachsanxuatRoutingModule { }

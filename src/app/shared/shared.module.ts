import { NgModule } from '@angular/core';
import { isXoaPipe } from './../services/isXoaPipe';
import { VNDPipe } from './../services/vnd.pipe';
import { FilterPipe } from './../services/filter.pipe';
import { FilterByKeyPipe } from './../services/filterbykey.pipe';
import { SumByKeyPipe } from './../services/sum.pipe';
import { SortByKeyPipe } from './../services/sortPipe.pipe';
import { CongDoanPipe } from './../services/congdoan.pipe';
import {CaPipe} from './../services/ca.pipe';
import { isDieuChinhPipe } from './../services/isDieuChinh.pipe';


@NgModule({
  declarations: [
    isXoaPipe,
    isDieuChinhPipe,
    VNDPipe,
    CaPipe,
    FilterPipe,
    FilterByKeyPipe,
    SumByKeyPipe,
    CongDoanPipe,
    SortByKeyPipe,
  ],
  imports: [
  ],
  exports:[
    isXoaPipe,
    isDieuChinhPipe,
    VNDPipe,
    CaPipe,
    FilterPipe,
    FilterByKeyPipe,
    SumByKeyPipe,
    CongDoanPipe,
    SortByKeyPipe,
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MkehoachsanxuatRoutingModule } from './mkehoachsanxuat-routing.module';
import { MkehoachsanxuatComponent } from './mkehoachsanxuat.component';
import { KehoachkinhdoanhnamComponent } from './kehoachkinhdoanhnam/kehoachkinhdoanhnam.component';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KehoachkinhdoanhnammodalComponent } from './kehoachkinhdoanhnam/kehoachkinhdoanhnammodal/kehoachkinhdoanhnammodal.component';
import { PaginatorModule } from 'primeng/paginator';
import { CalendarModule } from 'primeng/calendar';
import { VoiLibModule } from 'voi-lib';
import { InputNumberModule } from 'primeng/inputnumber';
import { HopdongsanphammodalComponent } from './kehoachkinhdoanhnam/hopdongsanphammodal/hopdongsanphammodal.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ChitietthangComponent } from './kehoachkinhdoanhnam/chitietthang/chitietthang.component';

@NgModule({
  declarations: [
    MkehoachsanxuatComponent,
    KehoachkinhdoanhnamComponent,
    KehoachkinhdoanhnammodalComponent,
    HopdongsanphammodalComponent,
    ChitietthangComponent
  ],
  imports: [
    CommonModule,
    MkehoachsanxuatRoutingModule,
    TabViewModule,
    PanelModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    CalendarModule,
    VoiLibModule,
    InputNumberModule,
    CheckboxModule,
  ],
  exports: [
    KehoachkinhdoanhnamComponent
  ],
  entryComponents: [

  ]
})
export class MkehoachsanxuatModule { }

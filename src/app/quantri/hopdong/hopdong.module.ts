import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { HopdongRoutingModule } from './hopdong-routing.module';
import { HopdongComponent } from './hopdong.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { VoiLibModule } from 'voi-lib';
import { LoaderService } from 'src/app/services/loader.service';
import { SignalRService } from 'src/app/services/signalR.service';
import { SharedModule } from './../../shared/shared.module';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { LoaderInterceptor } from 'src/app/services/loader.interceptor';
import localeVi from '@angular/common/locales/vi';
registerLocaleData(localeVi);

@NgModule({
  declarations: [
    HopdongComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HopdongRoutingModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    SplitButtonModule,
    SidebarModule,
    PanelMenuModule,
    ChartModule,
    TableModule,
    OverlayPanelModule,
    TreeModule,
    ToolbarModule,
    PaginatorModule,
    TabViewModule,
    PanelModule,
    DynamicDialogModule,
    DialogModule,
    CalendarModule,
    InputNumberModule,
    FileUploadModule,
    FormsModule,
    GalleriaModule,
    NgbModule,
    CheckboxModule,
    RadioButtonModule,
    MenuModule,
    InputMaskModule,
    PasswordModule,
    InputSwitchModule,
    TooltipModule,
    MultiSelectModule,
    VoiLibModule,
    InputTextareaModule,
    ProgressBarModule,
    NgbProgressbarModule,
    ColorPickerModule,
  ],
  providers: [
    SignalRService,
    LoaderService,
    SanXuatService,
    Dat09Service,
    HopDongService,
    DanhMucHopDongService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'vi-VN' },
  ]
})
export class HopdongModule { }

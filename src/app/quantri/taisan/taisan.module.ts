import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { TaisanRoutingModule } from './taisan-routing.module';
import { TaisanComponent } from './taisan.component';
import { DanhsachtaisanComponent } from './danhsachtaisan/danhsachtaisan.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from 'src/app/services/loader.interceptor';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { Dat09Service } from 'src/app/services/callApi';
import { LoaderService } from 'src/app/services/loader.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { DanhmucloaibaoduongComponent } from './danhmuc/danhmucloaibaoduong/danhmucloaibaoduong.component';
import { DanhmucdonvitinhComponent } from './danhmuc/danhmucdonvitinh/danhmucdonvitinh.component';
import { DanhmucloaitaisanComponent } from './danhmuc/danhmucloaitaisan/danhmucloaitaisan.component';
import { BophansudungComponent } from './danhmuc/bophansudung/bophansudung.component';
import { DonvinangsuatComponent } from './danhmuc/donvinangsuat/donvinangsuat.component';
import { ModalbophansudungComponent } from './modal/modalbophansudung/modalbophansudung.component';
import { ModaldonvitinhComponent } from './modal/modaldonvitinh/modaldonvitinh.component';
import { ModalloaitaisanComponent } from './modal/modalloaitaisan/modalloaitaisan.component';
import { ModalbaoduongComponent } from './modal/modalbaoduong/modalbaoduong.component';
import { ModaldonvinangsuatComponent } from './modal/modaldonvinangsuat/modaldonvinangsuat.component';


@NgModule({
  declarations: [TaisanComponent,
     DanhsachtaisanComponent, 
     DanhmucloaibaoduongComponent, 
     DanhmucdonvitinhComponent, 
     DanhmucloaitaisanComponent,
      BophansudungComponent, 
      DonvinangsuatComponent,
       ModalbophansudungComponent, 
       ModaldonvitinhComponent, 
       ModalloaitaisanComponent,
        ModalbaoduongComponent,
         ModaldonvinangsuatComponent],
  imports: [
    CommonModule,
    TaisanRoutingModule,
    FormsModule,
    NgbModule,
    NgbProgressbarModule,
    FileUploadModule,
    ButtonModule,
    CalendarModule,
    ChartModule,
    CheckboxModule,
    ColorPickerModule,
    DialogModule,
    DynamicDialogModule,
    GalleriaModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    MenuModule,
    MultiSelectModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    ProgressBarModule,
    RadioButtonModule,
    SidebarModule,
    SplitButtonModule,
    TableModule,
    TabViewModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    VoiLibModule,
  ],
  providers: [    
    LoaderService,
    SanXuatService,
    Dat09Service,
    TaisanService,  
    DanhmuctaisanService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true, },
    { provide: LOCALE_ID, useValue: 'vi-VN' },
  ],

  entryComponents: [ModalbaoduongComponent,
    ModalbophansudungComponent,
    ModaldonvinangsuatComponent,
    ModaldonvitinhComponent,
    ModalloaitaisanComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class TaisanModule { }

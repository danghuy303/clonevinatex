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
import { TreeTableModule } from 'primeng/treetable';
import { DanhmucloaibaoduongComponent } from './danhmuc/danhmucloaibaoduong/danhmucloaibaoduong.component';
import { DanhmucdonvitinhComponent } from './danhmuc/danhmucdonvitinh/danhmucdonvitinh.component';
import { DanhmucloaitaisanComponent } from './danhmuc/danhmucloaitaisan/danhmucloaitaisan.component';
import { DonvinangsuatComponent } from './danhmuc/donvinangsuat/donvinangsuat.component';
import { ModaldonvitinhComponent } from './modal/modaldonvitinh/modaldonvitinh.component';
import { ModalloaitaisanComponent } from './modal/modalloaitaisan/modalloaitaisan.component';
import { ModalbaoduongComponent } from './modal/modalbaoduong/modalbaoduong.component';
import { ModaldonvinangsuatComponent } from './modal/modaldonvinangsuat/modaldonvinangsuat.component';
import { ModalcapnhattaisanComponent } from './modal/modalcapnhattaisan/modalcapnhattaisan.component';
import { HangsanxuatComponent } from './danhmuc/hangsanxuat/hangsanxuat.component';
import { ModalhangsanxuatComponent } from './modal/modalhangsanxuat/modalhangsanxuat.component';
import { NhaptaisanComponent } from './nhaptaisan/nhaptaisan.component';
import { ModalthongtinchitiettaisanComponent } from './modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component';
import { BiendongComponent } from './biendong/biendong.component';
import { LichbaoduongComponent } from './lichbaoduong/lichbaoduong.component';
import { SucosuachuaComponent } from './sucosuachua/sucosuachua.component';
import { ThongtinchungComponent } from './thongtinchung/thongtinchung.component';
import { ModalcapnhatbaoduongComponent } from './modal/modalcapnhatbaoduong/modalcapnhatbaoduong.component';
import { ModalcapnhatsuachuabaoduongComponent } from './modal/modalcapnhatsuachuabaoduong/modalcapnhatsuachuabaoduong.component';
import { LoaikhauhaoComponent } from './danhmuc/loaikhauhao/loaikhauhao.component';
import { TinhtrangtaisanComponent } from './danhmuc/tinhtrangtaisan/tinhtrangtaisan.component';
import { ModalloaikhauhaoComponent } from './modal/modalloaikhauhao/modalloaikhauhao.component';
import { ModaltinhtrangtaisanComponent } from './modal/modaltinhtrangtaisan/modaltinhtrangtaisan.component';
import { ThongtitaisanchaComponent } from './screen/thongtitaisancha/thongtitaisancha.component';
import { ModalcapnhattaisanconComponent } from './modal/modalcapnhattaisancon/modalcapnhattaisancon.component';
import { SharedModule } from './../../shared/shared.module';
import { BangiaotaisanComponent } from './bangiaotaisan/bangiaotaisan.component';
import { PhieuthuhoitaisanComponent } from './thuhoitaisan/phieuthuhoitaisan/phieuthuhoitaisan.component';
import { ModalthuhoitaisanComponent } from './modal/modalthuhoitaisan/modalthuhoitaisan.component';
import { ModalcapnhatbaogiaComponent } from './modal/modalcapnhatbaogia/modalcapnhatbaogia.component';
import { ModalchontaisanComponent } from './modal/modalchontaisan/modalchontaisan.component';
import { ThanhlytaisanComponent } from './thanhlytaisan/thanhlytaisan.component';
import { ModalthanhlytaisanComponent } from './modal/modalthanhlytaisan/modalthanhlytaisan.component';
import { ModalchontaisanCopyComponent } from './modal/modalchontaisan-copy/modalchontaisan-copy.component';
import { ModaltaolichbaoduongComponent } from './modal/modaltaolichbaoduong/modaltaolichbaoduong.component';
import { NhaplieuxuattaisanComponent } from './nhaplieuxuattaisan/nhaplieuxuattaisan.component';
import { ModalnhaplieuxuattaisanComponent } from './modal/modalnhaplieuxuattaisan/modalnhaplieuxuattaisan.component';
import { LoaisucoComponent } from './danhmuc/loaisuco/loaisuco.component';
import { ModalloaisucoComponent } from './modal/modalloaisuco/modalloaisuco.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [TaisanComponent,
    DanhsachtaisanComponent,
    DanhmucloaibaoduongComponent,
    DanhmucdonvitinhComponent,
    DanhmucloaitaisanComponent,
    DonvinangsuatComponent,
    ModaldonvitinhComponent,
    ModalloaitaisanComponent,
    ModalbaoduongComponent,
    ModaldonvinangsuatComponent,
    HangsanxuatComponent,
    ModalhangsanxuatComponent,
    ModalcapnhattaisanComponent,
    NhaptaisanComponent,
    ModalthongtinchitiettaisanComponent,
    BiendongComponent,
    LichbaoduongComponent,
    SucosuachuaComponent,
    ThongtinchungComponent,
    ModalcapnhatbaoduongComponent,
    ModalcapnhatsuachuabaoduongComponent,
    LoaikhauhaoComponent,
    TinhtrangtaisanComponent,
    ModalloaikhauhaoComponent,
    ModaltinhtrangtaisanComponent,
    ThongtitaisanchaComponent,
    ModalcapnhattaisanconComponent,
    BangiaotaisanComponent,
    PhieuthuhoitaisanComponent,
    ModalthuhoitaisanComponent,
    ModalcapnhatbaogiaComponent,
    ModalchontaisanComponent,
    ThanhlytaisanComponent,
    ModalthanhlytaisanComponent,
    ModalchontaisanCopyComponent,
    ModaltaolichbaoduongComponent,
    NhaplieuxuattaisanComponent,
    ModalnhaplieuxuattaisanComponent,
    LoaisucoComponent,
    ModalloaisucoComponent,

  ],
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
    TreeTableModule,
    SharedModule,
    QRCodeModule,
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
    ModaldonvinangsuatComponent,
    ModaldonvitinhComponent,
    ModalloaitaisanComponent,
    ModalcapnhattaisanComponent,    
    ModalthongtinchitiettaisanComponent,
    ModalcapnhatbaoduongComponent,
    ModalcapnhatsuachuabaoduongComponent,
    ModalhangsanxuatComponent,
    ModaltinhtrangtaisanComponent,
    ModalloaikhauhaoComponent,
    ModalcapnhattaisanconComponent,
    ModalthuhoitaisanComponent,
    ModalcapnhatbaogiaComponent,
    ModalchontaisanComponent,
    ModalchontaisanCopyComponent,
    ModalthanhlytaisanComponent,
    ModaltaolichbaoduongComponent,
    ModalnhaplieuxuattaisanComponent,
    ModalloaisucoComponent,
   


  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class TaisanModule { }

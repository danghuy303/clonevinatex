import { ModalloaihopdongComponent } from './danhmuc/modal/modalloaihopdong/modalloaihopdong.component';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
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
import { DanhmuchinhthucthanhtoanComponent } from './danhmuc/danhmuchinhthucthanhtoan/danhmuchinhthucthanhtoan.component';
import { ModaldanhmuchinhthucthanhtoanComponent } from './danhmuc/modal/modaldanhmuchinhthucthanhtoan/modaldanhmuchinhthucthanhtoan.component';
import { DanhmucloaihopdongComponent } from './danhmuc/danhmucloaihopdong/danhmucloaihopdong.component';
import { ModaldanhmucloaihopdongComponent } from './danhmuc/modal/modaldanhmucloaihopdong/modaldanhmucloaihopdong.component';
import { DanhmucloaitienteComponent } from './danhmuc/danhmucloaitiente/danhmucloaitiente.component';
import { ModaldanhmucloaitienteComponent } from './danhmuc/modal/modaldanhmucloaitiente/modaldanhmucloaitiente.component';
import { DanhmucthutucthanhtoanComponent } from './danhmuc/danhmucthutucthanhtoan/danhmucthutucthanhtoan.component';
import { ModaldanhmucthutucthanhtoanComponent } from './danhmuc/modal/modaldanhmucthutucthanhtoan/modaldanhmucthutucthanhtoan.component';
import { DanhmuctrangthaibaolanhComponent } from './danhmuc/danhmuctrangthaibaolanh/danhmuctrangthaibaolanh.component';
import { ModaldanhmuctrangthaibaolanhComponent } from './danhmuc/modal/modaldanhmuctrangthaibaolanh/modaldanhmuctrangthaibaolanh.component';

import { DmLoaiHopDongComponent } from './danhmuc/dm-loai-hop-dong/dm-loai-hop-dong.component';
import { DanhsachhopdongbongxoComponent } from './screen/danhsachhopdongbongxo/danhsachhopdongbongxo.component';
// import { ChitiethopdongbongxomodalComponent } from './screen/danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
registerLocaleData(localeVi);
import { CardModule } from 'primeng/card';

// import { ChitietdanhsachhopdongbongxoComponent } from './screen/chitietdanhsachhopdongbongxo/chitietdanhsachhopdongbongxo.component';
import { ChitiethopdongbongxoComponent } from './screen/modal/share/chitiethopdongbongxo/chitiethopdongbongxo.component';
import { ChitietdanhsachhanghoaComponent } from './screen/modal/share/chitietdanhsachhanghoa/chitietdanhsachhanghoa.component';
import { ChitietdieukhoanthanhtoanComponent } from './screen/modal/share/chitietdieukhoanthanhtoan/chitietdieukhoanthanhtoan.component';
import { ChitietnhansuthuchienComponent } from './screen/modal/share/chitietnhansuthuchien/chitietnhansuthuchien.component';
import { ChitietbaolanhComponent } from './screen/modal/share/chitietbaolanh/chitietbaolanh.component';
import { ChitietthanhtoanComponent } from './screen/modal/share/chitietthanhtoan/chitietthanhtoan.component';
import { ChitietphathopdongComponent } from './screen/modal/share/chitietphathopdong/chitietphathopdong.component';
import { ChitiethopdongbongxomodalComponent } from './screen/danhsachhopdongbongxo/chitiethopdongbongxomodal/chitiethopdongbongxomodal.component';
import { ChitietdieukhoanmodalComponent } from './screen/modal/share/chitietdieukhoanthanhtoan/chitietdieukhoanmodal/chitietdieukhoanmodal.component';
import { NhansuthuchienmodalComponent } from './screen/modal/share/chitietnhansuthuchien/nhansuthuchienmodal/nhansuthuchienmodal.component';
import { ChitietbaolanhmodalComponent } from './screen/modal/share/chitietbaolanh/chitietbaolanhmodal/chitietbaolanhmodal.component';
// import { GiaonhanhopdongComponent } from './screen/thuchienhopdong/giaonhanhopdong/giaonhanhopdong.component';
import { ThanhtoanhopdongComponent } from './screen/thuchienhopdong/thanhtoanhopdong/thanhtoanhopdong.component';
import { PhathopdongComponent } from './screen/thuchienhopdong/phathopdong/phathopdong.component';
import { QuyettoanhopdongComponent } from './screen/thuchienhopdong/quyettoanhopdong/quyettoanhopdong.component';
import { GiaonhanhanghoaComponent } from './screen/thuchienhopdong/giaonhanhanghoa/giaonhanhanghoa.component';
import { GiahanhopdongComponent } from './screen/thuchienhopdong/giahanhopdong/giahanhopdong.component';
import { LaphopdongbongxoComponent } from './screen/laphopdongbongxo/laphopdongbongxo.component';
import { LaphopdongsoiComponent } from './screen/laphopdongsoi/laphopdongsoi.component';
import { ModallaphopdongbongxoComponent } from './screen/laphopdongbongxo/modallaphopdongbongxo/modallaphopdongbongxo.component';
import { ModallaphopdongsoiComponent } from './screen/laphopdongsoi/modallaphopdongsoi/modallaphopdongsoi.component';
import { GiahanhopdongmodalComponent } from './screen/thuchienhopdong/giahanhopdong/giahanhopdongmodal/giahanhopdongmodal.component';
import { GiaonhanhanghoamodalComponent } from './screen/thuchienhopdong/giaonhanhanghoa/giaonhanhanghoamodal/giaonhanhanghoamodal.component';
import { PhathopdongmodalComponent } from './screen/thuchienhopdong/phathopdong/phathopdongmodal/phathopdongmodal.component';
import { QuyettoanhopdongmodalComponent } from './screen/thuchienhopdong/quyettoanhopdong/quyettoanhopdongmodal/quyettoanhopdongmodal.component';
import { ThanhtoanhopdongmodalComponent } from './screen/thuchienhopdong/thanhtoanhopdong/thanhtoanhopdongmodal/thanhtoanhopdongmodal.component';
import { GiaokehoachsanxuatComponent } from './screen/thuchienhopdong/giaokehoachsanxuat/giaokehoachsanxuat.component';
import { GiaokehoachsanxuatmodalComponent } from './screen/thuchienhopdong/giaokehoachsanxuat/giaokehoachsanxuatmodal/giaokehoachsanxuatmodal.component';

@NgModule({
  declarations: [
    HopdongComponent,
    DanhmuchinhthucthanhtoanComponent,
    ModaldanhmuchinhthucthanhtoanComponent,
    DanhmucloaihopdongComponent,
    ModaldanhmucloaihopdongComponent,
    DanhmucloaitienteComponent,
    ModaldanhmucloaitienteComponent,
    DanhmucthutucthanhtoanComponent,
    ModaldanhmucthutucthanhtoanComponent,
    DanhmuctrangthaibaolanhComponent,
    ModaldanhmuctrangthaibaolanhComponent,
    DmLoaiHopDongComponent,
    ModalloaihopdongComponent,
    DanhsachhopdongbongxoComponent,

    DanhsachhopdongbongxoComponent,


    ChitiethopdongbongxoComponent,

    ChitietdanhsachhanghoaComponent,

    ChitietdieukhoanthanhtoanComponent,

    ChitietnhansuthuchienComponent,

    ChitietbaolanhComponent,

    ChitietthanhtoanComponent,

    ChitietphathopdongComponent,

    ChitiethopdongbongxomodalComponent,

    ChitietdieukhoanmodalComponent,

    NhansuthuchienmodalComponent,

    ChitietbaolanhmodalComponent,

   

    ThanhtoanhopdongComponent,

    PhathopdongComponent,

    QuyettoanhopdongComponent,

    GiaonhanhanghoaComponent,

    GiahanhopdongComponent,

    LaphopdongbongxoComponent,

    LaphopdongsoiComponent,

    ModallaphopdongbongxoComponent,

    ModallaphopdongsoiComponent,

    GiahanhopdongmodalComponent,

    GiaonhanhanghoamodalComponent,

    PhathopdongmodalComponent,

    QuyettoanhopdongmodalComponent,
   
    ThanhtoanhopdongmodalComponent,
   
    GiaokehoachsanxuatComponent,
   
    GiaokehoachsanxuatmodalComponent,


  ],
  imports: [
    CommonModule,

    PanelModule,
    CardModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true, },
    { provide: LOCALE_ID, useValue: 'vi-VN' },
  ],
  entryComponents:[
    ChitiethopdongbongxomodalComponent,
    ModaldanhmuchinhthucthanhtoanComponent,
    ModaldanhmucloaihopdongComponent,
    ModaldanhmucloaitienteComponent,
    ModaldanhmuctrangthaibaolanhComponent,
    ModaldanhmucthutucthanhtoanComponent,
    QuyettoanhopdongmodalComponent,
    GiaokehoachsanxuatmodalComponent,
    ModallaphopdongbongxoComponent,
    ModallaphopdongsoiComponent,
    GiahanhopdongmodalComponent,
    GiaonhanhanghoamodalComponent,
    PhathopdongmodalComponent,
    ThanhtoanhopdongmodalComponent,
    ChitietbaolanhComponent,
    ChitietdanhsachhanghoaComponent,
    ChitietdieukhoanthanhtoanComponent,
    ChitietnhansuthuchienComponent,
    ChitietphathopdongComponent,
    ChitietthanhtoanComponent




  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HopdongModule { }

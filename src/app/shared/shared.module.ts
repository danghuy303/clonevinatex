import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isXoaPipe } from './../services/isXoaPipe';
import { VNDPipe } from './../services/vnd.pipe';
import { FilterPipe } from './../services/filter.pipe';
import { FilterByKeyPipe } from './../services/filterbykey.pipe';
import { EqualByKeyPipe } from './../services/equalbykey.pipe';
import { UppercaseFirstletterPipe } from './../services/uppercase-firstletter.pipe';
import { SumByKeyPipe } from './../services/sum.pipe';
import { SortByKeyPipe } from './../services/sortPipe.pipe';
import { CongDoanPipe } from './../services/congdoan.pipe';
import { TruncatePipe } from './../services/truncate.pipe';
import {CaPipe} from './../services/ca.pipe';
import { isDieuChinhPipe } from './../services/isDieuChinh.pipe';
import { BanGiaoTaiSanQuyTrinhComponent } from './ban-giao-tai-san-quy-trinh/ban-giao-tai-san-quy-trinh.component';
import { TaiLieuDanhSachComponent } from './tai-lieu-danh-sach/tai-lieu-danh-sach.component';
import { TraoDoiComponent } from './trao-doi/trao-doi.component';
import {AccordionModule} from 'primeng/accordion';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { FormsModule } from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ModalthongtinchitiettaisanComponent } from '../quantri/taisan/modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { InputSwitchModule } from 'primeng/inputswitch';
import { QRCodeModule } from 'angularx-qrcode';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ThongsokythuatComponent } from '../quantri/taisan/screen/thongsokythuat/thongsokythuat.component';
import { AntoanComponent } from '../quantri/taisan/screen/antoan/antoan.component';
import { LichbaoduongcopyComponent } from '../quantri/taisan/lichbaoduongcopy/lichbaoduongcopy.component';
import { BiendongComponent } from '../quantri/taisan/biendong/biendong.component';
import { ModalbaoduongComponent } from '../quantri/taisan/modal/modalbaoduong/modalbaoduong.component';
import { ThongtinkhauhaoComponent } from '../quantri/taisan/screen/thongtinkhauhao/thongtinkhauhao.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuyTrinhTemplateComponent } from './quy-trinh-template/quy-trinh-template.component';
import { DanhMucKeHoachKinhDoanhComponent } from './danh-muc-ke-hoach-kinh-doanh/danh-muc-ke-hoach-kinh-doanh.component';

@NgModule({
  declarations: [
    isXoaPipe,
    isDieuChinhPipe,
    VNDPipe,
    CaPipe,
    FilterPipe,
    FilterByKeyPipe,
    EqualByKeyPipe,
    TruncatePipe,
    SumByKeyPipe,
    CongDoanPipe,
    SortByKeyPipe,
    UppercaseFirstletterPipe,
    BanGiaoTaiSanQuyTrinhComponent,
    TaiLieuDanhSachComponent,
    TraoDoiComponent,
    ModalthongtinchitiettaisanComponent,
    ModalbaoduongComponent,
    ThongsokythuatComponent,
    AntoanComponent,
    LichbaoduongcopyComponent,
    BiendongComponent,
    ThongtinkhauhaoComponent,
    QuyTrinhTemplateComponent,
    DanhMucKeHoachKinhDoanhComponent
  ],
  imports: [
    AccordionModule,
    CommonModule,
    FileUploadModule,
    TableModule,
    ScrollPanelModule,
    FormsModule,
    InputTextareaModule,
    TabViewModule,
    PanelModule,
    CheckboxModule,
    RadioButtonModule,
    InputMaskModule,
    PasswordModule,
    InputSwitchModule,
    ButtonModule,
    CalendarModule,
    QRCodeModule,
    InputNumberModule,
    DropdownModule,
    InputTextModule,
    NgbModule,

  ],
  exports:[
    isXoaPipe,
    isDieuChinhPipe,
    VNDPipe,
    CaPipe,
    FilterPipe,
    FilterByKeyPipe,
    EqualByKeyPipe,
    TruncatePipe,
    SumByKeyPipe,
    CongDoanPipe,
    SortByKeyPipe,
    UppercaseFirstletterPipe,
    BanGiaoTaiSanQuyTrinhComponent,
    TaiLieuDanhSachComponent,
    TraoDoiComponent,
    ModalthongtinchitiettaisanComponent,
    ModalbaoduongComponent,
    ThongsokythuatComponent,
    AntoanComponent,
    ThongtinkhauhaoComponent,
    QuyTrinhTemplateComponent,
    DanhMucKeHoachKinhDoanhComponent
  ]
})
export class SharedModule { }

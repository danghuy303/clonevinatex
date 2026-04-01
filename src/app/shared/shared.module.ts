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
import { GetItemByCongDoanPipe } from './../services/getItemByCongDoan.pipe';
import { TruncatePipe } from './../services/truncate.pipe';
import { CaPipe } from './../services/ca.pipe';
import { isDieuChinhPipe } from './../services/isDieuChinh.pipe';
import { BanGiaoTaiSanQuyTrinhComponent } from './ban-giao-tai-san-quy-trinh/ban-giao-tai-san-quy-trinh.component';
import { TaiLieuDanhSachComponent } from './tai-lieu-danh-sach/tai-lieu-danh-sach.component';
import { TraoDoiComponent } from './trao-doi/trao-doi.component';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
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
import { DanhMucKeHoachModalComponent } from './danh-muc-ke-hoach-kinh-doanh/danh-muc-ke-hoach-modal/danh-muc-ke-hoach-modal.component';
import { PaginatorModule } from 'primeng/paginator';
import { NhapLieuKeHoachComponent } from './nhap-lieu-ke-hoach/nhap-lieu-ke-hoach.component';
import { NhapLieuKeHoachModalComponent } from './nhap-lieu-ke-hoach/nhap-lieu-ke-hoach-modal/nhap-lieu-ke-hoach-modal.component';
import { FilterbykeyCongDoanPipe } from '../services/filterbykey-cong-doan.pipe';
import { ModalquytrinhbaoduongComponent } from '../quantri/taisan/modal/modalquytrinhbaoduong/modalquytrinhbaoduong.component';
import { ChonmVatTuThayThePopUpComponent } from '../quantri/taisan/modal/chonm-vat-tu-thay-the-pop-up/chonm-vat-tu-thay-the-pop-up.component';
import { DanhSachVatTuCanThayTheComponent } from '../quantri/taisan/danh-sach-vat-tu-can-thay-the/danh-sach-vat-tu-can-thay-the.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TreeTableModule } from 'primeng/treetable';
import { CaculateKtexPipe } from '../services/caculate-ktex.pipe';
import { StepperComponent } from './stepper/stepper.component';
import { ProcessingOrderComponent } from './processing-order/processing-order.component';
import { StickycolumnDirective } from './stickycolumn.directive';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ChuyenbuocComponent } from './chuyenbuoc/chuyenbuoc.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { MarginleftDirective } from './marginleft.directive';
import { TieuhaonhienlieutabComponent } from '../quantri/taisan/tieuhaonhienlieutab/tieuhaonhienlieutab.component';
import { KiemdinhtaisantabComponent } from '../quantri/taisan/kiemdinhtaisantab/kiemdinhtaisantab.component';
import { BaohiemtaisantabComponent } from '../quantri/taisan/baohiemtaisantab/baohiemtaisantab.component';
import { NoiDungTraoDoiComponent } from './noi-dung-trao-doi/noi-dung-trao-doi.component';
import { DanhSachTaiLieuComponent } from './danh-sach-tai-lieu/danh-sach-tai-lieu.component';
import { DanhGiaComponent } from './danh-gia/danh-gia.component';
import { VuongMacComponent } from './vuong-mac/vuong-mac.component';
import { PhanCongCongViecComponent } from './phan-cong-cong-viec/phan-cong-cong-viec.component';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { EditorModule } from 'primeng/editor';
import { TaiLieuPhanCongCongViecComponent } from './tai-lieu-phan-cong-cong-viec/tai-lieu-phan-cong-cong-viec.component';
import { DinhMucNguyenLieuComponent } from './dinh-muc-nguyen-lieu/dinh-muc-nguyen-lieu.component';
import { DanhSachTaiLieuCongViecPopupComponent } from './danh-sach-tai-lieu-cong-viec-popup/danh-sach-tai-lieu-cong-viec-popup.component';

@NgModule({
  declarations: [
    isXoaPipe,
    isDieuChinhPipe,
    VNDPipe,
    CaPipe,
    FilterPipe,
    FilterByKeyPipe,
    FilterbykeyCongDoanPipe,
    EqualByKeyPipe,
    TruncatePipe,
    SumByKeyPipe,
    CongDoanPipe,
    SortByKeyPipe,
    CaculateKtexPipe,
    UppercaseFirstletterPipe,
    GetItemByCongDoanPipe,
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
    DanhMucKeHoachKinhDoanhComponent,
    DanhMucKeHoachModalComponent,
    NhapLieuKeHoachComponent,
    NhapLieuKeHoachModalComponent,
    ModalquytrinhbaoduongComponent,
    ChonmVatTuThayThePopUpComponent,
    DanhSachVatTuCanThayTheComponent,
    StepperComponent,
    ProcessingOrderComponent,
    StickycolumnDirective,
    UploadFileComponent,
    ChuyenbuocComponent,
    MarginleftDirective,
    TieuhaonhienlieutabComponent,
    KiemdinhtaisantabComponent,
    BaohiemtaisantabComponent,
    NoiDungTraoDoiComponent,
    DanhSachTaiLieuComponent,
    DanhGiaComponent,
    VuongMacComponent,
    PhanCongCongViecComponent,
    TaiLieuPhanCongCongViecComponent,
    DinhMucNguyenLieuComponent,
    DanhSachTaiLieuCongViecPopupComponent,
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
    PaginatorModule,
    SelectButtonModule,
    TreeTableModule,
    MultiSelectModule,
    DialogModule,
    EditorModule,
    TooltipModule
  ],
  exports: [
    isXoaPipe,
    isDieuChinhPipe,
    VNDPipe,
    CaPipe,
    FilterPipe,
    FilterByKeyPipe,
    FilterbykeyCongDoanPipe,
    EqualByKeyPipe,
    TruncatePipe,
    SumByKeyPipe,
    CongDoanPipe,
    SortByKeyPipe,
    CaculateKtexPipe,
    UppercaseFirstletterPipe,
    GetItemByCongDoanPipe,
    BanGiaoTaiSanQuyTrinhComponent,
    TaiLieuDanhSachComponent,
    TraoDoiComponent,
    ModalthongtinchitiettaisanComponent,
    ModalbaoduongComponent,
    ThongsokythuatComponent,
    AntoanComponent,
    ThongtinkhauhaoComponent,
    QuyTrinhTemplateComponent,
    DanhMucKeHoachKinhDoanhComponent,
    DanhMucKeHoachModalComponent,
    NhapLieuKeHoachComponent,
    NhapLieuKeHoachModalComponent,
    ModalquytrinhbaoduongComponent,
    CheckboxModule,
    SelectButtonModule,
    ChonmVatTuThayThePopUpComponent,
    DanhSachVatTuCanThayTheComponent,
    StepperComponent,
    StickycolumnDirective,
    UploadFileComponent,
    ChuyenbuocComponent,
    MarginleftDirective,
    TieuhaonhienlieutabComponent,
    KiemdinhtaisantabComponent,
    BaohiemtaisantabComponent,
    NoiDungTraoDoiComponent,
    DanhSachTaiLieuComponent,
    DanhGiaComponent,
    VuongMacComponent,
    PhanCongCongViecComponent,
    DinhMucNguyenLieuComponent
  ]
})
export class SharedModule { }

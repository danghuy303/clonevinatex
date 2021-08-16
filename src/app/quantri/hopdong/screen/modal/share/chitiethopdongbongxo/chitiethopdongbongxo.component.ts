import { UnixToDate } from 'src/app/services/globalfunction';
// import { StoreService } from './../../../../../../services/store.service';
import { HopDongService } from "./../../../../../../services/Hopdong/hopdong.service";
import { DanhMucHopDongService } from "./../../../../../../services/Hopdong/danhmuchopdong.service";
import { ChonquycachdonggoimodalComponent } from "./../../../../../quanlykhosanxuat/modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component";
import { ChonhanghoamodalComponent } from "./../../../../../quanlykhosanxuat/modals/chonhanghoamodal/chonhanghoamodal.component";
import { FileUploader } from "ng2-file-upload";
import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { CalcmodalComponent } from "src/app/quantri/modal/calcmodal/calcmodal.component";
import { ModalthongbaoComponent } from "src/app/quantri/modal/modalthongbao/modalthongbao.component";
import { UploadmodalComponent } from "src/app/quantri/modal/uploadmodal/uploadmodal.component";
import { Dat09Service } from "src/app/services/callApi";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { vn } from "src/app/services/const";
import {
  DateToDatePicker,
  DateToUnix,
  deepCopy,
  mapArrayForDropDown,
  merge,
  validVariable,
} from "src/app/services/globalfunction";
import { StoreService } from "src/app/services/store.service";
import { elementAt } from "rxjs/operators";
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-chitiethopdongbongxo",
  templateUrl: "./chitiethopdongbongxo.component.html",
  styleUrls: ["./chitiethopdongbongxo.component.css"],
})
export class ChitiethopdongbongxoComponent implements OnInit {

  getKhachHang: any = []
  getKhachHang1: any = []

  optionsVatLieu = [
    { label: 'Bông', value: 2 },
    { label: 'Xơ', value: 5 },
    { label: 'Vật tư khác', value: 6 }
  ]

  data: any = {};
  selected1: any = {};
  selected: any = {};

  listKhachHangA: any = []
  listLoaiMatHang: any = []
  listLoaiMatHang_ref: any = []
  listKhachHangB: any = []
  selectedCityCode: string;
  listHinhThucThanhToan: any = [];
  listNguyenVatLieu: any = [];
  listLoaiHopDong: any = [];
  listLoaiHopDongFull: any = [];
  listLoaiTienTe: any = [];
  listdmKhachHang: any = [];
  getdmKhachHangForCopy: any = {};
 
  canCopy: boolean = false;
  selectedCity = null;
  cities = [{ name: 'pushkar', code: 21 }, { name: 'nagpur', code: 22 }];
  @Input() item: any;
  @Input() loaiNguyenVatLieu: number;
  @Input() hopDong: any;
  @Output() onChange = new EventEmitter<any>();
  @Output() itemChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input("opt") opt: string;
  selectedReport: any;
  @Input() getSearchStatus: boolean;
@Output() getSearchStatusChange = new EventEmitter<boolean>();

  previousVal: any;
  currentVal: any;

  checkbutton: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(
    public activeModal: NgbActiveModal,
    private _servicesdmHopDong: DanhMucHopDongService,
    private _service: HopDongService,
    private _store: StoreService,
    private _servicesSanXuat: SanXuatService,
    private _toastr: ToastrService,
    private _modal: NgbModal,


  ) {
  }


  // this.item.DiaChi = this.getKhachHang.DiaChi;
  //  this.listdmKhachHang.iddmKhachHangA = this.item.iddmKhachHangA
  //  this.listdmKhachHang.DiaChi = this.item.DiaChi

  onChangBenA(event) {

    let selected = this.getKhachHang.find(
      (ele) => ele.Id === event.value
    );

    // this.item.iddmKhachHangB = selected?.Id;
    this.selected.DiaChi = selected?.DiaChi
    this.selected.ChucVu = selected?.ChucVu
    this.selected.Ma = selected?.Ma
    this.selected.MaSoThue = selected?.MaSoThue
    this.selected.NguoiDaiDien = selected?.NguoiDaiDien
    this.selected.SoDienThoai = selected?.SoDienThoai
    this.selected.SoFax = selected?.SoFax
    this.selected.Ten = selected?.Ten
    this.selected.listTaiKhoanNganHang = selected?.listTaiKhoanNganHang
  }

  onChangBenB(event) {
    let selected1 = this.getKhachHang1.find(
      (ele) => ele.Id === event.value
    );
    // this.item.iddmKhachHangB = selected1?.Id;
    this.selected1.DiaChi = selected1?.DiaChi
    this.selected1.ChucVu = selected1?.ChucVu
    this.selected1.Ma = selected1?.Ma
    this.selected1.MaSoThue = selected1?.MaSoThue
    this.selected1.NguoiDaiDien = selected1?.NguoiDaiDien
    this.selected1.SoDienThoai = selected1?.SoDienThoai
    this.selected1.SoFax = selected1?.SoFax
    this.selected1.Ten = selected1?.Ten
  this.selected1.listTaiKhoanNganHang = selected1?.listTaiKhoanNganHang
  }


  onChangeVatLieu(even) {

       this.onChange.emit(even);
   this.item.loaiNguyenVatLieu = even.value

   this._servicesSanXuat
   .GetListdmLoaiBongForHopDong(this.data.Loai =even.value)
   .subscribe((res: any) => {
     this.listLoaiMatHang = mapArrayForDropDown(res, "Ten", "Id");
     this.listLoaiMatHang_ref = res;
   });


  }

  ngOnInit() {
    
    // if(this.item.idKhachHang !== null){
    //   this._servicesSanXuat.dmKhachHang().GetListdmKhachHangTheoId(Id).subscribe((res: any) => {
    //     this.getdmKhachHangForCopy = res;
    //     this.item.DiaChi = this.getdmKhachHangForCopy.DiaChi
    //     this.item.ChucVu = this.getdmKhachHangForCopy.ChucVu
    //     this.item.Ma = this.getdmKhachHangForCopy.Ma
    //     this.item.MaSoThue = this.getdmKhachHangForCopy.MaSoThue
    //     this.item.NguoiDaiDien = this.getdmKhachHangForCopy.NguoiDaiDien
    //     this.item.SoDienThoai = this.getdmKhachHangForCopy.SoDienThoai
    //     this.item.SoFax = this.getdmKhachHangForCopy.SoFax
    //     this.item.Ten = this.getdmKhachHangForCopy.Ten
    //     this.item.listTaiKhoanNganHang = this.getdmKhachHangForCopy.listTaiKhoanNganHang


    //   })

    // }
    // else {


    // }


    this.GetFormOptions();
    this.item.ngayKy = UnixToDate(this.item.ngayKyUnix);
    this.item.ngayHieuLuc = UnixToDate(this.item.ngayHieuLucUnix);

    if (this.opt !== "edit") {
      // this.GetNextSoQuyTrinh();
      if (this._store.getCurrent()) {
        this.item.IdDuAn = this._store.getCurrent();
      }
    }

  }

  // GetgetdmKhachHangByIdForCopy({ value: Id }) {
  //   this._servicesSanXuat.dmKhachHang().GetListdmKhachHangTheoId(Id).subscribe((res: any) => {
  //     this.getdmKhachHangForCopy = res;
  //     this.item.DiaChi = this.getdmKhachHangForCopy.DiaChi
  //     this.item.ChucVu = this.getdmKhachHangForCopy.ChucVu
  //     this.item.Ma = this.getdmKhachHangForCopy.Ma
  //     this.item.MaSoThue = this.getdmKhachHangForCopy.MaSoThue
  //     this.item.NguoiDaiDien = this.getdmKhachHangForCopy.NguoiDaiDien
  //     this.item.SoDienThoai = this.getdmKhachHangForCopy.SoDienThoai
  //     this.item.SoFax = this.getdmKhachHangForCopy.SoFax
  //     this.item.Ten = this.getdmKhachHangForCopy.Ten
  //     this.item.listTaiKhoanNganHang = this.getdmKhachHangForCopy.listTaiKhoanNganHang


  //   })
  // }



  GetFormOptions() {
    console.log(this.item.loaiNguyenVatLieu);

 
  
    this._servicesdmHopDong
      .DanhMucLoaiHopDong()
      .GetListAll()
      .subscribe((res: any) => {
        this.listLoaiHopDong = mapArrayForDropDown(res, "ten", "id");
      });

    this._servicesSanXuat
      .dmKhachHang()
      .GetListOpt()
      .subscribe((res: any) => {

        // console.log('GetListOpt',  this.listdmKhachHang.DiaChi);
        this.getKhachHang = res
        this.getKhachHang1 = res
        this.listdmKhachHang = mapArrayForDropDown(res, "Ten", "Id");

      });


    this._servicesdmHopDong
      .DanhMucHinhThucThanhToan()
      .GetListAll()
      .subscribe((res: any) => {
        this.listHinhThucThanhToan = mapArrayForDropDown(res, "ten", "id");
      });
    this._servicesdmHopDong
      .DanhMucLoaiTienTe()
      .GetListAll()
      .subscribe((res: any) => {

        this.listLoaiTienTe = mapArrayForDropDown(res, "ten", "id");
      });
    // this._servicesdmHopDong
    //   .DanhMucLoaiHopDong()
    //   .GetListdm()
    //   .subscribe((res: Array<any>) => {
    //     this.listLoaiHopDong = mapArrayForDropDown(res, "ten", "id");
    //   });


  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      this.item.ID = this.item.ID !== undefined ? this.item.ID : 0;
      this.item.TenGui = data[data.length - 1].Name;
      this.item.TenGoc = data[data.length - 1].NameLocal;
      this.item.DuongDan = data[data.length - 1].Url;
    }, (reason) => {

    });
  }

 

  Loai(loai: boolean) {
    this.item.IsBong = loai;
  }
}

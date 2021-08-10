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

  optionsVatLieu: LoaiVatLieu[];
  cities: LoaiVatLieu[];


  listKhachHangA: any = []
  listKhachHangB: any = []
  selectedCityCode: string;
  listHinhThucThanhToan: any = [];
  listNguyenVatLieu: any = [];
  listLoaiHopDong: any = [];
  listLoaiHopDongFull: any = [];
  listLoaiTienTe: any = [];
  listdmKhachHang: any = [];
  getdmKhachHangForCopy: any = {};
  LoaiNguyenVatLieu: number
  canCopy: boolean = false;
  @Input() item: any;
  @Input() hopDong: any;
  @Output() itemChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input("opt") opt: string;
  selectedReport: any;
  selectedCity: any
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
    this.optionsVatLieu = [
      { name: 'Bông', code: 2 },
      { name: 'Xơ', code: 5 },
      { name: 'Vật tư khác', code: 6 },
    ]

  }


  // this.item.DiaChi = this.getKhachHang.DiaChi;
  //  this.listdmKhachHang.iddmKhachHangA = this.item.iddmKhachHangA
  //  this.listdmKhachHang.DiaChi = this.item.DiaChi

  onChangBenA(value) {

    this.getKhachHang.forEach( item => {
      console.log(item);
      this.item.DiaChi = item.DiaChi;
      this.item.Id = item.Id;
      this.item.Ma = item.Ma;
      // item.forEach( childValue => {
      //   console.log(childValue);
        
      //    childValue.additionalValue = item.value;
      // })
  } );
// console.log(this.item);

    this.getKhachHang.filter(val => {
     console.log(val.DiaChi);
     val.Ten = this.item.Ten
     val.DiaChi = this.item.DiaChi

      // this.item.Ten = val.Ten;
      // this.item.Id = val.iddmKhachHangA;
      // this.item.DiaChi = val.DiaChi;
      // this.item.ChucVu = val.ChucVu;
      // this.item.Ma = val.Ma;
      // this.item.MaSoThue = val.MaSoThue;
      // this.item.NguoiDaiDien = val.NguoiDaiDien;
      // this.item.SoDienThoai = val.SoDienThoai;
      // this.item.SoFax = val.SoFax;
      // this.item.listTaiKhoanNganHang = val.listTaiKhoanNganHang;


    })


  }

  onChangBenB() {

    this.getKhachHang1.filter(val => {



      this.item.iddmKhachHangB = val.Id;
      this.item.DiaChi = val.DiaChi;
      this.item.ChucVu = val.ChucVu;
      this.item.Ma = val.Ma;
      this.item.MaSoThue = val.MaSoThue;
      this.item.NguoiDaiDien = val.NguoiDaiDien;
      this.item.SoDienThoai = val.SoDienThoai;
      this.item.SoFax = val.SoFax;
      this.item.listTaiKhoanNganHang = val.listTaiKhoanNganHang;


    })


  }

  onChangeVatLieu(event) {
    console.log(this.item);

    this.item.LoaiNguyenVatLieu = event.value;
  }
  ngOnInit() {
    console.log(this.item);
    let Id = this.item.idKhachHang
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

  GetNextSoQuyTrinh() {
    this._service
      .QuyTrinhHopDong()
      .GetNextSoQuyTrinh()
      .subscribe((res: any) => {
        this.item.soQuyTrinh = res.data;
      });
  }

  Loai(loai: boolean) {
    this.item.IsBong = loai;
  }
}
interface LoaiVatLieu {
  name: string,
  code: number
}
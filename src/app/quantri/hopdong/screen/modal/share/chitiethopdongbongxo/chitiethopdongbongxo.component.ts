import { dinhDangSo, UnixToDate } from 'src/app/services/globalfunction';
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
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
export class ChitiethopdongbongxoComponent implements OnInit, OnChanges, DoCheck {
  @Input('listLoaiMatHang') listLoaiMatHang: any = [];
  @Output('listLoaiMatHangChange') listLoaiMatHangChange: EventEmitter<any> = new EventEmitter<any>();
  
  getKhachHang: any = []
  getKhachHang1: any = []

  optionsVatLieu = [
    { label: 'Bông', value: 2 },
    { label: 'Xơ', value: 5 },

  ]

  data: any = {};
  selected1: any = {};
  selected: any = {};
  dinhDangSo = dinhDangSo;

  listKhachHangA: any = []
  listKhachHangB: any = []
  selectedCityCode: string;
  listHinhThucThanhToan: any = [];
  listNguyenVatLieu: any = [];
  listLoaiHopDong: any = [];
  listLoaiHopDongFull: any = [];
  isHienHopDongGoc: any = false;
  listLoaiTienTe: any = [];
  listdmKhachHang: any = [];
  getdmKhachHangForCopy: any = {};
  listHopDongGoc: any = [];
  canCopy: boolean = false;
  selectedCity = null;
  cities = [{ name: 'pushkar', code: 21 }, { name: 'nagpur', code: 22 }];
  @Input('item') item: any = {};
  @Input('listHangHoa') hangHoa: any = {};
  @Input('itemcha') itemcha: any = {};
  
  @Input() isSoi;
  @Input() loaiNguyenVatLieu: number;
  @Input() hopDong: any = {};
  @Output() onChange = new EventEmitter<any>();
  @Output('itemChange') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output('itemchaChange') itemchaChange: EventEmitter<any> = new EventEmitter<any>();
  
  @Output() onVatLieu: EventEmitter<number> = new EventEmitter<number>();
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

  onChangBenA(event, isChange = false) {
    let IddmKhachHang = "";
    if(isChange === false)
      IddmKhachHang = event.value;
    else
      IddmKhachHang = this.item.iddmKhachHangA;
    let selected = this.getKhachHang.find(
      (ele) => ele.Id === IddmKhachHang
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

  onChangBenB(event, isChange = false) {
    let IddmKhachHang = "";
    if(isChange === false)
      IddmKhachHang = event.value;
    else
      IddmKhachHang = this.item.iddmKhachHangA;
    let selected1 = this.getKhachHang.find(
      (ele) => ele.Id === IddmKhachHang
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


  GetListdmLoaiBongForHopDong() {
    this._servicesSanXuat
      .GetListdmLoaiBongForHopDong(this.item.loai)
      .subscribe((res: any) => {
        this.listLoaiMatHang = mapArrayForDropDown(res, "Ten", "Id");

        // this.listLoaiMatHang = res;
        this.listLoaiMatHangChange.emit(this.listLoaiMatHang);
      });
this.getListHopDongGoc();
  }
  LayGiaTriHopDong() {
    if(this.item.isLayTheoGiaTriHangHoa == true)
      this.item.giaTri = this.hangHoa.giaTriHopDongMatHang || 0;
    if(this.isSoi === true)
      this.item.giaTri = this.item.thanhTien || 0;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.onChangBenA("",true);
    this.onChangBenB("",true);
    for (const propName in changes) {
      const chng = changes[propName];
      const cur = JSON.stringify(chng.currentValue.soQuyTrinh);
      const prev = JSON.stringify(chng.previousValue);
      console.log('ngOnChanges', chng);
      console.log('cur', cur);
      console.log('prev', prev);

      // this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  ngOnInit() {
    this.GetFormOptions();
    if (this.opt !== "edit") {
      this.itemcha.listTaiLieu=[];
      if (this._store.getCurrent()) {
        this.item.IdDuAn = this._store.getCurrent();
      }
    }
    else {
      this.getListHopDongGoc();
      this.itemcha.listTen = "";
      if(this.itemcha.lstFileUploadCu === undefined || this.itemcha.lstFileUploadCu === null)
        this.itemcha.lstFileUploadCu = [];
      this.itemcha.lstFileUploadCu.forEach(element => {
        this.itemcha.listTen += `${element.TenGoc}`;
      });
    }

  }


  ngDoCheck() {
    this.itemChange.emit(this.item);
    this.itemchaChange.emit(this.itemcha);
    this.listLoaiMatHangChange.emit(this.listLoaiMatHang);
    
  }

  GetFormOptions() {
    this._servicesdmHopDong
      .DanhMucLoaiHopDong()
      .GetListAll()
      .subscribe((res: any) => {
        this.listLoaiHopDong = mapArrayForDropDown(res, "ten", "id");
        this.listLoaiHopDongFull = res;
        if (this.opt === "edit") 
          this.chonHopDongGoc();
      });

    this._servicesSanXuat
      .dmKhachHang()
      .GetListOpt()
      .subscribe((res: any) => {
        this.getKhachHang = res
        this.getKhachHang1 = res
        this.listdmKhachHang = mapArrayForDropDown(res, "Ten", "Id");
        if (this.opt === "edit") {
          this.onChangBenA('', true)
          this.onChangBenB('', true)
    
        }
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
      let item: any = {}
      item.id = 0;
      item.TenGui = data[data.length - 1].Name;
      item.TenGoc = data[data.length - 1].NameLocal;
      item.DuongDan = data[data.length - 1].Url;
      // "idDuAn": 0,
      // "maDuAn": "string",
      this.itemcha.listTaiLieu.push(item);
      this.itemcha.listTen = "";
      this.itemcha.listTaiLieu.forEach(element => {
        this.itemcha.listTen += `${element.TenGoc}`;
      });

    }, (reason) => {

    });
  }



  Loai(loai: boolean) {
    this.item.IsBong = loai;
  }
  chonHopDongGoc(){
    if(this.isSoi !== true){
      let itemFind = this.listLoaiHopDongFull.filter(el=> el.id == this.item.iddmLoaiHopDong)
      if(itemFind!== undefined){
          if(itemFind[0].ma == "MUA" || itemFind[0].ma == "BAN")
            this.isHienHopDongGoc = true;
      }
    }
    this.getListHopDongGoc();
  }
  getListHopDongGoc(){
    this._service.QuyTrinhHopDong().GetListAll(this.item.loai || '', this.item.iddmLoaiHopDong || 0)
      .subscribe((res: Array<any>) => {
        this.listHopDongGoc = mapArrayForDropDown(res, "soHopDong", "id");
      });


  }
}

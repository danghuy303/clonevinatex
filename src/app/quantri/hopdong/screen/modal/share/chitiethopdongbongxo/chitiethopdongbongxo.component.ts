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

@Component({
  selector: "app-chitiethopdongbongxo",
  templateUrl: "./chitiethopdongbongxo.component.html",
  styleUrls: ["./chitiethopdongbongxo.component.css"],
})
export class ChitiethopdongbongxoComponent implements OnInit {
  listHinhThucThanhToan: any = [];

  listLoaiHopDong: any = [];
  listLoaiHopDongFull: any = [];
  listLoaiTienTe: any = [];
  @Input() item: any;
  @Input() hopDong: any;
  @Output() itemChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input("opt") opt: string;
  cities: City[];

  selectedCityCode: string;
  checkbutton: any = {};
  lang: any = vn;
  yearRange: string = `${
    new Date().getFullYear() - 50
  }:${new Date().getFullYear()}`;

  constructor(
    public activeModal: NgbActiveModal,
    private _servicesdmHopDong: DanhMucHopDongService,
    private _service: HopDongService,
    private _store: StoreService,
    private _servicesSanXuat: SanXuatService,
    private _toastr: ToastrService,
    private _modal: NgbModal

  ) {
    this.cities = [
      {name: 'Bông', code: 'B'},
      {name: 'Xơ', code: 'X'},
      {name: 'Vật tư phụ', code: 'VT'},
    
  ];
  }

  ngOnInit() {
    this.GetFormOptions();

    if (this.opt !== "edit") {
      // this.GetNextSoQuyTrinh();
      if (this._store.getCurrent()) {
        this.item.IdDuAn = this._store.getCurrent();
      }
    }
  }

  GetFormOptions() {
    this._servicesdmHopDong
      .DanhMucLoaiHopDong()
      .GetListAll()
      .subscribe((res: any) => {
        this.listLoaiHopDong = mapArrayForDropDown(res, "ten", "id");
      });

      this._servicesdmHopDong
      .DanhMucLoaiTienTe()
      .GetListAll()
      .subscribe((res: any) => {
        this.listLoaiTienTe = mapArrayForDropDown(res, "ten", "id");
      });


      this._servicesdmHopDong
      .DanhMucHinhThucThanhToan()
      .GetListAll()
      .subscribe((res: any) => {
        this.listHinhThucThanhToan = mapArrayForDropDown(res, "ten", "id");
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
interface City {
  name: string,
  code: string
}
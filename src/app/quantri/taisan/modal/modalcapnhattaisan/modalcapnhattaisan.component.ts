import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { API } from 'src/app/services/host';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalcapnhattaisanconComponent } from '../modalcapnhattaisancon/modalcapnhattaisancon.component';

@Component({
  selector: 'app-modalcapnhattaisan',
  templateUrl: './modalcapnhattaisan.component.html',
  styleUrls: ['./modalcapnhattaisan.component.css']
})
export class ModalcapnhattaisanComponent implements OnInit {

  item: any = {};
  opt: any = "";
  title: any = "";
  lang: any = vn;
  checkbutton: any = {};
  uploader: FileUploader;
  // newTableItem: any = {};
  listDonVi: any = [];
  listLoaiTaiSan: any = [];
  listTinhTrangTaiSan: any = [];
  listNhaSanXuat: any = [];


  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
  ) {

  }

  ngOnInit() {
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20 };
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();
    let ls2 = this._danhMucTaiSan.DanhMucDonViTinh().GetList(data).toPromise();
    let ls3 = this._danhMucTaiSan.DanhMucTinhTrangTaiSan().GetList(data).toPromise();
    let ls4 = this._danhMucTaiSan.DanhMucHangSanXuat().GetList(data).toPromise();

    Promise.all([ls1, ls2, ls3, ls4]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data.Items, "Ten", "Id");
      this.listDonVi = mapArrayForDropDown(values[1].Data.Items, "Ten", "Id");
      this.listTinhTrangTaiSan = mapArrayForDropDown(values[2].Data.Items, "Ten", "Id");
      this.listNhaSanXuat = mapArrayForDropDown(values[3].Data.Items, "Ten", "Id");

      this.KiemTraButtonModal();
      if (this.opt === 'add') {
        this.title = "Thêm mới";    
        this.item = {
          TaiSan: {
            Id: "",
            isXoa: false,
            listFileDinhKem: [],
          },
          listTaiSan: [],
        }    
        this.GetNextSoQuyTrinh();
      }
      else {
        this.title = "Cập nhật";
        this.GetIem();
      }
    });
  }

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  add() {
    // if (!validVariable(this.newTableItem.thoiGianCapCang) || !validVariable(this.newTableItem.thoiGianDuKien)) {
    //   this.toastr.error('Vui lòng chọn thời gian')
    // }
    // if (this.item.listInvoice == undefined || this.item.listInvoice == null)
    //   this.item.listInvoice = [];
    // this.newTableItem.id = "";
    // this.newTableItem.idKeHoachNhapBong = this.item.id;
    // this.newTableItem = {
    //   "id": "",
    //   "idKeHoachNhapBong": this.item.id,
    // }
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.NhapTaiSan().GetNextSoQuyTrinh().subscribe((res: any) => {     
      this.item.SoQuyTrinh = res.Data;
    })
  }

  GetIem() {
    this._serviceTaiSan.NhapTaiSan().Get(this.item.id || "").subscribe((res: any) => {
      this.item = res;
    });
  }

  GhiLai() {
    console.log(this.item);
  }

  ThemMoiTaiSanCon() {
    let modalRef = this._modal.open(ModalcapnhattaisanconComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.item = {};
    modalRef.result
      .then((res: any) => {
      })
      .catch((er) => {

      });
  }

  CapNhatTaiSanCon(item) {
    let modalRef = this._modal.open(ModalcapnhattaisanconComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = item;
    modalRef.result
      .then((res: any) => {

      })
      .catch((er) => {

      });
  }

  XoaTaiSanCon(item) {
    // let modalRef = this._modal.open(ModalcapnhattaisanconComponent, {
    //   size: "fullscreen-100",
    //   backdrop: "static",
    // });
    // modalRef.componentInstance.opt = "edit";
    // modalRef.componentInstance.item = item;
    // modalRef.result
    //   .then((res: any) => {

    //   })
    //   .catch((er) => {

    //   });
  }

}

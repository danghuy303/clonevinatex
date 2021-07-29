import { AuthenticationService } from "./../../../../../services/auth.service";
import { DanhMucHopDongService } from "src/app/services/Hopdong/danhmuchopdong.service";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { FileUploader } from "ng2-file-upload";
import { ChonquycachdonggoimodalComponent } from "../../../../quanlykhosanxuat/modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component";
import { ChonhanghoamodalComponent } from "../../../../quanlykhosanxuat/modals/chonhanghoamodal/chonhanghoamodal.component";

import { Component, DoCheck, OnInit } from "@angular/core";
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

@Component({
  selector: "app-chitiethopdongbongxomodal",
  templateUrl: "./chitiethopdongbongxomodal.component.html",
  styleUrls: ["./chitiethopdongbongxomodal.component.css"],
})
export class ChitiethopdongbongxomodalComponent implements OnInit {
  opt: any = "add";
  item: any = {};
  hopDong: any = {};
  userInfo: any;
  lang: any = vn;
  filter: any = {
    keyWord: "",
  };

  checkedAll: boolean = false;
  checkbutton: any = {};

  yearRange: string = `${new Date().getFullYear()}:${
    new Date().getFullYear() + 5
  }`;
  constructor(
    public activeModal: NgbActiveModal,
    private _auth: AuthenticationService,
    public _modal: NgbModal,
    private _servicesdmHopDong: DanhMucHopDongService,
    private _service: HopDongService,
    private _store: StoreService,
    private _servicesSanXuat: SanXuatService,
    private _toastr: ToastrService
  ) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    console.log(this.item.hopDong.id);
    this.checkbutton = {
      Ghi: false,
      Xoa: false,
      ChuyenTiep: false,
      KhongDuyet: false,
    };
    // this.GetFormOptions();
    this.GetNextSoQuyTrinh();
    if (this.opt !== "edit") {
      this.KiemTraButtonModal();
    }
  }

  KiemTraButtonModal() {
    this._servicesSanXuat
      .KiemTraButton(this.item.id || "", this.item.idTrangThai || "")
      .subscribe((res: any) => {
        console.log((this.checkbutton = res));
        this.checkbutton = res;
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

  HoanThanh() {
    this._service
      .QuyTrinhHopDong()
      .Set(this.item)
      .subscribe((res: any) => {
        console.log(res);
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.activeModal.close();
          } else {
            this._toastr.error(res.message);
          }
        }
      });
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message =
      "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._service
          .QuyTrinhHopDong()
          .Deletes(this.item.hopDong.id)
          .subscribe((res: any) => {
            console.log(res);
            if (res?.statusCode === 200) {
              this.activeModal.close();
              this._toastr.success(res.message);
            } else {
            
            
              this._toastr.error(res.message);
            }
          });
      })
      .catch((er) => console.log(er));
  }
}

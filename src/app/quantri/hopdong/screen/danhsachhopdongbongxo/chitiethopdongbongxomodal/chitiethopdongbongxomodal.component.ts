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
// export class ChitiethopdongbongxomodalComponent implements OnInit{
//   constructor(public activeModal:NgbActiveModal){}
//   ngOnInit() {
//     // this.updateInjectorAndContext();
//   }
// }
export class ChitiethopdongbongxomodalComponent implements OnInit {
  opt: any = "add";
  item: any = {};
  userInfo: any;
  lang: any = vn;
  filter: any = {
    keyWord: "",
  };
  listLoaiHopDong: any = [];
  checkedAll: boolean = false;
  checkbutton: any = {
    Ghi: true,
    Xoa: true,
    KhongDuyet: true,
    ChuyenTiep: true,
  };
  listPhuongAnSapXep: any = [];
  listDonVi: any = [];

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
    // this.GetFormOptions();
    // if (this.opt !== "edit") {
    //   this.GetNextSoQuyTrinh();
    //   if (this._store.getCurrent()) {
    //     this.item.IdDuAn = this._store.getCurrent();
    //   }
    // }
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
            this.opt = "edit";

            this.item = res.objectReturn;
          } else {
            this._toastr.error(res.detail);
          }
        }
      });
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._service.QuyTrinhHopDong().Deletes(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this._toastr.success(res.message)
          this.activeModal.close();
        } else {
          this._toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

}

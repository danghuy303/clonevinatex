import { AuthenticationService } from "./../../../../../services/auth.service";
import { DanhMucHopDongService } from "src/app/services/Hopdong/danhmuchopdong.service";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { FileUploader } from "ng2-file-upload";
import { ChonquycachdonggoimodalComponent } from "../../../../quanlykhosanxuat/modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component";
import { ChonhanghoamodalComponent } from "../../../../quanlykhosanxuat/modals/chonhanghoamodal/chonhanghoamodal.component";

import { Component, DoCheck, Input, OnInit } from "@angular/core";
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
  UnixToDate,
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
title:string
  item: any = {};
  hopDong: any = {};
  listDieuKhoanThanhToan: any = [];
  userInfo: any;
  lang: any = vn;
  isBongXo:boolean = true
  filter: any = {
    keyWord: "",
  };

  checkedAll: boolean = false;
  checkbutton: any = {};

  yearRange: string = `${new Date().getFullYear()}:${new Date().getFullYear() + 5
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
console.log(this.item);

    this.item.ngayKy = UnixToDate(this.item.ngayKyUnix);
    this.item.ngayHieuLuc = UnixToDate(this.item.ngayHieuLucUnix);
    this.KiemTraButtonModal();
    this.checkbutton = {
      Ghi: false,
      Xoa: false,
      ChuyenTiep: false,
      KhongDuyet: false,
    };
    // this.GetFormOptions();
    this.GetNextSoQuyTrinh();
    if (this.opt !== "edit") {
this.title = 'Thêm mới hợp đồng nguyên/vật liệu'
    
    }else {
      
      this.title = "Hợp đồng nguyên/vật liệu"
    }
  }

  KiemTraButtonModal() {
    this._servicesSanXuat
      .KiemTraButton(this.item.hopDong.id || "", this.item.hopDong.idTrangThai || "")
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
        this.item.hopDong.soQuyTrinh = res.data;
      });
  }

  ValidData() {
    if (!validVariable(this.item.hopDong.iddmLoaiHopDong)) {
      this._toastr.error("Vui lòng chọn loại hợp đồng");
      return false;
    }

    if (!validVariable(this.item.hopDong.tenHopDong)) {
      this._toastr.error("Vui lòng chọn tên hợp đồng");
      return false;
    }

    if (!validVariable(this.item.hopDong.soHopDong)) {
      this._toastr.error("Vui lòng chọn số hợp đồng");
      return false;
    }


    return true;
  }
  GhiLai() {

    if (this.ValidData()) {
      this.item.hopDong.ngayKyUnix = DateToUnix(this.item.hopDong.ngayKy);
      this.item.hopDong.ngayHieuLucUnix = DateToUnix(this.item.hopDong.ngayHieuLuc);
     
      this._service
        .QuyTrinhHopDong()
        .Set(this.item)
        .subscribe((res: any) => {
      console.log(res);
      
          if (res) {
            if (res?.statusCode === 200) {
              // this.activeModal.close();
              // setTimeout(() => {
              //   checkbutton.GhiLai = false
              // }, 1000);
              this._toastr.success(res.message);
            } else {
              this._toastr.error(res.message);
            }
          }
        });
    }
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
  ChuyenTiep() {
    this.item.hopDong.ngayKyUnix = DateToUnix(this.item.hopDong.ngayKy);
    this.item.hopDong.ngayHieuLucUnix = DateToUnix(this.item.hopDong.ngayHieuLuc);
   
    this._service.QuyTrinhHopDong().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res?.statusCode === 200) {
          this._toastr.success(res.message)
          this.activeModal.close();
        } else {
          this._toastr.error(res.message);
        }
      }
    })

  }
  KhongDuyet() {
    this.item.hopDong.ngayKyUnix = DateToUnix(this.item.hopDong.ngayKy);
    this.item.hopDong.ngayHieuLucUnix = DateToUnix(this.item.hopDong.ngayHieuLuc);
   
    this._service.QuyTrinhHopDong().KhongDuyet(this.item).subscribe((res: any) => {
      if (res) {
        if (res?.statusCode === 200) {
          this._toastr.success(res.message)
          this.activeModal.close();
        } else {
          this._toastr.error(res.message);
        }
      }
    })

  }

 
}

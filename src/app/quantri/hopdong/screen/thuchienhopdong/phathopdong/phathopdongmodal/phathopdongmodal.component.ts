import { SanXuatService } from "./../../../../../../services/callApiSanXuat";
import { vn } from "./../../../../../../services/const";
import { ModalthongbaoComponent } from "./../../../../../modal/modalthongbao/modalthongbao.component";
import { UnixToDate, validVariable } from "src/app/services/globalfunction";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HopdongRoutingModule } from "src/app/quantri/hopdong/hopdong-routing.module";

@Component({
  selector: "app-phathopdongmodal",
  templateUrl: "./phathopdongmodal.component.html",
  styleUrls: ["./phathopdongmodal.component.css"],
})
export class PhathopdongmodalComponent implements OnInit {
  lang: any = vn;
  checkbutton: any = {};
  opt: any = "";
  listHopDong: any = [];
  item: any = {};
  data: any = {};

  yearRange: string = `${
    new Date().getFullYear() - 50
  }:${new Date().getFullYear()}`;
  constructor(
    public activeModal: NgbActiveModal,
    public _toastr: ToastrService,
    public _modal: NgbModal,
    private _services: HopDongService,
    private _servicesDungChung: SanXuatService
  ) {}

  ngOnInit(): void {
    this.checkbutton = {
      Ghi: false,
      Xoa: false,
      ChuyenTiep: false,
      KhongDuyet: false,
    };
    // if (this.opt !== "edit") {
    //   this.GetNextSoQuyTrinh();
    // } else {
    //   this.KiemTraButtonModal();
    // }
    // if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
    //   this.item.Ngay = UnixToDate(this.item.NgayUnix);
    // }
    // this.data.currentPage = 0;
    
    this.getListHopDong();
   
    // this.getListCapBong();
  }

  // validate form
  ValidData() {
    if (!validVariable(this.data.lyDoKhongDuyet)) {
      this._toastr.error("Vui lòng chọn lý do");
      return false;
    }
    // if (!validVariable(this.data.idHopDong)) {
    //   this._toastr.error('Vui lòng chọn hợp đồng')
    //   return false
    // }

    return true;
  }
  KiemTraButtonModal() {
    this._servicesDungChung
      .KiemTraButton(this.item.id || "", this.item.idTrangThai || "")
      .subscribe((res: any) => {
        console.log(this.checkbutton = res);
        this.checkbutton = res;
      });
  }

  ChuyenTiep() {
    this._services
      .PhatHopDong()
      .ChuyenTiep(this.item)
      .subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.activeModal.close();
          } else {
            this._toastr.error(res.message);
          }
        }
      });
    // if (this.item.Ngay === null || this.item.Ngay === undefined) {
    //   this._toastr.error("Bạn chưa chọn  ngày");
    // }
    // else {
    //   if (this.newTableItem.SoKien!= undefined && this.newTableItem.SoCan!= undefined) {
    //     this.add();
    //   }
    //   if (this.item.Ngay !== null && this.item.Ngay !== undefined)
    //     this.item.NgayUnix = DateToUnix(this.item.Ngay);

    //   this._services.QuyTrinhPhieuBongPhe().ChuyenTiep(this.item).subscribe((res: any) => {
    //     if (res) {
    //       if (res.State === 1) {
    //         this._toastr.success(res.message)
    //         this.activeModal.close();
    //       } else {
    //         this._toastr.error(res.message);
    //       }
    //     }
    //   })
    // }
  }
  KhongDuyet() {
    this._services
      .PhatHopDong()
      .KhongDuyet(this.item)
      .subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.activeModal.close();
          } else {
            this._toastr.error(res.message);
          }
        }
      });
    // if (this.item.Ngay === null || this.item.Ngay === undefined) {
    //   this._toastr.error("Bạn chưa chọn  ngày");
    // }
    // else {
    //   if (this.newTableItem.SoKien!= undefined && this.newTableItem.SoCan!= undefined) {
    //     this.add();
    //   }
    //   if (this.item.Ngay !== null && this.item.Ngay !== undefined)
    //     this.item.NgayUnix = DateToUnix(this.item.Ngay);
    //   this._services.QuyTrinhPhieuBongPhe().KhongDuyet(this.item).subscribe((res: any) => {
    //     if (res) {
    //       if (res.State === 1) {
    //         this._toastr.success(res.message)
    //         this.activeModal.close();
    //       } else {
    //         this._toastr.error(res.message);
    //       }
    //     }
    //   })
    // }
  }

  GetNextSoQuyTrinh() {
    // this._services.QuyTrinhPhieuBongPhe().GetNextSo().subscribe((res: any) => {
    //   this.item.SoQuyTrinh = res.SoQuyTrinh;
    // })
  }

  GhiLai() {
    if (this.ValidData()) {
      this._services
        .PhatHopDong()
        .Set(this.item)
        .subscribe((res: any) => {
          if (res) {
            if (res.State === 1) {
              this._toastr.success(res.message);
              this.opt = "edit";
              this.item = res.objectReturn;
              this.KiemTraButtonModal();
              // this.KiemTraButtonModal();
            } else {
              this._toastr.error(res.message);
            }
          }
        });
    }

    // this.add();
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message =
      "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        console.log(res);
        this._services
          .PhatHopDong()
          .Delete(this.item)
          .subscribe((res: any) => {
            console.log(res);
            if (res?.State === 1) {
              this._toastr.success(res.message);
              this.activeModal.close();
            } else {
              this._toastr.error(res.message);
            }
          });
      })
      .catch((er) => console.log(er));
  }
  getListHopDong() {
    this.KiemTraButtonModal();
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
   

    // this._services.().subscribe((res: any) => {
    //   this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    // })
  }

  add() {
    // if (this.item.listItem == undefined || this.item.listItem == null)
    //   this.item.listItem = [];
    // this.item.listItem.push(this.newTableItem);
    // this.newTableItem = {}
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === "" || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
}

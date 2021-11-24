import { DanhMucHopDongService } from './../../../../../../services/Hopdong/danhmuchopdong.service';

import { SanXuatService } from "./../../../../../../services/callApiSanXuat";
import { vn } from "./../../../../../../services/const";
import { ModalthongbaoComponent } from "./../../../../../modal/modalthongbao/modalthongbao.component";
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from "src/app/services/globalfunction";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-thanhtoanhopdongmodal',
  templateUrl: './thanhtoanhopdongmodal.component.html',
  styleUrls: ['./thanhtoanhopdongmodal.component.css']
})
export class ThanhtoanhopdongmodalComponent implements OnInit {
  lang: any = vn;
  checkbutton: any = {};
  opt: any = "";
  listHinhThucThanhToan: any = []
  listSoHopDong: any = []
  listInvoice: any = []
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
    private _servicesDungChung: SanXuatService,
     private _servicesdmHopDong : DanhMucHopDongService
  ) {}

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
   this.GetFormOptions()
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
    if (!validVariable(this.item.noiDung)) {
      this._toastr.error("Vui lòng nhập nội dung");
      return false;
    }
    if (!validVariable(this.item.idHopDong)) {
      this._toastr.error('Vui lòng chọn hợp đồng')
      return false
    }

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




  GetNextSoQuyTrinh() {
    this._services
    .PhatHopDong()
    .GetNextSoQuyTrinh()
    .subscribe((res: any) => {
      console.log(res);
      this.item.soQuyTrinh = res.data;
    });
  }

  GhiLai() {
    if (this.ValidData()) {
      this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
      this._services
        .QuyTrinhThanhToan()
        .Set(this.item)
        .subscribe((res: any) => {
        
            if (res?.State === 200) {
              this.activeModal.close();
              this._toastr.success(res.message);
              this.opt = "edit";
              this.item = res.objectReturn;
              this.KiemTraButtonModal();
              // this.KiemTraButtonModal();
            } else {
              this._toastr.error(res.message);
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
        this._services
          .QuyTrinhThanhToan()
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
  ChuyenTiep() {
    this._services.QuyTrinhThanhToan().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this._services.QuyTrinhThanhToan().KhongDuyet(this.item).subscribe((res: any) => {
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

  GetFormOptions() {
      this._servicesdmHopDong
      .DanhMucThuTucThanhToan()
      .GetListAll()
      .subscribe((res: any) => {
        this.listHinhThucThanhToan = mapArrayForDropDown(res, "ten", "id");
      });
  }

  getListHopDong() {
    this.KiemTraButtonModal();
 

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

  // delete(index) {
  //   let item = this.item.listItem.splice(index, 1)[0];
  //   if (item.Id === "" || item.Id === null || item.Id === undefined) {
  //   } else {
  //     item.isXoa = true;
  //     this.item.listItem.push(JSON.parse(JSON.stringify(item)));
  //   }
  // }
}

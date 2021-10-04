

import { SanXuatService } from "./../../../../../../services/callApiSanXuat";
import { vn } from "./../../../../../../services/const";
import { ModalthongbaoComponent } from "./../../../../../modal/modalthongbao/modalthongbao.component";
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from "src/app/services/globalfunction";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ChonhanghoamodalComponent } from "src/app/quantri/quanlykhosanxuat/modals/chonhanghoamodal/chonhanghoamodal.component";
import { ChonquycachdonggoimodalComponent } from "src/app/quantri/quanlykhosanxuat/modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component";
@Component({
  selector: 'app-giaokehoachsanxuatmodal',
  templateUrl: './giaokehoachsanxuatmodal.component.html',
  styleUrls: ['./giaokehoachsanxuatmodal.component.css']
})
export class GiaokehoachsanxuatmodalComponent implements OnInit {
  lang: any = vn;
  checkbutton: any = {Ghi: true,
    Xoa: false,
    ChuyenTiep: false,
    KhongDuyet: false,};
  opt: any = "";
  listHopDong: any = [];
  listPhanXuong: any = []; listMatHang: any = [];
  item: any = {};
  filter: any = {};
  listDonVi: any = [];
  listQuyCachDongGoi: any = [];
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
    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
    } else {
      this.KiemTraButtonModal();
    }
    this.item.ngayBatDau = UnixToDate(this.item.ngayBatDauUnix);
    this.item.ngayKetThuc = UnixToDate(this.item.ngayKetThucUnix);
    this.getListHopDong();
    this._servicesDungChung.GetOptions().GetNhaMay().subscribe((res: Array<any>) => {
      this.listDonVi = mapArrayForDropDown(res, 'TenDuAn', 'Id');
      if (validVariable(this.item.idDuAn)) {
        this.getPhanXuong(this.item.idDuAn, true);
      }
    });
    this.getListMatHang();
    this._servicesDungChung.dmQuyCachDongGoi().GetList().subscribe((res: Array<any>) => {
      this.listQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');;
    })
  }
  getPhanXuong(IdDuAn, update?) {
    this.listPhanXuong = [];
    if (!update) {
      this.item.iddmPhanXuong = null;
    }
    this._servicesDungChung.GetOptions().GetPhanXuong(IdDuAn).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
    })
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
    this._services.GiaoKeHoachSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
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
  KhongDuyet() {
    this._services.GiaoKeHoachSanXuat().KhongDuyet(this.item).subscribe((res: any) => {
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

  GetNextSoQuyTrinh() {
    this._services.GiaoKeHoachSanXuat().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.soQuyTrinh = res.data;
    })
  }

  GhiLai() {
    this._services
      .GiaoKeHoachSanXuat()
      .Set(this.item)
      .subscribe((res: any) => {
        if (res) {
          if (res?.statusCode === 200) {
            this._toastr.success(res.message);
            this.opt = "edit";
            this.item = res.data;
            this.KiemTraButtonModal();
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
        console.log(res);
        this._services
          .GiaoKeHoachSanXuat()
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
  chonHangHoa() {
    let modalRef = this._modal.open(ChonhanghoamodalComponent, {
      size: 'xl'
    })
    modalRef.componentInstance.items = this.listMatHang;
    modalRef.componentInstance.selectedItems = [];
    modalRef.componentInstance.IdQuyTrinh = this.item.id;
    modalRef.componentInstance.opt = "";    
    modalRef.result.then(res => {
      if (res.length > 0) {
        res.forEach(obj => this.item.listItem.push(obj))
      }
    }).catch(er => {
      console.log(er);
    })
  }
  validDenNgay(mathang, e) {
    if (validVariable(mathang.ngayBatDau)) {
      if ((DateToUnix(e) - DateToUnix(mathang.ngayBatDau)) < 0) {
        this._toastr.warning('Đến ngày phải lớn hơn Từ ngày!')
        setTimeout(() => {
          mathang.ngayKetThuc = null;
        }, 500)
      } else {
        this.TinhSoCa();
      }
    } else {
      setTimeout(() => {
        mathang.ngayKetThuc = null;
      }, 500)
      this._toastr.warning('Vui lòng chọn Từ ngày trước!')
    }
  }
  TinhSoCa() {
    console.log(this.item.ngayBatDau, this.item.ngayKetThuc);
    if (validVariable(this.item.ngayBatDau) && validVariable(this.item.ngayKetThuc)) {
      this.item.ngayBatDauUnix = DateToUnix(this.item.ngayBatDau);
      this.item.ngayKetThucUnix = DateToUnix(this.item.ngayKetThuc);
      if (!validVariable(this.item.tongSoCa) || this.item.tongSoCa === 0) {
        this.item.tongSoCa = ((this.item.ngayKetThucUnix - this.item.ngayBatDauUnix) / (24 * 3600) + 1) * 3;
      }
    }
  }
  getListMatHang(){
    this._services.GiaoKeHoachSanXuat().GetListMatHangGiaoKeHoachSanXuat(this.item.idDuAn).subscribe((res:any) => {
      this.listMatHang = res.data;
      this.listMatHang.forEach(obj=>{
        obj.Ne = obj.ne;
        obj.DoSan = obj.doSan;
        obj.Ma = obj.ma;
        obj.TendmLoaiSoi = obj.tendmLoaiSoi;
        obj.Ten = obj.ten;
        obj.DaGiao = obj.daGiao;
        obj.GhiChu = obj.ghiChu;
        obj.TenHopDong = obj.tenHopDong;
        obj.SoHopDong = obj.soHopDong;
      });
    })
  }
  chonQuyCachDongGoi(item) {
    let modalRef = this._modal.open(ChonquycachdonggoimodalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.items = this.listQuyCachDongGoi;
    modalRef.componentInstance.layitem = item;
    modalRef.componentInstance.selectedItems = deepCopy(item.listItem || []);
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.result.then(res => {
      item.isEdited = true;
      item.listItem = res.listItem;
    }).catch(er => {
      console.log(er);
    })
  }
}

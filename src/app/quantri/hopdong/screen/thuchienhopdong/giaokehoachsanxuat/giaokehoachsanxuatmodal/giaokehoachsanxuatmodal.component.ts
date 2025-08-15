import { SanXuatService } from "./../../../../../../services/callApiSanXuat";
import { vn } from "./../../../../../../services/const";
import { ModalthongbaoComponent } from "./../../../../../modal/modalthongbao/modalthongbao.component";
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from "src/app/services/globalfunction";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HopdongchonhanghoagiaokehoachmodalComponent } from "../hopdongchonhanghoagiaokehoachmodal/hopdongchonhanghoagiaokehoachmodal.component";
import { HopdongchonquycachdonggoimodalComponent } from "../hopdongchonquycachdonggoimodal/hopdongchonquycachdonggoimodal.component";
import { CalcmodalComponent } from "src/app/quantri/modal/calcmodal/calcmodal.component";
@Component({
  selector: 'app-giaokehoachsanxuatmodal',
  templateUrl: './giaokehoachsanxuatmodal.component.html',
  styleUrls: ['./giaokehoachsanxuatmodal.component.css']
})
export class GiaokehoachsanxuatmodalComponent implements OnInit {
  lang: any = vn;
  checkbutton: any = {
    Ghi: true,
    Xoa: false,
    ChuyenTiep: false,
    KhongDuyet: false,
  };
  opt: any = "";
  listHopDong: any = [];
  listPhanXuong: any = []; listMatHang: any = [];
  item: any = {};
  filter: any = {};
  listDonVi: any = [];
  listMucDich: any = [
    { value: 0, label: 'Xuất khẩu' },
    { value: 1, label: 'Nội địa' },
  ]
  listCaSanXuat: any = [];
  listQuyCachDongGoi: any = [];
  yearRange: string = `${new Date().getFullYear() - 50
    }:${new Date().getFullYear()}`;
  constructor(
    public activeModal: NgbActiveModal,
    public _toastr: ToastrService,
    public _modal: NgbModal,
    private _services: HopDongService,
    private _servicesDungChung: SanXuatService
  ) { }

  ngOnInit(): void {
    this.getListCaSanXuat();
    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
    }
    else {
      this.KiemTraButtonModal();
    }
    this.item.NgayBatDau = UnixToDate(this.item.NgayBatDauUnix);
    this.item.NgayKetThuc = UnixToDate(this.item.NgayKetThucUnix);
    this._servicesDungChung.GetOptions().GetNhaMay().subscribe((res: Array<any>) => {
      this.listDonVi = mapArrayForDropDown(res, 'TenDuAn', 'Id');
      if (validVariable(this.item.IdDuAn)) {
        this.getPhanXuong(this.item.IdDuAn, true);
      }
    });
    this._servicesDungChung.dmQuyCachDongGoi().GetList().subscribe((res: Array<any>) => {
      this.listQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');;
    })
  }
  getListCaSanXuat() {
    this._servicesDungChung.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listCaSanXuat = res;
    })
  }
  getPhanXuong(IdDuAn, update?) {
    this.listPhanXuong = [];
    if (!update) {
      this.item.IddmPhanXuong = null;
    }
    this._servicesDungChung.GetOptions().GetPhanXuong(IdDuAn).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
      if (this.opt !== "edit") {
        this.item.IddmPhanXuong = this.listPhanXuong[0].value;
      }
    });
    this.getListMatHang();
  }
  KiemTraButtonModal() {
    this._servicesDungChung.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }
  ChuyenDuyet() {
    if (this.checkTruocKhiLuu()) {

      this._services.GiaoKeHoachSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res?.statusCode === 200) {
            this._toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this._toastr.error(res.Message);
          }
        }
      });
    }
  }
  KhongDuyet() {
    if (this.checkTruocKhiLuu()) {

      this._services.GiaoKeHoachSanXuat().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res?.statusCode === 200) {
            this._toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this._toastr.error(res.Message);
          }
        }
      });
    }
  }

  GetNextSoQuyTrinh() {
    this._services.GiaoKeHoachSanXuat().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.soQuyTrinh = res.Data;
    })
  }

  GhiLai() {
    if (this.checkTruocKhiLuu()) {
      this._services.GiaoKeHoachSanXuat().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res?.statusCode === 200) {
            this._toastr.success(res.Message);
            this.opt = "edit";
            this.item.Id = res.Data.Id;
            this.getQuyTrinh();
          } else {
            this._toastr.error(res.Message);
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
        console.log(res);
        this._services
          .GiaoKeHoachSanXuat()
          .Delete(this.item)
          .subscribe((res: any) => {
            console.log(res);
            if (res?.statusCode === 200) {
              this._toastr.success(res.Message);
              this.activeModal.close();
            } else {
              this._toastr.error(res.Message);
            }
          });
      })
      .catch((er) => console.log(er));
  }

  add() {
    // if (this.item.listItem == undefined || this.item.listItem == null)
    //   this.item.listItem = [];
    // this.item.listItem.push(this.newTableItem);
    // this.newTableItem = {}
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    // if (item.Id === "" || item.Id === null || item.Id === undefined) {
    // } else {
    //   item.isXoa = true;
    //   this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    // }
    if (this.item.listItem != undefined && this.item.listItem.length > 0) {
      this.item.TongKhoiLuong = 0;
      let KLxChiSo: any = 0;
      this.item.listItem.forEach(obj => {
        this.item.TongKhoiLuong += (obj.KhoiLuong || 0);
        KLxChiSo += (obj.KhoiLuong || 0) * (obj.ne || 0);
      });
      this.item.ChiSoBQ = Math.ceil((KLxChiSo / this.item.TongKhoiLuong) * 100) / 100;
      this.item.Ne30 = this.item.TongKhoiLuong * this.item.ChiSoBQ / 30 / this.item.TongSoCa;
    }
    else {
      this.item.TongKhoiLuong = 0;
      this.item.ChiSoBQ = 0;
      this.item.Ne30 = 0;
    }
  }
  chonHangHoa() {
    let modalRef = this._modal.open(HopdongchonhanghoagiaokehoachmodalComponent, {
      size: 'xl'
    })
    modalRef.componentInstance.items = this.listMatHang;
    modalRef.componentInstance.selectedItems = this.item.listItem;
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.componentInstance.opt = "";
    modalRef.result.then(res => {
      if (res.length > 0) {
        this.item.listItem = res
        // res.forEach(obj => this.item.listItem.push(obj))
      }
    }).catch(er => {
      console.log(er);
    })
  }
  validDenNgay(mathang, e) {
    if (validVariable(mathang.NgayBatDau)) {
      if ((DateToUnix(e) - DateToUnix(mathang.NgayBatDau)) < 0) {
        this._toastr.warning('Đến ngày phải lớn hơn Từ ngày!')
        setTimeout(() => {
          mathang.NgayKetThuc = null;
        }, 500)
      } else {
        this.TinhSoCa();
      }
    } else {
      setTimeout(() => {
        mathang.NgayKetThuc = null;
      }, 500)
      this._toastr.warning('Vui lòng chọn Từ ngày trước!')
    }
  }
  TinhSoCa() {
    console.log(this.item.NgayBatDau, this.item.NgayKetThuc);
    if (validVariable(this.item.NgayBatDau) && validVariable(this.item.NgayKetThuc)) {
      this.item.NgayBatDauUnix = DateToUnix(this.item.NgayBatDau);
      this.item.NgayKetThucUnix = DateToUnix(this.item.NgayKetThuc);
      if (!validVariable(this.item.TongSoCa) || this.item.TongSoCa === 0) {
        this.item.TongSoCa = ((this.item.NgayKetThucUnix - this.item.NgayBatDauUnix) / (24 * 3600) + 1) * this.listCaSanXuat.length;
      }
    }
  }
  getListMatHang() {
    this._services.GiaoKeHoachSanXuat().GetListMatHangGiaoKeHoachSanXuat(this.item.IdDuAn || '').subscribe((res: any) => {
      this.listMatHang = [];
      res.Data.forEach(obj => {
        let data: any = {}
        data.IdHopDong = obj.IdHopDong;
        data.Ne = obj.Ne;
        data.DoSan = obj.DoSan;
        data.Ma = obj.Ma;
        data.TendmLoaiSoi = obj.TendmLoaiSoi;
        data.Ten = obj.Ten;
        data.DaGiao = obj.DaGiao;
        data.GhiChu = obj.GhiChu;
        data.SoTenHopDong = obj.SoTenHopDong;
        data.IddmItem = obj.IddmItem;
        data.KhoiLuongHopDong = obj.KhoiLuongHopDong;
        data.KhoiLuongDaHoanThanh = obj.KhoiLuongDaHoanThanh;
        this.listMatHang.push(data);
      });
    })
  }
  chonQuyCachDongGoi(item) {
    let modalRef = this._modal.open(HopdongchonquycachdonggoimodalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.items = this.listQuyCachDongGoi;
    modalRef.componentInstance.layitem = item;
    modalRef.componentInstance.selectedItems = deepCopy(item.listQuyCachDongGoi || []);
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.result.then(res => {
      item.isEdited = true;
      item.listQuyCachDongGoi = res.listItem;
    }).catch(er => {
      console.log(er);
    })
  }
  changeKeHoachSanXuat(item) {
    if (this.item.listItem != undefined && this.item.listItem.length > 0) {
      this.item.TongKhoiLuong = 0;
      let KLxChiSo: any = 0;
      this.item.listItem.forEach(obj => {
        if (!obj.isXoa) {
          this.item.TongKhoiLuong += (obj.KhoiLuong || 0);
          KLxChiSo += (obj.KhoiLuong || 0) * (obj.ne || 0);
        }
      });
      if (item.value < this.item.TongKhoiLuong) {
        this._toastr.error("Không được lớn hơn Kế hoạch sản xuất");
      }
      this.item.ChiSoBQ = Math.ceil((KLxChiSo / this.item.TongKhoiLuong) * 100) / 100;
      this.item.Ne30 = this.item.TongKhoiLuong * this.item.ChiSoBQ / 30 / this.item.TongSoCa;
    }
    if (validVariable(item.Id)) {
      item.isEdited = true;
    }
  }
  change(index) {
    if (validVariable(this.item.Id)) {
      this.item.listItem[index].isEdited = true;
    }
  }
  getQuyTrinh() {
    this._services.GiaoKeHoachSanXuat().Get(this.item.Id).subscribe((res: any) => {
      this.item = res;
      this.item.NgayBatDau = UnixToDate(this.item.NgayBatDauUnix);
      this.item.NgayKetThuc = UnixToDate(this.item.NgayKetThucUnix);
      if (!validVariable(this.item.listItem)) {
        this.item.listItem = [];
      }
      this.item.listItem.filter(objlistItem => {
        objlistItem.listQuyCachDongGoi.filter(async objlistItem2 => {
          objlistItem2.objQuyCachDongGoi = await this.listQuyCachDongGoi.filter(obj => objlistItem2.IddmQuyCachDongGoi == obj.value)[0];
        });
      });
      this.KiemTraButtonModal();
    }
    )
  }
  tinhToan(item, opt) {
    let modalRef = this._modal.open(CalcmodalComponent)
    modalRef.result.then((res) => {
      item[opt] = res;
    })
  }
  checkTruocKhiLuu() {
    if (!validVariable(this.item.noiDung)) {
      this._toastr.error("Bạn chưa nhập nội dung");
      return false;
    }
    else if (!validVariable(this.item.IdDuAn)) {
      this._toastr.error("Bạn chưa chọn dự án");
      return false;
    }
    else if (!validVariable(this.item.IddmPhanXuong)) {
      this._toastr.error("Bạn chưa chọn phân xưởng");
      return false;
    }
    else if (!validVariable(this.item.NgayBatDau)) {
      this._toastr.error("Bạn chưa ngày bắt đầu");
      return false;
    }
    else if (!validVariable(this.item.NgayKetThuc)) {
      this._toastr.error("Bạn chưa ngày kết thúc");
      return false;
    }
    else if (!validVariable(this.item.TongSoCa)) {
      this._toastr.error("Bạn chưa nhập tổng số ca");
      return false;
    }
    return true;
  }
}

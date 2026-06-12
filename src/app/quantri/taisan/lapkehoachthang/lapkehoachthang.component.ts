import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ConfirmationService } from 'src/app/services/confirmation.service';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import * as moment from 'moment';

@Component({
  selector: 'app-lapkehoachthang',
  templateUrl: './lapkehoachthang.component.html',
  styleUrls: ['./lapkehoachthang.component.css']
})
export class LapkehoachthangComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  @ViewChild('congdoan') congdoan: any;
  opt: any = "";
  keyword: string;
  listNam: any = [];
  item: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  listPhanXuong = [];
  listLoaiTaiSan = [];
  listCongDoan: any = [];
  TaiSanItem: any = [];
  TuThang: any = '';
  DenThang: any = '';
  getMonth: any = '';
  ngayCuoiCungCuaThangDaChon: number;
  vi: any;
  checkBtnChonTaiSan: boolean;
  old_item: any = {};
  $sub!: Subscription;

  constructor(
    private _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private confirmService: ConfirmationService,
    private store: StoreService
  ) {
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
        this.ngOnInit()
      }
    })
  }

  ngOnInit(): void {
    this.vi = {
      monthNamesShort: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",]
    }
    if (this.item.ThoiGianUnix !== 0) {
      this.item.ThoiGian = UnixToDate(this.item.ThoiGianUnix);
    }
    this.KiemTraButtonModal();
    if (this.opt === 'add') {
      this.GetNextSoQuyTrinh();
      this.item.ThoiGian = moment().add("months", 1).toDate();
      // this.ThemMoiDanhSachTaiSan('MOI');
    } else {
      this.chonThang(this.item.ThoiGian);
    }
    let ls2 = this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS().toPromise();
    // let ls3 = this._servicesSanXuat.GetListCongDoan().toPromise();
    Promise.all([ls2]).then((values: any) => {
      this.listPhanXuong = mapArrayForDropDown(values[0], "Ten", "Id");
      // this.listCongDoan = mapArrayForDropDown(values[1], "Ten", "Ma");
    });
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.LichXichThang().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  CheckBeforeChangeFilter() {
    if (!this.checkLoaiBaoDuong()) {
      return false;
    }
    return true;
  }

  SaveOldVal() {
    this.old_item = { ...this.item };
  }

  GetListTaiSan() {
    let data = {
      CurrentPage: 0,
      PageSize: 0,
      Keyword: "",
      IdBoPhanSuDung: this.item.IdBoPhanSuDung || "",
      Ngay: DateToUnix(this.item.ThoiGian) || 0,
      MaCongDoan: this.item.MaCongDoan,
      IdQuyTrinh: this.item.Id || "",
    }
    this._serviceTaiSan.LichXich().GetListTaiSanTheoThang(data).subscribe((res: any) => {
      this.item.listTaiSan = res.Data;
      this.SaveOldVal();
      this.chonThang(this.item.ThoiGian);
    })
  }

  ThemMoiDanhSachTaiSan(value?: string) {
    if (value === 'CHONLAI') {
      if (this.CheckBeforeChangeFilter()) {
        this.confirmService.show({
          message: 'Bạn chắc chắn muốn chọn lại chứ? Các thay đổi chưa được lưu và có thể bị mất'
        }, () => {
          this.GetListTaiSan();
        }, () => {
          this.item = this.old_item;
          this.chonThang(this.item.ThoiGian);
          console.log("this.item", this.item);
        })
      } else {
        this.GetListTaiSan();
      }
    } else {
      this.GetListTaiSan();
    }
  }

  setData() {
    this.item.ThoiGianUnix = DateToUnix(this.item.ThoiGian) + 172800;
    return this.item;
  }

  ValidateData(isChuyenDuyet) {

    // if (isChuyenDuyet) {
    if (this.checkLoaiBaoDuong()) {
      this.toastr.error("Yêu cầu chọn loại bảo dưỡng cho máy/thiết bị!");
      return false;
    }
    // }
    if (!validVariable(this.item.ThoiGian)) {
      this.toastr.error("Yêu cầu chọn tháng, năm!");
      return false;
    } else if (!validVariable(this.item.IdBoPhanSuDung)) {
      this.toastr.error("Yêu cầu nhập bộ phận sử dụng!");
      return false;
    } else if (!validVariable(this.item.listTaiSan) || this.item.listTaiSan.length === 0) {
      this.toastr.error("Yêu cầu nhập thêm máy/thiết bị!");
      return false;
    }
    return true;
  }

  checkLoaiBaoDuong() {
    let loaiBaoDuongisNull;
    this.item.listTaiSan.forEach(taisan => {
      taisan.listBaoDuongThang.forEach(baoduong => {
        baoduong.hasNullLoaiBD = baoduong.listThoiGian.some(ele => ele.isChon);
      })
      taisan.hasNullLoaiBD = taisan.listBaoDuongThang.some(ele => !ele.hasNullLoaiBD);
    })
    loaiBaoDuongisNull = this.item.listTaiSan.some(taisan => taisan.hasNullLoaiBD);
    return loaiBaoDuongisNull;
  }

  GhiLai() {
    if (this.ValidateData(false)) {
      this._serviceTaiSan.LichXichThang().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode !== 200 || !res.StatusCode) {
          this.toastr.error("Có lỗi trong quá trình xử lý!!!");
        } else {
          this.item = res.Data;
          this.item.ThoiGian = UnixToDate(this.item.ThoiGianUnix);
          this.toastr.success(res.Message);
          this.KiemTraButtonModal();
        }
      }, (er) => {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      })
    }
  }

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkBtnChonTaiSan = res.Ghi;
      this.checkbutton = res;
    });
  }

  ChapNhan() {
    if (this.ValidateData(true)) {
      this._serviceTaiSan.LichXichThang().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
  }

  KhongDuyet() {
    this._serviceTaiSan.LichXichThang().KhongDuyet(this.item).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._serviceTaiSan.LichXichThang().Delete(this.item.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.Message);
          }
        })
      })
      .catch((er) => console.log(er));
  }

  chonThang(time) {
    let date = new Date(this.item.ThoiGian);
    let month = time.getMonth() + 1;
    let year = time.getFullYear();
    this.getMonth = new Date(date.getFullYear(), date.getMonth() + 1);
    this.ngayCuoiCungCuaThangDaChon = new Date(year, month, 0).getDate();
  }

}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalbaoduongluachontaisanComponent } from '../modalbaoduongluachontaisan/modalbaoduongluachontaisan.component';
import { ChonmVatTuThayThePopUpComponent } from '../chonm-vat-tu-thay-the-pop-up/chonm-vat-tu-thay-the-pop-up.component';
import * as moment from 'moment';


@Component({
  selector: 'app-modalquytrinhbaoduong',
  templateUrl: './modalquytrinhbaoduong.component.html',
  styleUrls: ['./modalquytrinhbaoduong.component.css']
})
export class ModalquytrinhbaoduongComponent implements OnInit {
  opt: any = "";
  listNam: any = [];
  item: any = {};
  // lang: any = 'vn';
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  store: any;
  listLoaiTaiSan: any = [];
  listPhanXuong: any = [];
  listCVBaoDuong: any = [];
  listDoiBaoDuong: any = [];
  listLoaiTaiSanDeep: any = [];
  listNoiDungVatTuDeep: any = [];
  listNoiDungVatTu: any = [];
  listTaiSan: any = [];
  listTaiSanDeep: any = [];
  listLoaiBaoDuong: any = [];
  listMay: any = [];
  listMayDeep: any = [];
  isHoanThanhBaoDuong: boolean = false;

  constructor(
    private _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // if (this.opt === 'add') {
    //   this.GetNextSoQuyTrinh();
    // } else {
    // }
    // if (this.item.listTaiSan.length) {
    //   this.item.listTaiSan.forEach(ele => {
    //     ele.TuGio = UnixToDate(ele.TuGioUnix);
    //     ele.DenGio = UnixToDate(ele.DenGioUnix);
    //   })
    // }
    // if (this.item.NgayBaoDuongUnix !== 0) {
    //   this.item.NgayBaoDuong = UnixToDate(this.item.NgayBaoDuongUnix);
    // }
    // for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
    //   this.listNam.push({ value: i, label: i });
    // }
    // let data = { Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', };
    // let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();
    // Promise.all([ls1]).then((values: any) => {
    //   this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data, "Ten", "Id");
    // });
    // this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS().subscribe((res: any) => {
    //   this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    // })
    // this.KiemTraButtonModal();
    // this.item.NgayBaoDuong = this.item.NgayBaoDuong || new Date();


    // this.item.listVatTu = this.item.listVatTu ? this.item.listVatTu : [];
    this.item.NgayKeHoach = UnixToDate(this.item.NgayKeHoachUnix);
    if (this.opt === 'add') {

    } else { }
    this.GetNews();
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.QuyTrinhBaoDuong().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  ThemMoiDanhSachTaiSan() {
    if (!validVariable(this.item.IdBoPhanSuDung)) {
      this.toastr.error("Vui lòng nhập bộ phận sử dụng")
    }
    else if (!validVariable(this.item.IdDmLoaiTaiSan)) {
      this.toastr.error("Yêu cầu nhập loại máy/thiết bị!");
      return false;
    } else {
      let modalRef = this._modal.open(ModalbaoduongluachontaisanComponent, {
        size: "xl",
        backdrop: "static",
      });
      modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan_BaoDuong) : []
      modalRef.componentInstance.opt = this.opt;
      modalRef.componentInstance.Lay_Chon = this.item;
      modalRef.componentInstance.item = this.item;
      modalRef.result.then((res: any) => {
        this.item.listTaiSan = merge(res, this.item.listTaiSan, 'IdTaiSan_BaoDuong').filter(ele => !ele.isXoa);
      })
        .catch((er) => {
        });
    }
  }

  setData() {
    // this.item.NgayBaoDuongUnix = DateToUnix(this.item.NgayBaoDuong);
    // this.item.listTaiSan = this.item.listTaiSan.map(ele => {
    //   return {
    //     ...ele,
    //     Id: ele.Id || "",
    //     TuGioUnix: DateToUnix(ele.TuGio),
    //     DenGioUnix: DateToUnix(ele.DenGio),
    //   }
    // })
    let data = {
      ...this.item,
      NgayBatDauUnix: DateToUnix(this.item.NgayBatDau),
      NgayKetThucUnix: DateToUnix(this.item.NgayKetThuc),
      NgayKeHoachUnix: DateToUnix(this.item.NgayKeHoach),
      NgayBaoDuongUnix: DateToUnix(this.item.NgayBaoDuong),
      listCongViec: this.item?.listCongViec?.map(ele => {
        return {
          ...ele,
          isThucHien: ele.isThucHien ? ele.isThucHien : false
        }
      })
    }
    return data;
  }

  ValidateData() {
    if (!validVariable(this.item.IdBoPhanSuDung)) {
      this.toastr.error("Yêu cầu nhập bộ phận sử dụng!");
      return false;
    } else if (!validVariable(this.item.IdTaiSan_BaoDuong)) {
      this.toastr.error("Yêu cầu nhập loại máy/thiết bị!");
      return false;
    }
    return true;
  }

  ValidateTaiSan() {
    let checkDateTimeAll;
    this.item.listTaiSan.forEach(taisan => {
      if (taisan.isDaBaoDuong) {
        taisan.checkDateTime = validVariable(taisan.TuGio) && validVariable(taisan.DenGio);
      } else {
        taisan.checkDateTime = true;
      }
    })
    checkDateTimeAll = this.item.listTaiSan.every(taisan => taisan.checkDateTime);
    if (!checkDateTimeAll) {
      this.toastr.error('Vui lòng nhập đầy đủ thời gian bảo dưỡng của máy/thiết bị nếu máy/thiết bị đã bảo dưỡng!');
      return false;
    } else {
      return true;
    }
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.QuyTrinhBaoDuong().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode !== 200 || !res.StatusCode) {
          this.toastr.error(res.Message);
        } else {
          this.item = res.Data;
          if (this.item.listTaiSan.length) {
            this.item.listTaiSan.forEach(ele => {
              ele.TuGio = UnixToDate(ele.TuGioUnix);
              ele.DenGio = UnixToDate(ele.DenGioUnix);
            })
          }
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
      this.checkbutton = res;
      this.checkbutton.XacNhan = this.item.Id;
      this.isHoanThanhBaoDuong = this.item.listCongViec.every(ele => ele.isThucHien);
    });
  }

  ChuyenDuyet() {
    if (this.ValidateTaiSan()) {
      this._serviceTaiSan.QuyTrinhBaoDuong().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this._serviceTaiSan.QuyTrinhBaoDuong().KhongDuyet(this.item).subscribe((res: any) => {
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
        this._serviceTaiSan.QuyTrinhBaoDuong().Delete(this.item.Id).subscribe((res: any) => {
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
  // làm mới

  GetNews() {
    this.item.NgayBaoDuong = new Date();
    this.item.NgayBatDau = UnixToDate(this.item.NgayBatDauUnix);
    this.item.NgayKetThuc = UnixToDate(this.item.NgayKetThucUnix);
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', };
    this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this._danhMucTaiSan.LoaiThucHienBaoDuong().GetList(data).subscribe((res: any) => {
      this.listCVBaoDuong = res.Data;
    });
    // this.GetDanhSachCongViecByIddmLoaiBaoDuong(this.item.IddmLoaiBaoDuong, this.item.IdTaiSan);
    this.GetQuyTrinhBaoDuongByIdTaiSan_BaoDuong(this.item.IdTaiSan_BaoDuong);
    this.GetListVatTuByIdTaiSan_BaoDuong(this.item.IdTaiSan_BaoDuong);
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res1: any) => {
      this.listLoaiTaiSanDeep = res1.Data;
      this.listLoaiTaiSan = mapArrayForDropDown(res1.Data, "Ten", "Id");
      this.GetDoiThiCong(this.item.IddmLoaiTaiSan ? this.item.IddmLoaiTaiSan : '')
    })
    this.GetListdmLoaiBaoDuongForDanhMuc();
    this.chonBoPhan(this.item.IdBoPhanSuDung);
    this.isHoanThanhBaoDuong = this.item.listCongViec.every(ele => ele.isThucHien);

  }

  GetListdmLoaiBaoDuongForDanhMuc() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      Keyword: '',
    };
    this._danhMucTaiSan.DanhMucLoaiBaoDuong().GetListdmLoaiBaoDuongForDanhMuc(data).subscribe((res: any) => {
      this.listLoaiBaoDuong = mapArrayForDropDown(res.Data, "Ten", "Id");
    })
  }

  chonBoPhan(value) {
    this.GetListTaiSanBaoDuong();
    this.GetListTaiSanDangSuDung();
  }

  chonBoPhanSuDung(value: any) {
    this.item.IdTaiSan_BaoDuong = '';
    this.chonBoPhan(value)
  }

  ChonBaoDuong() {
    this.item.IdTaiSan_BaoDuong = '';
    this.GetListTaiSanBaoDuong();
  }

  GetListTaiSanBaoDuong() {
    let _momentDate = moment(this.item.NgayKeHoach).startOf('day').toDate();
    let data = {
      IdBoPhanSuDung: this.item.IdBoPhanSuDung,
      IdTaiSan: this.item.IdTaiSan,
      NgayKeHoach: DateToUnix(_momentDate)
    }
    this._serviceTaiSan.GetListTaiSanBaoDuong(data).subscribe((res: any) => {
      this.listTaiSanDeep = res.Data;
      this.listTaiSan = res.Data.map(ele => {
        return {
          label: `${ele.MadmLoaiBaoDuong} - ${ele.TendmLoaiBaoDuong}`,
          value: ele.IdTaiSan_BaoDuong
        }
      })
      if (this.item.IdTaiSan_BaoDuong) {
        this.GetDaTa(this.item.IdTaiSan_BaoDuong)
      }
    })
  }

  GetListTaiSanDangSuDung() {
    if (!this.item.IdBoPhanSuDung || !this.item.IddmLoaiTaiSan) {
      return;
    }
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, IdBoPhanSuDung: this.item.IdBoPhanSuDung, IddmLoaiTaiSan: this.item.IddmLoaiTaiSan };
    this._serviceTaiSan.GetListTaiSanDangSuDung(data).subscribe((res: any) => {
      this.listMayDeep = res.Data;
      this.listMay = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    });
  }



  GetDaTa(value) {
    // let obj = this.listTaiSanDeep.find(ele => ele.IdTaiSan_BaoDuong === value);
    this.item = {
      ...this.item,
      NgayBaoDuong: new Date(this.item.NgayBaoDuong),
      NgayKeHoach: UnixToDate(this.item.NgayKeHoachUnix ? this.item.NgayKeHoachUnix : 0)
    }
    this.GetDoiThiCong(this.item.IddmLoaiTaiSan);
    // this.GetListVatTuByIdTaiSan_BaoDuong(this.item.IdTaiSan_BaoDuong);
    // this.GetDanhSachCongViecByIddmLoaiBaoDuong(this.item.IddmLoaiBaoDuong, this.item.IdTaiSan);
  }

  GetListVatTuByIdTaiSan_BaoDuong(IdTaiSan_LoaiBaoDuong) {
    this._serviceTaiSan.GetListVatTuByIdTaiSan_BaoDuong(IdTaiSan_LoaiBaoDuong).subscribe((vattu: any) => {
      this.listNoiDungVatTuDeep = vattu.Data;
      this.listNoiDungVatTu = mapArrayForDropDown(vattu.Data, 'TenTaiSan', 'IdVatTuThayThe');
    })
  }

  GetDanhSachCongViecByIddmLoaiBaoDuong(IddmLoaiBaoDuong, IdTaiSan) {
    this._serviceTaiSan.GetDanhSachCongViecByIddmLoaiBaoDuong(IddmLoaiBaoDuong, IdTaiSan).subscribe((baoduong: any) => {
      this.item.listCongViec = baoduong.Data;
    })
  }

  GetQuyTrinhBaoDuongByIdTaiSan_BaoDuong(IdTaiSan_BaoDuong) {
    this._serviceTaiSan.GetQuyTrinhBaoDuongByIdTaiSan_BaoDuong(IdTaiSan_BaoDuong).subscribe((res: any) => {
      this.item = {
        ...res.Data,
        NgayBaoDuong: UnixToDate(res.Data.NgayBaoDuongUnix ? res.Data.NgayBaoDuongUnix : 0),
        NgayBatDau: UnixToDate(res.Data.NgayBatDauUnix ? res.Data.NgayBatDauUnix : 0),
        NgayKetThuc: UnixToDate(res.Data.NgayKetThucUnix ? res.Data.NgayKetThucUnix : 0),
        NgayKeHoach: UnixToDate(res.Data.NgayKeHoachUnix ? res.Data.NgayKeHoachUnix : 0)
      };
      this.KiemTraButtonModal();
      // this.checkbutton.XacNhan = this.item.Id;
      // this.checkbutton.ChuyenTiep = false;
      if (!this.item.Id) {
        this.GetNextSoQuyTrinh();
      }
    })
  }

  GetDoiThiCong(value: any) {
    let data = {
      CurrentPage: 0,
      MaCongDoan: this.listLoaiTaiSanDeep.find(obj => obj.Id === value)?.MaCongDoan
    }

    this._danhMucTaiSan.GetListdmCongDoan_DoiBaoDuong(data).subscribe((res: any) => {
      this.listDoiBaoDuong = mapArrayForDropDown(res.Data, "NoiDung", "Id");
    })
  }

  MapUnix(data) {
    this.item = {
      ...data,
      listCongViec: data.listCongViec,
      NgayBatDau: UnixToDate(data.NgayBatDauUnix),
      NgayKetThuc: UnixToDate(data.NgayKetThucUnix),
      NgayKeHoach: UnixToDate(data.NgayKeHoachUnix),
      NgayBaoDuong: UnixToDate(data.NgayBaoDuongUnix),
    }
  }

  validate() {
    let result = true;
    if (!this.item.IdBoPhanSuDung || !this.item.IddmLoaiTaiSan || !this.item.IdTaiSan || !this.item.NgayKeHoach || !this.item.IdTaiSan_BaoDuong) {
      result = false;
    }
    return result
  }

  XacNhan() {
    if (!this.validate()) {
      this.toastr.error("Vui lòng chọn đầy đủ thông tin cần thiết");
      return;
    }
    if (!this.item.IdDoiBaoDuong) {
      this.toastr.error("Vui lòng chọn đội/người bảo dưỡng");
      return;
    }
    this.item.ThoiGianBatDau = new Date();
    this._serviceTaiSan.QuyTrinhBaoDuong().Set(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200 || !res.StatusCode) {
        this.toastr.error(res.Message);
      } else {
        this.MapUnix(res.Data);
        this.toastr.success(res.Message);
        this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((btn: any) => {
          this.checkbutton = {
            ...btn,
            XacNhan: res.Data.Id
          };
          this.isHoanThanhBaoDuong = this.item.listCongViec.every(ele => ele.isThucHien);
        });
      }
    }, (er) => {
      this.toastr.error("Có lỗi trong quá trình xử lý!!!");
    })
  }

  HoanThanh() {
    if (!this.validate()) {
      this.toastr.error("Vui lòng chọn đầy đủ thông tin cần thiết");
      return;
    }
    if (this.item.listCongViec.some(x => !x.isThucHien)) {
      this.toastr.error("Vui lòng hoàn thành tất cả công việc trước khi hoàn thành bảo dưỡng");
      return;
    }
    // this.item.ThoiGianKetThuc = new Date();
    this._serviceTaiSan.QuyTrinhBaoDuong().ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }

  add() {
    this.item.listVatTu.push({})
  }

  delete(index: any) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa?';
    modalRef.result.then(res => {
      this.item.listVatTu.splice(index, 1)
    })
  }

  ChonVatTu(value: any, idx: number) {
    this.item.listVatTu[idx] = this.listNoiDungVatTuDeep.find((ele: any) => ele.IdVatTuThayThe === value);
  }

  CapVatTu() {
    this._serviceTaiSan.SetYeuCauXuatKho(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
      }
    })
  }

  ChonVatTuThayThe() {
    let modalRef = this._modal.open(ChonmVatTuThayThePopUpComponent, {
      backdrop: 'static',
      size: 'lg'
    });
    modalRef.componentInstance.title = 'Chọn vật tư';
    modalRef.componentInstance.listHienThi = this.listNoiDungVatTuDeep;
    modalRef.componentInstance.listDaChon = this.item.listVatTu ? this.item.listVatTu.map(ele => ele.IdVatTuThayThe) : [];
    modalRef.result.then(res => {
      this.item.listVatTu = this.item.listVatTu ? this.item.listVatTu : []
      this.item.listVatTu = merge(res, this.item.listVatTu, 'IdVatTuThayThe')
    })
  }

  ThayThe(data) {
    // let value = this.listCVBaoDuong.find(ele => ele.Id === data.IddmLoaiThucHienBaoDuong)?.Ma;
    // if (value === 'THAYTHE') {
    //   if (data.isThucHien) {
    //     this.item.listVatTu = this.item.listVatTu?.length ? this.item.listVatTu : [];
    //     let check = this.item.listVatTu.find(ele => ele.IdVatTuThayThe === data.IdVatTu);
    //     if (!check) {
    //       data = {
    //         ...data,
    //         IdVatTuThayThe: data.IdVatTu,
    //         TenTaiSan: this.listNoiDungVatTuDeep.find(obj => obj.IdVatTuThayThe === data.IdVatTu)?.TenTaiSan
    //       }
    //       this.item.listVatTu.push(data)
    //     }
    //   } else {
    //     let checkF = this.item.listCongViec.find(ele => ele.IdVatTu === data.IdVatTu && ele.isThucHien);
    //     if (!checkF) {
    //       this.item.listVatTu = this.item.listVatTu.filter(ele => !ele.IdVatTuThayThe === data.IdVatTu);
    //     }
    //   }
    // }s

    this.isHoanThanhBaoDuong = this.item.listCongViec.every(ele => ele.isThucHien);
  }

}

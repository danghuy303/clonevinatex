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
    // this._servicesSanXuat.GetListdmPhanXuongForIdDuAn().subscribe((res: any) => {
    //   this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    // })
    // this.KiemTraButtonModal();
    // this.item.NgayBaoDuong = this.item.NgayBaoDuong || new Date();

    this.item.listVatTu = this.item.listVatTu ? this.item.listVatTu : [];
    if (this.opt === 'add') {
      this.GetNextSoQuyTrinh();
    } else { }
    this.KiemTraButtonModal();
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
      this.toastr.error("Yêu cầu nhập loại tài sản!");
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
      ThoiGianBatDauUnix: DateToUnix(this.item.ThoiGianBatDau),
      ThoiGianKetThucUnix: DateToUnix(this.item.ThoiGianKetThuc),
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
      this.toastr.error("Yêu cầu nhập loại tài sản!");
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
      this.toastr.error('Vui lòng nhập đầy đủ thời gian bảo dưỡng của tài sản nếu tài sản đã bảo dưỡng!');
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
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', };
    this._servicesSanXuat.GetListdmPhanXuongForIdDuAn().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this._danhMucTaiSan.LoaiThucHienBaoDuong().GetList(data).subscribe((res: any) => {
      this.listCVBaoDuong = res.Data;
    });
    if (this.item.listCongViec.length = 0) {
      this.GetDanhSachCongViecByIddmLoaiBaoDuong(this.item.IddmLoaiBaoDuong, this.item.IdTaiSan);
    }
    this.GetListVatTuByIdTaiSan_BaoDuong(this.item.IdTaiSan_BaoDuong);
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res1: any) => {
      this.listLoaiTaiSanDeep = res1.Data;
      this.listLoaiTaiSan = mapArrayForDropDown(res1.Data, "Ten", "Id");
      this.GetDoiThiCong(this.item.IddmLoaiTaiSan ? this.item.IddmLoaiTaiSan : '')
    })
    this.GetListdmLoaiBaoDuongForDanhMuc();
    this.chonBoPhan(this.item.IdBoPhanSuDung);
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
  }

  GetListTaiSanBaoDuong() {
    let data = {
      IdBoPhanSuDung: this.item.IdBoPhanSuDung
    }
    this._serviceTaiSan.GetListTaiSanBaoDuong(data).subscribe((res: any) => {
      this.listTaiSanDeep = res.Data;
      this.listTaiSan = mapArrayForDropDown(res.Data, 'NoiDung', 'IdTaiSan_BaoDuong')

    })
  }

  GetDaTa(value) {
    let obj = this.listTaiSanDeep.find(ele => ele.IdTaiSan_BaoDuong === value);
    this.item = {
      ...obj,
      NgayBaoDuong: new Date(this.item.NgayBaoDuong),
      NgayKeHoach: UnixToDate(obj.ThoiGianKeHoachUnix)
    }
    this.GetDoiThiCong(this.item.IddmLoaiTaiSan);
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

  GetDoiThiCong(value: any) {
    let data = {
      CurrentPage: 0,
      MaCongDoan: this.listLoaiTaiSanDeep.find(obj => obj.Id === value)?.MaCongDoan
    }
    this._danhMucTaiSan.GetListdmCongDoan_DoiBaoDuong(data).subscribe((res: any) => {
      this.listDoiBaoDuong = mapArrayForDropDown(res.Data, "Ten", "Id");
    })
  }

  MapUnix(data) {
    this.item = {
      ...data,
      ThoiGianBatDau: UnixToDate(data.ThoiGianBatDauUnix),
      ThoiGianKetThuc: UnixToDate(data.ThoiGianKetThucUnix),
      NgayKeHoach: UnixToDate(data.NgayKeHoachUnix),
      NgayBaoDuong: UnixToDate(data.NgayBaoDuongUnix),
    }
  }

  XacNhan() {
    this.item.ThoiGianBatDau = new Date();
    this._serviceTaiSan.QuyTrinhBaoDuong().Set(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200 || !res.StatusCode) {
        this.toastr.error(res.Message);
      } else {
        this.MapUnix(res.Data);
        this.toastr.success(res.Message);
        this.KiemTraButtonModal();
      }
    }, (er) => {
      this.toastr.error("Có lỗi trong quá trình xử lý!!!");
    })
  }

  HoanThanh() {
    this.item.ThoiGianKetThuc = new Date();
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
      this.item.listVatTu = merge(res, this.item.listVatTu, 'IdVatTuThayThe')
    })
  }

  ThayThe(data) {
    let value = this.listCVBaoDuong.find(ele => ele.Id === data.IddmLoaiThucHienBaoDuong)?.Ma;
    if (value === 'THAYTHE') {
      if (data.isThucHien) {
        let check = this.item.listVatTu.find(ele => ele.IdVatTuThayThe === data.IdVatTu);
        if (!check) {
          data = {
            ...data,
            IdVatTuThayThe: data.IdVatTu,
            TenTaiSan: this.listNoiDungVatTuDeep.find(obj => obj.IdVatTuThayThe === data.IdVatTu)?.TenTaiSan
          }
          this.item.listVatTu.push(data)
        }
      } else {
        let checkF = this.item.listCongViec.find(ele => ele.IdVatTu === data.IdVatTu && ele.isThucHien);
        if (!checkF) {
          this.item.listVatTu = this.item.listVatTu.filter(ele => !ele.IdVatTuThayThe === data.IdVatTu);
        }
      }
    }
  }

}

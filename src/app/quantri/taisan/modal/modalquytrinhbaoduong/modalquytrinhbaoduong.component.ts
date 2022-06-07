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
  listPhanXuong = [];
  listLoaiTaiSan = [];
  store: any;

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
    if (this.opt=== 'add') {
      this.GetNextSoQuyTrinh();
    } else {

    }
    if (this.item.listTaiSan.length) {
      this.item.listTaiSan.forEach(ele => {
        ele.TuGio = UnixToDate(ele.TuGioUnix);
        ele.DenGio = UnixToDate(ele.DenGioUnix);
      })
    }
    if (this.item.NgayBaoDuongUnix !== 0) {
      this.item.NgayBaoDuong = UnixToDate(this.item.NgayBaoDuongUnix);
    }
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }

    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', };
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();

    Promise.all([ls1]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data, "Ten", "Id");
    });

    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.KiemTraButtonModal();
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.QuyTrinhBaoDuong().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  ThemMoiDanhSachTaiSan() {
    if (!validVariable(this.item.IdBoPhanSuDung)) {
      this.toastr.error("Vui lòng nhập bộ phận sử dụng")
    } else {
      let modalRef = this._modal.open(ModalbaoduongluachontaisanComponent, {
        size: "xl",
        backdrop: "static",
      });
      modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan_BaoDuong) : []
      // modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : []
      modalRef.componentInstance.opt = this.opt;
      modalRef.componentInstance.Lay_Chon = this.item;
      modalRef.componentInstance.item = this.item;
      modalRef.result.then((res: any) => {
        // this.item.listTaiSan = merge(res, this.item.listTaiSan, 'IdTaiSan');
        // this.item.listTaiSan = merge(res, this.item.listTaiSan, 'Id');
        this.item.listTaiSan = merge(res, this.item.listTaiSan, 'IdTaiSan_BaoDuong').filter(ele => !ele.isXoa);
      })
        .catch((er) => {
        });
    }
  }

  setData() {
    this.item.NgayBaoDuongUnix = DateToUnix(this.item.NgayBaoDuong);
    this.item.listTaiSan = this.item.listTaiSan.map(ele => { 
      return {
        ...ele,
        Id: ele.Id || "",
        TuGioUnix: DateToUnix(ele.TuGio),
        DenGioUnix: DateToUnix(ele.DenGio),
      }
    })
    return this.item;
  }

  ValidateData() {
    // if (!validVariable(this.item.NgayBaoDuong)) {
    //   this.toastr.error("Yêu cầu nhập đầy đủ ngày!");
    //   return false;
    // } else 
    if (!validVariable(this.item.IdBoPhanSuDung)) {
      this.toastr.error("Yêu cầu nhập bộ phận sử dụng!");
      return false;
    } else if (!validVariable(this.item.IdDmLoaiTaiSan)) {
      this.toastr.error("Yêu cầu nhập loại tài sản!");
      return false;
    } else if (!validVariable(this.item.listTaiSan)) {
      this.toastr.error("Yêu cầu thêm tài sản!");
      return false
    } else if (!this.ValidateTaiSan()) {
      return false
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
    // console.log("this.item", this.item);
    // console.log("checkDateTimeAll", checkDateTimeAll);
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
          this.toastr.error("Có lỗi trong quá trình xử lý!!!");
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
    this._serviceTaiSan.QuyTrinhBaoDuong().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
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

}

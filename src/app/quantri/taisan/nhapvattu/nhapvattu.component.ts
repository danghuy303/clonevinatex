import { Validatable } from '@amcharts/amcharts4/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';
import { ModalnhapvattuluachontaisanComponent } from '../modal/modalnhapvattuluachontaisan/modalnhapvattuluachontaisan.component';
// import { ModalchontaisanCopyComponent } from '../modalchontaisan-copy/modalchontaisan-copy.component';
// import { ModalchontaisanComponent } from '../modalchontaisan/modalchontaisan.component';

@Component({
  selector: 'app-nhapvattu',
  templateUrl: './nhapvattu.component.html',
  styleUrls: ['./nhapvattu.component.css']
})
export class NhapvattuComponent implements OnInit {
  newitem: any = {};
  showDropDown: boolean = false;
  item: any = {};
  type = '';
  opt = '';
  listPhanXuong = [];
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listTaiSan: any = [];
  listNhaCungCap: any = [];
  itemNhaCungUng = [];
  NameFile: string;
  title: any = '';
  tongThanhTien: any = 0;
  $sub!: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private _serviceTaiSan: TaisanService,
    public toastr: ToastrService,
    public store: StoreService,
    public _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { 

    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
          this.ngOnInit()
      }
  })
  }

  ngOnInit(): void {
    if (this.item.NgayUnix !== 0) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    if (this.type === 'themmoi') {
      this.GetNextSoQuyTrinh();
    }
    this.GetListdmPhanXuong();
    this.KiemTraButtonModal();
    this.ListNhaCungUng();
    this.getList();
  }

  chonBoPhan(e) {
    this.item.listTaiSan = [];
  }

  ListNhaCungUng() {
    this.item.listTaiSan.forEach(ele => {
      this._serviceTaiSan.ThoiHanCungCap().GetListNhaCungUng(ele.IdTaiSan).subscribe((res: any) => {
        ele.listNhaCungUngDoiChieu = res.Data.map(nhaCungUng => {
          return {
            Id: nhaCungUng.Id,
            DonGia: nhaCungUng.listItem[0]?.DonGia,
            ThongTinNCC: nhaCungUng.listItem[0].ThongTinNCC
          }
        });
        ele.listDeChon = res.Data.map(nhaCungUng => {
          return {
            value: nhaCungUng.Id,
            label: nhaCungUng.listItem[0].ThongTinNCC
          }
        });
      })
    })
  }

  ChonNhaCungUng(e) {
    e.DonGia = e.listNhaCungUngDoiChieu.find(ele => ele.Id === e.IddmNhaCungUng)?.DonGia;
    this.Tong();
  }

  GetListNhaCungUng() {
    this.item.listTaiSan.forEach(taisan => {
      this._serviceTaiSan.ThoiHanCungCap().GetListNhaCungUng(taisan.IdTaiSan).subscribe((res: any) => {
        taisan.listNhaCungUngDoiChieu = res.Data.map(nhaCungUng => {
          return {
            Id: nhaCungUng.Id,
            DonGia: nhaCungUng.listItem[0]?.DonGia,
            ThongTinNCC: nhaCungUng.listItem[0].ThongTinNCC
          }
        });
        taisan.listDeChon = res.Data.map(nhaCungUng => {
          return {
            value: nhaCungUng.Id,
            label: nhaCungUng.listItem[0].ThongTinNCC
          }
        });
      })
    })

  }
  Tong() {
    this.tongThanhTien = 0;
    this.item.listTaiSan.forEach(item => {
      item.ThanhTien = (item.SoLuong || 0) * (item.DonGia || 0);
      this.tongThanhTien += (item.ThanhTien || 0);
    });
  }
  getList() {
    this.Tong();
  }
  GetListdmPhanXuong() {
    this._services.GetListdmPhanXuongForIdDuAn().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  add() {
    if (this.item.listTaiSan == undefined || this.item.listTaiSan == null)
      this.item.listTaiSan = [];
    this.item.listTaiSan.push(this.newitem);
    this.newitem = {}
  }
  delete(index) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this.item.listTaiSan.splice(index, 1)[0];
      this.Tong();
    }).catch(er => console.log(er))
  }
  setData() {
    this.item.NgayUnix = DateToUnix(this.item.Ngay);
    this.item.IdDuAn = this.store.getCurrent();
    this.item.IdTaiSan = '';
    return this.item;
  }

  ValidateData() {
    if (!validVariable(this.item.Ngay)) {
      this.toastr.error("Yêu cầu nhập đầy đủ ngày!");
      return false;
    }
    if (!validVariable(this.item.listTaiSan) || this.item.listTaiSan.length === 0) {
      this.toastr.error("Yêu cầu nhập thêm vật tư!");
      return false;
    }
    return true;
  }
  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.QuyTrinhNhapTu().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode !== 200 || !res.StatusCode) {
          this.toastr.error("Có lỗi trong quá trình xử lý!!!");
        } else {
          this.item = res.Data;
          let Ngay = UnixToDate(res.Data.NgayUnix);
          this.item.Ngay = Ngay;
          this.ListNhaCungUng();
          this.Tong();
          this.toastr.success(res.Message);
          this.KiemTraButtonModal();
        }
      }, (er) => {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      })
    }
  }
  GetNextSoQuyTrinh() {
    this._serviceTaiSan.QuyTrinhNhapTu().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }
  ThemMoiDanhSachTaiSan() {
    if (!validVariable(this.item.IdBoPhanSuDung)) {
      this.toastr.error("Yêu cầu nhập bộ phận sử dụng!");
      return false;
    }
    let modalRef = this._modal.open(ModalnhapvattuluachontaisanComponent, {
      size: "xl",
      backdrop: "static",
    });
    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : []
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.vatTu = 'Nhap vat tu';
    modalRef.componentInstance.item.IdBoPhanSuDung = this.item.IdBoPhanSuDung;
    modalRef.componentInstance.checkedAll = false;
    modalRef.result.then((res: any) => {
      this.item.listTaiSan = merge(res, this.item.listTaiSan, 'IdTaiSan').filter(ele => !ele.isXoa)
      this.GetListNhaCungUng();
    })
      .catch((er) => {
      });
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }
  ChuyenDuyet() {
    if (!validVariable(this.item.listTaiSan[0]?.IddmNhaCungUng) || !validVariable(this.item.listTaiSan[0]?.SoLuong)) {
      this.toastr.error("Yêu cầu nhập nhà cung ứng và số lượng của vật tư!");
      return
    }
    this._serviceTaiSan.QuyTrinhNhapTu().ChuyenTiep(this.setData()).subscribe((res: any) => {
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
        this._serviceTaiSan.QuyTrinhNhapTu().Delete(this.item.Id).subscribe((res: any) => {
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

import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ThoihancungcapmodalluachonComponent } from '../modal/thoihancungcapmodalluachon/thoihancungcapmodalluachon.component';


@Component({
  selector: 'app-thoihancungcapvattumodal',
  templateUrl: './thoihancungcapvattumodal.component.html',
  styleUrls: ['./thoihancungcapvattumodal.component.css']
})
export class ThoihancungcapvattumodalComponent implements OnInit {

  opt: any = "";
  title: any = "";
  listNam: any = [];
  item: any = {};
  itemNhaCungUng: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  listPhanXuong = [];
  listLoaiTaiSan = [];
  listNhaCungUng = [];
  store: any;
  tongThanhTien: any = 0;
  IdTaiSan: '';
  TuNgay: any = '';
  DenNgay: any = '';
  Keyword: any = '';

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
    if (this.item.NgayUnix !== 0) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    if (this.opt === 'add') {
      this.GetNextSoQuyTrinh();
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
    this.ListNhaCungUng();
    this.KiemTraButtonModal();
    this.getList();
    this.Tong();
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
    e.DonGia = e.listNhaCungUngDoiChieu.find(ele => ele.Id === e.IdNhaCungUng)?.DonGia;
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

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.ThoiHanCungCap().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  ThemMoiDanhSachTaiSan() {
    let modalRef = this._modal.open(ThoihancungcapmodalluachonComponent, {
      size: "xl",
      backdrop: "static",
    });
    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : []
    modalRef.componentInstance.filter = this.item.Ngay ? { DenNgay: this.DenNgay, TuNgay: this.TuNgay} : {};
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.Lay_Chon = this.item;
    modalRef.componentInstance.item = {};
    modalRef.result.then((res: any) => {
      // this.item.listTaiSan = res.map(ele => {
      //   return {
      //     ...ele,
      //     IdNhaCungUng: null,
      //   }
      // });
      this.item.listTaiSan = merge(res, this.item.listTaiSan, 'IdTaiSan').filter(ele => !ele.isXoa)
      this.GetListNhaCungUng();
    })
      .catch((er) => {
      });
  }

  setData() {
    this.item.NgayUnix = DateToUnix(this.item.Ngay);
    // this.item.IdDuAn = this.store.getCurrent();
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
    this._serviceTaiSan.ThoiHanCungCap().Set(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200 || !res.StatusCode) {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      } else {
        this.item = res.Data;
        this.ListNhaCungUng();
        this.Tong();
        this.toastr.success(res.Message);
        this.KiemTraButtonModal();
        // this.activeModal.close();
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
    this._serviceTaiSan.ThoiHanCungCap().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  KhongDuyet() {
    this._serviceTaiSan.ThoiHanCungCap().KhongDuyet(this.item).subscribe((res: any) => {
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
        this._serviceTaiSan.ThoiHanCungCap().Delete(this.item.Id).subscribe((res: any) => {
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
  changeTab(e) {
    // this.trangThai = e.index + 1;
    // this.loaiTab = e.index;
    // this.Loaddata(true);
  }
  delete(index) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this.item.listTaiSan.splice(index, 1)
    }).catch(er => console.log(er))
  }

  Tong() {
    this.item.TongGiaTri = 0;
    this.item.listTaiSan.forEach(item => {
      item.ThanhTien = (item.SoLuong || 0) * (item.DonGia || 0);
      this.item.TongGiaTri += (item.ThanhTien || 0);
    });
  }
  getList() {
    this.Tong();
  }

  chonThang() {
    let date = new Date(this.item.Ngay);
    this.TuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.DenNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

}
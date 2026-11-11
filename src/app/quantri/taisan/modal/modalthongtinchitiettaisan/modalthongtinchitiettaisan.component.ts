import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalthongtinchitiettaisan',
  templateUrl: './modalthongtinchitiettaisan.component.html',
  styleUrls: ['./modalthongtinchitiettaisan.component.css']
})
export class ModalthongtinchitiettaisanComponent implements OnInit {

  opt: any = '';
  item: any = {
    isTaiSanCoDinh: true
  };
  getId: any = '';
  XemTheo: any = '';
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = {};
  NameFile: any = "";
  Du_Lieu_Cha: any = {};
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 1 };
  filter: any = {};
  listCungSanXuat: any = [];
  listLoaiTaiSan: any = [];
  listPhanXuong: any = [];
  chon: any = "";
  qrcode: any = {
    size: 250
  };
  activeTabIndex: number = 1;
  isCollapsed: boolean = true;
  isXemChiTiet: boolean = false;
  isVatTu: boolean = true;

  listLoaiNhienLieu: any = [];
  listLoaiDinhMucNhienLieu: any = [];
  listNoiDangKiem: any = [];
  listPhanCap: any = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
  ];
  listDonViTienTe: any = [
    { label: 'USD', value: 'USD' },
    { label: 'VNĐ', value: 'VNĐ' },
    { label: 'KIP', value: 'KIP' }
  ];

  constructor(
    private _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _danhMucTaiSan: DanhmuctaisanService,
    private _serviceTaiSan: TaisanService,) { }

  ngOnInit(): void {
    let date = new Date();
    this.filter.TuNgay = new Date(date.getFullYear(), 0, 1);
    this.filter.DenNgay = new Date(date.getFullYear(), 11, 31);
    if (this.opt === 'add' || (!this.getId && !this.item?.Id)) {
      if (this.item.isTaiSanCoDinh === undefined) {
        this.item.isTaiSanCoDinh = true;
      }
    }
    if (!this.isXemChiTiet) {
      if (this.getId) {
        this.GetById();
      }
    } else {
      this.normalizeItemFields();
      this.item.NgayNhap = this.formatDate(this.item.NgayNhap, this.item.NgayNhapUnix);
      this.item.ThoiGianDuaVaoSuDung = this.formatDate(this.item.ThoiGianDuaVaoSuDung, this.item.ThoiGianDuaVaoSuDungUnix);


      if (this.item.PhanCap) {
        this.item.PhanCap = Number(this.item.PhanCap);
      }
      if (!this.item.DonViTienTe) {
        this.item.DonViTienTe = 'VNĐ';
      }
      if (this.item.DonViTienTe === 'VNĐ' && !this.item.TyGia) {
        this.item.TyGia = 1;
      }
    }

    this.getOptionsAll();
    // this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS().subscribe((res: any) => {
    //   this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    // })
  }

  getOptionsAll() {
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', };
    console.log('data', data);

    let ls0 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();
    let ls1 = this._danhMucTaiSan.DanhMucNhaCungCap().GetList(data).toPromise();

    let ls2 = this._danhMucTaiSan.LoaiNhienLieu().GetList({ CurrentPage: 0 }).toPromise();
    let ls3 = this._danhMucTaiSan.LoaiDinhMucNhienLieu().GetList({ CurrentPage: 0 }).toPromise();
    let ls4 = this._danhMucTaiSan.NoiDangKiem().GetList({ CurrentPage: 0 }).toPromise();

    Promise.all([ls0, ls1, ls2, ls3, ls4]).then((values: any) => {
      this.listLoaiTaiSan = (values[0].Data || []).map((ele: any) => ({
        ...ele,
        label: ele.Ma ? `${ele.Ma} - ${ele.Ten}` : ele.Ten,
        value: ele.Id
      }));
      this.listCungSanXuat = mapArrayForDropDown(values[1].Data, "Ten", "Id");

      this.listLoaiNhienLieu = mapArrayForDropDown(values[2].Data, 'Ten', 'Id');
      this.listLoaiDinhMucNhienLieu = mapArrayForDropDown(values[3].Data, 'HeSo', 'Id');
      this.listNoiDangKiem = mapArrayForDropDown(values[4].Data, "Ten", "Id");

    });
  }

  togglePanel() {
    this.isCollapsed = !this.isCollapsed;
  }

  ChonTaiSan() {

  }

  LayMa(e) {
    this._serviceTaiSan.NhapTaiSan().GetNextMaTaiSan(e.value).subscribe((res: any) => {
      this.item.Ma = res.Data;
    })
  }

  normalizeItemFields() {
    if (!this.item) return;
    if (this.item.GiayCNDK_NgayCapUnix && !this.item.GiayCNDK_NgayCap) {
      this.item.GiayCNDK_NgayCap = UnixToDate(this.item.GiayCNDK_NgayCapUnix);
    } else if (typeof this.item.GiayCNDK_NgayCap === 'string') {
      this.item.GiayCNDK_NgayCap = UnixToDate(this.item.GiayCNDK_NgayCap) || new Date(this.item.GiayCNDK_NgayCap);
    } else if (!this.item.GiayCNDK_NgayCap && (this.item.NgayCapGiayChungNhanDangKyUnix || this.item.NgayCapDangKyUnix)) {
      this.item.GiayCNDK_NgayCap = UnixToDate(this.item.NgayCapGiayChungNhanDangKyUnix || this.item.NgayCapDangKyUnix);
    }
    if (this.item.GiayCNDK_So === undefined) {
      this.item.GiayCNDK_So = this.item.SoGiayChungNhanDangKy !== undefined ? this.item.SoGiayChungNhanDangKy : this.item.SoDangKy;
    }
    if (this.item.ThoiGianDaiTuGanNhatUnix && !this.item.ThoiGianDaiTuGanNhat) {
      this.item.ThoiGianDaiTuGanNhat = UnixToDate(this.item.ThoiGianDaiTuGanNhatUnix);
    } else if (typeof this.item.ThoiGianDaiTuGanNhat === 'string') {
      this.item.ThoiGianDaiTuGanNhat = UnixToDate(this.item.ThoiGianDaiTuGanNhat) || new Date(this.item.ThoiGianDaiTuGanNhat);
    }
    if (!this.item.TendmTaiSan && this.item.TenNhomTaiSan) {
      this.item.TendmTaiSan = this.item.TenNhomTaiSan;
    }
    if (this.item.ThoiGianKhauHaoConLai === undefined && this.item.SoNamKhauHaoConLai !== undefined) {
      this.item.ThoiGianKhauHaoConLai = this.item.SoNamKhauHaoConLai;
    }
    this.item.NgayNhap = this.formatDate(this.item.NgayNhap, this.item.NgayNhapUnix);
    this.item.ThoiGianDuaVaoSuDung = this.formatDate(this.item.ThoiGianDuaVaoSuDung, this.item.ThoiGianDuaVaoSuDungUnix);
  }

  get defaultDateNgayNhap(): Date {
    if (this.item && this.item.ThoiGianDuaVaoSuDung) {
      let d = this.toDate(this.item.ThoiGianDuaVaoSuDung);
      if (d && d.getFullYear() > 1970) return d;
    }
    return new Date();
  }

  formatDate(val: any, unixVal?: any): Date | null {
    if (!val && unixVal) {
      let d = UnixToDate(unixVal);
      if (d && d.getFullYear() > 1970) return d;
    }
    if (!val) return null;
    if (val instanceof Date) {
      return (isNaN(val.getTime()) || val.getFullYear() <= 1970) ? null : val;
    }
    if (typeof val === 'number') {
      if (val <= 0 || val <= 1970) return null;
      if (val > 1970 && val < 3000) return new Date(val, 0, 1);
      const d = new Date(val);
      return (isNaN(d.getTime()) || d.getFullYear() <= 1970) ? null : d;
    }
    if (typeof val === 'string') {
      let str = val.trim();
      if (!str || str.startsWith('0001-01-01') || str.startsWith('1970-01-01')) return null;
      if (/^\d{4}$/.test(str)) {
        let yr = Number(str);
        return yr <= 1970 ? null : new Date(yr, 0, 1);
      }
      let unix = DateToUnix(str);
      if (unix && unix > 0) {
        let d = UnixToDate(unix);
        return (d && d.getFullYear() > 1970) ? d : null;
      }
      let d = new Date(str);
      return (!isNaN(d.getTime()) && d.getFullYear() > 1970) ? d : null;
    }
    return null;
  }

  toDate(val: any): Date | null {
    return this.formatDate(val);
  }

  checkValidNgayNhap() {
    if (this.item.NgayNhap && this.item.ThoiGianDuaVaoSuDung) {
      let dNgayNhap = this.toDate(this.item.NgayNhap);
      let dSuDung = this.toDate(this.item.ThoiGianDuaVaoSuDung);
      if (dNgayNhap && dSuDung && dNgayNhap > dSuDung) {
        this.toastr.warning('Năm sản xuất phải nhỏ hơn thời gian đưa vào sử dụng!');
        this.item.NgayNhap = null;
        return false;
      }
    }
    return true;
  }

  checkValidThoiGianDuaVaoSuDung() {
    if (this.item.NgayNhap && this.item.ThoiGianDuaVaoSuDung) {
      let dNgayNhap = this.toDate(this.item.NgayNhap);
      let dSuDung = this.toDate(this.item.ThoiGianDuaVaoSuDung);
      if (dNgayNhap && dSuDung && dNgayNhap > dSuDung) {
        this.toastr.warning('Thời gian đưa vào sử dụng phải lớn hơn năm sản xuất!');
        this.item.ThoiGianDuaVaoSuDung = null;
        return false;
      }
    }
    return true;
  }

  GetById() {
    this._serviceTaiSan.ListDanhSachTaiSan().Get(this.getId).subscribe((res: any) => {
      this.item = res.Data;
      this.normalizeItemFields();
      // this.item.NgayNhap = UnixToDate(this.item.NgayNhapUnix);
      this.normalizeItemFields();
      this.item.NgayNhap = this.formatDate(this.item.NgayNhap, this.item.NgayNhapUnix);
      this.item.ThoiGianDuaVaoSuDung = this.formatDate(this.item.ThoiGianDuaVaoSuDung, this.item.ThoiGianDuaVaoSuDungUnix);


      if (this.item.PhanCap) {
        this.item.PhanCap = Number(this.item.PhanCap);
      }
      if (!this.item.DonViTienTe) {
        this.item.DonViTienTe = 'VNĐ';
      }
      if (this.item.DonViTienTe === 'VNĐ' && !this.item.TyGia) {
        this.item.TyGia = 1;
      }
    })
  }

  changeDonViTienTe(e) {
    if (this.item.DonViTienTe === 'VNĐ') {
      this.item.TyGia = 1;
    }
  }

  resetFilter() {
    this.filter = {};
  }
  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.multiple = true;
    modalRef.componentInstance.type = '';
    modalRef.result.then((data) => {
      this.item.listFileDinhKem = data;
      this.item.listFileDinhKem.forEach(obj => {
        this.NameFile += `${obj.NameLocal}, `;
      });
      this.item.listFileDinhKem = data;
      this.item.listFileDinhKem.forEach(obj => {
        obj.Id = '';
        obj.fileNameGui = obj.Name;
        obj.fileName = obj.NameLocal;
        obj.Link = obj.Url;
        this.NameFile += `${obj.fileName}` + '; ';
      });
    }, (reason) => {

    });
  }

  ChiTietThongTin(item) {
    let modalRef = this._modal.open(ModalthongtinchitiettaisanComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.isXemChiTiet = true;
    modalRef.componentInstance.isVatTu = false;
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result
      .then((res: any) => {
      })
      .catch((er) => {

      });
  }

}

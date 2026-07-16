import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalbaoduongluachontaisanComponent } from '../modal/modalbaoduongluachontaisan/modalbaoduongluachontaisan.component';
import { XulysucoluachontaisanComponent } from '../modal/xulysucoluachontaisan/xulysucoluachontaisan.component';
import { ChonVatTuThayTheComponent } from '../screen/chon-vat-tu-thay-the/chon-vat-tu-thay-the.component';
import { ThemMoiVatTuModalComponent } from '../screen/vattu/them-moi-vat-tu-modal/them-moi-vat-tu-modal.component';
import { ChonVatTuComponent } from './chon-vat-tu/chon-vat-tu.component';


@Component({
  selector: 'app-modaldenghixulisuco',
  templateUrl: './modaldenghixulisuco.component.html',
  styleUrls: ['./modaldenghixulisuco.component.css']
})
export class ModaldenghixulisucoComponent implements OnInit {

  newitem: any = {};
  showDropDown: boolean = false;
  item: any = {};
  type = '';
  opt = '';
  listPhanXuong = [];
  listDoUuTien = [];
  listNguoiThucHien = [];
  listLoaiSuCo = [];
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  public listdsTaiSan: any = [];
  public listTaiSanRef: any = [];
  listTaiSan: any = [];
  NameFile: string;
  title: any = '';
  listLoaiBaoDuong: any = [];
  listNoiDungVatTu: any = [];
  listNoiDungVatTuDeep: any = [];
  listMay: any = [];
  listMayDeep: any = [];
  listVatTu: any = [];
  listVatTuThayThe: any = [];
  listNhienLieu: any = [];
  listNhanCong: any = [];
  isDeXuat: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    public store: StoreService,
    public _modal: NgbModal,
  ) { }

  ngOnInit(): void {

    this.item.listTaiSan = this.item.listTaiSan ? this.item.listTaiSan : [];
    this.item.listChiPhiKhac = this.item.listChiPhiKhac ? this.item.listChiPhiKhac : [];
    this.item.listNhienLieu = this.item.listNhienLieu ? this.item.listNhienLieu : [];
    this.item.listNhanCong = this.item.listNhanCong ? this.item.listNhanCong : [];
    this.title = 'Đề nghị xử lý sự cố'
    if (this.opt === 'add') {
      this.GetNextSoQuyTrinh();
    }
    else {
      this.GetListVatTuByIdTaiSan(this.item.IdTaiSan);
      this.item.listTaiSan.forEach(ele => {
        ele.DenGio = UnixToDate(ele.DenGioUnix);
        ele.TuGio = UnixToDate(ele.TuGioUnix);
      })
    }
    this.getAllOptions();
    this.KiemTraButtonModal();
    this.LoaiThucHienBaoDuong();
    this.GetListTaiSanDangSuDung();
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20 };
    let data_BaoDuong = {
      CurrentPage: 0,
      MaCongDoan: ''
    }
    let ls1 = this._danhMucTaiSan.DanhMucMucDoUuTien().GetList(data).toPromise();
    let ls2 = this._danhMucTaiSan.DanhMucLoaiSuCo().GetList(data).toPromise();
    let ls3 = this._danhMucTaiSan.GetListdmCongDoan_DoiBaoDuong(data_BaoDuong).toPromise();

    Promise.all([ls1, ls2, ls3]).then((values: any) => {
      this.listDoUuTien = mapArrayForDropDown(values[0].Data, "Ten", "Id");
      this.listLoaiSuCo = mapArrayForDropDown(values[1].Data, "Ten", "Id");
      this.listNguoiThucHien = mapArrayForDropDown(values[2].Data, "NoiDung", "Id");
    })
  }

  getAllOptions() {
    this._danhMucTaiSan.LoaiNhienLieu().GetList({ CurrentPage: 0 }).toPromise().then((res: any) => {
      this.listNhienLieu = mapArrayForDropDown(res.Data, "Ten", "Id");
    });
    this._danhMucTaiSan.NhanCong().GetList({ CurrentPage: 0 }).toPromise().then((res: any) => {
      this.listNhanCong = mapArrayForDropDown(res.Data, "Ten", "Id");
    });
  }

  ThemVatTu(loai: string) {
    switch (loai) {
      case 'NHIENLIEU':
        this.item.listNhienLieu = this.item.listNhienLieu ? this.item.listNhienLieu : [];
        this.item.listNhienLieu.push({
          Id: "",
          Ten: '',
          SoLuong: 0,
          GiaTri: 0,
          GhiChu: '',
        })
        break;
      case 'NHANCONG':
        this.item.listNhanCong = this.item.listNhanCong ? this.item.listNhanCong : [];
        this.item.listNhanCong.push({
          Id: "",
          Ten: '',
          SoLuong: 0,
          GiaTri: 0,
          GhiChu: '',
        })
        break;
      default:
        break;
    }
  }

  ThemChiPhiKhac() {
    this.item.listChiPhiKhac = this.item.listChiPhiKhac ? this.item.listChiPhiKhac : [];
    this.item.listChiPhiKhac.push({
      Id: "",
      Ten: '',
      GiaTri: 0,
      GhiChu: '',
    })
  }

  setData() {
    let data = {
      ...this.item,
      listTaiSan: this.item.listTaiSan.map(item => {
        return {
          ...item,
          DenGioUnix: DateToUnix(item.DenGio),
          TuGioUnix: DateToUnix(item.TuGio)
        }
      })
    }
    return data;
  }

  ValidateData() {
    if (!validVariable(this.item.IdBoPhanSuDung) || !validVariable(this.item.IdDoUuTien)) {
      this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc!");
      return false;
    }
    // if (!validVariable(this.item.listTaiSan) || this.item.listTaiSan.length === 0) {
    //   this.toastr.error("Yêu cầu nhập thêm máy/thiết bị!");
    //   return false;
    // }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      // if (validVariable(this.item.listTaiSan[0]?.listVatTu)) {
      //   this.item.listTaiSan.forEach(ele => {
      //     ele.listVatTu.forEach(vattu => {
      //       if (vattu.SoLuong > vattu.TonKho) {
      //         this.toastr.error("Số lượng lớn hơn tồn kho!!!");
      //       }
      //       else {
      //         this._serviceTaiSan.QuyTrinhXuLySuCo().Set(this.setData()).subscribe((res: any) => {
      //           if (res.StatusCode !== 200 || !res.StatusCode) {
      //             this.toastr.error(res.Message);
      //           } else {
      //             this.item = res.Data;
      //             this.item.listTaiSan.forEach(ele => {
      //               ele.DenGio = UnixToDate(ele.DenGioUnix);
      //               ele.TuGio = UnixToDate(ele.TuGioUnix);
      //             })
      //             this.toastr.success(res.Message);
      //             this.KiemTraButtonModal();
      //           }
      //         }, (er) => {
      //           this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      //         })
      //       }
      //     })
      //   })
      // }
      // else {
      //   this._serviceTaiSan.QuyTrinhXuLySuCo().Set(this.setData()).subscribe((res: any) => {
      //     if (res.StatusCode !== 200 || !res.StatusCode) {
      //       this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      //     } else {
      //       this.item = res.Data;
      //       this.item.listTaiSan.forEach(ele => {
      //         ele.DenGio = UnixToDate(ele.DenGioUnix);
      //         ele.TuGio = UnixToDate(ele.TuGioUnix);
      //       })
      //       this.toastr.success(res.Message);
      //       this.KiemTraButtonModal();
      //     }
      //   }, (er) => {
      //     this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      //   })
      // }
      this._serviceTaiSan.QuyTrinhXuLySuCo().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode !== 200 || !res.StatusCode) {
          this.toastr.error("Có lỗi trong quá trình xử lý!!!");
        } else {
          this.item = res.Data;
          this.item.listTaiSan.forEach(ele => {
            ele.DenGio = UnixToDate(ele.DenGioUnix);
            ele.TuGio = UnixToDate(ele.TuGioUnix);
          })
          this.toastr.success(res.Message);
          this.KiemTraButtonModal();
        }
      }, (er) => {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.QuyTrinhXuLySuCo().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  ThemMoiDanhSachTaiSan() {
    if (!validVariable(this.item.IdBoPhanSuDung)) {
      this.toastr.error("Yêu cầu nhập đầy đủ bộ phận sử dụng!");
      return false;
    }
    let modalRef = this._modal.open(XulysucoluachontaisanComponent, {
      size: "xl",
      backdrop: "static",
    });
    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : []
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.Lay_Chon = this.item.IddmPhanXuong;
    modalRef.componentInstance.item = {};
    modalRef.componentInstance.item.IdBoPhanSuDung = this.item.IdBoPhanSuDung || '';
    modalRef.result.then((res: any) => {
      // let listKetQua = [];
      // this.item.listTaiSan.forEach(Tai_San => {
      //   let bien = res.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
      //   if (bien !== undefined) {
      //     listKetQua.push(Tai_San);
      //   }
      // });
      // res.forEach(Tai_San => {
      //   let bien = this.item.listTaiSan.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
      //   if (bien === undefined) {
      //     listKetQua.push(Tai_San);
      //   }
      // });
      // this.item.listTaiSan = listKetQua;
      this.item.listTaiSan = merge(res, this.item.listTaiSan, "IdTaiSan").filter(ele => !ele.isXoa);
    })
      .catch((er) => {
      });
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  KhongDuyet() {
    this._serviceTaiSan.QuyTrinhXuLySuCo().KhongDuyet(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  ChuyenDuyet() {
    if (this.item.isDoiBaoDuong && this.item.listTaiSan.some(x => !x.IsXuLy)) {
      this.toastr.error("Vui lòng hoàn thành các công việc trước khi chuyển tiếp!")
      return;
    }
    this._serviceTaiSan.QuyTrinhXuLySuCo().ChuyenTiep(this.setData()).subscribe((res: any) => {
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
        this._serviceTaiSan.QuyTrinhXuLySuCo().Delete(this.item.Id).subscribe((res: any) => {
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
  GetPhanXuong() {
    this._serviceTaiSan.GetListTaiSanThuHoi().GetListTaiSan(this.item.IddmPhanXuong).subscribe((res: any) => {
      this.listTaiSan = res.Data;
    });
  }
  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.multiple = true;
    modalRef.componentInstance.type = '';
    modalRef.result.then((data) => {
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

  chonBoPhanSD(e) {
    this.item.listTaiSan = [];
    this.listMay = mapArrayForDropDown(this.listMayDeep.filter(ele => ele.IdBoPhanSuDung === e.value), 'Ten', 'Id');
  }

  // new 

  LoaiThucHienBaoDuong() {
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '' };
    this._danhMucTaiSan.LoaiThucHienBaoDuong().GetList(data).subscribe((res: any) => {
      this.listNoiDungVatTuDeep = res.Data;
      this.listNoiDungVatTu = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    });
  }

  GetListTaiSanDangSuDung() {
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, IdDuAn: 0 };
    this._serviceTaiSan.GetListTaiSanDangSuDung(data).subscribe((res: any) => {
      this.listMayDeep = res.Data;
      this.listMay = mapArrayForDropDown(res.Data.filter(ele => ele.IdBoPhanSuDung === this.item.IdBoPhanSuDung), 'Ten', 'Id');

    });
  }

  ChonMay(value) {
    this.item.IdBoPhanSuDung = this.listMayDeep.find(ele => ele.Id === value)?.IdBoPhanSuDung;
    this.GetListVatTuByIdTaiSan(value);
  }

  add() {
    this.item.listTaiSan.push({
      TuGio: new Date()
    })
  }

  delete(index: any, prop: any) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa?';
    modalRef.result.then(res => {
      this.item[prop].splice(index, 1)
    })
  }

  ChonVatTuThayThe(data: any, index: any) {
    let modalRef = this._modal.open(ChonVatTuThayTheComponent, {
      backdrop: 'static',
      size: 'lg'
    });
    modalRef.componentInstance.title = 'Chọn vật tư thay thế';
    modalRef.componentInstance.IdTaiSan = this.item.IdTaiSan;
    modalRef.componentInstance.listVatTu = data.listVatTu ? JSON.parse(JSON.stringify(data.listVatTu)) : [];
    modalRef.result.then(res => {
      data.listVatTu = JSON.parse(JSON.stringify(res));;
    })
  }

  GetListVatTuByIdTaiSan(IdTaiSan) {
    this._serviceTaiSan.GetListVatTuByIdTaiSan(IdTaiSan).subscribe((vattu: any) => {
      this.listVatTuThayThe = mapArrayForDropDown(vattu.Data, 'TenTaiSan', 'IdVatTuThayThe');
    })
  }

  ChangeTab(e) {
    let listVatTuThayThe = [];
    if (e.index === 1) {
      this.isDeXuat = this.item.listTaiSan.every(ele => ele.IsXuLy);
      let arr = this.item.listTaiSan.filter(ele =>
        this.listNoiDungVatTuDeep.find(obj => obj.Id === ele?.IddmCongViecThucHien)?.Ma === 'THAYTHE');
      arr.forEach(obj => {
        listVatTuThayThe = [...obj.listVatTu, ...listVatTuThayThe];
      })
      this.item.listVatTu = [...listVatTuThayThe].filter(
        (value, index, self) => self.findIndex((m) => m.IdVatTuThayThe === value.IdVatTuThayThe) === index,
      );
    }
  }

  DeXuatVatTu() {
    this._serviceTaiSan.SetYeuCauXuatKhoXulySuCo(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200 || !res.StatusCode) {
        this.toastr.error(res.Message);
      } else this.toastr.success(res.Message);
    })
  }

  ChontVatTu() {
    let modalRef = this._modal.open(ChonVatTuComponent, {
      size: 'lg',
      backdrop: 'static',
    })
    modalRef.componentInstance.IdTaiSan = this.item.IdTaiSan;
    modalRef.componentInstance.listIdVatTuDaChon = this.item.listVatTu ? this.item.listVatTu.map(ele => ele.IdVatTuThayThe) : [];
    modalRef.result
      .then((res: any) => {
        this.item.listVatTu = merge(res, this.item.listVatTu, "IdVatTuThayThe");
        let listId = res.map((ele: any) => ele.IdVatTuThayThe);
        this.item.listVatTu = merge(res, this.item.listVatTu ? this.item.listVatTu : [], 'IdVatTuThayThe').filter(ele => listId.includes(ele.IdVatTuThayThe));
      })
      .catch((error: any) => { })
  }

  DaXuLy(data) {
    data.DenGio = data.IsXuLy ? new Date() : null;
    this.item.listTaiSan = [...this.item.listTaiSan];
  }

}
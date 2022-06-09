import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from '../../modal/uploadmodal/uploadmodal.component';
import { ModalthemmoiluachontaisanComponent } from '../modal/modalthemmoiluachontaisan/modalthemmoiluachontaisan.component';
import { ChonComponent } from '../screen/chon/chon.component';

@Component({
  selector: 'app-capnhatthuvientaisanchitiet',
  templateUrl: './capnhatthuvientaisanchitiet.component.html',
  styleUrls: ['./capnhatthuvientaisanchitiet.component.css']
})
export class CapnhatthuvientaisanchitietComponent implements OnInit {

  item: any = {};
  opt: any = "";
  title: any = "";
  lang: any = vn;
  NameFile: string;
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  itemDonVi: any = {};
  uploader: FileUploader;
  listDonVi: any = [];
  listLoaiTaiSan: any = [];
  listTinhTrangTaiSan: any = [];
  listCungSanXuat: any = [];
  listTinhTrangTaiSan_copy: any = [];
  listDonVi_copy: any = [];
  qrcode: any = {
    size: 250
  };
  listPhanXuong = [];
  filter: { MaCongDoan, };

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
  ) {

  }

  ngOnInit() {
    if (this.item.NgayNhapUnix !== 0 || this.item.NgayNhapUnix === 0) {
      this.item.NgayNhap = UnixToDate(this.item.NgayNhapUnix);
    }
    this.GetListdmPhanXuong();
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', };
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();
    let ls2 = this._danhMucTaiSan.DanhMucNhaCungCap().GetList(data).toPromise();

    Promise.all([ls1, ls2]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data, "Ten", "Id");
      this.listCungSanXuat = mapArrayForDropDown(values[1].Data, "Ten", "Id");
    });
  }

  GetListdmPhanXuong() {
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetIem() {
    this._serviceTaiSan.ThuVienTaiSan().Get(this.item.Id || "").subscribe((res: any) => {
      this.item = res.Data;
      this.item.TaiSan.ThoiGianDuaVaoSuDung = UnixToDate(this.item.TaiSan.ThoiGianDuaVaoSuDungUnix);
      this.item.TaiSan.NgayNhap = UnixToDate(this.item.TaiSan.NgayNhapUnix);
      this.itemDonVi = this.listDonVi_copy.find(obj => obj.Id === this.item.TaiSan.IddmDonViTinh);
      if (this.item.TaiSan.listTaiSan.length > 0) {
        this.item.TaiSan.listTaiSan.forEach(element => {
          element.ThoiGianDuaVaoSuDung = UnixToDate(element.ThoiGianDuaVaoSuDungUnix);
          element.NgayNhap = UnixToDate(element.NgayNhapUnix);
          if (validVariable(this.item.IddmDonViTinh)) {
            element.TenDonViTinh = this.listDonVi_copy.find(obj => obj.Id === element.IddmDonViTinh).Ten;
          }
        });
      }
    });
  }

  ValidateData() {
    if (!validVariable(this.item?.Ten)) {
      this.toastr.error("Yêu cầu nhập tên");
      return false;
    }
    if (!validVariable(this.item?.Ma || this.item?.IddmLoaiTaiSan)) {
      this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc");
      return false;
    }
    return true;
  }

  setData() {
    this.item.NgayNhapUnix = DateToUnix(this.item.NgayNhap);
    this.item.ThoiGianDuaVaoSuDungUnix = DateToUnix(this.item.ThoiGianDuaVaoSuDung);
    return this.item;
  }
  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.ThuVienTaiSan().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toastr.success(res.Message);
          this.item = res.Data;
          // this.activeModal.close();
        } else {
          this.toastr.error(res.Message);
        }
      })
    }
  }
  
  ThemMoiTaiSanCon() {
    let modalRef = this._modal.open(ModalthemmoiluachontaisanComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.item = {
      Id: "",
      isXoa: false,
      listFileDinhKem: [],
      Created: new Date(),
      Modified: new Date(),
      listTaiSan: [],
      listLichBaoDuong: [],
      listThongSoKyThuat: [],
      listThongSoAnToan: [],
    };
    modalRef.componentInstance.listTaiSan = this.item.TaiSan.listTaiSan;
    modalRef.componentInstance.listLoaiTaiSan = this.listLoaiTaiSan;
    modalRef.componentInstance.listTinhTrangTaiSan = this.listTinhTrangTaiSan;
    modalRef.componentInstance.listCungSanXuat = this.listCungSanXuat;
    modalRef.result
      .then((res: any) => {
        this.item.TaiSan.listTaiSan = res
      })
      .catch((er) => {
      });
  }

  CapNhatTaiSanCon(item) {
    let item_copy = {...item};
    let modalRef = this._modal.open(ModalthemmoiluachontaisanComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = item_copy;
    modalRef.componentInstance.listLoaiTaiSan = this.listLoaiTaiSan;
    modalRef.componentInstance.listTinhTrangTaiSan = this.listTinhTrangTaiSan;
    modalRef.componentInstance.listCungSanXuat = this.listCungSanXuat;
    modalRef.result
      .then((res: any) => {
        this.item.TaiSan.listTaiSan = res;
      })
      .catch((er) => {
      });
  }
  XoaThuVien() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa thư viện này chứ?";
    modalRef.result
      .then((res) => {
        this._serviceTaiSan.ThuVienTaiSan().Delete(this.item.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.activeModal.close();
            this.toastr.success(res.Message);
          } else {
            this.toastr.error(res.message);
          }
        })
      })
      .catch((er) => console.log(er));
  }

  delete(index) {
    let item = this.item.TaiSan.listTaiSan.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.push(JSON.parse(JSON.stringify(item)));
    }
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

  ChonTaiSan() {
    let modalRef = this._modal.open(ChonComponent, {
      size: "xl",
      backdrop: "static",
    });
    modalRef.componentInstance.ItemDaChon = this.item.IddmTaiSan ? this.item.IddmTaiSan : "";
    modalRef.componentInstance.item = this.item;
    modalRef.result.then((res: any) => {
      this.item.IddmTaiSan = res[0]?.Id;
      this.item.TendmTaiSan = res[0]?.Ten;
    })
      .catch((er) => {
      });
  }

  LayMa(e) {
    this.item.IddmTaiSan = '';
    if (!validVariable(e.value)) {
      this.item.Ma = '';
      this.item.TendmTaiSan = '';
    } else {
      this._serviceTaiSan.NhapTaiSan().GetNextMaTaiSan(e.value).subscribe((res: any) => {
        if (res.StatusCode === 500) {
          this.toastr.error(res.Message);
        }
        else {
          this.item.Ma = res.Data;
        }
      })
    }
  }

}
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown, validVariable, DateToUnix, DateToDatePicker, UnixToDate, deepCopy } from 'src/app/services/globalfunction';
import { API } from 'src/app/services/host';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalcapnhattaisanconComponent } from '../modalcapnhattaisancon/modalcapnhattaisancon.component';
import { ModaltaolichbaoduongComponent } from '../modaltaolichbaoduong/modaltaolichbaoduong.component';

@Component({
  selector: 'app-modalcapnhattaisan',
  templateUrl: './modalcapnhattaisan.component.html',
  styleUrls: ['./modalcapnhattaisan.component.css']
})
export class ModalcapnhattaisanComponent implements OnInit {

  item: any = {};
  opt: any = "";
  title: any = "";
  lang: any = vn;
  checkbutton: any = {};
  itemDonVi: any = {};
  uploader: FileUploader;
  // newTableItem: any = {};
  listDonVi: any = [];
  listLoaiTaiSan: any = [];
  listTinhTrangTaiSan: any = [];
  listNhaSanXuat: any = [];
  listTinhTrangTaiSan_copy: any = [];
  listDonVi_copy: any = [];
  qrcode: any = {
    size:250
  };

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
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20 };
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();
    let ls2 = this._danhMucTaiSan.DanhMucDonViTinh().GetList(data).toPromise();
    let ls3 = this._danhMucTaiSan.DanhMucTinhTrangTaiSan().GetList(data).toPromise();
    let ls4 = this._danhMucTaiSan.DanhMucHangSanXuat().GetList(data).toPromise();

    Promise.all([ls1, ls2, ls3, ls4]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data.Items, "Ten", "Id");
      this.listDonVi = mapArrayForDropDown(values[1].Data.Items, "Ten", "Id");
      this.listTinhTrangTaiSan = mapArrayForDropDown(values[2].Data.Items, "Ten", "Id");
      this.listNhaSanXuat = mapArrayForDropDown(values[3].Data.Items, "Ten", "Id");
      this.listTinhTrangTaiSan_copy = values[2].Data.Items;
      this.listDonVi_copy = values[1].Data.Items;

      this.KiemTraButtonModal();
      if (this.opt === 'add') {
        this.title = "Thêm mới";
        this.GetNextSoQuyTrinh();
      }
      else {
        this.title = "Cập nhật";
        this.GetIem();
      }
    });
  }

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.NhapTaiSan().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  GetIem() {
    this._serviceTaiSan.NhapTaiSan().Get(this.item.Id || "").subscribe((res: any) => {
      this.item = res.Data;
      this.item.TaiSan.NoiDung = this.item.NoiDung;
      this.item.TaiSan.NgaySanXuat = UnixToDate(this.item.TaiSan.NgaySanXuatUnix);
      this.item.TaiSan.NgayNhap = UnixToDate(this.item.TaiSan.NgayNhapUnix);
      this.itemDonVi = this.listDonVi_copy.find(obj => obj.Id === this.item.TaiSan.IddmDonViTinh);
      if (this.item.listTaiSan.length > 0) {
        this.item.listTaiSan.forEach(element => {
          element.NgaySanXuat = UnixToDate(element.NgaySanXuatUnix);
          element.NgayNhap = UnixToDate(element.NgayNhapUnix);
          if (validVariable(this.item.IddmDonViTinh)) {
            element.TenDonViTinh = this.listDonVi_copy.find(obj => obj.Id === element.IddmDonViTinh).Ten;
          }
        });
      }
    });
  }

  Validate() {
    if (!validVariable(this.item.TaiSan.Ma) ||
      !validVariable(this.item.TaiSan.Ten) ||
      !validVariable(this.item.TaiSan.NgayNhap) ||
      !validVariable(this.item.TaiSan.ThoiGianSuDung) ||
      !validVariable(this.item.TaiSan.SoSeri) ||
      !validVariable(this.item.TaiSan.IddmTinhTrang)) {
      this.toastr.error("Yêu cầu nhập đầy đủ trường bắt buộc");
      return false;
    }
    return true;
  }

  Setdata() {
    this.item.TaiSan.NgaySanXuatUnix = DateToUnix(this.item.TaiSan.NgaySanXuat);
    this.item.TaiSan.NgayNhapUnix = DateToUnix(this.item.TaiSan.NgayNhap);
    this.item.TaiSan.MaTinhTrang = this.listTinhTrangTaiSan_copy.find(obj => obj.Id === this.item.TaiSan.IddmTinhTrang).Ma;
    this.item.NoiDung = this.item.TaiSan.NoiDung;
    this.item.NgayNhap = this.item.TaiSan.NgayNhap;
    this.item.NgayNhapUnix = DateToUnix(this.item.NgayNhap);
  }

  GhiLai() {
    if (this.Validate()) {
      this.Setdata();
      if (this.opt === 'add') {
        this.item.Created = new Date();
        this.item.Modified = new Date();
      }
      this._serviceTaiSan.NhapTaiSan().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          // this.GetIem();
          this.toastr.success(res.Message);
          this.activeModal.close();
        } else {
          this.toastr.error(res.Message);
        }
      })
    }
  }

  ChapNhan() {
    if (this.Validate()) {
      this.Setdata();
      this._serviceTaiSan.NhapTaiSan().ChuyenTiep(this.item).subscribe((res: any) => {
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
    if (this.Validate()) {
      this.Setdata();
      this._serviceTaiSan.NhapTaiSan().KhongDuyet(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._serviceTaiSan.NhapTaiSan().Delete(this.item.Id).subscribe((res: any) => {
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

  ThemMoiTaiSanCon() {
    let modalRef = this._modal.open(ModalcapnhattaisanconComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.item = {};
    modalRef.componentInstance.listTaiSan = this.item.listTaiSan;
    modalRef.componentInstance.listDonVi = this.listDonVi;
    modalRef.componentInstance.listLoaiTaiSan = this.listLoaiTaiSan;
    modalRef.componentInstance.listTinhTrangTaiSan = this.listTinhTrangTaiSan;
    modalRef.componentInstance.listNhaSanXuat = this.listNhaSanXuat;
    modalRef.componentInstance.listTinhTrangTaiSan_copy = this.listTinhTrangTaiSan_copy;
    modalRef.componentInstance.listDonVi_copy = this.listDonVi_copy;
    modalRef.result
      .then((res: any) => {
      })
      .catch((er) => {

      });
  }

  CapNhatTaiSanCon(item) {
    let modalRef = this._modal.open(ModalcapnhattaisanconComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.listDonVi = this.listDonVi;
    modalRef.componentInstance.listLoaiTaiSan = this.listLoaiTaiSan;
    modalRef.componentInstance.listTinhTrangTaiSan = this.listTinhTrangTaiSan;
    modalRef.componentInstance.listNhaSanXuat = this.listNhaSanXuat;
    modalRef.componentInstance.listTinhTrangTaiSan_copy = this.listTinhTrangTaiSan_copy;
    modalRef.componentInstance.listDonVi_copy = this.listDonVi_copy;
    modalRef.result
      .then((res: any) => {

      })
      .catch((er) => {

      });
  }

  TaoLichBaoDuong(item) {
    if (validVariable(this.item.TaiSan.IddmDonViTinh)) {
      let modalRef = this._modal.open(ModaltaolichbaoduongComponent, {
        size: "xl",
        backdrop: "static",
      });
      modalRef.componentInstance.opt = "add";
      modalRef.componentInstance.TaiSanChaCon = "con";
      modalRef.componentInstance.item = item;
      modalRef.componentInstance.listDonVi = this.listDonVi;
      modalRef.componentInstance.listLoaiTaiSan = this.listLoaiTaiSan;
      modalRef.componentInstance.listTinhTrangTaiSan = this.listTinhTrangTaiSan;
      modalRef.componentInstance.listNhaSanXuat = this.listNhaSanXuat;
      modalRef.componentInstance.listTinhTrangTaiSan_copy = this.listTinhTrangTaiSan_copy;
      modalRef.componentInstance.itemDonVi = this.listDonVi_copy.find(obj => obj.Id === this.item.TaiSan.IddmDonViTinh);
      modalRef.result
        .then((res: any) => {
          this.item.listLichBaoDuong = res;
        })
        .catch((er) => {

        });
    }
    else {
      this.toastr.error("Yêu cầu chọn đơn vị");
    }
  }


  XoaTaiSanCon(item, index) {
    if (validVariable(item.Id)) {
      this.item.listTaiSan.splice(index, 1);
    }
    else {
      this.item.listTaiSan[index].isXoa = true;
    }
  }

}

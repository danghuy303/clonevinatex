import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ChonComponent } from '../../screen/chon/chon.component';
@Component({
  selector: 'app-modalthemmoiluachontaisan',
  templateUrl: './modalthemmoiluachontaisan.component.html',
  styleUrls: ['./modalthemmoiluachontaisan.component.css']
})
export class ModalthemmoiluachontaisanComponent implements OnInit {
  item: any = {};
  opt: any = "";
  title: any = "";
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  NameFile: string;
  checkbutton: any = {};
  itemDonVi: any = {};
  uploader: FileUploader;
  listDonVi: any = [];
  listLoaiTaiSan: any = [];
  listTinhTrangTaiSan: any = [];
  listCungSanXuat: any = [];
  listTinhTrangTaiSan_copy: any = [];
  listDonVi_copy: any = [];
  IdBoPhanSuDung: any = "";
  qrcode: any = {
    size: 250
  };
  listPhanXuong = [];
  listTaiSan: any = [];
  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit() {
    console.log('item', this.item);
    this.item.NgayNhap = UnixToDate(this.item.NgayNhapUnix);
    // if (this.item.ThoiGianDuaVaoSuDungUnix !== 0 || this.item.ThoiGianDuaVaoSuDungUnix === 0) {
      this.item.ThoiGianDuaVaoSuDung = UnixToDate(this.item.ThoiGianDuaVaoSuDungUnix);
    // }
    this.GetListdmPhanXuong();
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20 };
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();
    let ls2 = this._danhMucTaiSan.DanhMucNhaCungCap().GetList(data).toPromise();

    Promise.all([ls1, ls2]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data, "Ten", "Id");
      this.listCungSanXuat = mapArrayForDropDown(values[1].Data, "Ten", "Id");
    });
  }
  edit(item) {
    this.item.GiaTriConLai = item.NguyenGia;
  }
  isCanDuTru() {
    this.item.isCanDuTru = true;
    this.item.isCanDuTru = false;
  }
  GetListdmPhanXuong() {
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
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

  ValidateData() {
    if (!validVariable(this.item.Ten)) {
      this.toastr.error("Yêu cầu nhập tên");
      return false;
    }
    if (!validVariable(this.item.IddmLoaiTaiSan)) {
      this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc");
      return false;
    }
    // if (this.IdBoPhanSuDung != null) {
    //   if (!validVariable(this.item?.ThoiGianDuaVaoSuDung)) {
    //     this.toastr.error("Yêu cầu nhập thời gian đưa vào sử dụng");
    //     return false;
    //   }
    // }
    if (this.item?.isCanDuTru) {
      if (!validVariable(this.item?.DuTruToiThieu) || this.item?.DuTruToiThieu <= 0) {
        this.toastr.error("Yêu cầu nhập số lượng dự trữ");
        return false;
      }
    }
    return true;
  }

  GhiLai() {
    // if (!validVariable(this.item.DonViNangSuat) || !validVariable(this.item.IddmLoaiTaiSan) || !validVariable(this.item.Ten)) {
    //   this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc!");
    //   return
    // }
    if (this.ValidateData()) {
    this.item.ThoiGianDuaVaoSuDungUnix = DateToUnix(this.item.ThoiGianDuaVaoSuDung);
    this.item.NgayNhapUnix = DateToUnix(this.item.NgayNhap);
    this.activeModal.close(this.item);
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
        obj.FileNameGUI = obj.Name;
        obj.FileName = obj.NameLocal;
        obj.Link = obj.Url;
        this.NameFile += `${obj.FileName}` + '; ';
      });
    }, (reason) => {

    });
  }

  ChonTaiSan() {
    let modalRef = this._modal.open(ChonComponent, {
      size: "xl",
      backdrop: "static",
    });

    // modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.Id) : [];
    modalRef.componentInstance.ItemDaChon = this.item.IddmTaiSan ? this.item.IddmTaiSan : "";
    modalRef.componentInstance.item = this.item;
    modalRef.result.then((res: any) => {
      this.item.IddmTaiSan = res[0]?.Id;
      this.item.TendmTaiSan = res[0]?.Ten;
    })
      .catch((er) => {
      });
  }
}

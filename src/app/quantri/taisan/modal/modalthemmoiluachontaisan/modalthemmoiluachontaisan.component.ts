import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
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
    this.GetListdmPhanXuong();
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20 };
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();
    let ls2 = this._danhMucTaiSan.DanhMucNhaCungCap().GetList(data).toPromise();

    Promise.all([ls1, ls2]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data.Items, "Ten", "Id");
      this.listCungSanXuat = mapArrayForDropDown(values[1].Data.Items, "Ten", "Id");
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
    this.item.TendmTaiSan = '';
    this.item.IddmTaiSan = '';
    if (!validVariable(e.value)) {
      this.item.Ma = '';
      this.item.TendmTaiSan = '';
    }
    this._serviceTaiSan.NhapTaiSan().GetNextMaTaiSan(e.value).subscribe((res: any) => {
      if (res.StatusCode === 500) {
        this.item.Ma = '';
        this.toastr.error(res.Message);
      }
      else {
        this.item.Ma = res.Data;
      }
    })
  }

  GhiLai() {
    if (!validVariable(this.item.DonViNangSuat || this.item.IddmLoaiTaiSan || this.item.Ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc!");
      return
    }
    this.item.ThoiGianDuaVaoSuDungUnix = DateToUnix(this.item.ThoiGianDuaVaoSuDung);
    this.item.NgayNhapUnix = DateToUnix(this.item.NgayNhap);
    this.activeModal.close(this.item);
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

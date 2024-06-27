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

  item: any = {};
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
    if (!this.isXemChiTiet) {
      this.GetById();
    } else {
      this.item.NgayNhap = new Date(this.item.NgayNhap)
      this.item.ThoiGianDuaVaoSuDung = UnixToDate(this.item.ThoiGianDuaVaoSuDungUnix);
    }
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', };
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();
    let ls2 = this._danhMucTaiSan.DanhMucNhaCungCap().GetList(data).toPromise();

    Promise.all([ls1, ls2]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data, "Ten", "Id");
      this.listCungSanXuat = mapArrayForDropDown(values[1].Data, "Ten", "Id");

    });

    this._servicesSanXuat.GetListdmPhanXuongForIdDuAn().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
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

  GetById() {
    this._serviceTaiSan.ListDanhSachTaiSan().Get(this.getId).subscribe((res: any) => {
      this.item = res.Data;
      // this.item.NgayNhap = UnixToDate(this.item.NgayNhapUnix);
      this.item.NgayNhap = new Date(this.item.NgayNhap)
      this.item.ThoiGianDuaVaoSuDung = UnixToDate(this.item.ThoiGianDuaVaoSuDungUnix);
    })
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
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result
      .then((res: any) => {
      })
      .catch((er) => {

      });
  }

}

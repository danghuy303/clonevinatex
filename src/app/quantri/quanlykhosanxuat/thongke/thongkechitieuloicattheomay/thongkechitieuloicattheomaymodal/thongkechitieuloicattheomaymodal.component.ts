import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../../../quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from '../../../../../services/auth.service';
import { SanXuatService } from '../../../../../services/callApiSanXuat';
import { maskOption, vn } from '../../../../../services/const';
import { UnixToDate, DateToUnix, mapArrayForDropDown, validVariable, merge, MergeArr } from '../../../../../services/globalfunction';
import { PintableDirective } from 'voi-lib';
import { ChatluongsoimathangmodalComponent } from '../../../quytrinh/chatluongsoimathangmodal/chatluongsoimathangmodal.component';
import { API, host1 } from '../../../../../services/host';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';

@Component({
  selector: 'app-thongkechitieuloicattheomaymodal',
  templateUrl: './thongkechitieuloicattheomaymodal.component.html',
  styleUrls: ['./thongkechitieuloicattheomaymodal.component.css']
})
export class ThongkechitieuloicattheomaymodalComponent implements OnInit, AfterViewInit {
  @ViewChild('voiPintable') voiPintable: PintableDirective;
  @ViewChildren('inputNumber') inputNumbers: any;
  @ViewChildren('inputKhoiLuong') inputKhoiLuongs: any;
  @ViewChildren('buttonUploader') buttonUploader;
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  MO: any = maskOption;
  listdmKho: any = [];
  editTableItem: any = {};
  newTableItem: any = {};
  filter: any = {};
  listdmPhanXuong: any = [];
  listdmCaSanXuat: any = [];
  lang: any = vn;
  lstSanPham: any = [];
  userInfo: any;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;

  // Uploader
  fileInput: string;
  TepImport: any = {
    TenGoc: ''
  }
  uploader: FileUploader;
  // End uploader

  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService,
    private _auth: AuthenticationService,
    public _modal: NgbModal,) {

  }

  ngOnInit(): void {
    this.userInfo = this._auth.currentUserValue;
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      this.getDanhSachChiTieuChatLuong(true);
    }
    else {
      this.KiemTraButtonModal();
    }
    if (this.item.NgayKiemTraUnix !== null && this.item.NgayKiemTraUnix !== undefined) {
      this.item.NgayKiemTra = UnixToDate(this.item.NgayKiemTraUnix);
    }
    this.getListdmPhanXuong();
    this.getListCaSanXuat();
    this.initUploader();
  }

  getListCaSanXuat() {
    this.services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listdmCaSanXuat = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }

  // Uploader
  initUploader() {
    let option: FileUploaderOptions = {
      url: `${API.uploadURLalt}`,
      headers: [{ name: 'Accept', value: 'application/json' }],
      autoUpload: true,
    }

    this.uploader = new FileUploader(option);
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = true;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onCompleteItem = (item, response, status, headers) => this.onCompleteItem(item, response, status, headers);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
  }

  onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    let res = JSON.parse(response);
    this.TepImport.TenGui = res[0].Name;
    this.TepImport.TenGoc = res[0].NameLocal;
    this.TepImport.DuongDan = res[0].Url;
    this.fileInput = '';
    this.ImportPhieuNhap()
  };
  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
  }
  // End uploader

  ngAfterViewInit(): void {
    this.voiPintable.active();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
      if (this.item.CreatedBy == this.userInfo?.Id) {
        this.checkbutton.Ghi = true;
      }
    })
  }

  ChuyenDuyet() {
    if (this.item.NgayKiemTra !== null && this.item.NgayKiemTra !== undefined)
      this.item.NgayKiemTraUnix = DateToUnix(this.item.NgayKiemTra);
    if (this.item.TuNgay !== null && this.item.TuNgay !== undefined)
      this.item.TuNgayUnix = DateToUnix(this.item.TuNgay);
    if (this.item.DenNgay !== null && this.item.DenNgay !== undefined)
      this.item.DenNgayUnix = DateToUnix(this.item.DenNgay);
    this.services.QuyTrinhLoiCatTheoMay().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }
  KhongDuyet() {
    if (this.item.NgayKiemTra !== null && this.item.NgayKiemTra !== undefined)
      this.item.NgayKiemTraUnix = DateToUnix(this.item.NgayKiemTra);
    if (this.item.TuNgay !== null && this.item.TuNgay !== undefined)
      this.item.TuNgayUnix = DateToUnix(this.item.TuNgay);
    if (this.item.DenNgay !== null && this.item.DenNgay !== undefined)
      this.item.DenNgayUnix = DateToUnix(this.item.DenNgay);
    this.services.QuyTrinhLoiCatTheoMay().KhongDuyet(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }

  GetNextSoQuyTrinh() {
    this.services.QuyTrinhLoiCatTheoMay().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.NgayKiemTra === null || this.item.NgayKiemTra === undefined)
      this.toastr.error("Bạn chưa chọn ngày kiểm tra!");
    else if (this.item.IddmPhanXuong === null || this.item.IddmPhanXuong === undefined)
      this.toastr.error("Bạn chưa chọn phân xưởng!");
    else {
      this.item.NgayKiemTraUnix = DateToUnix(this.item.NgayKiemTra);
      this.services.QuyTrinhLoiCatTheoMay().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            res.objectReturn.NgayKiemTra = UnixToDate(res.objectReturn.NgayKiemTraUnix);
            this.item = res.objectReturn;
            this.KiemTraButtonModal();
            this.voiPintable.active();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.QuyTrinhLoiCatTheoMay().Delete(this.item.Id).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.toastr.success(res.message);
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  GetMatHangTheoKho() {
    let data = {
      IddmPhanXuong: this.item.IddmPhanXuong,
      Ngay: DateToUnix(this.item.NgayKiemTra),
      TuNgay: DateToUnix(this.item.TuNgay),
      DenNgay: DateToUnix(this.item.DenNgay),
      IddmCaSanXuat: this.item.IddmCaSanXuat
    };
    this.services.QuyTrinhLoiCatTheoMay().GetListMatHang(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(ChatluongsoimathangmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.lstSanPham;
      modalRef.componentInstance.loai = 'loicat';
      modalRef.componentInstance.type = 'theomay';
      modalRef.result.then((data) => {
        // this.item.lstSanPham = data.data;
        this.item.lstSanPham = MergeArr(data.data, this.item.lstSanPham || [], "IddmItem");
        // huy nhỏ sửa, khi thêm mặt hàng giữ số liệu đã chọn
      }, (reason) => {
        // không
      });
    })
  }

  getListKho() {
    var data: any = {}
    data.Loai = 10;
    data.CurrentPage = 0;
    this.services.GetListdmKho(data).subscribe((res: any) => {
      this.listdmKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListdmPhanXuong() {
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getDanhSachChiTieuChatLuong(value) {
    let data = {
      CurrentPage: 0,
      KeyWord: "",
      IddmPhanXuong: value || "",
    }
    this.services.DanhMucLoiCat().GetList(data).subscribe((res: any) => {
      this.item.lstDanhMuc = res;
    })
  }
  Onclose() {
    this.activeModal.close();
  }
  tinhTong(list, nhom) {
    let chitieuCon = list.filter(ele => ele.NhomChiTieu === nhom && !ele.isTong);
    let chitieuTong = list.filter(ele => ele.NhomChiTieu === nhom && ele.isTong);
    if (validVariable(chitieuCon) && chitieuCon?.length !== 0 && validVariable(chitieuTong) && chitieuTong?.length !== 0) {
      let TongChiTieuCon = chitieuCon.reduce((a, b) => a + (b.ChiTieuThucTe || 0), 0);
      chitieuTong.forEach(ele => { ele.ChiTieuThucTe = TongChiTieuCon });
    }
  }

  chonPhanXuong(e) {
    this.getDanhSachChiTieuChatLuong(e.value);
  }

  moveToNext(event) {
    let next = event.target.nextElementSibling;
    if (next) {
      next.focus();
    } else {
      event.target.blur();
    }
  }
  xuongDong(i, length, indexcon) {
    let nextIndex = i * length + indexcon + 1;
    let nextFocus = this.inputNumbers.toArray().find(ele => ele.tabindex === nextIndex + length);
    if (validVariable(nextFocus)) {
      this.inputNumbers.toArray()[(indexcon + 1 >= length ? 0 : indexcon + 1)].el.nativeElement.children[0].children[0].focus();
      this.inputNumbers.toArray()[(indexcon + 1 >= length ? 0 : nextIndex)].el.nativeElement.children[0].children[0].select();
    }
  }

  ImportPhieuNhap() {
    let { obj, _bool } = this.validBefore();
    if (!_bool) {
      return;
    }
    this.services.QuyTrinhLoiCatTheoMay().ImportPhieuNhapChiTieuLoiCat(this.TepImport.TenGui, obj.IddmPhanXuong, obj.NgayKiemTraUnix).subscribe((imp: any) => {
      this.item.lstSanPham = imp
    })
  }
  ExportPhieuNhap() {
    let { obj, _bool } = this.validBefore();
    if (!_bool) {
      return;
    }
    this.services.QuyTrinhLoiCatTheoMay().ExportPhieuNhapChiTieuLoiCat(obj.IddmPhanXuong, obj.NgayKiemTraUnix).subscribe((res: any) => {
      const _url = host1 + res.TenFile
      window.open(_url);
      this.toastr.success(`Xuất file thành công`);
    })
  }

  validBefore() {
    let _bool = true
    let obj = {
      IddmPhanXuong: this.item.IddmPhanXuong,
      NgayKiemTraUnix: DateToUnix(this.item.NgayKiemTra)
    }
    if (!obj.IddmPhanXuong) {
      this.toastr.error(`Vui lòng chọn phân xưởng`);
      _bool = false
    }
    else if (!obj.NgayKiemTraUnix) {
      this.toastr.error(`Vui lòng chọn ngày kiểm tra`);
      _bool = false
    }
    return {
      obj: obj,
      _bool: _bool
    }
  }
}

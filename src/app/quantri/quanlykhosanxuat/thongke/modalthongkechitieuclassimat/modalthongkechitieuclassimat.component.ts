import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { maskOption, vn } from 'src/app/services/const';
import { UnixToDate, DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { PintableDirective } from 'voi-lib';
import { ChatluongsoimathangmodalComponent } from '../../quytrinh/chatluongsoimathangmodal/chatluongsoimathangmodal.component';

@Component({
  selector: 'app-modalthongkechitieuclassimat',
  templateUrl: './modalthongkechitieuclassimat.component.html',
  styleUrls: ['./modalthongkechitieuclassimat.component.css']
})
export class ModalthongkechitieuclassimatComponent implements OnInit {
  @ViewChild('voiPintable') voiPintable: PintableDirective;
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
  lang: any = vn;
  lstSanPham: any = [];
  userInfo: any;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService,
    private _auth: AuthenticationService,
    public _modal: NgbModal,) {

  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      this.getDanhSachChiTieuChatLuong();
    }
    else {
      this.userInfo = this._auth.currentUserValue;
      this.KiemTraButtonModal();
    }
    if (this.item.NgayKiemTraUnix !== null && this.item.NgayKiemTraUnix !== undefined) {
      this.item.NgayKiemTra = UnixToDate(this.item.NgayKiemTraUnix);
    }
    this.getListdmPhanXuong();
  }
  ngAfterViewInit(): void {
    this.voiPintable.active();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
      if (this.item.CreatedBy == this.userInfo.Id)
        this.checkbutton.Ghi = true;
    })
  }

  ChuyenDuyet() {
    if (this.item.NgayKiemTra !== null && this.item.NgayKiemTra !== undefined)
      this.item.NgayKiemTraUnix = DateToUnix(this.item.NgayKiemTra);
    this.services.QuyTrinhClassimat().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this.services.QuyTrinhClassimat().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.NgayKiemTra === null || this.item.NgayKiemTra === undefined)
      this.toastr.error("Bạn chưa chọn ngày kiểm tra");
    else if (this.item.IddmPhanXuong === null || this.item.IddmPhanXuong === undefined)
      this.toastr.error("Bạn chưa chọn phân xưởng");
    else {
      this.item.NgayKiemTraUnix = DateToUnix(this.item.NgayKiemTra);
      this.services.QuyTrinhClassimat().Set(this.item).subscribe((res: any) => {
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
      this.services.QuyTrinhClassimat().Delete(this.item.Id).subscribe((res: any) => {
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
    };
    this.services.QuyTrinhClassimat().GetListMatHang(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(ChatluongsoimathangmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.lstSanPham;
      modalRef.componentInstance.loai = 'classimat';
      modalRef.result.then((data) => {
        console.log(data);
        this.item.lstSanPham = data.data;
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
  getDanhSachChiTieuChatLuong() {
    let data = {
      CurrentPage: 0,
      KeyWord: "",
    }
    this.services.DanhMucClassimat().GetList(data).subscribe((res: any) => {
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
}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { vn } from 'src/app/services/const';
import { DanhMucMatHangPopupComponent } from '../../danh-muc-mat-hang-popup/danh-muc-mat-hang-popup.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { DateToUnix, UnixToDate, mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-nhap-kho-gia-cong-modal',
  templateUrl: './nhap-kho-gia-cong-modal.component.html',
  styleUrls: ['./nhap-kho-gia-cong-modal.component.css']
})
export class NhapKhoGiaCongModalComponent implements OnInit {

  nametype: string = '';
  opt: string = '';
  item: any = {};
  checkbutton: any = {};
  listKhoGiaCong: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  data: any = {};
  listdmQuyCachDongGoi: any = [];
  listdmKgCo: any = [];
  listdmLo: any = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.item = {
        NhaMay: '',
        IddmLoaiBong: '',
        IddmCapBong: '',
        IdLoBong: '',
        listItem: [],
      }
      this.GetNextSoQuyTrinh();
    }
    this.KiemTraButtonModal();
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.getListKho();
    this.getListdmQuyCachDongGoi();
    this.GetListKgCone();
    this.GetListLoHang();
  }

  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenTiep() {
    this._services.PhieuNhapGiaCong().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }

  GetNextSoQuyTrinh() {
    this._services.PhieuNhapGiaCong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  setData() {
    let data = {
      ...this.item,
      NgayUnix:DateToUnix(this.item.Ngay)
    }
    return data
  }

  GhiLai() {
    this._services.PhieuNhapGiaCong().Set(this.setData()).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.toastr.success(res.message)
          this.opt = 'edit';
          this.item = res.objectReturn;
          this.KiemTraButtonModal();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._services.PhieuNhapGiaCong().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getListKho() {
    this.data.Loai = 203;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKhoGiaCong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListdmQuyCachDongGoi() {
    this._services.dmQuyCachDongGoi().GetList().subscribe((res: any) => {
      this.listdmQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetListKgCone() {
    let data = {
      CurrentPage:0
    }
    this._services.GetListdmKgCone(data).subscribe((res: any) => {
      this.listdmKgCo = mapArrayForDropDown(res, 'GiaTri', 'Id');
    })
  }
  GetListLoHang() {
    let data = {
      CurrentPage:0
    }
    this._services.LoHang().GetList(data).subscribe((res: any) => {
      this.listdmLo = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  Onclose() {
    this.activeModal.close();
  }

  GetMatHangTheoKho() {
    let modalRef = this._modal.open(DanhMucMatHangPopupComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    modalRef.componentInstance.kho = 'khothanhpham';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(this.item))
    modalRef.result.then((data) => {
      this.item.listItem = data;
    })
  }

  ExportExcel() {
    this._services.BaoCao().ExportPhieuNhapKhoThanhPham_Bieu1({ IdPhieuNhapKho: this.item.Id }).subscribe((res: any) => {
      if (res) {
        if (res.State) {
          this.toastr.error(res.message);
        } else {
          this._services.download(res.TenFile);
        }
      }
    })
  }
  KhongDuyet() {
    this._services.PhieuNhapGiaCong().KhongDuyet(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }
}

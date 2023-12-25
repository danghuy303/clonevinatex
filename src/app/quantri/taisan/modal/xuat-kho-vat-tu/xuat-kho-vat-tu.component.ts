import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, UnixToDate, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { ChonVatTuPopupComponent } from './chon-vat-tu-popup/chon-vat-tu-popup.component';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-xuat-kho-vat-tu',
  templateUrl: './xuat-kho-vat-tu.component.html',
  styleUrls: ['./xuat-kho-vat-tu.component.css']
})
export class XuatKhoVatTuComponent implements OnInit {

  opt: any = '';
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  listKho: any = [];
  listloaisoi: any = [];
  lang: any = vn;
  filter: any = {};
  listdmKhachHang: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  eAction: string = 'QUYTRINHXUATKHO';

  constructor(
    public activeModal: NgbActiveModal,
    private _sanxuat: SanXuatService,
    public toastr: ToastrService,
    public _modal: NgbModal,
    private _services: TaisanService) {
  }

  ngOnInit(): void {
    this.GetNextSoQuyTrinh();
    this.GetListdmPhanXuong();
    this.KiemTraButtonModal();
    this.getListdmKhachHang();
    if (this.opt === 'edit') {
      this.mapUnix();
    }
  }

  GetListdmPhanXuong() {
    this._sanxuat.GetListdmPhanXuongForIdDuAn().subscribe((res: any) => {
      let nhaMay = [
        {
          Id: 'Chưa có bộ phận sử dụng',
          Ten: 'Chưa có bộ phận sử dụng'
        }
      ]
      let luaChonNhaMay = [...res, ...nhaMay]
      // this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.listKho = mapArrayForDropDown(luaChonNhaMay, 'Ten', 'Id');
    })
  }

  KiemTraButtonModal() {
    this._sanxuat.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  GetNextSoQuyTrinh() {
    this._services.QuyTrinhXuatKho().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res;
    })
  }

  ValidateData() {
    if (!validVariable(this.item.IddmKho)) {
      this.toastr.error("Yêu cầu nhập phân xưởng");
      return false;
    }
    if (!validVariable(this.item.Ngay)) {
      this.toastr.error("Yêu cầu nhập ngày");
      return false;
    }
    if (!validVariable(this.item.IdNguoiYeuCau)) {
      this.toastr.error("Yêu cầu nhập người yêu cầu");
      return false;
    }
    return true;
  }

  setData() {
    let data = {
      ...this.item,
      NgayUnix: DateToUnix(this.item.Ngay),
      eAction: this.eAction
    }
    return data;
  }

  mapUnix() {
    this.item = {
      ...this.item,
      Ngay: UnixToDate(this.item.NgayUnix)
    }
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._services.QuyTrinhXuatKho().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toastr.success(res.Message);
          this.item = res.Data;
          this.mapUnix()
          this.KiemTraButtonModal();
        } else {
          this.toastr.error(res.Message);
        }
      })
    }
  }

  ChuyenTiep() {
    this._services.QuyTrinhXuatKho().ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res) {
        if (res.StatusCode === 200) {
          this.toastr.success(res.Message);
          this.activeModal.close();
        } else {
          this.toastr.error(res.Message);
        }
      }
    })
  }

  KhongDuyet() {
    this._services.QuyTrinhXuatKho().KhongDuyet(this.setData()).subscribe((res: any) => {
      if (res) {
        if (res.StatusCode === 200) {
          this.toastr.success(res.Message);
          this.activeModal.close();
        } else {
          this.toastr.error(res.Message);
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
      this._services.QuyTrinhXuatKho().Delete(this.item.Id).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toastr.success(res.Message);
          this.activeModal.close();
        } else {
          this.toastr.error(res.Message);
        }
      })
    }).catch(er => console.log(er))
  }

  getListdmKhachHang() {
    this._sanxuat.dmKhachHang().GetListOpt().subscribe((res: any) => {
      this.listdmKhachHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  resetFilter() {
    this.filter = {};
    this.filter.KeyWord = '';
  }

  Onclose() {
    this.activeModal.close();
  }

  ChonVatTu() {
    let modalRef = this._modal.open(ChonVatTuPopupComponent, {
      size: 'xl',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = '';
    modalRef.result.then((data) => {
      this.item.listItem = data
    })
  }

}
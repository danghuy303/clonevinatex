import { number } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ImportdanhmucmodelComponent } from 'src/app/quantri/danhmuc/danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, UnixToDate, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-kiem-tra-ban-che-pham-to-hieu-modal',
  templateUrl: './kiem-tra-ban-che-pham-to-hieu-modal.component.html',
  styleUrls: ['./kiem-tra-ban-che-pham-to-hieu-modal.component.css']
})
export class KiemTraBanChePhamToHieuModalComponent implements OnInit {

  opt = '';
  Nam: any;
  title: any = '';
  kiemke: any = {};
  item: any = {};
  checkbutton = {};
  listPhanXuong: any = [];
  listMay: any = [];
  listCaSanXuat: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  isKiemKe: boolean = false;
  isKiemKeXoa: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private _modal: NgbModal,
    private toastr: ToastrService,
    private store: StoreService,
  ) { }

  ngOnInit(): void {
    this.GetListdmPhanXuong();
    this.GetListdmCaSanXuatThucTe();
    this.GetListMayCongDoanKiemKeBanChePhamToHieu();
    if (this.opt === 'edit') {
      this.isKiemKeXoa = true;
      this.Nam = `${this.item.Thang}/${this.item.Nam}`
    }
  }

  GetListdmPhanXuong() {
    this._services.GetListdmPhanXuongForIdDuAn().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetListdmCaSanXuatThucTe() {
    this._services.GetListOptdmCaSanXuatThucTe().subscribe((res: any) => {
      this.listCaSanXuat = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetListMayCongDoanKiemKeBanChePhamToHieu() {
    this._services.KiemKeBanChePham().GetListMayCongDoanKiemKeBanChePhamToHieu().subscribe((res: any) => {
      this.listMay = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
  }

  ValidateData() {
    if (!validVariable(this.kiemke.Nam)) {
      this.toastr.error("Yêu cầu chọn tháng năm!");
      return false;
    } else if (!validVariable(this.kiemke.IddmPhanXuong)) {
      this.toastr.error("Yêu cầu chọn phân xưởng!");
      return false;
    } else if (!validVariable(this.kiemke.CongDoan)) {
      this.toastr.error("Yêu cầu chọn máy!");
      return false;
    }
    if (this.kiemke.CongDoan === 'ONG') {
      if (!validVariable(this.kiemke.IddmCaSanXuat)) {
        this.toastr.error("Yêu cầu chọn ca sản xuất!");
        return false;
      }
    }
    return true;
  }

  ChapNhan() {
    if (this.ValidateData()) {
      let data = {
        CongDoan: this.kiemke.CongDoan,
        // Thang: this.kiemke.Nam.getMonth() + 1,
        // Nam: this.kiemke.Nam.getFullYear(),
        Ngay: DateToUnix(this.kiemke.Nam),
        IddmCaSanXuat: this.kiemke.IddmCaSanXuat,
        IddmPhanXuong: this.kiemke.IddmPhanXuong,
      }
      this._services.KiemKeBanChePham().GetKhoiTaoPhieuKiemKeBanChePhamToHieu(data).subscribe((res: any) => {
        if (res.State === 1)
          this.toastr.success(res.message);
        else
          this.toastr.error(res.message);
        if (res.objectReturn) {
          this.isKiemKe = !this.isKiemKe;
          this.title = 'Kiểm kê kho bán chế phẩm';
          this.item = res.objectReturn;
          this.Nam = `${this.item.Thang}/${this.item.Nam}`
        }
        else this.item = {}
      })
    }
  }

  setData() {
    let data = {
      ...this.item,
    };
    return data
  }

  GhiLai() {
    this._services.KiemKeBanChePham().Set(this.setData()).subscribe((res: any) => {
      this.item = res.objectReturn;
      if (res.State === 1)
        this.toastr.success(res.message);
      else
        this.toastr.error(res.message);
    })
    this.isKiemKeXoa = true
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._services.KiemKeBanChePham().Delete(this.item).subscribe((res: any) => {
          if (res.State === 1) {
            this.toastr.success(res.message);
            this.activeModal.close();
          } else {
            this.toastr.error('Có lỗi xảy ra!');
          }
        })
      })
      .catch((er) => console.log(er));
  }

  TinhBCP() {
    this._services.KiemKeBanChePham().TinhPhieuKiemKeBanChePhamToHieu(this.item).subscribe((res: any) => {
      this.item = res.objectReturn;
      this.toastr.success(res.message);
    })
  }
  NhapDuLieu() {
    let modalRef = this._modal.open(ImportdanhmucmodelComponent, {
      backdrop: 'static',
    })
    modalRef.componentInstance.importFunc = this.item.Id;
    modalRef.componentInstance.Name = "BCP";
    modalRef.result.then(res => {
      this.item = res.objectReturn;
      this.toastr.success(res.message);
    })
      .catch(er => console.log(er))
  }
  XuatDuLieu() {
    this._services.KiemKeBanChePham().ExportKiemKeBanChePham(this.item.Id).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }

  QuayLai() {
    this.activeModal.dismiss();
  }

}

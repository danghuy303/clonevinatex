import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ImportdanhmucmodelComponent } from 'src/app/quantri/danhmuc/danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-ban-che-pham-to-hieu-tong-hop',
  templateUrl: './ban-che-pham-to-hieu-tong-hop.component.html',
  styleUrls: ['./ban-che-pham-to-hieu-tong-hop.component.css']
})
export class BanChePhamToHieuTongHopComponent implements OnInit {

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
    private router: Router
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

  setData() {
    let data = {
      ...this.item,
    };
    return data
  }

  GhiLai() {
    this._services.KiemKeBanChePham().Set(this.setData()).subscribe((res: any) => {
      this.item = res.objectReturn;
      this.toastr.success(res.message);
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

  XuatDuLieu() {
    this._services.KiemKeBanChePham().ExportPhieuKiemKeBanChePhamToHieuTongHop(this.item.Id).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }

  Link(id) {
    this.router.navigate([`/quantri/quanlykhosanxuat/khobong/kiemtrabanchepham-tohieu/${id}`], {
      replaceUrl: true,
    });
  }


}

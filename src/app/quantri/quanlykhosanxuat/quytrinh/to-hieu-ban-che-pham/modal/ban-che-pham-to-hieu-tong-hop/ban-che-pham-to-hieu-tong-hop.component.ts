import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ImportdanhmucmodelComponent } from 'src/app/quantri/danhmuc/danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { MergeArr, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhSachMatHangComponent } from '../danh-sach-mat-hang/danh-sach-mat-hang.component';

@Component({
  selector: 'app-ban-che-pham-to-hieu-tong-hop',
  templateUrl: './ban-che-pham-to-hieu-tong-hop.component.html',
  styleUrls: ['./ban-che-pham-to-hieu-tong-hop.component.css']
})
export class BanChePhamToHieuTongHopComponent implements OnInit {

  opt = '';
  bcp = '';
  Nam: any;
  title: any = '';
  type: any = '';
  kiemke: any = {};
  item: any = {};
  checkbutton: any = {};
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
      this.KiemTraButtonModal();
      this.isKiemKeXoa = true;
      this.Nam = `${this.item.Thang}/${this.item.Nam}`
    }
  }

  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  GetListdmPhanXuong() {
    this._services.GetListdmPhanXuongForIdDuAn().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      if (!this.item.IddmPhanXuong) {
        this.item.IddmPhanXuong = this.listPhanXuong[0].value;
      }
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
    let API = this.bcp === 'HUE' ? this._services.KiemKeBanChePhamHue() : this._services.KiemKeBanChePham();
    API.SetPhieuKiemKeBanChePhamToHieuTongHop(this.setData()).subscribe((res: any) => {
      this.item = res.objectReturn;
      this.toastr.success(res.message);
    })
    this.isKiemKeXoa = true
  }

  KhongDuyet() {
    let API = this.bcp === 'HUE' ? this._services.KiemKeBanChePhamHue() : this._services.KiemKeBanChePham();
    API.KhongDuyet(this.setData()).subscribe((res: any) => {
      if (res.State === 1) {
        this.toastr.success(res.message);
        this.activeModal.close();
      } else {
        this.toastr.error('Có lỗi xảy ra!');
      }
    })
  }
  ChuyenTiep() {
    let API = this.bcp === 'HUE' ? this._services.KiemKeBanChePhamHue() : this._services.KiemKeBanChePham();
    API.ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res.State === 1) {
        this.toastr.success(res.message);
        this.activeModal.close();
      } else {
        this.toastr.error('Có lỗi xảy ra!');
      }
    })
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        let API = this.bcp === 'HUE' ? this._services.KiemKeBanChePhamHue() : this._services.KiemKeBanChePham();
        API.Delete(this.item).subscribe((res: any) => {
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
    let API = this.bcp === 'HUE' ? this._services.KiemKeBanChePhamHue() : this._services.KiemKeBanChePham();
    API.ExportPhieuKiemKeBanChePhamToHieuTongHop(this.item.Id).subscribe((res: any) => {
      this._services.download(res.TenFile);
    })
  }

  Link(id) {
    this.router.navigate([`/quantri/quanlykhosanxuat/khobong/${this.bcp === 'HUE' ? 'kiemtrabanchepham-hue' : 'kiemtrabanchepham-tohieu'}/${id}`], {
      replaceUrl: true,
    });
  }

  chonHangHoa() {
    let modalRef = this._modal.open(DanhSachMatHangComponent, {
      size: 'xl'
    })
    modalRef.componentInstance.listDaChon = this.item.listData3 ? this.item.listData3.map(ele => ele.IddmItem) : [];
    modalRef.result.then(res => {
      let arr = res.map(ele => {
        return {
          ...ele,
          listGiaTri: this.item.listData3[0].listGiaTri
        }
      });
      this.item.listData3 = MergeArr(arr, this.item.listData3, "IddmItem");
    }).catch(er => {
      console.log(er);
    })
  }


}

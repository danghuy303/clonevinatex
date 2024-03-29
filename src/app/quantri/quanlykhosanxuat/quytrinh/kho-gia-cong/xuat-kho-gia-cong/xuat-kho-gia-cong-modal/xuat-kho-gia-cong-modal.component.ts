import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, UnixToDate, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { XuatthanhphammathangmodalComponent } from '../../../xuatthanhphammathangmodal/xuatthanhphammathangmodal.component';

@Component({
  selector: 'app-xuat-kho-gia-cong-modal',
  templateUrl: './xuat-kho-gia-cong-modal.component.html',
  styleUrls: ['./xuat-kho-gia-cong-modal.component.css']
})
export class XuatKhoGiaCongModalComponent implements OnInit {

  opt: any = ''
  item: any = {};
  checkbutton: any = {}
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  listKho: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    public _modal: NgbModal,
    private _services: SanXuatService) {
  }

  ngOnInit(): void {
    this.getListKho();
    this.KiemTraButtonModal();
    if (this.opt === 'add') {
      this.GetNextSoQuyTrinh();
    }
    else {
      this.MapTinhKhoiLuong();
    }
    if (this.item.NgayUnix !== 0 || this.item.NgayUnix === 0) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
  }

  getListKho() {
    let data = {
      CurrentPage: 0,
      Loai: 203,
    }
    this._services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  SetData() {
    let data = {
      ...this.item,
      NgayUnix: DateToUnix(this.item.Ngay)
    }
    return data
  }

  ValidateData() {
    if (!validVariable(this.item.Ngay)) {
      this.toastr.error("Yêu cầu nhập Ngày");
      return false;
    }
    return true;
  }

  ChuyenTiep() {
    this._services.PhieuXuatGiaCong().ChuyenTiep(this.SetData()).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }

  KhongDuyet() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn ngày chứng từ!");
    }
    else {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.PhieuXuatGiaCong().KhongDuyet(this.item).subscribe((res: any) => {
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

  GetNextSoQuyTrinh() {
    this._services.PhieuXuatGiaCong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._services.PhieuXuatGiaCong().Set(this.SetData()).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.item = {
              ...res.objectReturn,
              Ngay: UnixToDate(res.objectReturn.NgayUnix)
            }
            this.MapTinhKhoiLuong();
            this.toastr.success(res.message);
            this.KiemTraButtonModal();
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
      this._services.PhieuXuatGiaCong().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
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

  Onclose() {
    this.activeModal.close();
  }
  GetMatHangTheoKho() {
    var data = {
      Ngay: DateToUnix(this.item.Ngay),
      IddmKho: this.item.IddmKho,
      // IddmPhanXuong: this.item.IddmPhanXuong,
    }
    let listItem: any = []
    if (this.item.listItem !== undefined && this.item.listItem !== null) {
      listItem = this.item.listItem.filter((e: any) => e.isXoa !== true);
    }
    this._services.GetlistdmMatHangXuatGiaCong(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatthanhphammathangmodalComponent, {
        size: 'xl',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = listItem;
      modalRef.result.then((data) => {
        if (this.item.listItem !== undefined && this.item.listItem.length > 0) {
          this.item.listItem.forEach(element => {
            element.isXoa = true;
          });
        }

        let listdatapush = [];
        data.data.forEach(element => {
          let datapush: any = {
            ...element,
            Ten: element.Ten,
            IddmItem: element.IddmItem,
            TenLoHang: element.TenLoHang,
            TonSoLuong: element.SoLuong,
            KhoiLuong: element.TrongLuong,
            IdLoHang: element.IdLoHang,
            IdNhapKho: element.IdNhapKho,
            IdNhapKhoGoc: element.IdNhapKhoGoc,
            IddmQuyCachDongGoi: element.IddmQuyCachDongGoi,
            TendmQuyCachDongGoi: element.TendmQuyCachDongGoi,
            SoQuaSoi: element.SoLuong,
          };
          var isCheck: any = false
          if (this.item.listItem !== undefined && this.item.listItem.length > 0) {
            for (let i = 0; i < this.item.listItem.length; i++) {
              if (this.item.listItem[i].IddmItem == element.IddmItem && this.item.listItem[i].IdLoHang == element.IdLoHang && this.item.listItem[i].IddmQuyCachDongGoi == element.IddmQuyCachDongGoi && this.item.listItem[i].IdNhapKhoGoc == element.IdNhapKhoGoc) {
                this.item.listItem[i] = element;
                this.item.listItem[i].isXoa = false;
                this.item.listItem[i].Ten = element.Ten;
                this.item.listItem[i].IddmItem = element.IddmItem;
                this.item.listItem[i].TenLoHang = element.TenLoHang;
                this.item.listItem[i].TonSoLuong = element.SoLuong;
                this.item.listItem[i].KhoiLuong = element.TrongLuong;
                this.item.listItem[i].IdLoHang = element.IdLoHang;
                this.item.listItem[i].IdNhapKho = element.IdNhapKho;
                this.item.listItem[i].IdNhapKhoGoc = element.IdNhapKhoGoc;
                this.item.listItem[i].IddmQuyCachDongGoi = element.IddmQuyCachDongGoi;
                this.item.listItem[i].TendmQuyCachDongGoi = element.TendmQuyCachDongGoi;
                this.item.listItem[i].SoQuaSoi = element.SoLuong;
                isCheck = true;
                break;
              }
            }
            if (isCheck === false)
              listdatapush.push(datapush);
          }
          else
            listdatapush.push(datapush);
        });
        console.log("listdatapush", listdatapush);

        if (this.item.listItem !== undefined && this.item.listItem !== null) {
          this.item.listItem = this.item.listItem.concat(listdatapush);
        }
        else {
          this.item.listItem = listdatapush
        }
        this.MapTinhKhoiLuong();
      }, (reason) => {
        // không
      });
    })
  }

  ExportExcel() {
  }

  TinhKhoiLuong(item) {
    item.KhoiLuongQua = (item.SoQua || 0) * (item.KhoiLuong || 0);
    this.item.listItem = [...this.item.listItem]
  }

  MapTinhKhoiLuong() {
    this.item.listItem = this.item.listItem.map(ele => {
      return {
        ...ele,
        KhoiLuongQua: (ele.SoQua || 0) * (ele.KhoiLuong || 0)
      }
    })
  }

}


import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../../quantri/modal/modalthongbao/modalthongbao.component';
import { vn } from '../../../../services/const';
import { DateToUnix, deepCopy, getSTT, mapArrayForDropDown, merge, UnixToDate, validVariable } from '../../../../services/globalfunction';
import { StoreService } from '../../../../services/store.service';
import { TaisanService } from '../../../../services/Taisan/taisan.service';
import { DanhsachtaisanpopupComponent } from '../../kiemdinhtaisan/danhsachtaisanpopup/danhsachtaisanpopup.component';
import { ConfirmationService } from '../../../../services/confirmation.service';
import { API } from '../../../../services/host';

@Component({
  selector: 'app-tieuhaonhienlieumodal',
  templateUrl: './tieuhaonhienlieumodal.component.html',
  styleUrls: ['./tieuhaonhienlieumodal.component.css']
})
export class TieuhaonhienlieumodalComponent implements OnInit {

  quyTrinh: any = { listTaiSan: [] };
  type = '';
  checkbutton: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listTaiSan: any = [];
  title: any = '';
  eAction: string = '';
  listLoaiNhienLieu: any = [];
  listLoaiDinhMucNhienLieu: any = [];
  listBoPhan: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
    public toastr: ToastrService,
    public store: StoreService,
    public _modal: NgbModal,
    private _confirmService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    if (this.type === 'themmoi') {
      this.GetNextSoQuyTrinh();
    } else {
      this.quyTrinh.NgayBatDau = UnixToDate(this.quyTrinh.NgayBatDauUnix);
      this.quyTrinh.NgayKetThuc = UnixToDate(this.quyTrinh.NgayKetThucUnix);
      this.getTongChiPhiTaiSan();
      if (this.quyTrinh.listTaiSan) {
        this.quyTrinh.listTaiSan.forEach((ele: any) => {
          this.getSanLuongDropdownForAsset(ele);
        });
      }
    }
    this.KiemTraButtonModal();
    this.getListTaiSanDangSuDung();
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.TieuHaoNhienLieu().GetNextSo().subscribe((res: any) => {
      this.quyTrinh.SoQuyTrinh = res.Data;
    })
  }

  KiemTraButtonModal() {
    this._serviceTaiSan.KiemTraButton(this.quyTrinh.Id || "", this.quyTrinh.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  ValidateData() {
    return true;
  }

  setData() {
    let data = {
      ...this.quyTrinh,
      eAction: this.eAction,
      IdDuAn: this.store.getCurrent(),
      NgayBatDauUnix: DateToUnix(this.quyTrinh.NgayBatDau),
      NgayKetThucUnix: DateToUnix(this.quyTrinh.NgayKetThuc),
      listTaiSan: this.quyTrinh.listTaiSan.map((ele: any) => {
        return {
          ...ele,
          // Remove client-only dropdown lists to keep data save payload clean
          listSanLuongDropdown: undefined,
          rawSanLuongList: undefined,
        }
      })
    }
    return data;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.TieuHaoNhienLieu().SetQuyTrinh(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.quyTrinh = {
            ...res.Data,
            NgayBatDau: UnixToDate(res.Data.NgayBatDauUnix),
            NgayKetThuc: UnixToDate(res.Data.NgayKetThucUnix)
          }
          if (this.quyTrinh.listTaiSan) {
            this.quyTrinh.listTaiSan.forEach((ele: any) => {
              this.getSanLuongDropdownForAsset(ele);
            });
          }
          this.getTongChiPhiTaiSan();
          this.KiemTraButtonModal();
          this.toastr.success(res.Message);
        }
        else this.toastr.error(res.Message)
      })
    }
  }

  ChuyenDuyet() {
    this._serviceTaiSan.TieuHaoNhienLieu().ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }

  KhongDuyet() {
    this._serviceTaiSan.TieuHaoNhienLieu().ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
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
        this._serviceTaiSan.TieuHaoNhienLieu().Delete(this.quyTrinh.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.Message);
          }
        })
      })
      .catch((er) => console.log(er));
  }

  // handle xử lý riêng

  getListTaiSanDangSuDung() {
    this._serviceTaiSan.GetListTaiSanDangSuDung({ CurrentPage: 0 }).subscribe((res: any) => {
      if (res.Data?.length) {
      } this.listTaiSan = res.Data;
    })
  }

  delete(item: any) {
    this._confirmService.show({
      message: 'Bạn chắc chắn muốn xóa máy/thiết bị này?'
    }, () => {
      this.quyTrinh.listTaiSan = this.quyTrinh.listTaiSan?.filter((ele: any) => ele.IdTaiSan !== item.IdTaiSan);
    })
  }

  handleThemTaiSan() {
    let modalRef = this._modal.open(DanhsachtaisanpopupComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.listDaChon = this.quyTrinh.listTaiSan ? this.quyTrinh.listTaiSan.map((ele: any) => ele.IdTaiSan) : [],
      modalRef.componentInstance.listView = this.listTaiSan;
    modalRef.componentInstance.title = 'Danh sách máy/thiết bị';
    modalRef.result.then((res: any) => {
      const _list = this.quyTrinh.listTaiSan || [];
      this.quyTrinh.listTaiSan = res.map((ele: any) => {
        let _newObj = _list.find((x: any) => x.IdTaiSan === ele.IdTaiSan);
        if (!_newObj) {
          _newObj = {
            ...ele,
            listFileDinhKem: []
          };
          this.getSanLuongDropdownForAsset(_newObj);
        }
        return _newObj;
      })
    })
      .catch((er) => {
      });
  }

  getTongChiPhiTaiSan() {
    this.quyTrinh.TongChiPhi = this.quyTrinh.listTaiSan?.reduce((a: any, b: any) => a + (b.ThanhTien || 0), 0)
  }

  handleChiPhiTaiSan(item: any) {
    if (item.DonGia && item.TieuThu) {
      item.ThanhTien = item.DonGia * item.TieuThu;
      this.quyTrinh.listTaiSan = [...this.quyTrinh.listTaiSan];
      this.getTongChiPhiTaiSan();
    }
  }

  handleChangeItem(data: any, index: any) {
    console.log("data", { data, index });
    console.log(" this.quyTrinh.listTaiSan", this.quyTrinh.listTaiSan);

    this.quyTrinh.listTaiSan[index].listFileDinhKem.push({
      FileName: data.NameLocal,
      FileNameGUI: data.Name
    })

    console.log(" this.quyTrinh.listTaiSan", this.quyTrinh.listTaiSan);

  }
  cancelItem(i: any, index: any) {
    this.quyTrinh.listTaiSan[i].listFileDinhKem.splice(index, 1)
  }

  download(Link: any) {
    window.open(API.imgURL + Link);
  }

  handlePreView(file: any) {
    if (!file.LinkDocView) {
      return;
    }
    let url = `/${file.LinkDocView}`
    window.open(API.imgURL + url);
  }

  getSanLuongDropdownForAsset(item: any) {
    if (!item.IdTaiSan) return;
    this._serviceTaiSan.GetSanLuongMay(item.IdTaiSan).subscribe((res: any) => {
      const list = res.Data || res || [];
      item.listSanLuongDropdown = list.map((x: any) => {
        return {
          label: (x.Ten || '') + (x.TendmLoaiNhienLieu ? ' ' + x.TendmLoaiNhienLieu : ''),
          value: x.Id
        };
      });
      item.rawSanLuongList = list;
      
      // Look up and restore SanLuong if IdSanLuong is already selected
      if (item.IdSanLuong) {
        const selected = list.find((x: any) => x.Id === item.IdSanLuong);
        if (selected) {
          item.DinhMuc = selected.SanLuong || 0;
          item.TieuHaoDinhMuc = selected.SanLuong || 0;
          item.DonViTinh_NhienLieu = selected.DonViTinh_NhienLieu;
        }
      }
    });
  }

  onChangeSanLuong(item: any) {
    if (item.rawSanLuongList && item.IdSanLuong) {
      const selected = item.rawSanLuongList.find((x: any) => x.Id === item.IdSanLuong);
      if (selected) {
        item.DinhMuc = selected.SanLuong || 0;
        item.TieuHaoDinhMuc = selected.SanLuong || 0;
        item.DonViTinh_NhienLieu = selected.DonViTinh_NhienLieu;
        item.TendmLoaiNhienLieu = selected.TendmLoaiNhienLieu;
      }
    } else {
      item.DinhMuc = 0;
      item.TieuHaoDinhMuc = 0;
      item.DonViTinh_NhienLieu = '';
      item.TendmLoaiNhienLieu = '';
    }
  }

}


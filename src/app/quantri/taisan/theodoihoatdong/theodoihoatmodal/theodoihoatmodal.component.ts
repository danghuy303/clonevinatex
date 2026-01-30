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

@Component({
  selector: 'app-theodoihoatmodal',
  templateUrl: './theodoihoatmodal.component.html',
  styleUrls: ['./theodoihoatmodal.component.css']
})
export class TheodoihoatmodalComponent implements OnInit {

  quyTrinh: any = { listTaiSan: [] };
  type = '';
  checkbutton: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listTaiSan: any = [];
  title: any = '';
  eAction: string = '';
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
      this.quyTrinh.listTaiSan.forEach((ele: any) => {
        ele.NgayBatDau = UnixToDate(ele.NgayBatDauUnix);
        ele.NgayKetThuc = UnixToDate(ele.NgayKetThucUnix)
      })
    }
    this.KiemTraButtonModal();
    this.getListTaiSanDangSuDung();
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.TheoDoiHoatDong().GetNextSo().subscribe((res: any) => {
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
      listTaiSan: this.quyTrinh.listTaiSan.map((ele: any) => {
        return {
          ...ele,
          NgayBatDauUnix: DateToUnix(ele.NgayBatDau),
          NgayKetThucUnix: DateToUnix(ele.NgayKetThuc),
        }
      })
    }
    return data;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.TheoDoiHoatDong().SetQuyTrinh(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.quyTrinh = {
            ...res.Data,
            listTaiSan: res.Data.listTaiSan?.map((ele: any) => {
              return {
                ...ele,
                NgayBatDau: UnixToDate(ele.NgayBatDauUnix),
                NgayKetThuc: UnixToDate(ele.NgayKetThucUnix)
              }
            })
          }
          this.KiemTraButtonModal();
          this.toastr.success(res.Message);
        }
        else this.toastr.error(res.Message)
      })
    }
  }

  ChuyenDuyet() {
    this._serviceTaiSan.TheoDoiHoatDong().ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }

  KhongDuyet() {
    this._serviceTaiSan.TheoDoiHoatDong().ChuyenTiep(this.setData()).subscribe((res: any) => {
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
        this._serviceTaiSan.TheoDoiHoatDong().Delete(this.quyTrinh.Id).subscribe((res: any) => {
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
      message: 'Bạn chắc chắn muốn xóa tài sản này?'
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
    modalRef.componentInstance.title = 'Danh sách tài sản';
    modalRef.result.then((res: any) => {
      const _list = this.quyTrinh.listTaiSan;
      this.quyTrinh.listTaiSan = res.map((ele: any) => {
        let _newObj = _list.find((x: any) => x.IdTaiSan === ele.IdTaiSan) ?
          _list.find((x: any) => x.IdTaiSan === ele.IdTaiSan) : ele;
        return _newObj;
      })
    })
      .catch((er) => {
      });
  }

  handleAddChild(item: any) {
    if (!item.listNguoiVanHanh) {
      item.listNguoiVanHanh = [];
    }

    item.listNguoiVanHanh.push({
      NguoiVanHanh: '',
      SoCong: null,
      GhiChu: ''
    });
  }

  deleteChild(parentItem: any, childIndex: number) {
    if (parentItem.listNguoiVanHanh && parentItem.listNguoiVanHanh.length > childIndex) {
      parentItem.listNguoiVanHanh.splice(childIndex, 1);
    }
  }

  getTieuHaoTaiSan(_item: any, index: number) {
    let _payLoad = {
      ..._item,
      NgayBatDauUnix: DateToUnix(_item.NgayBatDau),
      NgayKetThucUnix: DateToUnix(_item.NgayKetThuc),
      IddmPhanXuong: this.quyTrinh.IddmPhanXuong
    }
    this._serviceTaiSan.GetTieuHaoTaiSanForTheoDoiHoatDong(_payLoad).subscribe((res: any) => {
      if (res?.Data) {
        this.quyTrinh.listTaiSan = this.quyTrinh.listTaiSan?.map((ele: any, idx: number) => {
          return idx === index ? {
            ...res?.Data,
            NgayBatDau: UnixToDate(res?.Data?.NgayBatDauUnix),
            NgayKetThuc: UnixToDate(res?.Data?.NgayKetThucUnix)
          } : ele;
        })
      }
    })
  }


}

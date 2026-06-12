import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../../quantri/modal/modalthongbao/modalthongbao.component';
import { vn } from '../../../../services/const';
import { DateToUnix, deepCopy, getSTT, handleHTTPResponse, mapArrayForDropDown, merge, UnixToDate, validVariable } from '../../../../services/globalfunction';
import { StoreService } from '../../../../services/store.service';
import { TaisanService } from '../../../../services/Taisan/taisan.service';
import { DanhsachtaisanpopupComponent } from '../../kiemdinhtaisan/danhsachtaisanpopup/danhsachtaisanpopup.component';
import { ConfirmationService } from '../../../../services/confirmation.service';
import { API } from '../../../../services/host';

@Component({
  selector: 'app-baohiemtaisanmodal',
  templateUrl: './baohiemtaisanmodal.component.html',
  styleUrls: ['./baohiemtaisanmodal.component.css']
})
export class BaohiemtaisanmodalComponent implements OnInit {

  quyTrinh: any = { listTaiSan: [] };
  type = '';
  checkbutton: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listTaiSan: any = [];
  title: any = '';
  eAction: string = '';
  listDonViBaoHiem: any = [];
  listLoaiHinhBaoHiem: any = [];
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
      this.quyTrinh.NgayHetHan = UnixToDate(this.quyTrinh.NgayHetHanUnix);
      this.handleChiPhiTaiSan();
    }
    this.KiemTraButtonModal();
    this.getListTaiSanDangSuDung();
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.BaoHiemTaiSan().GetNextSo().subscribe((res: any) => {
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
    console.log("ABC", this.quyTrinh);

    let data = {
      ...this.quyTrinh,
      eAction: this.eAction,
      IdDuAn: this.store.getCurrent(),
      NgayBatDauUnix: DateToUnix(this.quyTrinh.NgayBatDau),
      NgayHetHanUnix: DateToUnix(this.quyTrinh.NgayHetHan),
    }
    return data;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.BaoHiemTaiSan().SetQuyTrinh(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.quyTrinh = {
            ...res.Data,
            NgayBatDau: UnixToDate(res.Data.NgayBatDauUnix),
            NgayHetHan: UnixToDate(res.Data.NgayHetHanUnix)
          }
          this.handleChiPhiTaiSan();
          this.KiemTraButtonModal();
          this.toastr.success(res.Message);
        }
        else this.toastr.error(res.Message)
      })
    }
  }

  ChuyenDuyet() {
    this._serviceTaiSan.BaoHiemTaiSan().ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }

  KhongDuyet() {
    this._serviceTaiSan.BaoHiemTaiSan().ChuyenTiep(this.setData()).subscribe((res: any) => {
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
        this._serviceTaiSan.BaoHiemTaiSan().Delete(this.quyTrinh.Id).subscribe((res: any) => {
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
    this._serviceTaiSan.GetListTaiSanForBaoHiem(this.quyTrinh.IdBoPhanSuDung).subscribe((res: any) => {
      if (res.Data?.length) {
      } this.listTaiSan = res.Data;
    })
  }

  delete(item: any) {
    this._confirmService.show({
      message: 'Bạn chắc chắn muốn xóa máy/thiết bị này?'
    }, () => {
      this.quyTrinh.listTaiSan = this.quyTrinh.listTaiSan?.filter((ele: any) => ele.IdTaiSan !== item.IdTaiSan);
      this.getTongChiPhiTaiSan();
    })
  }

  handleThemTaiSan() {
    if (!this.quyTrinh.IdBoPhanSuDung) {
      this.toastr.error("Vui lòng chọn bộ phận sử dụng!")
      return;
    }
    let modalRef = this._modal.open(DanhsachtaisanpopupComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.listDaChon = this.quyTrinh.listTaiSan ? this.quyTrinh.listTaiSan.map((ele: any) => ele.IdTaiSan) : [],
      modalRef.componentInstance.listView = this.listTaiSan;
    modalRef.componentInstance.title = 'Danh sách máy/thiết bị';
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

  getTongChiPhiTaiSan() {
    this.quyTrinh.TongChiPhi = this.quyTrinh.listTaiSan?.reduce((a: any, b: any) => a + (b.ChiPhi || 0), 0)
  }

  // getGiaTriGiam() {
  // let tongChiPhi = this.quyTrinh.TongChiPhi || 0;
  // if (this.quyTrinh.PhanTramGiam && this.quyTrinh.PhanTramGiam > 0) {
  //   this.quyTrinh.TongChiPhiSauGiam =
  //     tongChiPhi - (tongChiPhi * this.quyTrinh.PhanTramGiam) / 100;
  // }
  // else if (this.quyTrinh.GiaTriGiam && this.quyTrinh.GiaTriGiam > 0) {
  //   this.quyTrinh.TongChiPhiSauGiam = tongChiPhi - this.quyTrinh.GiaTriGiam;
  // }
  // }

  onGiaTriGiamChange() {
    let tongChiPhi = this.quyTrinh.TongChiPhi || 0;
    if (this.quyTrinh.GiaTriGiam && this.quyTrinh.GiaTriGiam > 0) {
      this.quyTrinh.PhanTramGiam = (this.quyTrinh.GiaTriGiam / tongChiPhi) * 100;
      this.quyTrinh.TongChiPhiSauGiam = tongChiPhi - this.quyTrinh.GiaTriGiam;
    } else {
      this.quyTrinh.PhanTramGiam = 0;
      this.quyTrinh.TongChiPhiSauGiam = tongChiPhi;
    }
  }

  onPhanTramGiamChange() {
    let tongChiPhi = this.quyTrinh.TongChiPhi || 0;
    if (this.quyTrinh.PhanTramGiam && this.quyTrinh.PhanTramGiam > 0) {
      this.quyTrinh.GiaTriGiam = (tongChiPhi * this.quyTrinh.PhanTramGiam) / 100;
      this.quyTrinh.TongChiPhiSauGiam = tongChiPhi - this.quyTrinh.GiaTriGiam;
    } else {
      this.quyTrinh.GiaTriGiam = 0;
      this.quyTrinh.TongChiPhiSauGiam = tongChiPhi;
    }
  }

  getGiaTriGiam() {
    let tongChiPhi = this.quyTrinh.TongChiPhi || 0;

    // Ưu tiên tính lại theo phần trăm nếu có
    if (this.quyTrinh.PhanTramGiam && this.quyTrinh.PhanTramGiam > 0) {
      this.quyTrinh.GiaTriGiam = (tongChiPhi * this.quyTrinh.PhanTramGiam) / 100;
      this.quyTrinh.TongChiPhiSauGiam = tongChiPhi - this.quyTrinh.GiaTriGiam;
    }
    // Nếu chỉ có giá trị giảm, tính lại phần trăm
    else if (this.quyTrinh.GiaTriGiam && this.quyTrinh.GiaTriGiam > 0) {
      this.quyTrinh.PhanTramGiam = (this.quyTrinh.GiaTriGiam / tongChiPhi) * 100;
      this.quyTrinh.TongChiPhiSauGiam = tongChiPhi - this.quyTrinh.GiaTriGiam;
    }
    // Không có giảm giá
    else {
      this.quyTrinh.TongChiPhiSauGiam = tongChiPhi;
    }
  }

  handleChiPhiTaiSan() {
    this.getTongChiPhiTaiSan();
    this.getGiaTriGiam();
  }

  handleUpload(e: any) {
    this._serviceTaiSan.ImportBaoHiemTaiSan(e.Name).subscribe((res: any) => {
      handleHTTPResponse(res, this.toastr, () => {
        if (res.StatusCode === 200) {
          this.quyTrinh.listTaiSan = res.Data;
          this.handleChiPhiTaiSan();
          this.toastr.success(res.Message);
        } else {
          this.toastr.error(res.Message);
        }
      })
    })
  }

  exportExcel() {
    this._serviceTaiSan.ExportBaoHiemTaiSan(this.quyTrinh.listTaiSan).subscribe((res: any) => {
      if (res.StatusCode === 200) {
        this.toastr.success(res.Message);
        let url = `${API.imgURL}${res.Data}`
        window.open(url)
      } else {
        this.toastr.error(res.Message);
      }
    })
  }

  handleChangeItem(data: any, index: any) {
    this.quyTrinh.listTaiSan[index].listFileDinhKem.push({
      FileName: data.NameLocal,
      FileNameGUI: data.Name
    })
  }
  cancelItem(i: any, index: any) {
    this.quyTrinh.listTaiSan[i].listFileDinhKem.splice(index, 1)
  }

  download(Link: any) {
    window.open(API.imgURL + Link);
  }

  handlePreView(link: string) {
    let url = `/${link}`
    window.open(API.imgURL + url);
  }

}

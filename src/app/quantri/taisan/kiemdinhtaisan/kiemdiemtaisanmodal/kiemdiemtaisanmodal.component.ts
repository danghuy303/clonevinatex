import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../../quantri/modal/modalthongbao/modalthongbao.component';
import { vn } from '../../../../services/const';
import { DateToUnix, deepCopy, getSTT, handleHTTPResponse, mapArrayForDropDown, merge, UnixToDate, validVariable } from '../../../../services/globalfunction';
import { StoreService } from '../../../../services/store.service';
import { TaisanService } from '../../../../services/Taisan/taisan.service';
import { DanhsachtaisanpopupComponent } from '../danhsachtaisanpopup/danhsachtaisanpopup.component';
import { ConfirmationService } from '../../../../services/confirmation.service';
import { API } from '../../../../services/host';

@Component({
  selector: 'app-kiemdiemtaisanmodal',
  templateUrl: './kiemdiemtaisanmodal.component.html',
  styleUrls: ['./kiemdiemtaisanmodal.component.css']
})
export class KiemdiemtaisanmodalComponent implements OnInit {

  quyTrinh: any = {SoQuyTrinh:'', listTaiSan: [] };
  type = '';
  checkbutton: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listTaiSan: any = [];
  title: any = '';
  listKiemDinh: any = [];
  eAction: string = '';

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
        ele.Ngay = UnixToDate(ele.NgayUnix);
        ele.NgayKiemDinhTiepTheo = UnixToDate(ele.NgayKiemDinhTiepTheoUnix)
      });
      this.getTongChiPhiTaiSan();
    }
    this.KiemTraButtonModal();
    this.getListTaiSanDangSuDung();
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.KiemDinh().GetNextSo().subscribe((res: any) => {
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
          NgayUnix: DateToUnix(ele.Ngay),
          NgayKiemDinhTiepTheoUnix: DateToUnix(ele.NgayKiemDinhTiepTheo),
        }
      })
    }
    return data;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.KiemDinh().SetQuyTrinh(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.quyTrinh = {
            ...res.Data,
            listTaiSan: res.Data.listTaiSan?.map((ele: any) => {
              return {
                ...ele,
                Ngay: UnixToDate(ele.NgayUnix),
                NgayKiemDinhTiepTheo: UnixToDate(ele.NgayKiemDinhTiepTheoUnix)
              }
            })
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
    this._serviceTaiSan.KiemDinh().ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }

  KhongDuyet() {
    this._serviceTaiSan.KiemDinh().ChuyenTiep(this.setData()).subscribe((res: any) => {
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
        this._serviceTaiSan.KiemDinh().Delete(this.quyTrinh.Id).subscribe((res: any) => {
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
      this.getTongChiPhiTaiSan();
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
          _list.find((x: any) => x.IdTaiSan === ele.IdTaiSan) : { ...ele, listFileDinhKem: [] };
        return _newObj;
      })
    })
      .catch((er) => {
      });
  }

  handleUpload(e: any) {
    this._serviceTaiSan.ImportKiemDinhTaiSan(e.Name).subscribe((res: any) => {
      handleHTTPResponse(res, this.toastr, () => {
        if (res.StatusCode === 200) {
          this.quyTrinh.listTaiSan = res.Data?.map((ele: any) => {
            return {
              ...ele,
              Ngay: UnixToDate(ele.NgayUnix),
              NgayKiemDinhTiepTheo: UnixToDate(ele.NgayKiemDinhTiepTheoUnix)
            }
          })
          this.getTongChiPhiTaiSan();
          this.toastr.success(res.Message);
        } else {
          this.toastr.error(res.Message);
        }
      })
    })
  }

  exportExcel() {
    this._serviceTaiSan.ExportKiemDinhTaiSan(this.quyTrinh.listTaiSan).subscribe((res: any) => {
      if (res.StatusCode === 200) {
        this.toastr.success(res.Message);
        let url = `${API.imgURL}${res.Data}`
        window.open(url)
      } else {
        this.toastr.error(res.Message);
      }
    })
  }

  getTongChiPhiTaiSan() {
    this.quyTrinh.TongChiPhi = this.quyTrinh.listTaiSan?.reduce((a: any, b: any) => a + (b.ChiPhi || 0), 0)
  }

  handleChiPhiTaiSan() {
    this.getTongChiPhiTaiSan();
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

  // footer


}

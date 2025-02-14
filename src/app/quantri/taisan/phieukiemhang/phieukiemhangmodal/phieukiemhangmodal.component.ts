import { Component, OnInit } from '@angular/core';
import { ModalthongbaoComponent } from '../../../modal/modalthongbao/modalthongbao.component';
import { DateToUnix, handleHTTPResponse, mapArrayForDropDown, UnixToDate, validVariable } from '../../../../services/globalfunction';
import { vn } from '../../../../services/const';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from '../../../../services/Taisan/taisan.service';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from '../../../../services/callApiSanXuat';

@Component({
  selector: 'app-phieukiemhangmodal',
  templateUrl: './phieukiemhangmodal.component.html',
  styleUrls: ['./phieukiemhangmodal.component.css']
})
export class PhieukiemhangmodalComponent implements OnInit {

  title: string = '';
  opt: string = '';
  quyTrinh: any = {};
  checkButton: any = {};
  listPheDuyet: any = [{ value: true, label: 'Duyệt' }, { value: false, label: 'Không duyệt' }];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  userInfo: any = {};
  fileUpload: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
    public toastr: ToastrService,
    public _modal: NgbModal,
    private _services: SanXuatService,
  ) { }

  ngOnInit(): void {
    this.KiemTraButton();
    if (this.opt === 'add') {
      this.GetNextSoQuyTrinh();
    } else {
      this.GetById();
    }
  }

  GetById() {
    this.quyTrinh = {
      ...this.quyTrinh,
      Ngay: UnixToDate(this.quyTrinh.NgayUnix)
    }
  }

  KiemTraButton() {
    this._services.KiemTraButton(this.quyTrinh.Id || "", this.quyTrinh.IdTrangThai || "").subscribe((res: any) => {
      this.checkButton = res;
    });
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.PhieuKiemHang().GetNextSo().subscribe((res: any) => {
      this.quyTrinh.SoQuyTrinh = res.Data;
    })
  }

  xoaItem(idx) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?";
    modalRef.result.then((res) => {
      this.quyTrinh.listItem.splice(idx, 1);
    })
      .catch((er) => console.log(er));
  }

  setData() {
    let data = {
      ...this.quyTrinh,
      NgayUnix: DateToUnix(this.quyTrinh.Ngay)
    }
    return data;
  }

  ValidateData() {
    if (!validVariable(this.quyTrinh.NoiDung)) {
      this.toastr.error("Yêu cầu nhập nội dung!");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.PhieuKiemHang().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.quyTrinh = {
            ...res.Data,
            Ngay: UnixToDate(res.Data.NgayUnix)
          }
          this.KiemTraButton();
          this.toastr.success(res.Message);
        } else this.toastr.error(res.Message);
      })
    }
  }

  KhongDuyet() {
    this._serviceTaiSan.PhieuKiemHang().KhongDuyet(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  ChuyenDuyet() {
    this._serviceTaiSan.PhieuKiemHang().ChuyenTiep(this.setData()).subscribe((res: any) => {
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
        this._serviceTaiSan.PhieuKiemHang().Delete(this.setData()).subscribe((res: any) => {
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

}

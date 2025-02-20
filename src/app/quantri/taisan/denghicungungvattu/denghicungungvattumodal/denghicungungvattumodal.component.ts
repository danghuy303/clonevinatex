import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, handleHTTPResponse, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { DanhsachvattucungungComponent } from '../danhsachvattucungung/danhsachvattucungung.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';

@Component({
  selector: 'app-denghicungungvattumodal',
  templateUrl: './denghicungungvattumodal.component.html',
  styleUrls: ['./denghicungungvattumodal.component.css']
})
export class DenghicungungvattumodalComponent implements OnInit {

  title: string = '';
  opt: string = '';
  quyTrinh: any = {};
  checkButton: any = {};
  listDuAn: any = [];
  listBoPhan: any = [];
  fileUpload: any;
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  userInfo: any = {};

  constructor(
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
    public toastr: ToastrService,
    public store: StoreService,
    public _modal: NgbModal,
    private _services: SanXuatService,
    private _auth: AuthenticationService
  ) { this.userInfo = this._auth.currentUserValue; }

  ngOnInit(): void {
    this.KiemTraButton();
    this.GetDanhSachDuAnByIdUser();
    if (this.opt === 'add') {
      this.GetNextSoQuyTrinh();
      this.quyTrinh.Ngay = new Date();
    } else {
      this.GetById();
    }
  }

  GetById() {
    this.quyTrinh = {
      ...this.quyTrinh,
      Ngay: UnixToDate(this.quyTrinh.NgayUnix)
    }
    this.GetKho(this.quyTrinh.IdDuAn)
  }

  KiemTraButton() {
    this._services.KiemTraButton(this.quyTrinh.Id || "", this.quyTrinh.IdTrangThai || "").subscribe((res: any) => {
      this.checkButton = res;
    });
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.PhieuDNCU().GetNextSo().subscribe((res: any) => {
      this.quyTrinh.SoQuyTrinh = res.Data;
    })
  }

  GetDanhSachDuAnByIdUser() {
    this._services.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res: any) => {
      this.listDuAn = mapArrayForDropDown(res, 'TenDuAn', 'Id');
    })
  }

  handleDuAn(value) {
    this.quyTrinh.IddmKho = null;
    this.GetKho(value);
  }

  GetKho(value) {
    this._serviceTaiSan.GetlistdmKho(value).subscribe((res: any) => {
      this.listBoPhan = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
  }

  ChontVatTu() {
    if (this.quyTrinh.IddmKho) {
      this._serviceTaiSan.GetlistdmItem({ currentpage: 0 }).subscribe((res: any) => {
        let modalRef = this._modal.open(DanhsachvattucungungComponent, {
          size: 'lg',
          backdrop: 'static',
        })
        modalRef.componentInstance.listItem = res.Data || [];
        modalRef.componentInstance.title = 'Danh sách vật tư';
        modalRef.componentInstance.titleHead = 'vật tư';
        modalRef.componentInstance.listDaChon = this.quyTrinh.listItem?.length ? this.quyTrinh.listItem.map(ele => ele.IddmItem) : [];
        modalRef.result
          .then((res: any) => {
            this.quyTrinh.listItem = res.map(ele => {
              let _newObj = this.quyTrinh.listItem?.find((x: any) => x.IddmItem === ele.IddmItem) ? this.quyTrinh.listItem.find((x: any) => x.IddmItem === ele.IddmItem) : ele;
              return {
                ..._newObj
              }
            })
            this._serviceTaiSan.PhieuDNCU_Item(this.setData()).subscribe((resItem: any) => {
              this.quyTrinh = {
                ...resItem.Data,
                Ngay: UnixToDate(resItem.Data.NgayUnix)
              }
              this.GetKho(resItem.Data.IdDuAn)
            })
          })
          .catch((error: any) => { })
      })
    }
    else this.toastr.error("Vui lòng chọn kho!");
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
    else if (!validVariable(this.quyTrinh.IdDuAn)) {
      this.toastr.error("Yêu cầu chọn dự án!");
      return false;
    }
    else if (!validVariable(this.quyTrinh.IddmKho)) {
      this.toastr.error("Yêu cầu chọn kho!");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.PhieuDNCU().Set(this.setData()).subscribe((res: any) => {
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
    this._serviceTaiSan.PhieuDNCU().KhongDuyet(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  ChuyenDuyet() {
    this._serviceTaiSan.PhieuDNCU().ChuyenTiep(this.setData()).subscribe((res: any) => {
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
        this._serviceTaiSan.PhieuDNCU().Delete(this.setData()).subscribe((res: any) => {
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

  import() {
    if (this.quyTrinh.IddmKho) {
      let modalRef = this._modal.open(UploadmodalComponent, {
        size: 'md',
        backdrop: 'static',
      })
      modalRef.componentInstance.single = true;
      modalRef.result
        .then((res: any) => {
          this.fileUpload = res;
          this._serviceTaiSan.ImportPhieuDNCU(this.fileUpload[0].Name, this.quyTrinh.IddmKho).subscribe((res: any) => {
            handleHTTPResponse(res, this.toastr, () => {
              this.quyTrinh.listItem = res.Data;
            })
          })
        })
        .catch(er => { })
        .finally(() => {
        })
    }
    else this.toastr.error("Vui lòng chọn kho!");
  }

  handleUpload(e) {
    this._serviceTaiSan.ImportPhieuDNCU(e.Name, this.quyTrinh.IddmKho).subscribe((res: any) => {
      handleHTTPResponse(res, this.toastr, () => {
        this.quyTrinh.listItem = res.Data;
      })
    })
  }

  exportExcel() {
    this._serviceTaiSan.PhieuDNCU().ExportId(this.quyTrinh.Id).subscribe((res: any) => {
      if (res.StatusCode === 200) {
        this.toastr.success(res.Message);
        this._services.download(res.Data);
      } else {
        this.toastr.error(res.Message);
      }
    })
  }

  TinhSoLuongGoi(item) {
    let num = item.SoLuongYeuCau - item.SoLuongTon;
    item.SoLuongGoi = num < 0 ? 0 : num;
    this.quyTrinh.listItem = [...this.quyTrinh.listItem];
  }

}

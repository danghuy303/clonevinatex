import { Component, OnInit } from '@angular/core';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { DateToUnix, handleHTTPResponse, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DanhsachvattucungungComponent } from '../../denghicungungvattu/danhsachvattucungung/danhsachvattucungung.component';
import { vn } from 'src/app/services/const';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ToastrService } from 'ngx-toastr';
import { StoreService } from 'src/app/services/store.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { AuthenticationService } from 'src/app/services/auth.service';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { DanhsachhanghoapopupComponent } from '../danhsachhanghoapopup/danhsachhanghoapopup.component';

@Component({
  selector: 'app-pheduyetgiahanghoamodal',
  templateUrl: './pheduyetgiahanghoamodal.component.html',
  styleUrls: ['./pheduyetgiahanghoamodal.component.css']
})
export class PheduyetgiahanghoamodalComponent implements OnInit {

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
    public store: StoreService,
    public _modal: NgbModal,
    private _services: SanXuatService,
    private _auth: AuthenticationService
  ) { this.userInfo = this._auth.currentUserValue; }

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
      Ngay: UnixToDate(this.quyTrinh.NgayUnix),
      listItem: this.quyTrinh.listItem.map(ele => {
        return {
          ...ele,
          TyLe: ((ele.GiaVanChuyen + ele.GiaDeNghi) / (ele.GiaHienHanh)) * 100 || 0
        }
      })
    }
  }

  KiemTraButton() {
    this._services.KiemTraButton(this.quyTrinh.Id || "", this.quyTrinh.IdTrangThai || "").subscribe((res: any) => {
      this.checkButton = res;
    });
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.PheDuyetGia().GetNextSo().subscribe((res: any) => {
      this.quyTrinh.SoQuyTrinh = res.Data;
    })
  }

  ChontHangHoa() {
    this._serviceTaiSan.GetALLdmNhaCungUng({ currentpage: 0, Keyword: '' }).subscribe((res: any) => {
      let modalRef = this._modal.open(DanhsachhanghoapopupComponent, {
        size: 'xl',
        backdrop: 'static',
      })
      modalRef.componentInstance.listNhaCungUng = res || [];
      modalRef.componentInstance.title = 'Danh sách hàng hóa';
      modalRef.componentInstance.listDaChon = this.quyTrinh.listItem || [];
      modalRef.result
        .then((res: any) => {
          let data = res.map(ele => {
            return {
              ...ele,
              isPheDuyet: true,
              GiaHienHanh: ele.DonGia,
              TyLe: ((ele.GiaVanChuyen + ele.GiaDeNghi) / (ele.DonGia)) * 100 || 0
            }
          })
          this.quyTrinh.listItem = [...this.quyTrinh.listItem || [], ...data].filter(
            (value, index, self) => self.findIndex((m) => m.IddmItem === value.IddmItem && m.IddmNhaCungUng === value.IddmNhaCungUng) === index,
          )
        })
        .catch((error: any) => { })
    })
  }

  tinhTyLe(item) {
    item.TyLe = ((item.GiaVanChuyen + item.GiaDeNghi) / (item.GiaHienHanh)) * 100 || 0;
    this.quyTrinh.listItem = [...this.quyTrinh.listItem];
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
      this._serviceTaiSan.PheDuyetGia().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.quyTrinh = {
            ...res.Data,
            Ngay: UnixToDate(res.Data.NgayUnix),
            listItem: res.Data.listItem.map(ele => {
              return {
                ...ele,
                TyLe: ((ele.GiaVanChuyen + ele.GiaDeNghi) / (ele.GiaHienHanh)) * 100 || 0
              }
            })
          }
          this.KiemTraButton();
          this.toastr.success(res.Message);
        } else this.toastr.error(res.Message);
      })
    }
  }

  KhongDuyet() {
    this._serviceTaiSan.PheDuyetGia().KhongDuyet(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  ChuyenDuyet() {
    this._serviceTaiSan.PheDuyetGia().ChuyenTiep(this.setData()).subscribe((res: any) => {
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
        this._serviceTaiSan.PheDuyetGia().Delete(this.setData()).subscribe((res: any) => {
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
    let modalRef = this._modal.open(UploadmodalComponent, {
      size: 'md',
      backdrop: 'static',
    })
    modalRef.componentInstance.single = true;
    modalRef.result
      .then((res: any) => {
        this.fileUpload = res;
        this._serviceTaiSan.PheDuyetGia().Import(this.fileUpload[0].Name).subscribe((res: any) => {
          handleHTTPResponse(res, this.toastr, () => {
            this.quyTrinh = {
              ...res.Data,
              Ngay: UnixToDate(res.Data.NgayUnix),
              listItem: res.Data.listItem.map(ele => {
                return {
                  ...ele,
                  TyLe: ((ele.GiaVanChuyen + ele.GiaDeNghi) / (ele.GiaHienHanh)) * 100 || 0
                }
              })
            }
          })
        })
      })
      .catch(er => { })
      .finally(() => {
      })
  }

  exportExcel() {
    this._serviceTaiSan.PheDuyetGia().ExportId(this.quyTrinh.Id).subscribe((res: any) => {
      if (res.StatusCode === 200) {
        this.toastr.success(res.Message);
        this._services.download(res.Data);
      } else {
        this.toastr.error(res.Message);
      }
    })
  }

}

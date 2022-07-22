import { Component, OnInit, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { CalcmodalComponent } from 'src/app/quantri/modal/calcmodal/calcmodal.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { LohangComponent } from '../lohang/lohang.component';
import { fake } from './data';
@Component({
  selector: 'app-thongkesanluongnhanhmodal',
  templateUrl: './thongkesanluongnhanhmodal.component.html',
  styleUrls: ['./thongkesanluongnhanhmodal.component.css']
})
export class ThongkesanluongnhanhmodalComponent implements OnInit {

  @ViewChildren('inputNumber') inputNumbers: any;
  @ViewChildren('inputKhoiLuong') inputKhoiLuongs: any;
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  listCongDoan: any = [];
  listCaSanXuat: any = [];
  listPhanXuong: any = [];
  listItem: any = [];
  editTableItem: any = {};
  lang: any = vn;
  listLoHang: any = [];
  listCaThucTe: any = [];
  TongKhoiLuong: any = 0;
  userInfo: any;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  typing: Subject<string> = new Subject<string>();
  $typing: Subscription
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService,
    private _auth: AuthenticationService,
    public _modal: NgbModal,) {

  }

  ngOnInit(): void {
    fake.listCongDoan.forEach(congdoan => {
      let socot = congdoan?.listHeader[0]?.listColumn.length
      congdoan.listDuLieuCaSanXuatKhac.forEach((dulieukhac: any) => {
        dulieukhac.SoCot = socot;
      });
      congdoan.listBongPhe.forEach(bongphe => {
        bongphe.listCaSanXuat.forEach((ca: any) => {
          ca.SoCot = socot;
        })
      })
    });
    this.item = fake;
    this.getListCongDoan();
    this.item.CongDoan = 'ONG'
    if (this.opt !== 'edit') {
      // this.GetNextSoQuyTrinh();
    }
    else {
      this.userInfo = this._auth.currentUserValue;
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.getListPhanXuong();
    this.GetPhanXuongTheoUser();
    this.getListCaSanXuat();
    this.getListLoHang();
    this.getListCaThucTe();
  }

  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
      if (this.item.CreatedBy == this.userInfo.Id)
        this.checkbutton.Ghi = true;
    })
  }
  ChuyenDuyet() {
    this.services.ThongKeSanLuongNhanh().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.toastr.success(res.message);
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }
  GetThongKeSanLuongNhanh() {
    if (validVariable(this.item.IddmPhanXuong) && validVariable(this.item.Ngay)) {
      let data =
      {
        IddmPhanXuong: this.item.IddmPhanXuong,
        Ngay: DateToUnix(this.item.Ngay)
      }
      this.services.ThongKeSanLuongNhanh().Get(data).subscribe((res: any) => {
        res.Ngay = UnixToDate(res.NgayUnix)
        res.listCongDoan.forEach(congdoan => {
          let socot = congdoan?.listHeader[0]?.listColumn.length
          congdoan.listDuLieuCaSanXuatKhac.forEach((dulieukhac: any) => {
            dulieukhac.SoCot = socot;
          });
          congdoan.listBongPhe.forEach(bongphe => {
            bongphe.listCaSanXuat.forEach((ca: any) => {
              ca.SoCot = socot;
            })
          })
        });
        this.item = res;
      })
    }
  }
  // GetNextSoQuyTrinh() {
  //   this.services.ThongKeSanLuongNhanh().GetNextSo().subscribe((res: any) => {
  //     this.item.SoQuyTrinh = res.SoQuyTrinh;
  //   })
  // }
  GhiLai() {
    this.services.ThongKeSanLuongNhanh().Set(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.toastr.success(res.message)
          this.opt = 'edit';
          res.objectReturn.Ngay = UnixToDate(res.objectReturn.NgayUnix)
          this.item = res.objectReturn;
          this.listItem = [];
          this.KiemTraButtonModal();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.ThongKeSanLuongNhanh().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getListCongDoan() {
    this.services.GetlistCongDoanBoDayBongDayPE().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
  }

  getListCaThucTe() {
    this.services.GetListOptdmCaSanXuatThucTe().subscribe((res: any) => {
      this.listCaThucTe = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  getListCaSanXuat() {
    this.services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listCaSanXuat = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetPhanXuongTheoUser() {
    this.services.GetListPhanXuongTheoUser().subscribe((res: any) => {
      if (res != null && res.length > 0)
        this.item.IddmPhanXuong = res[0].Id;
    })
  }
  getListPhanXuong() {
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  getMatHangThongKeSanLuong() {
    if (this.item.IddmCaSanXuat != undefined
      && this.item.IddmPhanXuong != undefined
      && this.item.Ngay != undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);

    }
  }

  editChiTiet(item, index) {
    this.item.listItem.forEach(element => {
      element.editField = false;
    });
    this.item.listItem[index].editField = true;
    this.editTableItem = deepCopy(item);
  }

  saveEdit(item, index) {
    this.item.listItem[index] = item;
    this.item.listItem[index].editField = false;
  }

  cancelEdit(item, index) {
    this.item.listItem[index].editField = false;
  }

  onClose() {
    this.activeModal.close();
  }

  getListLoHang() {
    var data = {
      CurrentPage: 0,
      IddmPhanXuong: this.item.IddmPhanXuong,
    }
    this.services.LoHang().GetList(data).subscribe((res: any) => {
      this.listLoHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  nextFocus(index) {
    let length = this.inputKhoiLuongs.toArray().length;
    this.inputKhoiLuongs.toArray()[(index + 1 < length ? index + 1 : 0)].el.nativeElement.children[0].children[0].focus();
    setTimeout(() => {
      this.inputKhoiLuongs.toArray()[(index + 1 < length ? index + 1 : 0)].el.nativeElement.children[0].children[0].focus();
    }, 400)
  }
  ngOnDestroy() {
    this.$typing.unsubscribe()
  }
}

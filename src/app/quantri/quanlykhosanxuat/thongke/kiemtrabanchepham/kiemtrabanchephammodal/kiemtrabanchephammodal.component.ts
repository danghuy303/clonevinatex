import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { PintableDirective } from 'voi-lib';
import { ChonmathangkiemtrabanchephammodalComponent } from '../chonmathangkiemtrabanchephammodal/chonmathangkiemtrabanchephammodal.component';

@Component({
  selector: 'app-kiemtrabanchephammodal',
  templateUrl: './kiemtrabanchephammodal.component.html',
  styleUrls: ['./kiemtrabanchephammodal.component.css']
})
export class KiemtrabanchephammodalComponent implements OnInit {
  @ViewChildren('inputNumber') inputNumbers: any;
  @ViewChild('voiPintable') voiPintable: PintableDirective;
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  listCongDoan: any = [];
  congdoan: any;
  listThamSo: any = [];
  listCongThuc: any = [];
  listPhanXuong: any = [];
  editTableItem: any = {};
  lang: any = vn;
  listLoHang: any = [];
  TongKhoiLuong: any = 0;
  userInfo: any;
  listdmTieuChiBanChePham: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  skipLocationChange: number;

  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService,
    private _auth: AuthenticationService,
    public _modal: NgbModal,
    private router: Router,) {

  }

  ngOnInit(): void {
    this.skipLocationChange = Math.random() * 9;
    this.getListCongDoan();
    if (this.item.isTruVaoSanLuong === undefined)
      this.item.isTruVaoSanLuong = false;
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      this.GetPhanXuongTheoUser()
    }
    else {
      this.services.dmTieuChiChatLuongsoi().GetListdmTieuChiBanChePham(this.item.CongDoan).subscribe((res: any) => {
        this.listCongThuc = res;
        this.look(this.listCongThuc);
        this.listdmTieuChiBanChePham = mapArrayForDropDown(res, 'Ten', 'Id');
      })
      this.userInfo = this._auth.currentUserValue;
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.getListPhanXuong();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
      if (this.item.CreatedBy == this.userInfo.Id)
        this.checkbutton.Ghi = true;
    })
  }
  ChuyenDuyet() {
    this.services.KiemTraBanChePham().ChuyenTiep(this.item).subscribe((res: any) => {
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

  GetNextSoQuyTrinh() {
    this.services.KiemTraBanChePham().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  GhiLai() {
    this.services.KiemTraBanChePham().Set(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.toastr.success(res.message)
          this.opt = 'edit';
          this.item = res.objectReturn;
          this.KiemTraButtonModal();
          this.router.navigate([`/quantri/quanlykhosanxuat/khobong/kiemtrabanchepham/${this.item.Id || 0}`, { skipLocationChange: this.skipLocationChange }])
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('.', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.KiemTraBanChePham().Delete(this.item).subscribe((res: any) => {
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
  GetMatHang() {
    if (this.item.IddmPhanXuong != undefined
      && this.item.Ngay != undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.KiemTraBanChePham().GetMatHang(this.item.IddmPhanXuong, this.item.NgayUnix, this.item.CongDoan).subscribe((res: any) => {
        let modalRef = this._modal.open(ChonmathangkiemtrabanchephammodalComponent, {
          size: 'xl',
          backdrop: 'static'
        })
        modalRef.componentInstance.opt = 'edit';
        modalRef.componentInstance.listMatHang = res;
        modalRef.componentInstance.listItem = deepCopy(this.item.listItem);
        modalRef.result.then((data) => {
          this.item.listItem = data.data;
          this.look(this.listCongThuc);
          this.voiPintable.active();
        });
      })
    }
  }

  onClose() {
    this.activeModal.close();
  }

  changeCongDoan() {
    this.item.listItem = [];
    this.services.dmTieuChiChatLuongsoi().GetListdmTieuChiBanChePham(this.item.CongDoan).subscribe((res: any) => {
      this.listCongThuc = res;
      this.listdmTieuChiBanChePham = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  look(list) {
    list.forEach((ele) => {
      this.item.listItem.forEach(item => {
        let obj =item.listdmTieuChiBanChePham.find((thamso) => thamso.IddmTieuChiChatLuong === ele.Id);
        if (obj && ele.CongThuc) {
          obj.Disabled = true;
        }
      });
    })
  }

  xuongDong(i, length, indexcon) {
    let nextIndex = i * length + indexcon + 1
    let nextFocus = this.inputNumbers.toArray().find(ele => ele.tabindex === nextIndex + length);
    if (validVariable(nextFocus)) {
      nextFocus.el.nativeElement.children[0].children[0].focus();
      nextFocus.el.nativeElement.children[0].children[0].select();
    } else {
      this.inputNumbers.toArray()[(indexcon + 1 >= length ? 0 : indexcon + 1)].el.nativeElement.children[0].children[0].focus();
      this.inputNumbers.toArray()[(indexcon + 1 >= length ? 0 : indexcon + 1)].el.nativeElement.children[0].children[0].select();
    }
    // this.inputNumbers.toArray()[(indexcon + 1 >= length ? 0 : indexcon + 2)].el.nativeElement.children[0].children[0].focus();
    // this.inputNumbers.toArray()[(indexcon + 1 >= length ? 0 : indexcon + 2)].el.nativeElement.children[0].children[0].select();
  }

  // Tinh(index) {
  //   this.listCongThuc.forEach((ele) => {
  //     this.item.listItem[index].listdmTieuChiBanChePham.forEach((obj) => {
  //       if (obj.IddmTieuChiChatLuong === ele.Id) {
  //         obj.Ma = ele.Ma;
  //          if(ele.CongThuc) {
  //           obj.Disabled = true;
  //           let substrings = ele.CongThuc.split("|");
  //           substrings.forEach((sub, index_con) => {
  //             this.item.listItem[index]?.listdmTieuChiBanChePham.forEach((thamso) => {
  //             if (sub === thamso.Ma) {  
  //               substrings[index_con] = thamso.GiaTri;
  //             }
  //             })
  //           });
  //           let text = substrings.join('');
  //           obj.GiaTri=eval(text);
  //          }
  //       }
  //     });
  //   });
  // }

  Tinh(index) {
    this.listCongThuc.forEach((ele) => {
      let obj = this.item.listItem[index].listdmTieuChiBanChePham.find((thamso) => thamso.IddmTieuChiChatLuong === ele.Id)
      if (obj && ele.CongThuc) {
        obj.Disabled = true;
        obj.substrings = ele.CongThuc.split("|");
        obj.substrings.forEach((sub, index_con) => {
          let opp = this.listCongThuc.find((thamso) => thamso.Ma === sub)
          if (opp) {
            let ItemGiaTri = this.item.listItem[index].listdmTieuChiBanChePham.find((thamso) => thamso.IddmTieuChiChatLuong === opp.Id)
            if (ItemGiaTri)
              obj.substrings[index_con] = ItemGiaTri.GiaTri;
          }
        });
        obj.text = obj.substrings.join('');
        obj.GiaTri = eval(obj.text);
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { LobongcopymodalComponent } from '../lobongcopymodal/lobongcopymodal.component';
import { DanhmuctaisanService } from "../../../services/Taisan/danhmuctaisan.service"
import { base64ToBlob } from '../../../services/globalfunction';
import { API } from '../../../services/host';
import { exhaustMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as printJS from 'print-js';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-lobongmodal',
  templateUrl: './lobongmodal.component.html',
  styleUrls: ['./lobongmodal.component.css']
})
export class LobongmodalComponent implements OnInit {
  opt: any = ''
  listdmLoaiBong: any = [];
  listLoBong: any = [];
  listdmCapBong: any = [];
  item: any = {};
  khongclicknhieu: any = false;
  lang: any = vn;
  isQR: any = false;
  listKichThuoc: any = [
    { value: 100, label: '100' },
    { value: 200, label: '200' },
    { value: 400, label: '400' },
  ];
  inQrCode$ = new Subject<void>();
  listFromTo: any = [];
  isChon: any = null;
  isCheckPort: boolean = true;

  constructor(public activeModal: NgbActiveModal, private store: StoreService,
    private services: SanXuatService,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    this.isCheckPort = this.store.getIsCheckPort();
    this.InQrCodeLoBong();
    this.getListdmCapBong();
    this.GetListdmLoaiBong();
    this.GetListLoBong();
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
  }

  accept() {
    this.item.HoatDong = true;
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined && this.item.Ngay !== undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.SetLoBong(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.toastr.success(res.message)
            this.activeModal.close();
          } else {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.toastr.error(res.message)
          }
        }
      })
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!')
    }
  }

  GetListdmLoaiBong() {
    let data = {
      CurrentPage: 0,
    }
    this.services.GetListdmLoaiBong(data).subscribe((res: any) => {

      this.listdmLoaiBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetListLoBong() {
    let data = {
      CurrentPage: 0,
    }
    this.services.GetListLoBong(data).subscribe((res: any) => {

      this.listLoBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListdmCapBong() {
    this.services.GetListOptdmCapBong().subscribe((res: any) => {
      this.listdmCapBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  Onclose() {
    this.activeModal.close();
  }
  CopyLoBong() {
    let data = {
      IdLoBong_Nguon: this.item.IdLoBongCopy,
      IdLoBong_Dich: this.item.Id
    }
    this.services.CopyLoBong(data).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.khongclicknhieu = !this.khongclicknhieu;
          this.toastr.success(res.message)
          this.services.getLoBong(this.item.Id).subscribe((res: any) => {
            this.item = res;
          })
        } else {
          this.khongclicknhieu = !this.khongclicknhieu;
          this.toastr.error(res.message)
        }
      }
    })
  }
  CopyLoBongModal() {
    let modalRef = this._modal.open(LobongcopymodalComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    modalRef.result.then((res: any) => {
      this.item.TrongLuong = res.data.TrongLuong;
      this.item.Nep = res.data.Nep;
      this.item.Mic = res.data.Mic;
      this.item.Mat = res.data.Mat;
      this.item.UHML = res.data.UHML;
      this.item.Str = res.data.Str;
      this.item.SFI = res.data.SFI;
      this.item.Rd = res.data.Rd;
      this.item.b = res.data.b;
      this.item.Tap = res.data.Tap;
      this.item.Am = res.data.Am;
      // this.services.getLoBong(this.item.Id).subscribe((res:any)=>{
      //   this.item = res;
      // })
    })
  }
  TinhGiaKien() {
    this.item.GiaKien = (this.item.TrongLuong || 0) * (this.item.GiaBong || 0)
  }

  TaoQR() {
    this._danhMucTaiSan.SetQRCODELoBong(this.item).subscribe((res: any) => {
      if (res.StatusCode === 0) {
        this.item.MaQR = res.Data;
        this.toastr.success(res.message)
      } else this.toastr.error(res.message)
    })
  }

  InQrCodeLoBong() {
    this.inQrCode$.pipe(
      exhaustMap(() =>
        this._danhMucTaiSan.InQrCodeLoBong({
          // KichThuoc: this.item.IdKichThuoc || 100,
          IdLoBong: this.item.Id,
          SoBan: this.item.SoBan || 1,
          Tu: this.item.Tu || 1,
          Den: this.item.Den || this.item.SoLuongKien,
          KhoGiay: this.item.KhoGiay || 8
        })
      )
    ).subscribe((res: any) => {
      if (res.State === 1) {
        // let url = res.Data;
        // window.open(API.imgURL + url);

        const url = API.imgURL + res.Data;
        printJS({
          printable: url, // đường dẫn file PDF
          type: 'pdf',       // kiểu dữ liệu
          showModal: false   // bỏ popup loading, chỉ hiện hộp thoại in
        });

        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    });
  }
  InQrCode() {
    this.inQrCode$.next();
  }
  handleQR() {
    if (this.item.MaQR) {
      this.isQR = !this.isQR;
      this.listFromTo = this.splitRanges(this.item.SoLuongKien);
    } else this.TaoQR();
  }

  splitRanges(total: number, rangeSize: number = 100) {
    const ranges: { from: number; to: number }[] = [];

    if (total <= rangeSize) {
      ranges.push({ from: 1, to: total });
    } else {
      for (let start = 1; start <= total; start += rangeSize) {
        const end = Math.min(start + rangeSize - 1, total);
        ranges.push({ from: start, to: end });
      }
    }
    return ranges;
  }

  handleFromTo(data) {
    this.item.Tu = data.from;
    this.item.Den = data.to;
  }

}

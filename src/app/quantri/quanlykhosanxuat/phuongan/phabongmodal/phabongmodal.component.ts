import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TinhtrangtaisanComponent } from 'src/app/quantri/danhmuc/tinhtrangtaisan/tinhtrangtaisan.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { PintableDirective } from 'voi-lib';
import { ChonhanghoamodalComponent } from '../../modals/chonhanghoamodal/chonhanghoamodal.component';

@Component({
  selector: 'app-phabongmodal',
  templateUrl: './phabongmodal.component.html',
  styleUrls: ['./phabongmodal.component.css']
})
export class PhabongmodalComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  listBanBong: any = [];
  listTrienKhaiKeHoach: any = [];
  listItems: any = [];
  listProps: any = [];
  listCol: any = [];
  listFixedCol: any = [];
  editVal: any = 0;
  checkbutton: any = {};
  opt: any = '';
  listLoBong: any = [];
  itemSoKienTrenBan = {};
  itemSoKienTrenBanTruBongHoi = {};
  item: any = {
    Id: '',
    listItem: [],
    listLoBong: []
  };
  TongKhoiLuongDung: any = null;
  TongTyLe: number = 100;
  itemTrienKhaiKeHoach: any = {};
  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService, public _modal: NgbModal) {
    // for (let i = 0; i < 31; i++) {
    //   this.listBanBong.push({ label: `${i}` })
    // }
    // this.listItems = [];
    // for (let i = 0; i < 23; i++) {
    //   let data = {
    //     id: i,
    //     label: `Thành phần ${i}`,
    //     mic: `${i}`,
    //     rd: `${i}`,
    //     pb: `${i}`,
    //     TyLe: `${i}`,
    //     Ton: `${i}`,
    //     TongNgay: `${i}`,
    //     ConLai: `${i}`
    //   }
    //   for (let j = 0; j < 31; j++) {
    //     data[`Ban${j}`] = {};
    //     data[`Ban${j}`].SoKien = null;
    //     data[`Ban${j}`].tabIndex = (j * 23) + i + 1;
    //   }
    //   this.listItems.push(data);
    // }
    // for (let j = 0; j < 31; j++) {
    //   this.listProps.push(`Ban${j}`)
    // }
  }

  ngOnInit(): void {
    this.checkbutton = {
      Ghi: false,
      Xoa: false,
      ChuyenTiep: false,
      KhongDuyet: false
    }
    this.KiemTraButtonModal();
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      // this.GetLoBongTrongKho();
    }
    this.GetListTrienKhaiKeHoach()
  }
  GetListTrienKhaiKeHoach() {
    let data = {
      CurrentPage: 0,
    }
    this._services.TrienKhaiKeHoachSanXuat().GetList(data).subscribe((res: any) => {
      this.listTrienKhaiKeHoach = mapArrayForDropDown(res, 'SoQuyTrinh', "Id")
      if (validVariable(this.item.IdTrienKhaiKeHoachSanXuat)) {
        this.GetChiTietTrienKhaiKeHoachForMatHang({ value: this.item.IdTrienKhaiKeHoachSanXuat });
      }
    })
  }
  GetChiTietTrienKhaiKeHoachForMatHang(event) {
    this._services.TrienKhaiKeHoachSanXuat().Get(event.value, false).subscribe((res: any) => {
      console.log(res);
      res.listItem.forEach(mathang => {
        mathang.KhoiLuongSanXuat = mathang.KhoiLuongSanXuat / 1000;
      });
      this.itemTrienKhaiKeHoach = res;
      this.GetLoBongTrongKho();
    })
  }
  // edit(i,prop){
  //   this.listItems[i][prop].editing=true;
  // }
  // doneEdit(i,prop){
  //   console.log(this.listItems);
  //   this.listItems[i][prop].editing=false;
  // }
  GetLoBongTrongKho() {
    this._services.PhuongAnPhaBong().GetLoBongTrongKho(this.itemTrienKhaiKeHoach.IdDuAn).subscribe(res => {
      this.listLoBong = res;
    })
  }
  chonHangHoa() {
    let modalRef = this._modal.open(ChonhanghoamodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.items = this.itemTrienKhaiKeHoach.listItem || [];
    modalRef.componentInstance.selectedItems = this.item.listItem || [];
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.componentInstance.opt = "KhoiLuongSanXuat";
    modalRef.result.then(res => {
      this.item.listItem = res;
      this._services.PhuongAnPhaBong().TinhKhoiLuongBong(res).subscribe((result: any) => {
        if (result.State === 1) {
          this.item.KhoiLuongBong = parseFloat(result.message);
          if (validVariable(this.item.TongSoKien)) {
            this.TinhSoBanBong({ value: this.item.TongSoKien });
          }
        } else {
          this._toastr.error(result.message);
        }
      })
    })
      .catch(er => {
        console.log(er);
      })
  }
  chonLoBong() {
    let modalRef = this._modal.open(ChonhanghoamodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.items = this.listLoBong || [];
    modalRef.componentInstance.selectedItems = this.item.listLoBong || [];
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.componentInstance.opt = "LoBong";
    modalRef.result.then(res => {
      this.item.listLoBong = res;
      if (res.length > 0) {
        let TongKhoiLuong = res.reduce((sum, ele) => {
          return sum + ele.TrongLuong
        }, 0)
        this.item.KhoiLuongKienTrungBinh = TongKhoiLuong / (res.length);
      }
      console.log(this.item.KhoiLuongKienTrungBinh);
      if (validVariable(this.item.TongSoKien)) {
        this.TinhSoBanBong({ value: this.item.TongSoKien });
      }
    })
      .catch(er => {
        console.log(er);
      })
  }
  TinhSoBanBong(e?) {
    this.item.TongSoKien = e.value;
    if (validVariable(this.item.KhoiLuongBong) && validVariable(this.item.TongSoKien) && validVariable(this.item.KhoiLuongKienTrungBinh)) {
      this.item.SoBanBong = Math.ceil(this.item.KhoiLuongBong / (this.item.TongSoKien * this.item.KhoiLuongKienTrungBinh));
      this.listProps = [];
      for (let i = 1; i <= this.item.SoBanBong; i++) {
        this.listProps.push(`${i}`);
      }
      this.item.listLoBong.forEach((lobong, index) => {
        lobong.tempBanBong = {};
        for (let i = 1; i <= this.item.SoBanBong; i++) {
          lobong.tempBanBong[`${i}`] = {
            SoKien: null,
            tabIndex: (i * this.item.listLoBong.length) + index
          };
        }
      })
      this.itemSoKienTrenBan = {};
      for (let i = 1; i <= this.item.SoBanBong; i++) {
        this.itemSoKienTrenBan[`${i}`] = null;
      }
      this.voiPintable.active();
      // console.log(this.voiPintable);
    }
  }

  CalAllTable(y, x) { //truc toa do y:tung x:hoanh
    //TinhSoLuongDung;
    let tempSLD = 0;
    for (let i = 1; i <= this.item.SoBanBong; i++) {
      if (validVariable(this.item.listLoBong[y].tempBanBong[`${i}`].SoKien)) {
        tempSLD += this.item.listLoBong[y].tempBanBong[`${i}`].SoKien;
      }
    }
    this.item.listLoBong[y].SoLuongDung = tempSLD;
    this.item.listLoBong[y].TonCuoi = this.item.listLoBong[y].SoLuongKien - tempSLD;
    let tempSoKien1Line = 0;
    let tempSoKien1LineTruBongHoi = 0;
    let tempTongKhoiLuongDung = 0;
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.tempBanBong[`${x}`].SoKien)) {
        tempSoKien1Line += lobong.tempBanBong[`${x}`].SoKien;
        if (validVariable(lobong.Mic) && validVariable(lobong.Rd) && validVariable(lobong.b)) {
          tempSoKien1LineTruBongHoi += lobong.tempBanBong[`${x}`].SoKien;
        }
      }
      if (validVariable(lobong.SoLuongDung)) {
        tempTongKhoiLuongDung += (lobong.SoLuongDung * lobong.TrongLuong);
      }
    });
    this.TongKhoiLuongDung = tempTongKhoiLuongDung;
    this.itemSoKienTrenBan[`${x}`] = tempSoKien1Line;
    this.itemSoKienTrenBanTruBongHoi[`${x}`] = tempSoKien1LineTruBongHoi;
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.SoLuongDung)) {
        lobong.TyLe = (lobong.SoLuongDung * lobong.TrongLuong) / tempTongKhoiLuongDung * 100;
      }
    });
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res;
    })
  }
  SetData() {
    this.item.listLoBong.forEach(lobong => {
      if (!validVariable(lobong.listItem)) {
        lobong.listItem = [];
      }
      for (let i = 1; i <= this.item.SoBanBong; i++) {
        let data = {
          SoLuongKien: lobong.tempBanBong[`${i}`].SoKien,
          ThuTu: i
        };
        lobong.listItem.push(data)
      }
    });
    return this.item;
  }
  GhiLai() {
    this._services.PhuongAnPhaBong().Set(this.SetData()).subscribe((res: any) => {
      console.log(res);
      if (res) {
        if (res.State === 1) {
          this._toastr.success(res.message);
          this.opt = 'edit';
          res.objectReturn.listLoBong.forEach(lobong => {
            if(!validVariable(lobong.temBanBong)){
              lobong.tempBanBong = {};
            }
            lobong.listItem.forEach(item => {
              let data ={
                ...item,
                SoKien:item.SoLuongKien
              }
              lobong.tempBanBong[`${item.ThuTu}`]=data;
            });
          });
          this.item = res.objectReturn;
          this.KiemTraButtonModal();
        } else {
          this._toastr.error(res.message);
        }
      }
    });
  }
  ChuyenDuyet() {
    this._services.PhuongAnPhaBong().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this._activeModal.close();
        } else {
          this._toastr.error(res.message);
        }
      }
    })
  }
  GetNextSoQuyTrinh() {
    this._services.PhuongAnPhaBong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
}

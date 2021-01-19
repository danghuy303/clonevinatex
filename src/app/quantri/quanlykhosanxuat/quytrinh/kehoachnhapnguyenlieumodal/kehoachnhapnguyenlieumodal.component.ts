import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-kehoachnhapnguyenlieumodal',
  templateUrl: './kehoachnhapnguyenlieumodal.component.html',
  styleUrls: ['./kehoachnhapnguyenlieumodal.component.css']
})
export class KehoachnhapnguyenlieumodalComponent implements OnInit {

  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {
    "Id": "",
    "idKeHoachNhapNguyenLieu": this.item.Id,
  };
  editTableItem: any = [];
  listPhuongAnSapXep: any = [];
  listLoaiBong: any = [];
  listLoBong: any = [];
  listCapBong: any = [];
  listKho: any = [];
  lang: any = vn;
  data: any = {};
  filter: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService) {
  }

  ngOnInit(): void {
    this.GetListdmLoaiBong();
    if (this.opt !== 'edit') {
      this.item = {
        NhaMay: '',
        IddmLoaiBong: '',
        IddmCapBong: '',
        IdLoBong: '',
        listItem: [],
      }
      this.GetNextSoQuyTrinh();
    }
    else {
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          obj.ThoiGianDuKien = obj.ThoiGianDuKienUnix > 0 ? UnixToDate(obj.ThoiGianDuKienUnix) : 0;
        });
      }
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = new Date(this.item.NgayUnix * 1000);
    }
    this.data.CurrentPage = 0;
    this.getListKho();
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  GetListdmLoaiBong() {
    let data = {
      CurrentPage: 0,
      NumperPage: 10,
      Ma: '',
      Ten: "",
      sFilter: ''
    }
    this._services.GetListdmLoaiBong(data).subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tổng hợp' });
      this.listLoaiBong = mapArrayForDropDown(res, "Ten", 'Id');
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          obj.SoHopDong="";
          obj.Container="";
          obj.TongSoKien="";
          obj.GiaBong="";        
          this.listLoaiBong.filter(objlistLoaiBong => {
            if (obj.IddmItem == objlistLoaiBong.value) {
              obj.objloaibong = objlistLoaiBong;
            }
          });
        });
      }
    })
  }

  // GetNextSoLoBong(event, index) {
  //   if (index == 1)
  //     this.item.IddmLoaiBong = event.value;
  //   else
  //     this.item.IddmCapBong = event.value;

  //   if (this.item.IddmLoaiBong != undefined && this.item.IddmLoaiBong != null && this.item.IddmLoaiBong != ''
  //     && this.item.IddmCapBong != null && this.item.IddmCapBong != undefined && this.item.IddmCapBong != '')
  //     this._services.QuyTrinhPhieuNhapLoBong().GetNextSoLoBong(this.item.IddmLoaiBong, this.item.IddmCapBong).subscribe(
  //       (res: any) => {
  //         this.item.IdLoBong = res.SoLoBong;
  //       })
  // }

  ChuyenDuyet() {
    // if (this.item.Ngay === null || this.item.Ngay === undefined) {
    //   this.toastr.error("Bạn chưa chọn  ngày");
    // }
    if (this.item.idKhoNhap === null || this.item.idKhoNhap === undefined) {
      this.toastr.error("Bạn chưa chọn  danh mục kho");
    }
    else {
      // if (this.newTableItem.Ten!= undefined && this.newTableItem.SoCan!= undefined && this.newTableItem.SoKien!= undefined && this.newTableItem.ViTri!= undefined) {
      //   this.add();
      // }
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          obj.ThoiGianDuKienUnix = validVariable(obj.ThoiGianDuKien) ? DateToUnix(obj.ThoiGianDuKien) : 0;
        });
      }
      this._services.NhapKeHoachNguyenLieu().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  KhongDuyet() {
    // if (this.item.Ngay === null || this.item.Ngay === undefined) {
    //   this.toastr.error("Bạn chưa chọn  ngày");
    // }
    if (this.item.idKhoNhap === null || this.item.idKhoNhap === undefined) {
      this.toastr.error("Bạn chưa chọn  danh mục kho");
    }
    else {
      // if (this.newTableItem.Ten!= undefined && this.newTableItem.SoCan!= undefined && this.newTableItem.SoKien!= undefined && this.newTableItem.ViTri!= undefined) {
      //   this.add();
      // }
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          obj.ThoiGianDuKienUnix = validVariable(obj.ThoiGianDuKien) ? DateToUnix(obj.ThoiGianDuKien) : 0;
        });
      }
      this._services.NhapKeHoachNguyenLieu().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._services.NhapKeHoachNguyenLieu().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    // if (this.opt !== 'edit') {
    //   if (this.type === 'bong')
    //     this.item.Loai = 1;
    //   else
    //     this.item.Loai = 5;
    // }
    if (this.item.idKhoNhap === null || this.item.idKhoNhap === undefined) {
      this.toastr.error("Bạn chưa chọn  danh mục kho");
    }
    else {
      // if (!validVariable(this.newTableItem.idKhoNhap) || !validVariable(this.newTableItem.SoLuongNhap) || !validVariable(this.newTableItem.ThoiGianDuKien)) {
      //   this.add();
      // }
      if (this.item.listItem.length > 0) {
        this.item.listItem.filter(obj => {
          obj.ThoiGianDuKienUnix = validVariable(obj.ThoiGianDuKien) ? DateToUnix(obj.ThoiGianDuKien) : 0;
        });
      }
      this._services.NhapKeHoachNguyenLieu().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.KiemTraButtonModal();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._services.NhapKeHoachNguyenLieu().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getListKho() {
    let data = {
      CurrentPage: 0
    }
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  filtertable_add() {    
    if (this.filter.KeyWord != undefined && this.filter.KeyWord != null && this.filter.KeyWord != "") {
      this.item.listItem_copy = deepCopy(this.item.listItem);
      let filter = this.item.listItem.filter(obj => {
        let Ten = obj.objloaibong.label.toLowerCase();
        let indexOf = Ten.indexOf(this.filter.KeyWord);
        return indexOf != -1
      });
      this.item.listItem = filter;
    }
    else {     
      this.item.listItem = deepCopy(this.item.listItem_copy);
      this.item.listItem.filter(obj => {
        obj.ThoiGianDuKien = obj.ThoiGianDuKienUnix > 0 ? UnixToDate(obj.ThoiGianDuKienUnix) : 0;
      });
    }
  }

  resetFilter() {
    this.filter = {};
    this.filter.KeyWord = '';
    this.filtertable_add();
  }

  gettonkho(data_idKho, item) {
    let data: any = {
      idKho: validVariable(data_idKho) ? data_idKho : "",
      idNguyenLieu: validVariable(item.IddmItem) ? item.IddmItem : "",
    }
    this._services.GetOptions().GetTonKhoCuaNguyenLieu(data.idKho, data.idNguyenLieu).subscribe((res: any) => {
      item.TonKho = res.TonKho;
    })
  }

  add() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.newTableItem.Id = "";
    this.newTableItem.idKeHoachNhapNguyenLieu = this.item.Id;
    this.item.listItem.push(this.newTableItem);
    this.newTableItem = {
      "Id": "",
      "idKeHoachNhapNguyenLieu": this.item.Id,
    }
  }
  edit(item, index) {
    this.item.listItem.forEach(element => {
      element.editField = false;
    });
    this.item.listItem[index].editField = true;
    this.editTableItem = deepCopy(item);
  }
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  saveEdit(item, index) {
    this.item.listItem[index] = item;
    this.item.listItem[index].editField = false;
  }
  cancelEdit(item, index) {
    this.item.listItem[index].editField = false;
  }
  Onclose() {
    this.activeModal.close();
  }

}

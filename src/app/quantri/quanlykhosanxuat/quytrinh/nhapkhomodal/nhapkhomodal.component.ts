import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-nhapkhomodal',
  templateUrl: './nhapkhomodal.component.html',
  styleUrls: ['./nhapkhomodal.component.css']
})
export class NhapkhomodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  editTableItem: any = [];
  listPhuongAnSapXep: any = [];
  listLoaiBong: any = [];
  listLoBong: any = [];
  listCapBong: any = [];
  listCaMay: any = [];
  listKho: any = [];
  lang: any = vn;
  data: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService) {

  }

  ngOnInit(): void {
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
    else{
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = new Date(this.item.NgayUnix * 1000);
    }
    this.data.CurrentPage = 0;
    if (this.type === 'bonghoi') {
      this.getListLoaiBongHoiPhe();
    }
    else{
      this.getListLoaiBong();
    }
    this.getListCapBong();
    this.getListLoBong();
    this.getListKho();
    this.getListCaMay();
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
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

  ChuyenTiep() {
    if (this.opt !== 'edit') {
      if (this.type === 'bong')
        this.item.Loai = 1;
      else if (this.type === 'xo')
        this.item.Loai = 5;
      else if (this.type === 'bonghoi')
        this.item.Loai = 6;
    }
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else if (this.item.IddmKho === null || this.item.IddmKho === undefined) {
      this.toastr.error("Bạn chưa chọn  danh mục kho");
    }
    else {
      if (this.newTableItem.Ten!= undefined && this.newTableItem.SoCan!= undefined && this.newTableItem.SoKien!= undefined) {
        this.add();
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
      this._services.QuyTrinhPhieuNhapLoBong().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this._services.QuyTrinhPhieuNhapLoBong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.opt !== 'edit') {
      if (this.type === 'bong')
        this.item.Loai = 1;
      else if (this.type === 'xo')
        this.item.Loai = 5;
      else if (this.type === 'bonghoi')
        this.item.Loai = 6;
    }
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else if (this.item.IddmKho === null || this.item.IddmKho === undefined) {
      this.toastr.error("Bạn chưa chọn  danh mục kho");
    }
    else {
      if (this.newTableItem.Ten!= undefined && this.newTableItem.SoCan!= undefined && this.newTableItem.SoKien!= undefined) {
        this.add();
      }
      this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
      this._services.QuyTrinhPhieuNhapLoBong().Set(this.item).subscribe((res: any) => {
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
      this._services.QuyTrinhPhieuNhapLoBong().Delete(this.item).subscribe((res: any) => {
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
    if (this.type === 'bong')
      this.data.Loai = 1;
    else  if (this.type === 'xo')
      this.data.Loai = 5;
    else  if (this.type === 'bonghoi'){
      this.data.Loai = 6;
      this.data.IddmLoaiBong = this.item.IddmLoaiBong;
    }
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListLoaiBong() {
    this._services.GetListdmLoaiBong(this.data).subscribe((res: any) => {
      this.listLoaiBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListLoaiBongHoiPhe() {
    this._services.GetListdmLoaiBongHoiPhe().subscribe((res: any) => {
      this.listLoaiBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListLoBong() {
    if (this.type === 'bong')
    this.data.Loai = 1;
    
    this._services.GetListLoBong(this.data).subscribe((res: any) => {
      let data: any = {};
      data.Id = "";
      data.Ten = "";
      res.unshift(data);
      this.listLoBong = mapArrayForDropDown(res, 'Ten', 'Id');
      console.log(this.listLoBong)
    })
  }
  getListCapBong() {
    this._services.GetListdmCapBong(this.data).subscribe((res: any) => {
      this.listCapBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListCaMay() {
    this._services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listCaMay = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  add() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(this.newTableItem);
    this.newTableItem = {}
  }
  addBongHoi() {
    if (this.item.listBongHoi == undefined || this.item.listBongHoi == null)
      this.item.listBongHoi = [];
    this.item.listBongHoi.push(this.newTableItem);
    this.newTableItem = {}
  }
  edit(item, index) {
    this.item.listItem.forEach(element => {
      element.editField = false;
    });
    this.item.listItem[index].editField = true;
    this.editTableItem = deepCopy(item);
  }
  editBongHoi(item, index) {
    this.item.listBongHoi.forEach(element => {
      element.editField = false;
    });
    this.item.listBongHoi[index].editField = true;
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
  deleteBongHoi(index) {
    let item = this.item.listBongHoi.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listBongHoi.push(JSON.parse(JSON.stringify(item)));
    }
  }
  saveEdit(item, index){
    this.item.listItem[index] = item;
    this.item.listItem[index].editField = false;
  }
  cancelEdit(item, index){
    this.item.listItem[index].editField = false;
  }
  Onclose() {
    this.activeModal.close();
  }
}

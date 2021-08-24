import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { vn } from 'src/app/services/const';
import { DanhMucHopDongService } from './../../../../../../../services/Hopdong/danhmuchopdong.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-chitiethanghoamodal',
  templateUrl: './chitiethanghoamodal.component.html',
  styleUrls: ['./chitiethanghoamodal.component.css']
})
export class ChitiethanghoamodalComponent implements OnInit {
  lang: any = vn;
  listLoaiMatHang_ref: any = [];
  opt: any = '';
  item: any = {};
  listLoaiBong: any = []
  listThanhToanThuTuc: any = []
  data: any = {};
  listLoaiMatHang: any = [];
  listDieuKhoanThanhToan: any = {};
  IdQuyTrinh: any;
  selectedItems: any = [];
  items: any = [];
  checkedAll: boolean = false;
  yearRange: string = `${new Date().getFullYear() - 50
    }:${new Date().getFullYear()}`;
  constructor(
    public activeModal: NgbActiveModal,
    private _servicesdmHopDong: DanhMucHopDongService,
    private _modal: NgbModal,
    private _servicesSanXuat: SanXuatService,
    private _serviceHopDong: HopDongService,
  ) { }


  ngOnInit(): void {
    this._serviceHopDong.QuyTrinhHopDong().GetListAlldmTieuChuanChatLuong().subscribe((res: any) => {
      this.items = res;
      this.items.forEach(obj => {
        obj.checked = false;
        if (this.selectedItems.length > 0) {
          if (this.selectedItems.some(item => obj.id === item.iddmTieuChuanChatLuong && (item.isXoa != true || item.isXoa == undefined))) {
            obj.checked = true;
          }
        }
      });
      if (this.items.every(obj => obj.checked === true)) {
        this.checkedAll = true;
      }
    });
  }


  accept() {
    this.activeModal.close(this.items.filter(item => item.checked).map(ele => {
      return {
        ...ele,
        idHopDong: this.IdQuyTrinh,
        iddmTieuChuanChatLuong: ele.id,
        isXoa: false,
        id: '',

        // "id": "string",
        // "created": "2021-08-23T07:28:30.560Z",
        // "createdBy": "string",
        // "createdByName": "string",
        // "modified": "2021-08-23T07:28:30.560Z",
        // "modifiedBy": "string",
        // "modifiedByName": "string",
        // "idHopDong": "string",
        // "iddmTieuChuanChatLuong": "string",
        // "ketQua": "string",
        // "ghiChu": "string",
        // "isXoa": true,
        // "dacTinh": "string",
        // "donVi": "string",
        // "tieuChuan": "string"
      }
    }));
  }

  checkAll(e) {
    if (e.checked) {
      this.items.forEach(item => {
        item.checked = true;
      });
    } else {
      this.items.forEach(item => {
        item.checked = false;
      });
    }
  }
  checked() {
    this.checkedAll = this.items.every(ele => ele.checked)
  }

}

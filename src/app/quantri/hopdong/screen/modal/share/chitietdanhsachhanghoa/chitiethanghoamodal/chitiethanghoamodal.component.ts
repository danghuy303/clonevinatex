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
    this.activeModal.close(this.selectedItems)
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
checkItem(item){
if(item.checked == true)
{
  let itemFind: any = this.selectedItems.filter((e: any) =>e.iddmTieuChuanChatLuong === item.id)[0]
  if(itemFind === undefined){
    let itemFinds = this.items.find(e => e.checked === true && e.id === item.id);
    itemFinds = {
      idHopDong: this.IdQuyTrinh,
      iddmTieuChuanChatLuong: itemFinds.id,
      dacTinh: itemFinds.dacTinh,
      donVi: itemFinds.donVi,
      tieuChuan: itemFinds.tieuChuan,
      isXoa: false,
      id: '',
    }
    this.selectedItems.push(itemFinds)
  }
  else
    itemFind.isXoa = false;
}
  else{
    let itemFind = this.selectedItems.filter((e: any) =>e.iddmTieuChuanChatLuong === item.id)[0]
    itemFind.isXoa = true;
  }
}
}

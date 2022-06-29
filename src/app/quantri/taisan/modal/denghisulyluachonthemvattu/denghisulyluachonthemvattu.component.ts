import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-denghisulyluachonthemvattu',
  templateUrl: './denghisulyluachonthemvattu.component.html',
  styleUrls: ['./denghisulyluachonthemvattu.component.css']
})
export class DenghisulyluachonthemvattuComponent implements OnInit {

  opt: any = "";
  paging: any = {};
  items: any = [];
  layIdTaiSan: '';
  Lay_Chon: any = [];
  checkedAll: boolean = false;
  Keyword: any = '';
  filter: any = {};
  listItemDaChon: any = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.GetList();
  }

  resetFilter() {
    this.filter = {};
    this.GetList();
  }

  GetList() {
    this._serviceTaiSan.QuyTrinhXuLySuCo().GetListVatTuByIdTaiSanForXuLySuCo([this.layIdTaiSan]).subscribe((res: any) => {
      this.paging.TotalCount = res.TotalCount;
      // res.Data.forEach(ele => {
      //   this.items = ele.listVatTu;
      //   this.items.forEach(obj => {
      //     obj.checked = this.listItemDaChon.includes(obj.IdVatTuCanThayThe);
      //   })
      // })
      // this.checkedAll = this.items.every(obj => obj.checked);
        this.items = res.Data;
        this.items.forEach(obj => {
          obj.checked = this.listItemDaChon.includes(obj.IdVatTuCanThayThe);
        })
      this.checkedAll = this.items.every(obj => obj.checked);
    });
  }

  TimCheck() {

  }

  checkAll(e) {
    this.items.forEach(ele => {
      ele.checked = e.checked
    })
  }

  checked() {
    this.checkedAll = this.items.every(ele => ele.checked)
  }

  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {

      if (obj.checked) {
        data.push({
          Id: '',
          IdTaiSan: obj.IdTaiSan,
          TenTaiSan: `${obj.TenTaiSan} (${obj.DonVi})`,
          GiaTri: obj.GiaTri,
          SoLuong: obj.SoLuong,
          GhiChu: obj.GhiChu,
          IdVatTuCanThayThe: obj.IdVatTuCanThayThe,
          MaTaiSan: obj.Ma,
          IddmTaiSan:obj.IddmTaiSan,
          TonKho: obj.TonKho,
        })
      }
    });
    return data;
  }

  GhiLai() {
    this.activeModal.close(this.FilterTree());
  }

}

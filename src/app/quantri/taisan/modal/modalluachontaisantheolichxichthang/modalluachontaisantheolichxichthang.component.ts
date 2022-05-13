import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalluachontaisantheolichxichthang',
  templateUrl: './modalluachontaisantheolichxichthang.component.html',
  styleUrls: ['./modalluachontaisantheolichxichthang.component.css']
})
export class ModalluachontaisantheolichxichthangComponent implements OnInit {


  items: any = [];
  item: any = {};
  listItemDaChon: any = [];
  checkedAll: boolean = false;
  listdmLoaiBaoDuong: any = [];
  Keyword: any = '';
  filter: any = {};
  listLoaiTaiSan: any = [];
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  TuThang: any = '';
  DenThang: any = '';

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    if(this.filter.DenThang && this.filter.TuThang) {
        this.GetList();
    }
    // this.GetList();
  }

  resetFilter() {
    this.filter = {};
    this.GetList(true);
  }

  GetList(reset?) {
    let data = {
      CurrentPage: 1,
      PageSize: 25,
      Keyword: this.filter.Keyword,
      IdBoPhanSuDung: this.item.IdBoPhanSuDung,
      IddmLoaiTaiSan: this.item.IddmLoaiTaiSan,
      Ngay: DateToUnix(this.item.ThoiGian),
      // TuThang:DateToUnix(this.TuThang),
      // DenThang:DateToUnix(this.DenThang),  
      TuThang: DateToUnix(this.filter.TuThang),
      DenThang: DateToUnix(this.filter.DenThang),
    }
    this._serviceTaiSan.LichXich().GetListTaiSanTheoThang(data).subscribe((res: any) => {
      this.items = res.Data;
      this.items.forEach(obj => {
        obj.checked = this.listItemDaChon.includes(obj.IdTaiSan);
      })
      this.checked();
    })
    this.checkedAll = this.items.every(obj => obj.checked);
  }

  checkAll(e) {
    this.items.forEach(ele => {
      ele.checked = e.checked
    });
  }

  checked() {
    this.checkedAll = this.items.every(ele => ele.checked)
  }

  GhiLai() {
    let data = this.items.filter(ele => ele.checked)
    this.activeModal.close(data);
  }

}
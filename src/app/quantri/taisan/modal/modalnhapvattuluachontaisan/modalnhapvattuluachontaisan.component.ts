import { AfterContentChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { LohangComponent } from 'src/app/quantri/quanlykhosanxuat/thongke/lohang/lohang.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalnhapvattuluachontaisan',
  templateUrl: './modalnhapvattuluachontaisan.component.html',
  styleUrls: ['./modalnhapvattuluachontaisan.component.css']
})
export class ModalnhapvattuluachontaisanComponent implements OnInit, AfterViewInit {

  @ViewChild('table') table: any;
  opt: any = "";
  vatTu: any = "";
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  items: any = [];
  // item: any = [];
  item: any = {};
  listItemDaChon: any = [];
  checkedAll: boolean = false;
  listdmLoaiBaoDuong: any = [];
  Keyword: any = '';
  filter: any = {};
  listLoaiTaiSan: any = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }
  ngOnInit(): void {
    this.GetList();
    // let data = { PageSize: 20, CurrentPage: this.paging.page, Keyword: this.Keyword, };
    // this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
    //   this.listLoaiTaiSan = mapArrayForDropDown(res.Data.Items, "Ten", "Id");
    // })
  }
  ngAfterViewInit(): void {
    this.checkedAll = false
  }
  GetList() {
    let data = {
      PageSize: 20,
      CurrentPage: 1,
      Keyword: this.filter.Keyword,
      IddmLoaiTaiSan: '',
      // IdBoPhanSuDung:'',
      IdBoPhanSuDung: this.item.IdBoPhanSuDung || "",
    };
    this._serviceTaiSan.QuyTrinhDeNghiThayVatTu().GetListVatTu(data).subscribe((res: any) => {
      this.paging.TotalCount = res.Data.TotalCount;
      res.Data?.forEach(obj => {
        obj.MaTenTaiSan = obj.MaTaiSan + ' - ' + obj.TenTaiSan;
        obj.MaTenVatTu = obj.Ma + ' - ' + obj.Ten;
        obj.checked = this.listItemDaChon.includes(obj.Id);
      });
      this.items = res.Data;
    });
    this.checkedAll = this.items.every(ele => ele.checked);
  }
  TimCheck() {
    let cha: boolean = false;
    cha = this.items.every(ele => ele.checked);
    if ((cha)) {
      return true;
    }
    else {
      return false;
    }
  }
  checkAll(e) {
    this.items.forEach(obj => {
      obj.checked = e.checked;
    });

  }
  checked() {
    this.checkedAll = this.TimCheck();
  }
  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
      if (obj.checked) {
        data.push({
          IdTaiSan: obj.Id,
          Id: '',
          MaTenVatTu: obj.MaTenVatTu,
          MaTenTaiSan: obj.MaTenTaiSan,
          Ton: obj.TonKho,
          TuoiTho: obj.TuoiTho,
          NuocSanXuat: obj.NuocSanXuat,
          IddmTaiSan: obj.IddmTaiSan,
          MaTaiSan: obj.Ma,
          TenTaiSan: obj.Ten,
        });
      }
    });
    return data;

  }
  GhiLai() {
    this.activeModal.close(this.FilterTree());
  }

  seach() {
    console.log("table",this.table);
  }

}
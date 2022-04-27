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

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    console.log("id",this.layIdTaiSan);
    
    this.GetList();
  }

  resetFilter() {
    this.filter = {};
    this.GetList();
  }

  GetList() {

    this._serviceTaiSan.QuyTrinhXuLySuCo().GetListVatTuByIdTaiSanForXuLySuCo([this.layIdTaiSan]).subscribe((res: any) => {
      this.paging.TotalCount = res.TotalCount;
      res.Data.forEach(ele => {
       
        this.items = ele.listVatTu;
        // ele.listVatTu.forEach(obj => {
        //   console.log("obj", obj);
        //   this.items = obj;
        // })
      })

      this.checkedAll = this.items.every(obj => obj.data.checked);
    });
  }

  TimCheck() {

  }

  checkAll(e) {
    if (e.checked) {

    }
  }

  checked() {
    // this.checkedAll = this.TimCheck();
  }

  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
  
      if (obj.checked) {
        data.push({
          Id:'',
          IdTaiSan:obj.IdTaiSan,
          TenVatTu: obj.TenTaiSan,
          GiaTri: obj.GiaTri,
          SoLuong: obj.SoLuong,
          GhiChu: obj.GhiChu,
          IdVatTuCanThayThe: obj.IdVatTuCanThayThe,
        })
      }
    });
    return data;
  }

  GhiLai() {
    this.activeModal.close(this.FilterTree());
  }

}

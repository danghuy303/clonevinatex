import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-chon',
  templateUrl: './chon.component.html',
  styleUrls: ['./chon.component.css']
})
export class ChonComponent implements OnInit {
  item: any = {};
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    console.log(this.item);

    this.GetList();
  }
  GetList() {
    let data = {
      Keyword: '',
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      IddmLoaiTaiSan:this.item.IddmLoaiTaiSan ,
      TuNgay: 0,
      DenNgay: 0,
    };
    this._serviceTaiSan.NhapTaiSan().GetListNhomTaiSan(data).subscribe((res: any) => {
      this.paging.TotalCount = res.Data.TotalCount;

    })
  }
}

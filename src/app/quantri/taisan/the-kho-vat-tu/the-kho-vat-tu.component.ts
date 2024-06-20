import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { StoreService } from 'src/app/services/store.service';
import { TonkhodanhsachchitietComponent } from '../../quanlykhosanxuat/quytrinh/tonkhodanhsachchitiet/tonkhodanhsachchitiet.component';
import { ChiTietTheKhoVatTuComponent } from './chi-tiet-the-kho-vat-tu/chi-tiet-the-kho-vat-tu.component';

@Component({
  selector: 'app-the-kho-vat-tu',
  templateUrl: './the-kho-vat-tu.component.html',
  styleUrls: ['./the-kho-vat-tu.component.css']
})
export class TheKhoVatTuComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  listHienThi: any = [];
  paging: any = {CurrentPage: 1, TotalPages: 1, TotalCount: 1};
  listdmKho: any = [];
  filter: any = [];

  constructor(
    public _modal: NgbModal,
    public store: StoreService,
    public _toastr: ToastrService,
    private _service: TaisanService
  ) { }

  ngOnInit(): void {
    this.GetList();
  }

  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data: any = {
      // IddmKho: this.filter.IddmKho,
      CurrentPage: this.paging.CurrentPage,
      IdDuAn: this.store.getCurrent()
    }
    this._service.GetLuuKho(data).subscribe((res: any) => {
      this.listHienThi = res.Data;
      // this.paging = res.paging;
    })
  }

  resetFilter() {
    this.filter = {};
    this.GetList();
  }

  GetTheKho(item) {
    let modalRef = this._modal.open(ChiTietTheKhoVatTuComponent, {
      size: 'fullscreen-100',
      backdrop: 'static'
    })
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
    })
      .catch(er => {
      })
  }

}

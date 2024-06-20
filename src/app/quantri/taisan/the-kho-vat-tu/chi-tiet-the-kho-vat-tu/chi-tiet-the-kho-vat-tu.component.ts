import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { DateToUnix } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-chi-tiet-the-kho-vat-tu',
  templateUrl: './chi-tiet-the-kho-vat-tu.component.html',
  styleUrls: ['./chi-tiet-the-kho-vat-tu.component.css']
})
export class ChiTietTheKhoVatTuComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter: any = {};
  item: any = {};
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  tong: any = {};

  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    public activeModal: NgbActiveModal,
    public store: StoreService,
    private _service: TaisanService
  ) { }

  ngOnInit(): void {
    let date = new Date();
    this.filter.TuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter.DenNgay = date;
    this.GetTheKho();
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetTheKho();
  }
  GetTheKho(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      "IddmItem": this.item.IddmItem,
      "TuNgay": DateToUnix(this.filter.TuNgay),
      "DenNgay": DateToUnix(this.filter.DenNgay),
      "CurrentPage": this.paging.CurrentPage,
      IdDuAn: this.store.getCurrent()
    }
    this._service.GetTheKho(data).subscribe((res: any) => {
      this.items = res.Data.Items.slice(1,  res.Data.Items.length);
      this.tong = {
        ...res.Data.Items[0]
      }
      this.paging.TotalItem = res.Data.TotalCount;
      this.paging.CurrentPage = res.Data.Page;
    })
  }

  exportExcel() {
    // this._service.ExportGetTheKho(this.data).subscribe((res: any) => {
    //   this._service.download(res.TenFile);
    // })
  }
}

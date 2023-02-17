import { Component, Input, OnChanges, OnInit, SimpleChanges, } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-baocaotonghoptaisanchiphi',
  templateUrl: './baocaotonghoptaisanchiphi.component.html',
  styleUrls: ['./baocaotonghoptaisanchiphi.component.css']
})
export class BaocaotonghoptaisanchiphiComponent implements OnInit, OnChanges {

  @Input() filter: any = {};
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  listChiPhiKhac: any = [];
  tongGiaTriChiPhi: 0;
  $sub!: Subscription;

  constructor(
    public _modal: NgbModal,
    private _serviceTaiSan: TaisanService,
    private store: StoreService
  ) { 
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
          this.ngOnInit()
      }
  })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.GetListChiPhiPhatSinh();
  }

  ngOnInit(): void {

  }

  GetListChiPhiPhatSinh() {
    let data = {
      Keyword: "",
      CurrentPage: this.paging.CurrentPage,
      PageSize: 20,
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan,
      IdUser: '',
      Ngay: this.filter.Ngay,
      LoaiKeHoach: this.filter.LoaiKeHoach,
      IdDuAn: 0,
    };
    this._serviceTaiSan.BaoCaoTaiSan().GetListChiPhiPhatSinh(data).subscribe((res: any) => {
      this.tongGiaTriChiPhi = 0;
      this.tongGiaTriChiPhi = res.Data.TongGiaTri;
      this.paging.TotalCount = res.Data?.pagination?.TotalCount;
      this.listChiPhiKhac = res.Data?.pagination?.Items;
    })
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListChiPhiPhatSinh()
  }

}

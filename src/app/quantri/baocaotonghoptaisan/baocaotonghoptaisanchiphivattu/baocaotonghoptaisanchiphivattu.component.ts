import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-baocaotonghoptaisanchiphivattu',
  templateUrl: './baocaotonghoptaisanchiphivattu.component.html',
  styleUrls: ['./baocaotonghoptaisanchiphivattu.component.css']
})
export class BaocaotonghoptaisanchiphivattuComponent implements OnInit, OnChanges {
  @Input() filter: any = {};
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  listVatTu: any = [];
  tongGiaTriVatTu: 0;
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
    this.GetListChiPhiVatTu();
  }

  ngOnInit(): void {
  }

  GetListChiPhiVatTu() {
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
    this._serviceTaiSan.BaoCaoTaiSan().GetListChiPhiVatTu(data).subscribe((res: any) => {
      this.tongGiaTriVatTu = 0;
      this.tongGiaTriVatTu = res.Data.TongTien;
      this.paging.TotalCount = res.Data?.pagination?.TotalCount;
      this.listVatTu = res.Data?.pagination?.Items;
      this.listVatTu?.forEach(ele => {
        ele.ThanhTien =0;
        ele.ThanhTien = ele.SoLuong * ele.DonGia;
      })
    })
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListChiPhiVatTu()
  }

}

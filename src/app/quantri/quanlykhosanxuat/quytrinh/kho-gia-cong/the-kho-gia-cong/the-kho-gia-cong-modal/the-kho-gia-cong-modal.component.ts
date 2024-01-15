import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';

@Component({
  selector: 'app-the-kho-gia-cong-modal',
  templateUrl: './the-kho-gia-cong-modal.component.html',
  styleUrls: ['./the-kho-gia-cong-modal.component.css']
})
export class TheKhoGiaCongModalComponent extends StoreBase implements OnInit,OnDestroy {
  @ViewChild('paginator') paginator: any;
  items: any = [{id:5,SoQuyTrinh:'PNK_0000_0000'}];
  filter:any={};
  item:any={};
  itemTongCong:any={};
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  data: any = {};
  mapXuatNhapRoute = {
    Xuat: '/quantri/quanlysanxuatkhogiacong/khogiacong/xuatkho/',
    Nhap: '/quantri/quanlysanxuatkhogiacong/khogiacong/nhapkho/',
    KiemKe: '/quantri/quanlysanxuatkhogiacong/khogiacong/kiemke/'
  }
  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,
    private activatedRoute: ActivatedRoute,private router:Router, public activeModal: NgbActiveModal,public store:StoreService) { super(store)}

  ngOnInit(): void {
    let date = new Date();
    this.filter.TuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter.DenNgay = date;

    this.GetTheKho();
  }
  
  changePage(event){
    this.paging.CurrentPage = event.page + 1;
    this.GetTheKho();
  }
  GetTheKho(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    this.data = {
      "IddmItem": this.item.IddmItem,
      "TuNgay": DateToUnix(this.filter.TuNgay),
      "DenNgay": DateToUnix(this.filter.DenNgay),
      "IddmKho": this.item.IddmKho,
      "IdLoHang": this.item.IdLoHang,
      "CurrentPage": this.paging.CurrentPage,
      "IddmQuyCachDongGoi": this.item.IddmQuyCachDongGoi,
    }
    this._service.GetTheKho(this.data).subscribe((res: any) => {
      this.items = res.items;
      this.itemTongCong = res.items[0];
      // this.items.shift();
      this.paging = res.paging;
      console.log(res)
      // console.log(this.items)
      // console.log(this.paging)
    })
  }
  exportExcel() {
    this._service.ExportGetTheKho(this.data).subscribe((res: any) => {
      this._service.download(res.TenFile);
    })
  }
  navigateKiemKe(item) {
    if(validVariable(item.IdPhieuKiemKeGiaCong)){
      window.open(`#${this.mapXuatNhapRoute.KiemKe}${item.IdPhieuKiemKeGiaCong || 0}`, "_blank");
    }
    else if(item.Id === 'N'){
      window.open(`#${this.mapXuatNhapRoute.Nhap}${item.IdPhieuNhapGiaCong || 0}`, "_blank");
    }
    else if(item.Id === 'X'){
      window.open(`#${this.mapXuatNhapRoute.Xuat}${item.IdPhieuXuatGiaCong || 0}`, "_blank");
    }
  }
  ngOnDestroy(){
    super.ngOnDestroy();
  }
}

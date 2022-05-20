import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { BaocaocaModalComponent } from '../baocaoca-modal/baocaoca-modal.component';

@Component({
  selector: 'app-baocaoca',
  templateUrl: './baocaoca.component.html',
  styleUrls: ['./baocaoca.component.css']
})
export class BaocaocaComponent extends StoreBase implements OnInit {
  filter: any = {};
  listPhanXuong: any = [];
  listCaSanXuat:any=[];
  listCaSanXuatThucTe:any=[];
  item: any = {};
  constructor(public store: StoreService, public _services: SanXuatService, public toastr: ToastrService) {
    super(store)
  }

  ngOnInit(): void {
    this.filter.NgayChon = new Date();
    this.GetAllOptions();
  }
  ngAfterViewInit(): void {
  }
  GetAllOptions() {
    forkJoin([this._services.GetListdmPhanXuongOpt(),this._services.GetListOptdmCaSanXuat(),this._services.GetListOptdmCaSanXuatThucTe()])
    .subscribe((res: any[]) => {
      console.log(res);
      this.listPhanXuong = mapArrayForDropDown(res[0], "Ten", "Id");
      this.listCaSanXuat = mapArrayForDropDown(res[1],"Ten","Id");
      this.listCaSanXuatThucTe = mapArrayForDropDown(res[2],"Ten","Id");
      this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
      this.filter.IddmCaSanXuat = this.listCaSanXuat[0].value;
      this.filter.IddmCaSanXuatThucTe = this.listCaSanXuatThucTe[0].value;
      this.getBaoCaoCa()
    })
    
  }
  
  
  getBaoCaoCa() {
    this.filter.Ngay = DateToUnix(this.filter.NgayChon);
    this._services.BaoCaoCa().Get(this.filter).subscribe(res => {
      console.log(res)
      // this.item = res;
    })
  }
  setBaoCaoCa() {
    this._services.BaoCaoCa().Set(this.item).subscribe(res => {
      console.log(res);
      this.getBaoCaoCa();
    })
  }
}

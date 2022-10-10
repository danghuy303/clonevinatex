import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, DateToUnix, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-thongkedieukhong',
  templateUrl: './thongkedieukhong.component.html',
  styleUrls: ['./thongkedieukhong.component.css']
})
export class ThongkedieukhongComponent extends StoreBase implements OnInit {
  @ViewChild('voiPintable') voiPintable:PintableDirective;
  filter: any = {};
  listPhanXuong: any = [];
  listCaSanXuat: any = [];
  item: any = {
    itemCongDoan_BongChai: {},
    itemCongDoan_GhepTho: {},
    itemCongDoan_Ong: {},
    itemCongDoan_Con: {},
    itemCongDoan_ThayTho: {},
  };
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
    forkJoin([this._services.GetListdmPhanXuongOpt(), this._services.GetListOptdmCaSanXuat()])
      .subscribe((res: any[]) => {
        console.log(res);
        this.listPhanXuong = mapArrayForDropDown(res[0], "Ten", "Id");
        this.listCaSanXuat = mapArrayForDropDown(res[1], "Ten", "Id");
        this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
        this.filter.IddmCaSanXuat = this.listCaSanXuat[0].value;
        this.getDieuKhong()
      })

  }

  getDieuKhong() {
    this.filter.Ngay = DateToUnix(this.filter.NgayChon);
    this._services.ThongKeDieuKhong().Get(this.filter).subscribe((res: any) => {
      res.listdmHeThongDieuKhong.forEach(hethong => {
        hethong.colspan = res.listdmCapHutDieuKhong.filter(ele => ele.IddmHeThongDieuKhong === hethong.Id)?.length || 1;
      });
      this.item = res;
    })
  }
  setDieuKhong() {
    this._services.ThongKeDieuKhong().Set(this.item).subscribe((res: any) => {
      if (res.State === 1) {
        this.toastr.success(res.message)
        this.getDieuKhong();
      } else {
        this.toastr.error(res.message);
      }
    })
  }
  exportDieuKhong() {
    let data = {
      NgayChon: this.filter.NgayChon,
      IddmPhanXuong:this.filter.IddmPhanXuong || '',
      IddmCaSanXuat:this.filter.IddmCaSanXuat || '',
      Ngay: DateToUnix(this.filter.NgayChon),
    }
    this._services.ThongKeDieuKhong().Export(data).subscribe((res: any) => {
      if(validVariable(res.TenFile)){
        this._services.download(res.TenFile);
      }else{
        this.toastr.error(res.message);
      }
    });
  }
}

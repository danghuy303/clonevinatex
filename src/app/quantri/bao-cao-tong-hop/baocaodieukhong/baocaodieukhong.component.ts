import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, DateToUnix } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-baocaodieukhong',
  templateUrl: './baocaodieukhong.component.html',
  styleUrls: ['./baocaodieukhong.component.css']
})
export class BaocaodieukhongComponent extends StoreBase implements OnInit {
  @ViewChild('voiPintable') voiPintable:PintableDirective;
  filter: any = {};
  listPhanXuong: any = [];
  listCaSanXuat: any = [];
  item: any = {
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
    this._services.BaoCaoDieuKhong().Get(this.filter).subscribe((res: any) => {
      console.log(res);
      // res.listdmHeThongDieuKhong.forEach(hethong => {
      //   hethong.colspan = res.listdmCapHutDieuKhong.filter(ele => ele.IddmHeThongDieuKhong === hethong.Id)?.length || 1;
      // });
      this.item = res.listCaSanXuat;
    })
  }
  exportDieuKhong() {
    this._services.BaoCaoDieuKhong().Export(this.filter).subscribe((res:any)=>{
      this._services.download(res.TenFile)
    });
  }
  guiMail(){
    this._services.BaoCaoTongHop().GuiEmail_ThongKeDieuKhong(this.filter).subscribe((res:any)=>{
      if(res && res.State ===1){
        this.toastr.success(res.message);
      }else{
        this.toastr.error(res.message)
      }
    },(er)=>{
      this.toastr.warning(`Có lỗi xảy ra trong quá trình xử lý!`)
    })
  }
}

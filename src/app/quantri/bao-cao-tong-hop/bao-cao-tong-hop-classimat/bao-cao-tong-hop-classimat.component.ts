import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, DateToUnix } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';

@Component({
  selector: 'app-bao-cao-tong-hop-classimat',
  templateUrl: './bao-cao-tong-hop-classimat.component.html',
  styleUrls: ['./bao-cao-tong-hop-classimat.component.css']
})
export class BaoCaoTongHopClassimatComponent extends StoreBase implements OnInit {
  filter: any = {};
  listPhanXuong: any = [];
  item: any = {};
  constructor(public store: StoreService, public _services: SanXuatService, public toastr: ToastrService) {
    super(store)
  }

  ngOnInit(): void {
    let date = new Date();
    this.filter.NgayChon = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.getListPhanXuong();
  }

  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any[]) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", "Id");
      this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
      this.getBaoCao()
    })
  }
  getBaoCao() {
    this.filter.Ngay = DateToUnix(this.filter.NgayChon);
    this._services.QuyTrinhClassimat().GetThongKe(this.filter).subscribe((res: any) => {
      if (res.State === 0) {
        this.toastr.error(res.message);
        this.item = {};
      } else {
        res.lstSanPham.forEach(loaisoi => {
          loaisoi.lstChatLuongSanPham.forEach(chitieu=>{
            chitieu.chiSoChenhLech = Math.abs(chitieu.ChiTieuThucTe - chitieu.ChiTieuLyThuyet);
            chitieu.label = (chitieu.ChiTieuThucTe - chitieu.ChiTieuLyThuyet) < 0 ? 'Giảm':'Tăng';
            chitieu.color = (chitieu.ChiTieuThucTe - chitieu.ChiTieuLyThuyet) < 0 ? '#00b0ec':' red';
          })
        });
        this.item = res;
      }
    })
  }
}

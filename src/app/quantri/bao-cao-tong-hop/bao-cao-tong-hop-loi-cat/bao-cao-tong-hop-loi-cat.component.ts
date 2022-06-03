import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, DateToUnix } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';

@Component({
  selector: 'app-bao-cao-tong-hop-loi-cat',
  templateUrl: './bao-cao-tong-hop-loi-cat.component.html',
  styleUrls: ['./bao-cao-tong-hop-loi-cat.component.css']
})
export class BaoCaoTongHopLoiCatComponent extends StoreBase implements OnInit {
  filter: any = {};
  filterBieuDo: any = {};
  listPhanXuong: any = [];
  listMatHang: any = [];
  listChiTieu: any = [];
  item: any = {};
  dataBieuDo: any = {};
  optionLineChart:any= {
    scales: {
      xAxes: [{
        beginAtZero: true
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    },
    legend: {
      position: 'bottom'
    },
    maintainAspectRatio: window.innerWidth <= 768 ? false : true,
    aspectRatio: window.innerWidth <= 768 ? 1 : (((window.innerWidth - 80) / 2) / ((window.innerHeight-660) / 2))
  }
  constructor(public store: StoreService, public _services: SanXuatService, public toastr: ToastrService) {
    super(store)
  }

  ngOnInit(): void {
    let date = new Date();
    this.filter.NgayChon = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.filterBieuDo.NgayDauKy = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filterBieuDo.NgayCuoiKy = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.getListPhanXuong();
  }

  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any[]) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", "Id");
      this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
      this.getAllOptions()
    })
  }
  getAllOptions() {
    forkJoin([this._services.GetOptions().GetMatHang(), this._services.DanhMucLoiCat().GetList({ CurrentPage: 0 })]).subscribe((res: any) => {
      console.log(res);
      this.listMatHang = mapArrayForDropDown(res[0], 'Ten', 'Id')
      this.filterBieuDo.IddmItem = this.listMatHang[0].value;
      this.listChiTieu = mapArrayForDropDown(res[1], 'Ten', 'Id')
      this.filterBieuDo.IddmChiTieu = this.listChiTieu[0].value;
      this.getBieuDo();
    })
  }
  getAll() {
    this.getBaoCao();
    this.getBieuDo();
  }
  getBaoCao() {
    this.filter.Ngay = DateToUnix(this.filter.NgayChon);
    this._services.QuyTrinhLoiCat().GetThongKe(this.filter).subscribe((res: any) => {
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
  getBieuDo() {
    this.filterBieuDo.IddmPhanXuong = this.filter.IddmPhanXuong;
    this.filterBieuDo.NgayDauKyUnix = DateToUnix(this.filterBieuDo.NgayDauKy);
    this.filterBieuDo.NgayCuoiKyUnix = DateToUnix(this.filterBieuDo.NgayCuoiKy);
    this._services.QuyTrinhLoiCat().GetBieuDoDuongKiemTraChatLuongLoiCat(this.filterBieuDo).subscribe((res: any) => {
      console.log(res);
      let label = this.listChiTieu.filter(obj => obj.value === this.filterBieuDo.IddmChiTieu)[0].label;
      this.dataBieuDo = {
        labels: res.lstLabel.map(ele => ele),
        datasets: [
          {
            type: 'line',
            label: 'Thông số thực tế',
            borderColor: '#FF0000',
            fill: false,
            data: res.listThucTe,
          },
          {
            type: 'line',
            label: `Thông số ${label} lý thuyết`,
            borderColor: '#0000E5',
            fill: false,
            data: res.listLyThyet,
          },
        ]
      }
    })
  }
}

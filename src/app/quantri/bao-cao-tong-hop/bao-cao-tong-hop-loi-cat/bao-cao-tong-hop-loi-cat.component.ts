import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, DateToUnix, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { PintableDirective } from 'voi-lib/lib/pintable.directive';

@Component({
  selector: 'app-bao-cao-tong-hop-loi-cat',
  templateUrl: './bao-cao-tong-hop-loi-cat.component.html',
  styleUrls: ['./bao-cao-tong-hop-loi-cat.component.css']
})
export class BaoCaoTongHopLoiCatComponent extends StoreBase implements OnInit {
  @ViewChild('voiPintable') voiPintable: PintableDirective;
  filter: any = {};
  filterBieuDo: any = {};
  listPhanXuong: any = [];
  listMatHang: any = [];
  listChiTieu: any = [];
  item: any = {};
  itemClasimat: any = {};
  dataBieuDo: any = {};
  optionLineChart: any = {
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
    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    // aspectRatio: ((window.innerWidth - 80) / ((window.innerHeight - (300 + 32.5)) / 2))
    aspectRatio: ((window.innerWidth - 80) / ((window.innerHeight) / 1.5))
  }
  display: boolean = false;
  isClasimat: boolean = false;
  isLoiCat: boolean = false;
  listXuatBaoCao = [
    { label: 'Báo cáo tổng hợp lỗi cắt', command: () => { this.exportBaoCaoLoiCat() } },
    { label: 'Báo cáo tổng hợp clasimat', command: () => { this.exportBaoCaoClasimat() } }
  ];

  constructor(public store: StoreService, public _services: SanXuatService, public toastr: ToastrService) {
    super(store)
  }

  ngOnInit(): void {
    let date = new Date();
    this.filter.NgayChon = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.filterBieuDo.NgayDauKy = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filterBieuDo.NgayCuoiKy = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.getListPhanXuong();
    this.getListMatHang();
  }

  getListMatHang() {
    this._services.GetOptions().GetMatHang().subscribe((res: any) => {
      this.listMatHang = mapArrayForDropDown(res, "Ten", "Id");
      this.filter.IddmItem = this.listMatHang[0].value;
    })
  }

  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any[]) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", "Id");
      this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
      // this.getAllOptions()
    })
  }
  getAllOptions() {
    forkJoin([this._services.GetOptions().GetMatHang(), this._services.DanhMucLoiCat().GetList({ CurrentPage: 0 })]).subscribe((res: any) => {
      this.listMatHang = mapArrayForDropDown(res[0], 'Ten', 'Id')
      this.filterBieuDo.IddmItem = this.listMatHang[0].value;
      this.listChiTieu = mapArrayForDropDown(res[1], 'Ten', 'Id')
      this.filterBieuDo.IddmChiTieu = this.listChiTieu[0].value;
      if (this.isLoiCat) {
        this.getBieuDo();
      }
      else {
        this.getBieuDoClasimat();
      }
    })
  }

  getAll() {
    // this.getBaoCao();
    // this.getBieuDo();
    this.getBieuDo();
    this.getBieuDoClasimat();
  }
  getBaoCao() {
    // this.filter.Ngay = DateToUnix(this.filter.NgayChon);
    let data = {
      Ngay: DateToUnix(this.filter.NgayChon) || 0,
      IddmPhanXuong: this.filter.IddmPhanXuong || '',
      IddmItem: this.filter.IddmItem || ''
    }
    this._services.QuyTrinhLoiCat().GetThongKe(data).subscribe((res: any) => {
      if (res.State === 0) {
        this.toastr.error(res.message);
        this.item = {};
      } else {
        res.lstSanPham.forEach(loaisoi => {
          loaisoi.lstChatLuongSanPham.forEach(chitieu => {
            chitieu.chiSoChenhLech = Math.abs(chitieu.ChiTieuThucTe - chitieu.ChiTieuLyThuyet);
            chitieu.label = (chitieu.ChiTieuThucTe - chitieu.ChiTieuLyThuyet) < 0 ? 'Giảm' : 'Tăng';
            chitieu.color = (chitieu.ChiTieuThucTe - chitieu.ChiTieuLyThuyet) < 0 ? '#00b0ec' : ' red';
          })
        });
        this.item = res;
      }
    })
    this.getBaoCaoClasimat(data);
  }

  getBaoCaoClasimat(data: any) {
    this._services.QuyTrinhLoiCat().GetThongKeClasimat(data).subscribe((res: any) => {
      if (res.State === 0) {
        this.toastr.error(res.message);
        this.itemClasimat = {};
      } else {
        res.lstSanPham.forEach(loaisoi => {
          loaisoi.lstChatLuongSanPham.forEach(chitieu => {
            chitieu.chiSoChenhLech = Math.abs(chitieu.ChiTieuThucTe - chitieu.ChiTieuLyThuyet);
            chitieu.label = (chitieu.ChiTieuThucTe - chitieu.ChiTieuLyThuyet) < 0 ? 'Giảm' : 'Tăng';
            chitieu.color = (chitieu.ChiTieuThucTe - chitieu.ChiTieuLyThuyet) < 0 ? '#00b0ec' : ' red';
          })
        });
        this.itemClasimat = res;
      }
    })
  }

  getBieuDo() {
    this.filterBieuDo.IddmPhanXuong = this.filter.IddmPhanXuong;
    this.filterBieuDo.NgayDauKyUnix = DateToUnix(this.filterBieuDo.NgayDauKy);
    this.filterBieuDo.NgayCuoiKyUnix = DateToUnix(this.filterBieuDo.NgayCuoiKy);
    this._services.QuyTrinhLoiCat().GetBieuDoDuongKiemTraChatLuongLoiCat(this.filterBieuDo).subscribe((res: any) => {
      let label = this.listChiTieu.filter(obj => obj.value === this.filterBieuDo.IddmChiTieu)[0]?.label;
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
  exportBaoCaoCa() {
    this.filter.Ngay = DateToUnix(this.filter.NgayChon);
    this._services.QuyTrinhLoiCat().XuatBaoCao(this.filter).subscribe((res: any) => {
      if (validVariable(res.TenFile)) {
        this._services.download(res.TenFile);
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  exportBaoCaoLoiCat() {
    let data = {
      IddmPhanXuong: this.filter.IddmPhanXuong || '',
      Ngay: DateToUnix(this.filter.NgayChon) || 0
    }
    this._services.QuyTrinhLoiCat().XuatThongKeKiemTraChatLuongLoiCatThang(data).subscribe((res: any) => {
      if (validVariable(res.TenFile)) {
        this._services.download(res.TenFile);
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  exportBaoCaoClasimat() {
    let data = {
      IddmPhanXuong: this.filter.IddmPhanXuong || '',
      Ngay: DateToUnix(this.filter.NgayChon) || 0
    }
    this._services.QuyTrinhLoiCat().XuatThongKeKiemTraChatLuongClasimatThang(data).subscribe((res: any) => {
      if (validVariable(res.TenFile)) {
        this._services.download(res.TenFile);
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  mapLoiCat() {
    this.listChiTieu = [];
    this.display = true;
    this.isLoiCat = true;
    this._services.DanhMucLoiCat().GetList({ CurrentPage: 0 }).subscribe((res: any) => {
      this.listChiTieu = mapArrayForDropDown(res, 'Ten', 'Id')
      this.filterBieuDo.IddmChiTieu = this.listChiTieu[0].value;
    })
    this.getBieuDo();
  }

  mapClasimat() {
    this.listChiTieu = [];
    this.display = true;
    this.isLoiCat = false;
    this._services.DanhMucClassimat().GetList({ CurrentPage: 0 }).subscribe((res: any) => {
      this.listChiTieu = mapArrayForDropDown(res, 'Ten', 'Id')
      this.filterBieuDo.IddmChiTieu = this.listChiTieu[0].value;
    })
    this.getBieuDoClasimat();
  }

  getBieuDoClasimat() {
    this.filterBieuDo.IddmPhanXuong = this.filter.IddmPhanXuong;
    this.filterBieuDo.NgayDauKyUnix = DateToUnix(this.filterBieuDo.NgayDauKy);
    this.filterBieuDo.NgayCuoiKyUnix = DateToUnix(this.filterBieuDo.NgayCuoiKy);
    this._services.QuyTrinhClassimat().GetBieuDoDuongKiemTraChatLuongClasimat(this.filterBieuDo).subscribe((res: any) => {
      let label = this.listChiTieu.filter(obj => obj.value === this.filterBieuDo.IddmChiTieu)[0]?.label;
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

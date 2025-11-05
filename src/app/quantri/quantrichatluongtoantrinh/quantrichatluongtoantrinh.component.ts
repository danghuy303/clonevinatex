import { Component, OnInit } from '@angular/core';
import { DateToUnix, mapArrayForDropDown } from '../../services/globalfunction';
import { forkJoin } from 'rxjs';
import { SanXuatService } from '../../services/callApiSanXuat';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quantrichatluongtoantrinh',
  templateUrl: './quantrichatluongtoantrinh.component.html',
  styleUrls: ['./quantrichatluongtoantrinh.component.css']
})
export class QuantrichatluongtoantrinhComponent implements OnInit {

  filter: any = {};
  listPhanXuong: any = [];
  dataBang: any = {};
  listThoiGian: any = [
    { label: 'Ngày', value: 'Ngay' }, { label: 'Tuần', value: 'Tuan' }, { label: 'Tháng', value: 'Thang' },
  ];

  constructor(
    public _services: SanXuatService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllOptions();
  }

  getAllOptions() {
    forkJoin([
      this._services.GetListdmPhanXuongOpt(),
    ]).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res[0], "Ten", "Id");

      this.filter.IddmPhanXuong = this.listPhanXuong[0]?.value;
      this.filter.ThoiGian = this.listThoiGian[0]?.value;
      this.filter.Ngay = new Date();
      if (this.filter.ThoiGian && this.filter.Ngay) {
        this.getData();
      }
    })
  }

  getData() {
    this._services.GetChatLuongDayChuyen_Dashboard(this.filter.ThoiGian, DateToUnix(this.filter.Ngay), this.filter.IddmPhanXuong).subscribe((res: any) => {
      if (res.Data) {
        this.dataBang = res.Data;
      }
    })
  }

  exportExcel() {
    this._services.ExportChatLuongToanChuyen(this.filter.ThoiGian, DateToUnix(this.filter.Ngay), this.filter.IddmPhanXuong).subscribe((res: any) => {
      if (res.Data) {
        this._services.download(res.Data);
      }
    })
  }

}

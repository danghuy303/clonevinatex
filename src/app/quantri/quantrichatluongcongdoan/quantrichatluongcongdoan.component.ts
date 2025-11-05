import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SanXuatService } from '../../services/callApiSanXuat';
import { mapArrayForDropDown, DateToUnix } from '../../services/globalfunction';
import { API } from '../../services/host';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quantrichatluongcongdoan',
  templateUrl: './quantrichatluongcongdoan.component.html',
  styleUrls: ['./quantrichatluongcongdoan.component.css']
})
export class QuantrichatluongcongdoanComponent implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  filter: any = {};
  listMatHang: any = [];
  listPhanXuong: any = [];
  listCongDoan: any = [];
  listView: any = [];
  listTieuChi: any = [];
  listData: any = [];
  listMay: any = [];
  listThoiGian: any = [
    { label: 'Ngày', value: 'Ngay' }, { label: 'Tuần', value: 'Tuan' }, { label: 'Tháng', value: 'Thang' },
  ];
  dataBang: any = {};
  dataBieuDo: any = {};
  optionBieuDo: any = {
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
    aspectRatio: window.innerWidth <= 768 ? 1 : (((window.innerWidth - 80) / 2) / ((window.innerHeight - (225 + 32.5)) / 2))
  };

  constructor(
    public _services: SanXuatService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllOptions();
  }

  getData() {
    this._services.GetQuanTriChatLuongSoi_Bang(this.filter.ThoiGian, DateToUnix(this.filter.Ngay), this.filter.CongDoan, this.filter.IddmPhanXuong).subscribe((res: any) => {
      if (res.Data) {
        this.dataBang = res?.Data;
        // biểu đồ
        this.listTieuChi = mapArrayForDropDown(res?.Data?.listTieuChi, 'TendmTieuChiChatLuong', 'IddmTieuChiChatLuong');
        this.listMay = mapArrayForDropDown(res?.Data?.listMay, 'TendmMay', 'IddmMay');
        this.dataBieuDo = {};
        this.filter.IddmTieuChi = '';
        this.filter.IddmMay = '';
      }
    })
  }

  scrollToLeft() {
    const el = this.scrollContainer.nativeElement.querySelector('.pintable-scroll');
    if (el) el.scrollLeft = 0;
  }

  getAllOptions() {
    forkJoin([
      this._services.GetOptions().GetMatHang(),
      this._services.GetListCongDoan(),
      this._services.GetListdmPhanXuongOpt(),
    ]).subscribe((res: any) => {
      this.listMatHang = mapArrayForDropDown(res[0], 'Ten', 'Id');
      this.listCongDoan = mapArrayForDropDown(res[1], 'Ten', 'Ma');
      this.listPhanXuong = mapArrayForDropDown(res[2], "Ten", "Id");

      this.filter.IddmPhanXuong = this.listPhanXuong[0]?.value;
      this.filter.ThoiGian = this.listThoiGian[0]?.value;
      this.filter.Ngay = new Date();
      this.filter.CongDoan = this.listCongDoan[0]?.value;
      if (this.filter.ThoiGian && this.filter.Ngay && this.filter.CongDoan) {
        this.getData();
      }
    })
  }

  chonCongDoan() {

  }

  getDataBieuDo() {
    this._services.GetQuanTriChatLuongSoi_BieuDo(this.filter.IddmTieuChi, this.filter.IddmMay, this.filter.ThoiGian, DateToUnix(this.filter.Ngay), this.filter.CongDoan, this.filter.IddmPhanXuong).subscribe((res: any) => {
      this.dataBieuDo = {
        labels: res.lstLabel.map((ele: any) => ele),
        datasets: [
          {
            type: 'line',
            label: 'Tiêu chuẩn',
            borderColor: '#FF0000',
            fill: false,
            data: res.listThucTe,
          },
          {
            type: 'line',
            label: 'Thực tế',
            borderColor: '#49b4f1ff',
            fill: false,
            data: res.listLyThyet,
          },
        ]
      }
      console.log('this.dataBieuDo', this.dataBieuDo);

    })
  }


}
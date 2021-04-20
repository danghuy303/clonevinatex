import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dieuhanhsanxuat',
  templateUrl: './dieuhanhsanxuat.component.html',
  styleUrls: ['./dieuhanhsanxuat.component.css']
})
export class DieuhanhsanxuatComponent implements OnInit {
  filterBong: any = {};
  filter: any = {
    IddmLoaiBong: "",
    IddmKho: '',
    LoaiThoiGian: 0
  };
  filterSanLuong: any = {};
  filterNhuCau: any = {
    IddmLoaiBong: "",
    IddmKho: '',
    LoaiThoiGian: 0
  };
  Tong: any = null;
  monthlyConfig: any = {};
  dataSet1: any = {};
  dataSet2: any = {};
  listOpts: any = [];
  listKho: any = [];
  listKhoCanDoiTon: any = [];
  listLoaiBongCanDoiTon: any = [];
  listMatHang: any = [];
  listCongDoan: any = [];
  listMay: any = [];
  listLoaiBong: any = [];
  listCaLamViec: any = [];
  dataPie: any = {};
  GiaTrungBinhCoCauBong: any = [];
  option1: any = {
    scales: {
      xAxes: [{
        beginAtZero: true
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Khối lượng ( Tấn)'
        },
        ticks: {
          beginAtZero: true,
          callback: function (label, index, labels) {
            return formatNumber(label, 'vi-VN', '0.0-0');
          }
        }
      }],
    },
    legend: {
      position: 'bottom'
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return `${formatNumber(tooltipItem.yLabel, 'vi-VN')} tấn`
        }
      }
    },
    maintainAspectRatio: window.innerWidth <= 768 ? false : true,
    aspectRatio: window.innerWidth <= 768 ? 1 : (((window.innerWidth - 80) * 2 / 3) / ((window.innerHeight - (225 + 32.5)) / 2))
  };
  option2: any = {
    plugins: {
      labels: {
        fontSize: 0
      }
    },
    legend: {
      position: 'bottom'
    },
    scales: {
      xAxes: [{
        categoryPercentage: 0.5,
        barPercentage: 1.0
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (label, index, labels) {
            return formatNumber(label, 'vi-VN', '0.0-0');
          }
        }
      }],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return `${formatNumber(tooltipItem.yLabel, 'vi-VN')}`
        }
      }
    },
    maintainAspectRatio: window.innerWidth <= 768 ? false : true,
    aspectRatio: window.innerWidth <= 768 ? null : ((window.innerWidth - 80) / ((window.innerHeight - (225 + 32.5)) / 2))
  };
  optionPie: any = {
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: '#fff',
        fontStyle: 'bold',
      }
    },
    legend: {
      position: 'left'
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log(data);
          return `${formatNumber(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index], 'vi-VN')}kg - ${formatNumber(data.datasets[tooltipItem.datasetIndex].GiaTrungBinh[tooltipItem.index], 'vi-VN', '0.0-2')} USD`
        }
      }
    },
    maintainAspectRatio: window.innerWidth <= 768 ? false : true,
    aspectRatio: window.innerWidth <= 768 ? null : (((window.innerWidth - 80) / 3) / ((window.innerHeight - (225 + 32.5)) / 2))
  }
  listItem: any = [];
  constructor(private _services: SanXuatService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.optionPie.maintainAspectRatio);
    let date = new Date();
    this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.filterNhuCau._tuNgayCanDoiTon = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filterNhuCau._denNgayCanDoiTon = date;

    this.dataPie = {
      labels: ['Bông Mỹ', 'Bông Brazil', 'Bông Tây Phi', 'Bông Hồi'],
      datasets: [
        {
          data: [300, 50, 100, 200],
          backgroundColor: [
            "#009900",
            "#36A2EB",
            "#FFCE56",
            "#FF671F"
          ],
          hoverBackgroundColor: [
            "#009900",
            "#36A2EB",
            "#FFCE56",
            "#FF671F"
          ]
        }
      ]
    };
    this.listItem = [

    ]
    this.getAllOptions();
    // this.ChangeOptBieuDo();
    // this.ChangeOptCanDoiTon();
  }

  ChangeOptBieuDo() {
    if (validVariable(this.filter._tuNgay)) {
      this.filter.TuNgay = DateToUnix(this.filter._tuNgay);
    } else {
      this.filter.TuNgay = null;
    }
    if (validVariable(this.filter._denNgay)) {
      this.filter.DenNgay = DateToUnix(this.filter._denNgay);
    } else {
      this.filter.DenNgay = null;
    }
    if (this.filter.DenNgay < this.filter.TuNgay) {
      this._toastr.error('Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu');
      setTimeout(() => {
        this.filter._denNgay = this.filter._tuNgay;
        this.ChangeOptBieuDo()
      }, 200)
    } else {
      if (validVariable(this.filter.TuNgay) && validVariable(this.filter.DenNgay) && this.filter.TuNgay <= this.filter.DenNgay) {
        this._services.DashBoard().NhuCauSuDungBong(this.filter).subscribe((res: any) => {
          this.dataSet1 = {
            labels: res.listThoiGian,
            datasets: [
              {
                type: 'line',
                label: 'Kế hoạch',
                borderColor: '#0000E5',
                borderDash: [10, 5],
                fill: false,
                data: res.listKeHoach.map(ele => ele.KhoiLuong),
                steppedLine: 'before'
              },
              {
                type: 'line',
                label: 'Nhu cầu',
                borderColor: '#FF0000',
                fill: false,
                data: res.listNhuCau.map(ele => ele.KhoiLuong),
              },
            ]
          }
        })
        this._services.DashBoard().CoCauTonBong(this.filter).subscribe((res: any) => {
          this.GiaTrungBinhCoCauBong = res.map(ele => ele.DonGia);
          console.log(this.GiaTrungBinhCoCauBong);
          this.dataPie = {
            labels: res.map(ele => ele.Ten),
            datasets: [
              {
                data: res.map(ele => ele.TrongLuong),
                GiaTrungBinh: res.map(ele => ele.DonGia),
                backgroundColor: [
                  "#009900",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF671F",
                  '#ab8169',
                  '#6a942f',
                  '#46018f',
                  '#d70ca1'
                ]
              }
            ]
          };
        })
      }
    }
  }

  ChangeOptCanDoiTon() {
    let TuNgay = 0;
    let DenNgay = 0;
    if (validVariable(this.filterNhuCau._tuNgayCanDoiTon)) {
      TuNgay = DateToUnix(this.filterNhuCau._tuNgayCanDoiTon);
    } else {
      TuNgay = null;
    }
    if (validVariable(this.filterNhuCau._denNgayCanDoiTon)) {
      DenNgay = DateToUnix(this.filterNhuCau._denNgayCanDoiTon);
    } else {
      DenNgay = null;
    }
    if (DenNgay < TuNgay) {
      this._toastr.error('Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu');
      setTimeout(() => {
        this.filterNhuCau._denNgayCanDoiTon = this.filterNhuCau._tuNgayCanDoiTon;
        this.ChangeOptCanDoiTon()
      }, 200)
    } else {
      if (validVariable(TuNgay) && validVariable(DenNgay) && TuNgay <= DenNgay) {
        let data = deepCopy(this.filterNhuCau);
        data.TuNgay = TuNgay;
        data.DenNgay = DenNgay;
        this._services.DashBoard().CanDoiTon(data).subscribe((res: Array<any>) => {
          this.Tong = res.splice(0, 1);
          this.listItem = res;
        })
      }
    }
  }
  resetFilter() {

  }

  getAllOptions() {
    let data = {
      CurrentPage: 0,
      NumperPage: 10,
      Ma: '',
      Ten: "",
      sFilter: ''
    }
    setTimeout(() => {
      this._services.GetOptions().GetdmKhoTheoDuAn_NhuCauSuDungBong_DashBoard().subscribe((res: any) => {
        console.log(res);
        res.unshift({ Id: '', Ten: 'Tất cả kho' });
        this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
        this.getMatHangNhuCau(this.filter.IddmKho);
      });
    }, 1000)
    setTimeout(() => {
      this._services.GetOptions().GetdmKhoTheoDuAn_CoCauTonBong_DashBoard().subscribe((res: any) => {
        console.log(res);
        res.unshift({ Id: '', Ten: 'Tất cả kho' });
        this.listKhoCanDoiTon = mapArrayForDropDown(res, 'Ten', 'Id');
        this.getMatHangCanDoiTon(this.filterNhuCau.IddmKho);
      });
    }, 1000)
  }
  getMatHangNhuCau(IddmKho) {
    this._services.GetOptions().GetListdmLoaiBong_NhuCauSuDungBong_DashBoard(IddmKho).subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tất cả bông' });
      this.listLoaiBong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmLoaiBong = '';
      this.ChangeOptBieuDo()
    })
  }
  getMatHangCanDoiTon(IddmKho) {
    this._services.GetOptions().GetListdmLoaiBong_CoCauTonBong_DashBoard(IddmKho).subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tất cả nguyên liệu' });
      this.listLoaiBongCanDoiTon = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filterNhuCau.IddmLoaiBong = '';
      this.ChangeOptCanDoiTon()
    })
  }
  XuatBaoCaoCanDoiTon() {
    let data = {
      TuNgayUnix: DateToUnix(this.filterNhuCau._tuNgayCanDoiTon)
    }
    this._services.BaoCao().ExportBaoCaoCanDoiSuDungBong(data).subscribe((res: any) => {
      if (res) {
        if (validVariable(res.State) && !validVariable(res.TenFile)) {
          this._toastr.error(res.message);
        } else {
          this._services.download(res.TenFile);
        }
      }
    })
  }
}

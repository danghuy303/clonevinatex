import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-bao-cao-nhu-cau',
  templateUrl: './bao-cao-nhu-cau.component.html',
  styleUrls: ['./bao-cao-nhu-cau.component.css']
})
export class BaoCaoNhuCauComponent implements OnInit {

  listNam: any = [];
  listLoaiDinhMuc: any = [
    { label: "Xơ", value: "Xo" },
    { label: "Vật tư phụ", value: "VatTuPhu" },
    { label: "Điện", value: "Dien" },
    { label: "Bông", value: "Bong" },
  ]
  ListBaoCao: any = [];
  filter: any = {};
  data: any;
  chartOptions: any;
  ListLabelThang: any = [];
  donVi: any = "";

  constructor(
    private _danhMucHopDong: DanhMucHopDongService,
  ) { }

  ngOnInit(): void {
    this.filter.Nam = new Date().getFullYear();
    for (let i = new Date().getFullYear() - 20; i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    this.LoadData();
    // for (let i = 1; i <= 12; i++) {
    //   this.ListLabelThang.push(`Tháng ${i} (tấn)`);
    // }
    this.chartOptions = {
      tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
          label: function (tooltipItems, data) {
            return formatNumber(Number(tooltipItems.yLabel), 'en-GB', '0.0') + " " + "Tấn";
          }
        }
      },
      plugins: {
        labels: {
          render: () => { },
        },
        legend: {
          labels: {
            color: '#495057',
            position: 'bottom'
          }
        }
      },
      legend: {
        display: true,
        position: "bottom",
      },
      scales: {
        xAxes: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        yAxes: [{
          ticks: {
            color: '#495057',
            // color: "#495057",
            // min: 0,
            beginAtZero: true,
            callback: function (value, index, values) {
              return formatNumber(value, 'en-US', '0.0-5');
            },
            grid: {
              color: '#ebedef'
            }
          }
        }],
      },
      maintainAspectRatio: window.innerWidth <= 375 ? false : true,
      // aspectRatio: ((window.innerWidth - 80) / ((window.innerHeight - (225 + 32.5)) / 2))
      aspectRatio: (window.innerWidth - 42) / ((window.innerHeight * 50) / 100 - 28)
      // aspectRatio: (this.chart.nativeElement.clientWidth)/(this.chart.nativeElement.clientHeight)
    };
  }

  LoadData() {
    let data = {
      ...this.filter
    }
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh()
      .GetBaoCaoDinhMuc(data)
      .subscribe((res: any) => {
        // console.log("res", res);
        this.data = {
          labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
          datasets: [{
            type: 'line',
            label: 'Lũy kế thực tế',
            borderColor: '#ed5b45',
            borderWidth: 2,
            fill: false,
            data: res.Data.BieuDoLuyKe.map(ele => ele.LuyKeThucTe),
          },
          {
            type: 'line',
            label: 'lũy kế kế hoạch',
            borderColor: '#324b7d',
            borderWidth: 2,
            fill: false,
            data: res.Data.BieuDoLuyKe.map(ele => ele.LuyKeKeHoach),
          }, {
            type: 'bar',
            label: 'Thực tế',
            backgroundColor: '#c97373',
            data: res.Data.BieuDoLuyKe.map(ele => ele.ThucTe),
            borderColor: 'white',
            borderWidth: 2
          }, {
            type: 'bar',
            label: 'Kế hoạch',
            backgroundColor: '#5f7fba',
            data: res.Data.BieuDoLuyKe.map(ele => ele.KeHoach),
          }]
        };
        this.ListBaoCao = res.Data.BieuDoBang;
        this.ListLabelThang = res.Data.listLabel;
        this.donVi = res.Data.DonVi;
      })
  }

}

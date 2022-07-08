import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-bao-cao-nhu-cau-su-dung-bong',
  templateUrl: './bao-cao-nhu-cau-su-dung-bong.component.html',
  styleUrls: ['./bao-cao-nhu-cau-su-dung-bong.component.css']
})
export class BaoCaoNhuCauSuDungBongComponent implements OnInit {

  listNam: any = [];
  ListBaoCao: any = [];
  filter: any = {};
  data: any;
  chartOptions: any;
  ListLabelThang: any = [];

  constructor(
    private _danhMucHopDong: DanhMucHopDongService,
  ) { }

  ngOnInit(): void {
    this.filter.Nam = new Date().getFullYear();
    for (let i = new Date().getFullYear() - 20; i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    this.LoadData();
    for (let i = 1; i <= 12; i++) {
      this.ListLabelThang.push(`Tháng ${i} (tấn)`);
    }    
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
              return formatNumber(value,'en-US','0.0-0');
            },
            grid: {
              color: '#ebedef'
            }
          }
        }],
      }
    };
  }

  LoadData() {
    let data = {
      Nam: this.filter.Nam,
      IdSanPham: "",
    }
    this._danhMucHopDong.DanhSachKeHoachKinhDoanh()
      .GetBaoCaoNhuCauSuDungBong(data)
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
    })
  }

}

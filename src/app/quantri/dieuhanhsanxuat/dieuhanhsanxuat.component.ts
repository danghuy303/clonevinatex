import { Component, OnInit } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { TinhtrangtaisanComponent } from '../danhmuc/tinhtrangtaisan/tinhtrangtaisan.component';

@Component({
  selector: 'app-dieuhanhsanxuat',
  templateUrl: './dieuhanhsanxuat.component.html',
  styleUrls: ['./dieuhanhsanxuat.component.css']
})
export class DieuhanhsanxuatComponent implements OnInit {
  filterBong: any = {};
  filterSanLuong: any = {};
  filterNhuCau: any = {};
  monthlyConfig: any = {};
  dataSet1: any = {};
  listOpts: any = [];
  listKho: any = [];
  listMatHang: any = [];
  listCongDoan: any = [];
  listMay: any = [];
  listLoaiBong: any = [];
  listCaLamViec: any = [];
  dataPie: any = {};
  option1: any = {
    scales: {
      xAxes: [{
        beginAtZero: true
        // type: 'category',
        // labels: ['January', 'February', 'March', 'April', 'May', 'June']
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
    aspectRatio: (((window.innerWidth - 80) * 2 / 3) / ((window.innerHeight - (225 + 32.5)) / 2))
  };
  option2: any = {
    plugins: {
      labels: {
        fontSize:0
      }
    },
    legend: {
      position: 'bottom'
    },
    scales: {
      xAxes: [{
        categoryPercentage: 0.5,
        barPercentage: 1.0
        // type: 'category',
        // labels: ['January', 'February', 'March', 'April', 'May', 'June']
      }]
    },

    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    aspectRatio: ((window.innerWidth - 80) / ((window.innerHeight - (225 + 32.5)) / 2))
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
    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    aspectRatio: (((window.innerWidth - 80) / 3) / ((window.innerHeight - (225 + 32.5)) / 2))
  }
  constructor(private _services: SanXuatService) { }

  ngOnInit(): void {
    this.dataSet1 = {
      labels: ['Tuần 1 / Thg 12', 'Tuần 2 / Thg 12', 'Tuần 3 / Thg 12', 'Tuần 4 / Thg 12', 'Tuần 5 / Thg 12'],
      datasets: [
        {
          type: 'line',
          label: 'Nhu cầu',
          borderColor: '#FF0000',
          // borderWidth: 2,
          fill: false,
          data: [20, 100, 120, 130, 135],
          // steppedLine: 'before'
        },
        {
          type: 'line',
          label: 'Kế hoạch',
          borderColor: '#0000E5',
          borderDash: [10, 5],
          // borderWidth: 2,
          fill: false,
          data: [120, 140, 150, 170, 175],
          steppedLine: 'before'
        },
      ]
    }
    this.monthlyConfig = {
      labels: Array.from({ length: 30 }, (alo, index) => index + 1),
      datasets: [
        {
          type: 'line',
          label: 'Thực tế',
          borderColor: '#FF671F',
          // borderWidth: 2,
          fill: false,
          data: Array.from({ length: 30 }, (v, i) => i * 20)
        },
        {
          type: 'line',
          label: 'Kế hoạch',
          borderColor: '#009900',
          // borderWidth: 2,
          fill: false,
          data: Array.from({ length: 30 }, (v, i) => (i * 20) + 10)
        },
        {
          type: 'bar',
          label: 'Sản lượng',
          backgroundColor: '#3c5cbb',
          data: Array.from({ length: 30 }, () => 20),
          borderColor: 'white',
          // borderWidth: 2
        },
      ]
    }
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
    this.getAllOptions()
  }

  GetBieuDoBong() {

  }

  resetFilter() {

  }
  changeKho(event) {
    console.log(event.value)
    if (event.value === '8cb622a8-b2c5-4232-a9f1-7fdebb40e3cb') {
      this.dataPie = {
        labels: ['Ne 16 CD', 'Ne 20 CD', 'Ne 32 CD', 'Ne 31 CD'],
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
          }]
      };
    } else {
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
          }]
      };
    }
  }
  getAllOptions() {
    let data = {
      CurrentPage: 0,
      NumperPage: 10,
      Ma: '',
      Ten: "",
      sFilter: ''
    }
    this._services.GetOptions().GetMatHang().subscribe((res: any) => {
      this.listMatHang = mapArrayForDropDown(res, 'Ten', 'Id')
    });
    this._services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id')
    });
    this._services.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, "Ten", 'Ma')
    });
    this._services.GetListdmMay(data).subscribe((res: any) => {
      this.listMay = mapArrayForDropDown(res, "Ma", 'Id')
    });
    this._services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listCaLamViec = mapArrayForDropDown(res, "Ten", 'Id')
    });
    this._services.GetListdmLoaiBong(data).subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tổng hợp' });
      this.listLoaiBong = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }

  changeOpt(e) {
    if (e.checked) {
      this.monthlyConfig = {
        labels: Array.from({ length: 30 }, (alo, index) => index + 1),
        datasets: [
          // {
          //   type: 'line',
          //   label: 'Lũy kế',
          //   borderColor: '#FF671F',
          //   borderWidth: 2,
          //   fill: false,
          //   data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100))
          // },
          {
            type: 'bar',
            label: 'Sản lượng thực tế',
            backgroundColor: '#3c5cbb',
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
            borderColor: 'white',
            // borderWidth: 2
          },
          {
            type: 'bar',
            label: 'Sản lượng tiêu chuẩn',
            backgroundColor: '#009900',
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
            borderColor: 'white',
            // borderWidth: 2
          },
        ]
      }
    } else {
      this.monthlyConfig = {
        labels: Array.from({ length: 30 }, (alo, index) => index + 1),
        datasets: [
          {
            type: 'line',
            label: 'Thực tế',
            borderColor: '#FF671F',
            borderWidth: 2,
            fill: false,
            data: Array.from({ length: 30 }, (v, i) => i * 20)
          },
          {
            type: 'line',
            label: 'Kế hoạch',
            borderColor: '#009900',
            borderWidth: 2,
            fill: false,
            data: Array.from({ length: 30 }, (v, i) => (i * 20) + 10)
          },
          {
            type: 'bar',
            label: 'Sản lượng',
            backgroundColor: '#3c5cbb',
            data: Array.from({ length: 30 }, () => 20),
            borderColor: 'white',
            borderWidth: 2
          },
        ]
      }
    }
  }
}

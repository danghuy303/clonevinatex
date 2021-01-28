import { Component, OnInit } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dieuhanhsanxuat',
  templateUrl: './dieuhanhsanxuat.component.html',
  styleUrls: ['./dieuhanhsanxuat.component.css']
})
export class DieuhanhsanxuatComponent implements OnInit {
  filterBong: any = {};
  filter: any = {
    IddmLoaiBong:"",
    IddmKho:'',
    LoaiThoiGian:1
  };
  filterSanLuong: any = {};
  filterNhuCau: any = {};
  monthlyConfig: any = {};
  dataSet1: any = {};
  dataSet2: any = {};
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
  listItem: any = [];
  constructor(private _services: SanXuatService) { }

  ngOnInit(): void {
    let date = new Date();
    this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.filter._tuNgayCanDoiTon = date;
    this.filter._denNgayCanDoiTon = date;
    
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
    this.ChangeOpt();
  }

  ChangeOpt() {
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
    if (validVariable(this.filter.TuNgay) && validVariable(this.filter.DenNgay) && this.filter.TuNgay < this.filter.DenNgay) {
      this._services.DashBoard().NhuCauSuDungBong(this.filter).subscribe((res:any)=>{
        this.dataSet1 = {
          labels: res.listThoiGian,
          datasets: [
            {
              type: 'line',
              label: 'Nhu cầu',
              borderColor: '#FF0000',
              fill: false,
              data: res.listNhuCau.map(ele=>ele.KhoiLuong),
            },
            {
              type: 'line',
              label: 'Kế hoạch',
              borderColor: '#0000E5',
              borderDash: [10, 5],
              fill: false,
              data: res.listKeHoach.map(ele=>ele.KhoiLuong),
              steppedLine: 'before'
            },
          ]
        }
      })
      this._services.DashBoard().CoCauTonBong(this.filter).subscribe((res:any)=>{
        this.dataPie = {
          labels: res.map(ele=>ele.Ten),
          datasets: [
            {
              data: res.map(ele=>ele.TrongLuong),
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
      this._services.DashBoard().CanDoiTon(this.filter).subscribe(res=>{
        this.listItem = res;
      })
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
    this._services.GetListdmKho(data).subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tất cả' });
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id')
    });
    this._services.GetListdmLoaiBong(data).subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tổng hợp' });
      this.listLoaiBong = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }
}

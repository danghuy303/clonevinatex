import { Component, OnInit } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nhucauxuathang',
  templateUrl: './nhucauxuathang.component.html',
  styleUrls: ['./nhucauxuathang.component.css']
})
export class NhucauxuathangComponent implements OnInit {

  filterBong: any = {};
  filter: any = {
    IddmLoaiBong: "",
    IddmKho: '',
    LoaiThoiGian: 1
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
  IdDuAn: any;
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
  constructor(private _services: SanXuatService, private store: StoreService) {
    this.IdDuAn = this.store.getCurrent();
  }

  ngOnInit(): void {
    let date = new Date();
    this.filter._tuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter._denNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // this.dataPie = {
    //   labels: ['Bông Mỹ', 'Bông Brazil', 'Bông Tây Phi', 'Bông Hồi'],
    //   datasets: [
    //     {
    //       data: [300, 50, 100, 200],
    //       backgroundColor: [
    //         "#009900",
    //         "#36A2EB",
    //         "#FFCE56",
    //         "#FF671F"
    //       ],
    //       hoverBackgroundColor: [
    //         "#009900",
    //         "#36A2EB",
    //         "#FFCE56",
    //         "#FF671F"
    //       ]
    //     }
    //   ]
    // };
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
      this._services.DashBoard().NhuCauSuDungBong(this.filter).subscribe((res: any) => {
        this.dataSet1 = {
          labels: res.listThoiGian,
          datasets: [
            {
              type: 'line',
              label: 'Nhu cầu',
              borderColor: '#FF0000',
              fill: false,
              data: res.listNhuCau.map(ele => ele.KhoiLuong),
            },
            {
              type: 'line',
              label: 'Kế hoạch',
              borderColor: '#0000E5',
              borderDash: [10, 5],
              fill: false,
              data: res.listKeHoach.map(ele => ele.KhoiLuong),
              steppedLine: 'before'
            },
          ]
        }
      })
      this.BieuDoCoCau();
      this._services.DashBoard().CanDoiTon(this.filter).subscribe(res => {
        this.listItem = res;
      })
    }
  }

  BieuDoCoCau() {
    let data: any = { IdDuAn: this.IdDuAn, IddmPhanXuong: "", nNam: 0 };
    this._services.BaoCao().BieuDoCoCau(data).subscribe((res: any) => {
      this.dataPie = res;
    });
  }

  resetFilter() {

  }

  getAllOptions() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: "",
      IddmNhomKho: 11,
      Ma: "",
      Ten: ""
    };
    this._services.GetListdmKho(data).subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tổng hợp' });
      this.listKho = res.paging;
    })
    this._services.GetOptions().GetMatHang().subscribe((res: any) => {
      res.unshift({ Id: '', Ten: 'Tổng hợp' });
      this.listMatHang = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }

}

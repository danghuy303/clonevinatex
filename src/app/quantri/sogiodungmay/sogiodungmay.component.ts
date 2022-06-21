import { formatNumber } from '@angular/common';
import { map } from 'rxjs/operators';
import { Component, OnInit } from "@angular/core";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DateToUnix } from "src/app/services/globalfunction";
import { mapArrayForDropDown } from "src/app/services/globalfunction";

@Component({
  selector: "app-sogiodungmay",
  templateUrl: "./sogiodungmay.component.html",
  styleUrls: ["./sogiodungmay.component.css"],
})
export class SogiodungmayComponent implements OnInit {

  filter = {
    MaCongDoan: "",
    IdBoPhanSuDung: "",
    TuNgay: new Date(),
    DenNgay: new Date()
  };

  SuCo: any;

  CongDoan: any;

  PhanXuong: any;

  backgroundColor = [
    "#4472C4",
    "#ED7D31",
    "#2f995a",
    "#FFC000",
    "#5B9BD5",
  ]

  TenLoaiSuCo: any;
  ColorLoaiSuCo: any;

  //chart 1
  data1: any;
  optionsPie = {
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return " " + data.labels[tooltipItems.index] + ': ' + data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + ' giờ';
        }
      }
    },

    plugins: {
      labels: {
        render: () => { },
      }
    },

    legend: {
      display: true,
      position: "left",
    },

    onClick: (event, array) => {
      let index = array[0]._index;

      this.TenLoaiSuCo = this.SuCo[index].ten;
      this.ColorLoaiSuCo = this.backgroundColor[index];

      // TheoSuCo
      let data = {
        ...this.filter,
        IddmLoaiSuCo: this.SuCo[index].id,
        TuNgay: DateToUnix(this.filter.TuNgay), DenNgay: DateToUnix(this.filter.DenNgay),
      };

      this.taisanService.getDataBaoCao().GetDataLoaiSuCo(data).subscribe((res: any) => {

        let labels = res.Data.map((r) => { return r.Ten });

        let dataChart = res.Data.map((r) => { return r.SoGio });

        this.data2 = {
          labels: labels,
          datasets: [
            {
              data: dataChart,
              fill: false,
              backgroundColor: this.ColorLoaiSuCo,
            },
          ],
        };
      });
    }
  };

  //chart 2
  data2: any;
  options2 = {
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return tooltipItems.yLabel + ' giờ';
        }
      }
    },

    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          position: "left",
        },
      ],
    },

    legend: {
      display: false,
    },

    plugins: {
      labels: {
        render: () => { },
      }
    },
  };

  //chart 3
  data3: any;
  options3 = {
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return tooltipItems.yLabel + ' giờ';
        }
      }
    },

    plugins: {
      labels: {
        render: () => { },
      }
    },

    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          position: "left",
        },
      ],
    },
  };

  constructor(private _servicesSanXuat: SanXuatService, private _servicesTaiSan: TaisanService, private taisanService: TaisanService) { };

  ngOnInit(): void {
    this._servicesSanXuat.GetListCongDoan().subscribe((res: any) => {
      this.CongDoan = mapArrayForDropDown(res, 'Ten', 'Ma')
    })

    this._servicesSanXuat.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.PhanXuong = mapArrayForDropDown(res, 'Ten', 'Id')
    })

    let date = new Date();
    this.filter.TuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter.DenNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let data = {
      ...this.filter,
      TuNgay: DateToUnix(this.filter.TuNgay), DenNgay: DateToUnix(this.filter.DenNgay),
    };

    // TongHop Oninit
    this.taisanService.getDataBaoCao().GetDataTongHop(data).subscribe((res: any) => {
      this.SuCo = res.Data.map(r => ({ id: r.IddmLoaiSuCo, ten: r.Ten }));

      let labels = res.Data.map(r => { return r.Ten });

      let dataChart = res.Data.map(r => { return r.SoGio });

      this.data1 = {
        labels: labels,
        datasets: [
          {
            data: dataChart,
            backgroundColor: this.backgroundColor,
            hoverBackgroundColor: this.backgroundColor,
          },
        ],
      };

      // TheoLoaiSuCo Oninit
      this.TenLoaiSuCo = this.SuCo[0].ten;
      this.ColorLoaiSuCo = this.backgroundColor[0];

      let dataTheoSuCo = {
        ...this.filter,
        IddmLoaiSuCo: this.SuCo[0].id,
        TuNgay: DateToUnix(this.filter.TuNgay), DenNgay: DateToUnix(this.filter.DenNgay),
      };

      this.taisanService.getDataBaoCao().GetDataLoaiSuCo(dataTheoSuCo).subscribe((res: any) => {

        let labels = res.Data.map((r) => { return r.Ten });

        let dataChart = res.Data.map((r) => { return r.SoGio });

        this.data2 = {
          labels: labels,
          datasets: [
            {
              data: dataChart,
              fill: false,
              backgroundColor: this.ColorLoaiSuCo,
            },
          ],
        };
      });
    });

    // TheoNgay Oninit
    this.taisanService.getDataBaoCao().GetDataTheoNgay(data).subscribe((res: any) => {

      let labels = res.Data.map((r) => { return `${new Date(r.Ngay).getDate()}/${new Date(r.Ngay).getMonth() + 1}/${new Date(r.Ngay).getFullYear()}` });

      let datasets = [];

      let ListSuCo = res.Data.map((r) => { return r.listSuCoTheoNgay });

      let TenSuCo = ListSuCo[0].map((r) => { return r.TendmLoaiSuCo });

      for (let i = 0; i < TenSuCo.length; i++) {
        let dataset = {
          label: TenSuCo[i],
          data: [],
          fill: false,
          backgroundColor: this.backgroundColor[i],
        }
        res.Data.forEach(ngay => {
          dataset.data.push(ngay.listSuCoTheoNgay[i]?.SoGio)
        });
        datasets.push(dataset)
      }
      this.data3 = {
        labels: labels,
        datasets: datasets
      };
    })
  }

  getDataBaoCao(filter) {
    let data = {
      ...filter,
      TuNgay: DateToUnix(filter.TuNgay), DenNgay: DateToUnix(filter.DenNgay),
    };

    // TongHop
    this.taisanService.getDataBaoCao().GetDataTongHop(data).subscribe((res: any) => {
      this.SuCo = res.Data.map(r => ({ id: r.IddmLoaiSuCo, ten: r.Ten }));

      let labels = res.Data.map(r => { return r.Ten });

      let dataChart = res.Data.map(r => { return r.SoGio });

      this.data1 = {
        labels: labels,
        datasets: [
          {
            data: dataChart,
            backgroundColor: this.backgroundColor,
            hoverBackgroundColor: this.backgroundColor,
          },
        ],
      };
    });

    // TheoNgay
    this.taisanService.getDataBaoCao().GetDataTheoNgay(data).subscribe((res: any) => {

      let labels = res.Data.map((r) => { return `${new Date(r.Ngay).getDate()}/${new Date(r.Ngay).getMonth() + 1}/${new Date(r.Ngay).getFullYear()}` });

      let datasets = []

      let ListSuCo = res.Data.map((r) => { return r.listSuCoTheoNgay })

      let TenSuCo = ListSuCo[0].map((r) => { return r.TendmLoaiSuCo })

      for (let i = 0; i < TenSuCo.length; i++) {
        let dataset = {
          label: TenSuCo[i],
          data: [],
          fill: false,
          backgroundColor: this.backgroundColor[i],
        }
        res.Data.forEach(ngay => {
          dataset.data.push(ngay.listSuCoTheoNgay[i]?.SoGio)
        });
        datasets.push(dataset)
      }
      this.data3 = {
        labels: labels,
        datasets: datasets
      };
    })
  }
}

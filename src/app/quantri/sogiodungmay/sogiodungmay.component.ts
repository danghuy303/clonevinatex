
import { formatNumber } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DateToUnix } from "src/app/services/globalfunction";
import { mapArrayForDropDown } from "src/app/services/globalfunction";
import { Chart } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import ChartDatalabels from "chartjs-plugin-datalabels";

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
  chart4: any;
  chart5: any
  PhanXuong: any;

  backgroundColor = [
    "#4472C4",
    "#ED7D31",
    "#2f995a",
    "#FFC000",
    "#5B9BD5",
    "#9501AF",
    "#F8FE06",
    "#B40042"
  ]

  TenLoaiSuCo: any;
  ColorLoaiSuCo: any;

  //chart 1: Biểu đồ Tổng hợp
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

    onClick: ($event, array) => {

      $event.stopPropagation();

      let index = array[0]?._index;
      this.TenLoaiSuCo = this.SuCo[index]?.ten;
      // console.log(this.TenLoaiSuCo);
      this.ColorLoaiSuCo = this.backgroundColor[index];

      // Click on chart1 to get TheoSuCo chart
      let data = {
        ...this.filter,
        IddmLoaiSuCo: this.SuCo[index]?.id,
        TuNgay: DateToUnix(this.filter.TuNgay), DenNgay: DateToUnix(this.filter.DenNgay),
      };

      this.taisanService.getDataBaoCao().GetDataLoaiSuCo(data).subscribe((res: any) => {

        let labels: any[] = res.Data.map((r) => { return r.Ten });

        let dataChart: any[] = res.Data.map((r) => { return r.SoGio });

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

  //chart 2: Biểu đồ Loại sự cố
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
          ticks: {
            min: 0,
            beginAtZero: true,
          }
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

  //chart 3: Biểu đồ Chi tiết theo từng ngày
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
      },
    },
    legend: {
      display: true,
      position: "bottom",
    },
    // maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          position: "left",
          ticks: {
            min: 0,
            beginAtZero: true,
          }
        },
      ],
    },
  };

  //chart 4: Biểu đồ chi tiết Theo từng máy
  data4: any;
  options4: any = {
    // tooltips: {
    //   enabled: true,
    //   mode: 'single',
    //   // callbacks: {
    //   //   label: function (tooltipItems, data) {
    //   //     return tooltipItems.yLabel + ' giờ';
    //   //   }
    //   // }
    // },
    plugins: {
      labels: {
        render: (arg: any) => {
          // console.log(arg);
          // return arg.value
        },
      },
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold'
        },
        formatter: (value, context) => {
          return formatNumber(parseFloat(value), 'en-US', '0.2-2')
        }
      },
      zoom: {
        zoom: {
          enabled: true,
          mode: 'x',

          speed: 1,
          threshold: 0.001,
          sensitivity: 0,
        },
        pan: {
          enabled: true,
          mode: 'x',

          speed: 1,
          threshold: 0.001,

        }

      }
    },
    legend: {
      display: true,
      position: "bottom",
    },
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };

  //chart 5: Biểu đồ chi tiết Từng loại bảo dưỡng từng ngày
  data5: any;
  options5: any = {
    // tooltips: {
    //   enabled: true,
    //   mode: 'single',
    //   // callbacks: {
    //   //   label: function (tooltipItems, data) {
    //   //     return tooltipItems.yLabel + ' giờ';
    //   //   }
    //   // }
    // },
    plugins: {
      labels: {
        render: (arg: any) => {
          // console.log(arg);
          // return arg.value
        },
      },
      datalabels: {
        color: 'black',
        font: {
          weight: 'bold'
        },
        formatter: (value, context) => {
          return formatNumber(parseFloat(value), 'en-US', '0.0-3')
        }
      }
    },
    legend: {
      display: true,
      position: "bottom",
    },
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };

  constructor(private _servicesSanXuat: SanXuatService, private _servicesTaiSan: TaisanService, private taisanService: TaisanService) { };

  ngOnInit(): void {

    let getListCongDoan = this._servicesSanXuat.GetListCongDoan().toPromise()

    let getListDmPhanXuong = this._servicesSanXuat.GetListdmPhanXuongOpt().toPromise()

    let date = new Date();
    this.filter.TuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter.DenNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    Promise.all([getListCongDoan, getListDmPhanXuong]).then(([res1, res2]: any) => {

      this.CongDoan = mapArrayForDropDown(res1, 'Ten', 'Ma');
      // this.filter.MaCongDoan = this.CongDoan[0].value;

      this.PhanXuong = mapArrayForDropDown(res2, 'Ten', 'Id');
      // this.filter.IdBoPhanSuDung = this.PhanXuong[0].value;

      this.getDataBaoCao();

    }).catch(err => {
      console.log('err', err)
    })
  }

  getDataBaoCao() {
    let data = {
      ...this.filter,
      TuNgay: DateToUnix(this.filter.TuNgay), DenNgay: DateToUnix(this.filter.DenNgay),
    };

    this.getChart1and2(data);

    this.getChart3(data);
  }

  getChart1and2(data: any) {
    this.taisanService.getDataBaoCao().GetDataTongHop(data).subscribe((res: any) => {
      // console.log(res)
      this.SuCo = res.Data.map(r => ({ id: r.IddmLoaiSuCo, ten: r.Ten }));
      let labels = res.Data.map(r => { return `${r.Ten} (${r.TyLe}%)` });
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

      if (res.Data.length != 0) {
        this.TenLoaiSuCo = this.SuCo[0]?.ten;
        this.ColorLoaiSuCo = this.backgroundColor[0];
        let dataTheoSuCo = {
          ...this.filter,
          IddmLoaiSuCo: this.SuCo[0]?.id,
          TuNgay: DateToUnix(this.filter.TuNgay), DenNgay: DateToUnix(this.filter.DenNgay),
        };
        this.getChart2(dataTheoSuCo);
      } else {
        this.TenLoaiSuCo = '';
        this.ColorLoaiSuCo = '';
        let dataTheoSuCo = {
          ...this.filter,
          IddmLoaiSuCo: '',
          TuNgay: 0, DenNgay: 0,
        };
        this.getChart2(dataTheoSuCo)
      }
    });
  };

  getChart2(data: any) {
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
  };

  getChart3(data: any) {
    this.taisanService.getDataBaoCao().GetDataTheoNgay(data).subscribe((res: any) => {
      let labels = res.Data.map((r) => { return `${new Date(r.Ngay).getDate()}/${new Date(r.Ngay).getMonth() + 1}/${new Date(r.Ngay).getFullYear()}` });
      let datasets = []
      let ListSuCo = res.Data.map((r) => { return r.listSuCoTheoNgay })
      let TenSuCo = ListSuCo[0]?.map((r) => { return r.TendmLoaiSuCo })
      for (let i = 0; i < TenSuCo?.length; i++) {
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
  };

  displayChart4: boolean;
  displayChart5: boolean;
  // showBasicDialog1() {
  //   this.displayChart4 = true;
  // }
  // showBasicDialog2() {
  //   this.displayChart5 = true;
  // }

  getChart4() {//biều đồ chi tiết từng máy
    let data = {
      ...this.filter,
      TuNgay: DateToUnix(this.filter.TuNgay), DenNgay: DateToUnix(this.filter.DenNgay),
    };

    this.taisanService.getDataBaoCao().GetDataTheoMay(data).subscribe((res: any) => {
      // console.log(res);
      let labels = [];
      res.Data.forEach((r) => {
        r.listSuCoTheoNgay.forEach((i) => {
          labels.push(`${i.TenTaiSan} (${i.TyLe}%)`)
        })
      });
      // console.log(labels);
      let dataSoGioDungMay = [];
      res.Data.forEach((r) => {
        r.listSuCoTheoNgay.forEach((i) => {
          dataSoGioDungMay.push(formatNumber(parseFloat(i.SoGio), 'en-US', '0.2-2'))
        })
      });
      // console.log(dataSoGioDungMay);

      let dataSoGioHoatDong = [];
      res.Data.forEach((r) => {
        r.listSuCoTheoNgay.forEach((i) => {
          dataSoGioHoatDong.push(formatNumber(parseFloat(i.SoGioHoatDong), 'en-US', '0.2-2'))
        })
      });
      // console.log(dataSoGioHoatDong);
      let loaiSoGio = ['Số giờ dừng máy', 'Số giờ hoạt động'];
      this.data4 = {
        labels: labels,
        datasets: [
          {
            label: 'Số giờ dừng máy',
            data: dataSoGioDungMay,
            backgroundColor: "#4472C4",
          },
          {
            label: 'Số giờ hoạt động',
            data: dataSoGioHoatDong,
            backgroundColor: "#ED7D31",
          },
        ]
      };
      this.chart4?.destroy();
      this.chart4 = new Chart('chart4', {
        type: 'bar',
        data: this.data4,
        plugins: [ChartDatalabels],
        options: this.options4,
      });
    });

    this.displayChart4 = true;
  };
  maCongDoanToFilterChart4: any;
  filterChart4ByCongDoan() {
    let data = {
      ...this.filter,
      MaCongDoan: this.maCongDoanToFilterChart4,
      TuNgay: DateToUnix(this.filter.TuNgay), DenNgay: DateToUnix(this.filter.DenNgay),
    };

    this.taisanService.getDataBaoCao().GetDataTheoMay(data).subscribe((res: any) => {
      // console.log(res);
      let labels = [];
      res.Data.forEach((r) => {
        r.listSuCoTheoNgay.forEach((i) => {
          labels.push(`${i.TenTaiSan} (${i.TyLe}%)`)
        })
      });
      // console.log(labels);
      let dataSoGioDungMay = [];
      res.Data.forEach((r) => {
        r.listSuCoTheoNgay.forEach((i) => {
          dataSoGioDungMay.push(i.SoGio)
        })
      });
      // console.log(dataSoGioDungMay);

      let dataSoGioHoatDong = [];
      res.Data.forEach((r) => {
        r.listSuCoTheoNgay.forEach((i) => {
          dataSoGioHoatDong.push(i.SoGioHoatDong)
        })
      });
      // console.log(dataSoGioHoatDong);
      let loaiSoGio = ['Số giờ dừng máy', 'Số giờ hoạt động'];
      this.data4 = {
        labels: labels,
        datasets: [
          {
            label: 'Số giờ dừng máy',
            data: dataSoGioDungMay,
            backgroundColor: "#4472C4",
          },
          {
            label: 'Số giờ hoạt động',
            data: dataSoGioHoatDong,
            backgroundColor: "#ED7D31",
          },
        ]
      };
      this.chart4?.destroy();
      this.chart4 = new Chart('chart4', {
        type: 'bar',
        data: this.data4,
        plugins: [ChartDatalabels],
        options: this.options4,
      });
    });
  }

  dateBieudochitietTungloai: any;
  loaiBieudochitietTungloai: any;
  soLuongMay: any;
  IddmLoaiSuCo: any;
  Ngay: any;
  maCongDoanToFilterChart5: any;
  getChart5($event) {//biểu đồ chi tiết từng loại sự cố từng ngày
    // console.log($event.element._model.label);
    // console.log($event.element);
    this.loaiBieudochitietTungloai = $event.element._model.datasetLabel;
    this.dateBieudochitietTungloai = $event.element._model.label;
    // console.log(this.SuCo);
    let indexLoaiSuCo = this.SuCo.findIndex((suco: any) => suco.ten === this.loaiBieudochitietTungloai);
    // console.log(this.SuCo[indexLoaiSuCo]?.id);
    this.IddmLoaiSuCo = this.SuCo[indexLoaiSuCo]?.id;

    let date = $event.element._model.label.split("/");
    let ngay = (new Date(date[2], date[1] - 1, date[0])).getTime() / 1000;
    this.Ngay = ngay;
    // console.log(ngay);
    let data = {
      ...this.filter,
      IddmLoaiSuCo: this.SuCo[indexLoaiSuCo]?.id,
      Ngay: ngay,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
    };
    this.taisanService.getDataBaoCao().GetDataTheoMay(data).subscribe((res: any) => {
      // console.log(res);
      this.soLuongMay = res.Data[0]?.listSuCoTheoNgay?.length;
      // console.log(this.soLuongMay);

      let labels = [];
      res.Data.forEach((r) => {
        r.listSuCoTheoNgay.forEach((i) => {
          labels.push(i.TenTaiSan)
        })
      });
      // console.log(labels);
      let dataSoGioDungMay = [];
      res.Data.forEach((r) => {
        r.listSuCoTheoNgay.forEach((i) => {
          dataSoGioDungMay.push(i.SoGio)
        })
      });
      // console.log(dataSoGioDungMay);
      let dataSoGioHoatDong = [];
      res.Data.forEach((r) => {
        r.listSuCoTheoNgay.forEach((i) => {
          dataSoGioHoatDong.push(i.SoGioHoatDong)
        })
      });
      // console.log(dataSoGioHoatDong);
      let loaiSoGio = ['Số giờ dừng máy', 'Số giờ hoạt động'];
      this.data5 = {
        labels: labels,
        datasets: [
          {
            label: 'Số giờ dừng máy',
            data: dataSoGioDungMay,
            backgroundColor: "#4472C4",
          },
          {
            label: 'Số giờ hoạt động',
            data: dataSoGioHoatDong,
            backgroundColor: "#ED7D31",
          },

        ]
      };
      this.chart5?.destroy();
      this.chart5 = new Chart('chart5', {
        type: 'bar',
        data: this.data5,
        plugins: [ChartDatalabels],
        options: this.options5,
      });
    });
    this.displayChart5 = true;
  };

  filterChart5ByCongDoan() {
    let data = {
      ...this.filter,
      MaCongDoan: this.maCongDoanToFilterChart5,
      IddmLoaiSuCo: this.IddmLoaiSuCo,
      Ngay: this.Ngay,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
    };
    this.taisanService.getDataBaoCao().GetDataTheoMay(data).subscribe((res: any) => {
      // console.log(res);
      this.soLuongMay = res.Data[0]?.listSuCoTheoNgay?.length;
      // console.log(this.soLuongMay);

      let labels = [];
      res.Data.forEach((r) => {
        r.listSuCoTheoNgay.forEach((i) => {
          labels.push(i.TenTaiSan)
        })
      });
      // console.log(labels);
      let dataSoGioDungMay = [];
      res.Data.forEach((r) => {
        r.listSuCoTheoNgay.forEach((i) => {
          dataSoGioDungMay.push(i.SoGio)
        })
      });
      // console.log(dataSoGioDungMay);
      let dataSoGioHoatDong = [];
      res.Data.forEach((r) => {
        r.listSuCoTheoNgay.forEach((i) => {
          dataSoGioHoatDong.push(i.SoGioHoatDong)
        })
      });
      // console.log(dataSoGioHoatDong);
      let loaiSoGio = ['Số giờ dừng máy', 'Số giờ hoạt động'];
      this.data5 = {
        labels: labels,
        datasets: [
          {
            label: 'Số giờ dừng máy',
            data: dataSoGioDungMay,
            backgroundColor: "#4472C4",
          },
          {
            label: 'Số giờ hoạt động',
            data: dataSoGioHoatDong,
            backgroundColor: "#ED7D31",
          },

        ]
      };
      this.chart5?.destroy();
      this.chart5 = new Chart('chart5', {
        type: 'bar',
        data: this.data5,
        plugins: [ChartDatalabels],
        options: this.options5,
      });
    });
  }

}

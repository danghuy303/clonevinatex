import { formatNumber } from '@angular/common';
import { Label } from '@amcharts/amcharts4/core';
import { Component, OnInit } from "@angular/core";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DateToUnix } from "src/app/services/globalfunction";
import { mapArrayForDropDown } from "src/app/services/globalfunction";


@Component({
  selector: "app-ngansachdukienvathucte",
  templateUrl: "./ngansachdukienvathucte.component.html",
  styleUrls: ["./ngansachdukienvathucte.component.css"],
})
export class NgansachdukienvathucteComponent implements OnInit {
  filter = {
    IdBoPhanSuDung: "",
    LoaiThoiGian: 0,
    TuNgay: new Date(),
    DenNgay: new Date()
  };

  PhanXuong: any;

  LoaiThoiGian = [{ label: "Ngày", value: 0 }, { label: "Tuần", value: 1 }, { label: "Tháng", value: 2 }, { label: "Năm", value: 3 }]

  data: any;

  chartOptions = {
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return formatNumber(Number(tooltipItems.yLabel), 'en-GB', '1.0-0') + " VND";
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

    scales: {
      xAxes: {
        ticks: {
          color: "#495057",
          min: 0,
          beginAtZero: true,
        },
        grid: {
          color: "#495057",
        },
      },
      yAxes: {
        ticks: {
          color: "#495057",
          min: 0,
          beginAtZero: true,
        },
        grid: {
          color: "#495057",
        },
      },

      // yAxes: [{
      //   ticks: {
      //     beginAtZero: true
      //   }
      // }]
    },
  };

  constructor(private _servicesSanXuat: SanXuatService, private _servicesTaiSan: TaisanService, private taisanService: TaisanService) { }

  ngOnInit(): void {
    this._servicesSanXuat.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.PhanXuong = mapArrayForDropDown(res, 'Ten', 'Id')
    })

    let date = new Date();
    this.filter.TuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter.DenNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.getDataBaoCao();

    // let data = {
    //   ...this.filter,
    //   TuNgay: DateToUnix(this.filter.TuNgay), DenNgay: DateToUnix(this.filter.DenNgay),
    // };


    // this.taisanService.getDataBaoCao().GetDataNganSach(data).subscribe((res: any) => {
    //   let labels = res.Data.map((r) => { return r.Label });
    //   let dataThucTe = res.Data.map((r) => { return r.GiaTriThucTe });
    //   let dataKeHoach = res.Data.map((r) => { return r.GiaTriKeHoach });
    //   let luykeThucTe = res.Data.map((r) => { return r.LuyKeThucTe });
    //   let luykeKeHoach = res.Data.map((r) => { return r.LuyKeKeHoach });
    //   this.data = {
    //     labels: labels,
    //     datasets: [
    //       {
    //         type: "bar",
    //         label: "Kế hoạch",
    //         backgroundColor: "#FF5C00",
    //         data: dataKeHoach,
    //       },
    //       {
    //         type: "bar",
    //         label: "Thực tế",
    //         backgroundColor: "#0A91E6",
    //         data: dataThucTe,
    //       },
    //       {
    //         data: luykeKeHoach,
    //         type: "line",
    //         label: "Lũy kế Kế hoạch",
    //         borderColor: "#FF5C00",
    //         borderWidth: 2,
    //         fill: false,
    //       },
    //       {
    //         data: luykeThucTe,
    //         type: "line",
    //         label: "Lũy kế Thực tế",
    //         borderColor: "#0A91E6",
    //         borderWidth: 2,
    //         fill: false,
    //       },
    //     ],
    //   };
    // }
    // )
  }

  getDataBaoCao() {
    let data = {
      ...this.filter,
      TuNgay: DateToUnix(this.filter.TuNgay), DenNgay: DateToUnix(this.filter.DenNgay),
    };

    this.taisanService.getDataBaoCao().GetDataNganSach(data).subscribe((res: any) => {

      let labels = res.Data.map((r: any) => { return r.Label });

      let dataThucTe = res.Data.map((r: any) => { return r.GiaTriThucTe });

      let dataKeHoach = res.Data.map((r: any) => { return r.GiaTriKeHoach });

      let luykeThucTe = res.Data.map((r: any) => { return r.LuyKeThucTe });

      let luykeKeHoach = res.Data.map((r: any) => { return r.LuyKeKeHoach });

      this.data = {
        labels: labels,
        datasets: [
          {
            type: "bar",
            label: "Kế hoạch",
            backgroundColor: "#FF5C00",
            data: dataKeHoach,
            borderWidth: 2,
          },
          {
            type: "bar",
            label: "Thực tế",
            backgroundColor: "#0A91E6",
            data: dataThucTe,
            borderWidth: 2,
          },
          {
            type: "line",
            label: "Lũy kế Kế hoạch",
            borderColor: "#FF5C00",
            borderWidth: 2,
            fill: false,
            data: luykeKeHoach,
            lineTension: 0,
          },
          {
            type: "line",
            label: "Lũy kế Thực tế",
            borderColor: "#0A91E6",
            data: luykeThucTe,
            fill: false,
            borderWidth: 2,
            lineTension: 0,
          }

        ],
      };
    }
    )
  }
}

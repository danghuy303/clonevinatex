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
    TuNgay: new Date(),
    DenNgay: new Date()
  };
  PhanXuong: any;

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
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
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

    let data = {
      ...this.filter,
      TuNgay: DateToUnix(this.filter.TuNgay), DenNgay: DateToUnix(this.filter.DenNgay),
    };

    this.taisanService.getDataBaoCao().GetDataNganSach(data).subscribe((res: any) => {

      let labels = res.Data.map((r) => { return r.Label })

      let dataThucTe = res.Data.map((r) => { return r.GiaTriThucTe })

      let dataKeHoach = res.Data.map((r) => { return r.GiaTriKeHoach })

      this.data = {
        labels: labels,
        datasets: [
          {
            data: dataKeHoach,
            type: "line",
            label: "Kế hoạch",
            borderColor: "#FF5C00",
            borderWidth: 2,
            fill: false,
          },
          {
            data: dataThucTe,
            type: "line",
            label: "Thực tế",
            borderColor: "#0A91E6",
            borderWidth: 2,
            fill: false,
          },
          {
            type: "bar",
            label: "Kế hoạch",
            backgroundColor: "#66BB6A",
            data: dataKeHoach,
          },
          {
            type: "bar",
            label: "Thực tế",
            backgroundColor: "#FFA726",
            data: dataThucTe,
          },
        ],
      };
    }
    )
  }

  getDataBaoCao(filter) {

    let data = {
      ...filter,
      TuNgay: DateToUnix(filter.TuNgay), DenNgay: DateToUnix(filter.DenNgay),
    };

    this.taisanService.getDataBaoCao().GetDataNganSach(data).subscribe((res: any) => {

      let labels = res.Data.map((r) => { return r.Label })

      let dataThucTe = res.Data.map((r) => { return r.GiaTriThucTe })

      let dataKeHoach = res.Data.map((r) => { return r.GiaTriKeHoach })

      this.data = {
        labels: labels,
        datasets: [
          {
            type: "line",
            label: "Kế hoạch",
            borderColor: "#FF5C00",
            borderWidth: 2,
            fill: false,
            data: dataKeHoach,
          },
          {
            type: "line",
            label: "Thực tế",
            borderColor: "#0A91E6",
            data: dataThucTe,
            fill: false,
            borderWidth: 2,
          },
          {
            type: "bar",
            label: "Kế hoạch",
            backgroundColor: "#66BB6A",
            data: dataKeHoach,
            borderColor: "white",
            borderWidth: 2,
          },
          {
            type: "bar",
            label: "Thực tế",
            backgroundColor: "#FFA726",
            data: dataThucTe,
          },
        ],
      };
    }
    )
  }
}

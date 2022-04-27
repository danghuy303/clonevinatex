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

  // data = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //       type: "line",
  //       label: "Kế hoạch",
  //       borderColor: "#FF5C00",
  //       borderWidth: 2,
  //       fill: false,
  //       data: [50, 25, 12, 48, 56, 76, 42],
  //     },
  //     {
  //       type: "line",
  //       label: "Thực tế",
  //       borderColor: "#0A91E6",
  //       data: [21, 84, 24, 75, 37, 65, 34],
  //       fill: false,
  //       borderWidth: 2,
  //     },
  //     {
  //       type: "bar",
  //       label: "Kế hoạch",
  //       backgroundColor: "#66BB6A",
  //       data: [21, 84, 24, 75, 37, 65, 34],
  //       borderColor: "white",
  //       borderWidth: 2,
  //     },
  //     {
  //       type: "bar",
  //       label: "Thực tế",
  //       backgroundColor: "#FFA726",
  //       data: [41, 52, 24, 74, 23, 21, 32],
  //     },
  //   ],
  // };

  chartOptions = {
    legend: {
      display: true,
      position: "bottom",
    },
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
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
    },
  };

  constructor(private _servicesSanXuat: SanXuatService, private _servicesTaiSan: TaisanService, private taisanService: TaisanService) { }

  ngOnInit(): void {
    this._servicesSanXuat.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.PhanXuong = mapArrayForDropDown(res, 'Ten', 'Id')
      console.log(this.PhanXuong);

    })

    let date = new Date();
    this.filter.TuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter.DenNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  getDataBaoCao(filter) {
    // console.log(filter);
    let data = {
      ...filter,
      TuNgay: DateToUnix(filter.TuNgay), DenNgay: DateToUnix(filter.DenNgay),
    };
    console.log(data);

    this.taisanService.getDataBaoCao().GetDataNganSach(data).subscribe((res: any) => {
      console.log(res);
      let labels = res.Data.map((r) => { return r.Label })
      console.log(labels);
      let dataThucTe = res.Data.map((r) => { return r.GiaTriThucTe })
      console.log(dataThucTe);
      let dataKeHoach = res.Data.map((r) => { return r.GiaTriKeHoach })
      console.log(dataKeHoach);

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

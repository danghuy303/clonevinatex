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
    IdCongDoan: "",
    IdBoPhanSuDung: "",
    TuNgay: new Date(),
    DenNgay: new Date()
  };


  congDoan;

  IddmSuCo: string;

  optionsPie = {
    onClick: (event, array) => {
      let index = array[0]._index;
      console.log(index);
    }
  };

  //chart 1
  data1: any;
  // data1 = {
  //   labels: [

  //   ],
  //   datasets: [
  //     {
  //       data: [100, 50, 100, 50, 40],
  //       backgroundColor: [
  //         "#4472C4",
  //         "#ED7D31",
  //         "#A5A5A5",
  //         "#FFC000",
  //         "#5B9BD5",
  //       ],
  //       hoverBackgroundColor: [
  //         "#4472C4",
  //         "#ED7D31",
  //         "#A5A5A5",
  //         "#FFC000",
  //         "#5B9BD5",
  //       ],

  //     },
  //   ],

  // };

  //chart 2
  data2 = {
    labels: ["Tên máy", "Tên máy", "Tên máy"],
    datasets: [
      {
        data: [3, 2, 3],
        fill: false,
        backgroundColor: "#5B9BD5",
      },
    ],
  };

  options2 = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          position: "left",
        },
      ],
    },
  };

  //chart 3
  data3 = {
    labels: [
      "1/4/2022",
      "2/4/2022",
      "3/4/2022",
      "4/4/2022",
      "5/4/2022",
      "6/4/2022",
    ],
    datasets: [
      {
        label: "Bảo dưỡng",
        data: [11500, 10100],
        fill: false,
        backgroundColor: "#4472C4",
      },
      {
        label: "Sự cố điện",
        data: [12000, 23000],
        fill: false,
        backgroundColor: "#ED7D31",
      },
      {
        label: "Sự cố phát sinh",
        data: [12000, 13000],
        fill: false,
        backgroundColor: "#A5A5A5",
      },
      {
        label: "Sửa chữa",
        data: [12000, 13000],
        fill: false,
        backgroundColor: "#FFC000",
      },
      {
        label: "Sự cố tụt áp",
        data: [12000, 13000],
        fill: false,
        backgroundColor: "#5B9BD5",
      },
    ],
  };

  options3 = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          position: "left",
        },
      ],
    },
  };

  constructor(private _servicesSanXuat: SanXuatService, private _servicesTaiSan: TaisanService, private taisanService: TaisanService) { }

  // getBoPhanSuDung() {
  //   this._servicesSanXuat.GetListdmPhanXuongOpt()// lay tat ca bo phan su dung
  //   this._servicesSanXuat.GetListCongDoan() //lay tat ca cong doan

  // }

  CongDoan: any;
  PhanXuong: any;

  ngOnInit(): void {
    this._servicesSanXuat.GetListCongDoan().subscribe((res: any) => {
      this.CongDoan = mapArrayForDropDown(res, 'Ten', 'Ma')
      console.log(this.CongDoan);
    })

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

    // TongHop
    this.taisanService.getDataBaoCao().GetDataTongHop(data).subscribe((res: any) => {
      console.log(res.Data);

      this.IddmSuCo = res.Data.map(r => ({ id: r.IddmLoaiSuCo }))
      console.log(this.IddmSuCo);

      let labels = res.Data.map(r => { return r.Ten });
      let dataChart = res.Data.map(r => { return r.SoGio });

      this.data1 = {
        labels: labels,
        datasets: [
          {
            data: dataChart,
            backgroundColor: [
              "#4472C4",
              "#ED7D31",
              "#A5A5A5",
              "#FFC000",
              "#5B9BD5",
            ],
            hoverBackgroundColor: [
              "#4472C4",
              "#ED7D31",
              "#A5A5A5",
              "#FFC000",
              "#5B9BD5",
            ],

          },
        ],

      };

    });

    // TheoNgay
    this.taisanService.getDataBaoCao().GetDataTheoNgay(data).subscribe((res: any) => {
      console.log(res);
    })


  }


}

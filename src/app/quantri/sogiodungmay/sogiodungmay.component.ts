import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sogiodungmay",
  templateUrl: "./sogiodungmay.component.html",
  styleUrls: ["./sogiodungmay.component.css"],
})
export class SogiodungmayComponent implements OnInit {
  //chart 1
  data1 = {
    // labels: [
    //   "Bảo dưỡng",
    //   "Sự cố điện",
    //   "Sự cố phát sinh",
    //   "Sửa chữa",
    //   "Sự cố tụt áp",
    // ],
    datasets: [
      {
        data: [100, 50, 100, 50, 40],
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

  constructor() {}

  ngOnInit(): void {}
}

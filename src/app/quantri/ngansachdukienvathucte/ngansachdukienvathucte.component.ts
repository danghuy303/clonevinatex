import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ngansachdukienvathucte",
  templateUrl: "./ngansachdukienvathucte.component.html",
  styleUrls: ["./ngansachdukienvathucte.component.css"],
})
export class NgansachdukienvathucteComponent implements OnInit {
  data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        type: "line",
        label: "Kế hoạch",
        borderColor: "#FF5C00",
        borderWidth: 2,
        fill: false,
        data: [50, 25, 12, 48, 56, 76, 42],
      },
      {
        type: "line",
        label: "Thực tế",
        borderColor: "#0A91E6",
        data: [21, 84, 24, 75, 37, 65, 34],
        fill: false,
        borderWidth: 2,
      },
      {
        type: "bar",
        label: "Kế hoạch",
        backgroundColor: "#66BB6A",
        data: [21, 84, 24, 75, 37, 65, 34],
        borderColor: "white",
        borderWidth: 2,
      },
      {
        type: "bar",
        label: "Thực tế",
        backgroundColor: "#FFA726",
        data: [41, 52, 24, 74, 23, 21, 32],
      },
    ],
  };

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

  constructor() {}

  ngOnInit(): void {}
}

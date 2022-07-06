import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bao-cao-nhu-cau-su-dung-bong',
  templateUrl: './bao-cao-nhu-cau-su-dung-bong.component.html',
  styleUrls: ['./bao-cao-nhu-cau-su-dung-bong.component.css']
})
export class BaoCaoNhuCauSuDungBongComponent implements OnInit {

  listNam: any = [];
  ListBaoCao: any = [];
  filter: any = {};
  data: any;
  chartOptions: any;
  ListLabelThang: any = [];

  constructor() { }

  ngOnInit(): void {
    this.filter.Nam = new Date().getFullYear();
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    for(let i=1; i<= 12; i++) {
      this.ListLabelThang.push(`Tháng ${i}`);
    }
    // list bao cao
    this.ListBaoCao = [
      {
        name: 'ACB',
        year: 2022
      },
      {
        name: 'ACB',
        year: 2022
      }
    ];
    // chart
    this.data = {
      labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
      datasets: [{
        type: 'line',
        label: 'Lũy kế thực tế',
        borderColor: 'red',
        borderWidth: 2,
        fill: false,
        data: [
          50,
          25,
          12,
          48,
          56,
          76,
          42,
          12,
          48,
          56,
          76,
          68
        ]
      },
      {
        type: 'line',
        label: 'lũy kế kế hoạch',
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
        data: [
          60,
          25,
          12,
          68,
          48,
          56,
          76,
          42,
          12,
          56,
          76,
          42
        ]
      }, {
        type: 'bar',
        label: 'Thực tế',
        backgroundColor: 'red',
        data: [
          21,
          84,
          24,
          75,
          84,
          24,
          37,
          84,
          24,
          65,
          34,
          68
        ],
        borderColor: 'white',
        borderWidth: 2
      }, {
        type: 'bar',
        label: 'Kế hoạch',
        backgroundColor: 'blue',
        data: [
          41,
          52,
          24,
          74,
          75,
          84,
          24,
          37,
          84,
          23,
          21,
          32
        ]
      }]
    };
    // chart options
    this.chartOptions =  {
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              ticks: {
                  color: '#495057',
                 
                
              },
              grid: {
                  color: '#ebedef'
              }
          }
      }
  };


  }

}

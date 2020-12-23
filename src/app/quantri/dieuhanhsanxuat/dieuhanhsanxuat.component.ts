import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dieuhanhsanxuat',
  templateUrl: './dieuhanhsanxuat.component.html',
  styleUrls: ['./dieuhanhsanxuat.component.css']
})
export class DieuhanhsanxuatComponent implements OnInit {
  filterBong:any={};
  filterSanLuong:any = {};
  monthlyConfig: any = {};
  dataSet1: any = {};
  listOpts:any=[];
  dataPie:any={};
  option1:any={
    legend: {
        position: 'bottom'
      },
    maintainAspectRatio: window.innerWidth <=375? false:true,
    aspectRatio:(((window.innerWidth-80)*2/3)/((window.innerHeight-(225+32.5))/2))
  };
  option2:any = {
    legend: {
        position: 'bottom'
      },
    maintainAspectRatio:window.innerWidth <=375? false:true,
    aspectRatio:((window.innerWidth-80)/((window.innerHeight-(225+32.5))/2))
  };
  optionPie:any={
    legend: {
      position: 'left'
    },
    maintainAspectRatio: window.innerWidth <=375? false:true,
    aspectRatio:(((window.innerWidth-80)/3)/((window.innerHeight-(225+32.5))/2))
  }
  constructor() { }

  ngOnInit(): void {
    this.dataSet1 = {
      labels: ['T2', 'T3', 'T4', 'T5'],
      datasets: [
      {
        type: 'line',
        label: 'Bông Mỹ',
        borderColor: '#009900',
        borderWidth: 2,
        fill: false,
        data: Array.from({ length: 4 }, () => Math.floor(Math.random() * 100))
      },
      {
        type: 'line',
        label: 'Bông Brazil',
        borderColor: '#FF6384',
        borderWidth: 2,
        fill: false,
        data: Array.from({ length: 4 }, () => Math.floor(Math.random() * 100))
      },
      {
        type: 'line',
        label: 'Bông Tây Phi',
        borderColor: '#36A2EB',
        borderWidth: 2,
        fill: false,
        data: Array.from({ length: 4 }, () => Math.floor(Math.random() * 100))
      },
      {
        type: 'line',
        label: 'Bông Hồi',
        borderColor: '#FFCE56',
        borderWidth: 2,
        fill: false,
        data: Array.from({ length: 4 }, () => Math.floor(Math.random() * 100))
      },]
    }
    this.monthlyConfig = {
      labels: Array.from({length:30},(alo,index)=>index+1),
      datasets: [
        {
          type: 'line',
          label: 'Lũy kế',
          borderColor: '#FF671F',
          borderWidth: 2,
          fill: false,
          data: Array.from({ length: 30 }, (v,i) => i*20)
        },
        {
          type: 'bar',
          label: 'Sản lượng',
          backgroundColor: '#3c5cbb',
          data: Array.from({ length: 30 }, () => 20),
          borderColor: 'white',
          borderWidth: 2
        },
      ]
    }
    this.dataPie = {
      labels: ['Bông Mỹ','Bông Brazil','Bông Tây Phi','Bông Hồi'],
      datasets: [
          {
              data: [300, 50, 100,200],
              backgroundColor: [
                  "#009900",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF671F"
              ],
              hoverBackgroundColor: [
                  "#009900",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF671F"
              ]
          }]    
      };
  }

  GetBieuDoBong(){

  }
  
  resetFilter(){

  }
  changeOpt(e){
    if(e.checked){
      this.monthlyConfig = {
        labels: Array.from({length:30},(alo,index)=>index+1),
        datasets: [
          // {
          //   type: 'line',
          //   label: 'Lũy kế',
          //   borderColor: '#FF671F',
          //   borderWidth: 2,
          //   fill: false,
          //   data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100))
          // },
          {
            type: 'bar',
            label: 'Sản lượng',
            backgroundColor: '#3c5cbb',
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
            borderColor: 'white',
            borderWidth: 2
          },
        ]
      }
    }else{
      this.monthlyConfig = {
        labels: Array.from({length:30},(alo,index)=>index+1),
        datasets: [
          {
            type: 'line',
            label: 'Lũy kế',
            borderColor: '#FF671F',
            borderWidth: 2,
            fill: false,
            data: Array.from({ length: 30 }, (v,i) => i*20)
          },
          {
            type: 'bar',
            label: 'Sản lượng',
            backgroundColor: '#3c5cbb',
            data: Array.from({ length: 30 }, () => 20),
            borderColor: 'white',
            borderWidth: 2
          },
        ]
      }
    }
  }
}

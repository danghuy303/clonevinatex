import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dieuhanhsanxuat',
  templateUrl: './dieuhanhsanxuat.component.html',
  styleUrls: ['./dieuhanhsanxuat.component.css']
})
export class DieuhanhsanxuatComponent implements OnInit {
  monthlyConfig: any = {};
  dataPie:any={}
  option1:any={
    maintainAspectRatio:true,
    aspectRatio:(((window.innerWidth-80)*2/3)/((window.innerHeight-160)/2))
  }
  option2:any = {
    maintainAspectRatio:true,
    aspectRatio:((window.innerWidth-80)/((window.innerHeight-160)/2))
  }
  constructor() { }

  ngOnInit(): void {
    this.monthlyConfig = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'line',
          label: 'Lũy kế',
          borderColor: '#FF671F',
          borderWidth: 2,
          fill: false,
          data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100))
        },
        {
          type: 'bar',
          label: 'Sản lượng',
          backgroundColor: '#3c5cbb',
          data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)),
          borderColor: 'white',
          borderWidth: 2
        },
      ]
    }
    this.dataPie = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]    
      };
  }
  
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lichbaoduongcopy',
  templateUrl: './lichbaoduongcopy.component.html',
  styleUrls: ['./lichbaoduongcopy.component.css']
})
export class LichbaoduongcopyComponent implements OnInit {
  item:any ={};
  listNam: any = [];
  labelThang: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
  '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
  constructor() { }

  ngOnInit(): void {
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
  }
  isChon() {
  
    this.item.isChon=true;
    this.item.isChon=false;
  }
  isChonNam() {
  
    this.item.isChonNam=true;
    this.item.isChonThang=false;
  }
  isChonThang() {
    this.item.isChonThang=true;
    this.item.isChonNam=false;

  }
}

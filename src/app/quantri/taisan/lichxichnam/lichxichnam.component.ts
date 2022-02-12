import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lichxichnam',
  templateUrl: './lichxichnam.component.html',
  styleUrls: ['./lichxichnam.component.css']
})
export class LichxichnamComponent implements OnInit {
  listNam: any = [];
  item:any ={};
  constructor() { }

  ngOnInit(): void {
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
  }
  isChon() {
  
    this.item.isChon=true;
    this.item.isChonMay=false;
  }
  isChonMay() {
    this.item.isChonMay=true;
    this.item.isChon=false;

  }
}

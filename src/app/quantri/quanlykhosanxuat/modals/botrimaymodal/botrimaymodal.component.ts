import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-botrimaymodal',
  templateUrl: './botrimaymodal.component.html',
  styleUrls: ['./botrimaymodal.component.css']
})
export class BotrimaymodalComponent implements OnInit {
  item:any={};
  filter:any={};
  constructor() { }

  ngOnInit(): void {
    this.item.listCongDoan= [
      {Ten:'Bông chải',listMay:[
        {Ten:'TC05',ChiSo:0.2,Loai:'CM'},
        {Ten:'TC06',ChiSo:0.2,Loai:'CM'},
        {Ten:'TC02',ChiSo:0.2,Loai:'CM'},
      ]},
      {Ten:'Cuộn cúi'},
      {Ten:'Chải kỹ'},
      {Ten:'Ghép thô'},
    ]
  }

}

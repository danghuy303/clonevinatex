import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thaytho-baocaoca',
  templateUrl: './thaytho-baocaoca.component.html',
  styleUrls: ['./thaytho-baocaoca.component.css']
})
export class ThaythoBaocaocaComponent implements OnInit {
  @Input('data') item :any={};
  constructor() { }

  ngOnInit(): void {
  }
  addMachine(){
    this.item.lstThayTho.unshift({});
  }
  deleteMachine(index){
    this.item.lstThayTho.splice(index,1);
  }
}

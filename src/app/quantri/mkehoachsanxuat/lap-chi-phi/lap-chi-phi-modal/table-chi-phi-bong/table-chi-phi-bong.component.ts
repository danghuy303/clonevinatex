import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-chi-phi-bong',
  templateUrl: './table-chi-phi-bong.component.html',
  styleUrls: ['./table-chi-phi-bong.component.css']
})
export class TableChiPhiBongComponent implements OnInit, OnChanges {

  @Input() kehoach: any = {};
  @Input() listLableThang: any = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("kehoach", this.kehoach);
    
  }

  ngOnInit(): void {
  }

}

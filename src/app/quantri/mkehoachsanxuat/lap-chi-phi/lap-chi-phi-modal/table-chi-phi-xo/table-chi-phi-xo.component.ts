import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-chi-phi-xo',
  templateUrl: './table-chi-phi-xo.component.html',
  styleUrls: ['./table-chi-phi-xo.component.css']
})
export class TableChiPhiXoComponent implements OnInit {

  @Input() kehoach: any = {};
  @Input() listLableThang: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}

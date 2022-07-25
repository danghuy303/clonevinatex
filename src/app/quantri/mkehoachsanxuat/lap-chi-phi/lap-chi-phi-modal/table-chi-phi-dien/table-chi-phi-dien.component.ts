import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-chi-phi-dien',
  templateUrl: './table-chi-phi-dien.component.html',
  styleUrls: ['./table-chi-phi-dien.component.css']
})
export class TableChiPhiDienComponent implements OnInit {

  @Input() kehoach: any = {};
  @Input() listLableThang: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}

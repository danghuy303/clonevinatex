import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-chi-phi-bong',
  templateUrl: './table-chi-phi-bong.component.html',
  styleUrls: ['./table-chi-phi-bong.component.css']
})
export class TableChiPhiBongComponent implements OnInit {

  @Input() kehoach: any = {};
  @Input() listLableThang: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}

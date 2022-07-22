import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-chi-phi-nhan-cong',
  templateUrl: './table-chi-phi-nhan-cong.component.html',
  styleUrls: ['./table-chi-phi-nhan-cong.component.css']
})
export class TableChiPhiNhanCongComponent implements OnInit {

  @Input() kehoach: any = {};
  @Input() listLableThang: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-chi-phi-vat-tu-phu',
  templateUrl: './table-chi-phi-vat-tu-phu.component.html',
  styleUrls: ['./table-chi-phi-vat-tu-phu.component.css']
})
export class TableChiPhiVatTuPhuComponent implements OnInit {

  @Input() kehoach: any = {};
  @Input() listLableThang: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { deepCopy } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-chitietthanhtoan',
  templateUrl: './chitietthanhtoan.component.html',
  styleUrls: ['./chitietthanhtoan.component.css']
})
export class ChitietthanhtoanComponent implements OnInit {
  @Input('listThanhToan') listThanhToan: any = [];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  constructor(public _modal: NgbModal,) { }
  ngOnInit(): void {
  }
}

import { vn } from 'src/app/services/const';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chitietdieukhoanmodal',
  templateUrl: './chitietdieukhoanmodal.component.html',
  styleUrls: ['./chitietdieukhoanmodal.component.css']
})
export class ChitietdieukhoanmodalComponent implements OnInit {
  lang: any = vn;
  items :any = {}
 
  @Input() item: any;
  @Input() thanhToan: any;
  listDieuKhoanThanhToan :any = {}
  yearRange: string = `${
    new Date().getFullYear() - 50
  }:${new Date().getFullYear()}`;
  constructor(public activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}

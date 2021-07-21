import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chitietdieukhoanmodal',
  templateUrl: './chitietdieukhoanmodal.component.html',
  styleUrls: ['./chitietdieukhoanmodal.component.css']
})
export class ChitietdieukhoanmodalComponent implements OnInit {

  constructor(public activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }

}

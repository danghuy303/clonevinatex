import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-thanhtoanhopdongmodal',
  templateUrl: './thanhtoanhopdongmodal.component.html',
  styleUrls: ['./thanhtoanhopdongmodal.component.css']
})
export class ThanhtoanhopdongmodalComponent implements OnInit {

  constructor( public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-phathopdongmodal',
  templateUrl: './phathopdongmodal.component.html',
  styleUrls: ['./phathopdongmodal.component.css']
})
export class PhathopdongmodalComponent implements OnInit {

  constructor( public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}

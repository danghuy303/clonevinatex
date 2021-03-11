import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-choncaapdungmodal',
  templateUrl: './choncaapdungmodal.component.html',
  styleUrls: ['./choncaapdungmodal.component.css']
})
export class ChoncaapdungmodalComponent implements OnInit {
  ca:any;
  listCa:any = [];
  constructor(private activeModal:NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.listCa);
  }

}

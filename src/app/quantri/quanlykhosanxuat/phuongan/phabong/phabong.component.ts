import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhabongmodalComponent } from '../phabongmodal/phabongmodal.component';

@Component({
  selector: 'app-phabong',
  templateUrl: './phabong.component.html',
  styleUrls: ['./phabong.component.css']
})
export class PhabongComponent implements OnInit {

  constructor(private _modal:NgbModal) { }

  ngOnInit(): void {
  }
  openModal(){
    this._modal.open(PhabongmodalComponent,{
      size:'fullscreen-100'
    })
  }
}

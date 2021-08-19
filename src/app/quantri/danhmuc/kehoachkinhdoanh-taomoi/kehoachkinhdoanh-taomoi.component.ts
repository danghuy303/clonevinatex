import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kehoachkinhdoanh-taomoi',
  templateUrl: './kehoachkinhdoanh-taomoi.component.html',
  styleUrls: ['./kehoachkinhdoanh-taomoi.component.css']
})
export class KehoachkinhdoanhTaomoiComponent implements OnInit {
public items: any =[];
public newitem: any={};
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}

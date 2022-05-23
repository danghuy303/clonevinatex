import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-soicon-baocaoca',
  templateUrl: './soicon-baocaoca.component.html',
  styleUrls: ['./soicon-baocaoca.component.css']
})
export class SoiconBaocaocaComponent implements OnInit {
  @Input('data') item :any={};
  constructor() { }

  ngOnInit(): void {
  }

}

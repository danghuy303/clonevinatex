import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-con2-baocaoca',
  templateUrl: './con2-baocaoca.component.html',
  styleUrls: ['./con2-baocaoca.component.css']
})
export class Con2BaocaocaComponent implements OnInit {
  @Input('data') item :any={};
  constructor() { }

  ngOnInit(): void {
  }

}

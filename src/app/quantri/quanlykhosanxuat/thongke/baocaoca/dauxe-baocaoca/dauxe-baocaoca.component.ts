import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dauxe-baocaoca',
  templateUrl: './dauxe-baocaoca.component.html',
  styleUrls: ['./dauxe-baocaoca.component.css']
})
export class DauxeBaocaocaComponent implements OnInit {
  @Input('data') item :any={};
  constructor() { }

  ngOnInit(): void {
  }

}

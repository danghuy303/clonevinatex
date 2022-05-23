import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gheptho-baocaoca',
  templateUrl: './gheptho-baocaoca.component.html',
  styleUrls: ['./gheptho-baocaoca.component.css']
})
export class GhepthoBaocaocaComponent implements OnInit {
  @Input('data') item :any={};
  constructor() { }

  ngOnInit(): void {
  }

}

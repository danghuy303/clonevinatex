import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bongchai-baocaoca',
  templateUrl: './bongchai-baocaoca.component.html',
  styleUrls: ['./bongchai-baocaoca.component.css']
})
export class BongchaiBaocaocaComponent implements OnInit {
  @Input('data') item :any={};
  constructor() { }

  ngOnInit(): void {
  }

}

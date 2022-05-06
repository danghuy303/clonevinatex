import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chiphilichxichthang',
  templateUrl: './chiphilichxichthang.component.html',
  styleUrls: ['./chiphilichxichthang.component.css']
})
export class ChiphilichxichthangComponent implements OnInit {
  @Input() listTaiSan: any = [];
  constructor() { }

  ngOnInit(): void {
  }

}

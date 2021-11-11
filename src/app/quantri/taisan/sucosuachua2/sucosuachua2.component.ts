import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sucosuachua2',
  templateUrl: './sucosuachua2.component.html',
  styleUrls: ['./sucosuachua2.component.css']
})
export class Sucosuachua2Component implements OnInit {
  @Input("Du_Lieu_Su_Co") Chon_Vao_Su_Co:any={};
  constructor() { }

  ngOnInit(): void {
  }

}

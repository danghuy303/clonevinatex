import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vattuthaythelichxichnam',
  templateUrl: './vattuthaythelichxichnam.component.html',
  styleUrls: ['./vattuthaythelichxichnam.component.css']
})
export class VattuthaythelichxichnamComponent implements OnInit {

  @Input('item') item: any = {};

  constructor() { }

  ngOnInit(): void {
    console.log(this.item);
    
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lichbaoduongcopy',
  templateUrl: './lichbaoduongcopy.component.html',
  styleUrls: ['./lichbaoduongcopy.component.css']
})
export class LichbaoduongcopyComponent implements OnInit {

  listNam: any = [];
  constructor() { }

  ngOnInit(): void {
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
  }

}

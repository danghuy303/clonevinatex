import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nhancong',
  templateUrl: './nhancong.component.html',
  styleUrls: ['./nhancong.component.css']
})
export class NhancongComponent implements OnInit {
  item: any = {};
  newitem: any = {};

  constructor() { }

  ngOnInit(): void {
  }
 add2() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(this.newitem);
    this.newitem = {}
  }
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
}

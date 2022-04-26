import { Component, Input, OnInit } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-vattu',
  templateUrl: './vattu.component.html',
  styleUrls: ['./vattu.component.css']
})
export class VattuComponent implements OnInit {
  @Input('item') item: any = {};
  items: any = [];

  constructor(private _services: SanXuatService) { }

  ngOnInit(): void {
    this.items = this.item[0]?.listVatTu;

  }

}

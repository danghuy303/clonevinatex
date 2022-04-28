import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-taisanbaoduong',
  templateUrl: './taisanbaoduong.component.html',
  styleUrls: ['./taisanbaoduong.component.css']
})
export class TaisanbaoduongComponent implements OnInit, OnChanges {

  @Input() items: any = [];

  constructor(
    private _modal: NgbModal,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit(): void {
  }

  delete(index) {
    // let item = this.items.splice(index, 1)[0];
    // if (item.Id === '' || item.Id === null || item.Id === undefined) {
    // } else {
    //   item.isXoa = true;
    //   this.items.push(JSON.parse(JSON.stringify(item)));
    // }
    this.items.splice(index, 1)
  }

}

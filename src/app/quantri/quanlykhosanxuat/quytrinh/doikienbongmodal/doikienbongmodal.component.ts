import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { deepCopy } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-doikienbongmodal',
  templateUrl: './doikienbongmodal.component.html',
  styleUrls: ['./doikienbongmodal.component.css']
})
export class DoikienbongmodalComponent implements OnInit {
  KeyWord:string='';
  items:any=[];
  CurrentItem:any=[];
  constructor(private _activeModal:NgbActiveModal) { }

  ngOnInit(): void {
  }
  doiKien(item){
    let cloneItem = deepCopy(item);
    item.Ten = this.CurrentItem[0].Ten;
    item.Mic = this.CurrentItem[0].Mic;
    item.Ma = this.CurrentItem[0].Ma;
    this.CurrentItem[0].Ten = cloneItem.Ten;
    this.CurrentItem[0].Ma = cloneItem.Ma;
    this.CurrentItem[0].Mic = cloneItem.Mic;
  }
  accept(){
    this._activeModal.close(this.CurrentItem);
  }
}

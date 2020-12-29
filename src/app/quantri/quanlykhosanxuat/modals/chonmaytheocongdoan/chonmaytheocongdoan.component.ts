import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chonmaytheocongdoan',
  templateUrl: './chonmaytheocongdoan.component.html',
  styleUrls: ['./chonmaytheocongdoan.component.css']
})
export class ChonmaytheocongdoanComponent implements OnInit {
  items:any=[];
  selectedItems:any=[];
  constructor(private _activeModal:NgbActiveModal) { }

  ngOnInit(): void {
    this.selectedItems.forEach(sItem => {
      let selected = this.items.filter(item => sItem.IddmItem === item.Id)[0];
      if (selected) {
        selected.checked = true;
      }
    });
  }
  accept(){
    this._activeModal.close(this.items.filter(ele=>ele.checked).map(
      ele=>{
        return {
          ...ele,
          IddmMay :ele.Id,
          Id:''
        }
      }
    )); 
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-botrimay-chung',
  templateUrl: './botrimay-chung.component.html',
  styleUrls: ['./botrimay-chung.component.css']
})
export class BotrimayChungComponent implements OnInit {
  checkbutton:any={};
  TenCongDoan:any='';
  item:any={
    listItem:[],
  }
  newMay:any={};
   constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal, private _store: StoreService) { }
 
   ngOnInit(): void {
     this.newMay={}
   }
 

}

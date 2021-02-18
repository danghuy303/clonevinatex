import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-botrimay-ong',
  templateUrl: './botrimay-ong.component.html',
  styleUrls: ['./botrimay-ong.component.css']
})
export class BotrimayOngComponent implements OnInit {
 checkbutton:any={};
 item:any={
   listItem:[],
 }
 newMay:any={}
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal, private _store: StoreService) { }

  ngOnInit(): void {
    this.newMay={}
  }

}

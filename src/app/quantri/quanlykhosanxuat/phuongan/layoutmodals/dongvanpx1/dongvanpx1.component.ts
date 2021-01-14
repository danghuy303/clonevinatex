import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-dongvanpx1',
  templateUrl: './dongvanpx1.component.html',
  styleUrls: ['./dongvanpx1.component.css']
})
export class Dongvanpx1Component implements OnInit {
  checkbutton:any={};
  listLoBong:any=[];
  item:any = {};
  block1:any = [];
  block2:any = [];
  block3:any = [];
  block4:any = [];
  poolLoBong:any = [];
  banBong:any = {};
  ngoaiQuan:any = [];
  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService, public _modal: NgbModal) {
  }

  ngOnInit(): void {
    for(let i=1; i<=50;i++){
      this.banBong[`${i}`]={
        _focus:false,
        labelLoBong:'',
        STT:`${i}. `
      }
      if(i<=2){
        this.block1.push(`${i}`)
      }
      if(2<i && i<=16){
        this.block2.push(`${i}`)
      }
      if(16<i &&i<=48){
        this.block3.push(`${i}`)
      }
      if(48<i && i<=50){
        this.block4.push(`${i}`)
      }
    };
    console.log(this.block1)
    console.log(this.block2)
    console.log(this.block3)
    console.log(this.block4)
  }

}

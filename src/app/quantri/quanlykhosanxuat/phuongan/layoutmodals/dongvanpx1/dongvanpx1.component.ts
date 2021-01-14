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
  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService, public _modal: NgbModal) {
  }

  ngOnInit(): void {
  }

}

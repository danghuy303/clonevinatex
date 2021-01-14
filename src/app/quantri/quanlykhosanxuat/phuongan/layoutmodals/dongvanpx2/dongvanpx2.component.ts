import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-dongvanpx2',
  templateUrl: './dongvanpx2.component.html',
  styleUrls: ['./dongvanpx2.component.css']
})
export class Dongvanpx2Component implements OnInit {

  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService, public _modal: NgbModal) {
  }

  ngOnInit(): void {
  }

}

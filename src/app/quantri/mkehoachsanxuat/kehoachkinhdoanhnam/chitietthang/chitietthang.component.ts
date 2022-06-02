import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chitietthang',
  templateUrl: './chitietthang.component.html',
  styleUrls: ['./chitietthang.component.css']
})
export class ChitietthangComponent implements OnInit {

  itemThang: any = {};

  constructor(
    public activeModal: NgbActiveModal,
    private _modal: NgbModal,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

}

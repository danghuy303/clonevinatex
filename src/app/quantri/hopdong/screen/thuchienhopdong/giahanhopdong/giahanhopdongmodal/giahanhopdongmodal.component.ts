import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-giahanhopdongmodal',
  templateUrl: './giahanhopdongmodal.component.html',
  styleUrls: ['./giahanhopdongmodal.component.css']
})
export class GiahanhopdongmodalComponent implements OnInit {

  constructor(    public _modal: NgbModal,
    public _toastr: ToastrService,
 
    private activatedRoute: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private router: Router) { }

  ngOnInit(): void {
  }

}

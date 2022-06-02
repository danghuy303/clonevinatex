import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-danhmucmathang',
  templateUrl: './danhmucmathang.component.html',
  styleUrls: ['./danhmucmathang.component.css']
})
export class DanhmucmathangComponent implements OnInit {

  listMatHang: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private _modal: NgbModal,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

}

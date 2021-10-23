import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-modalthongtinchitiettaisan',
  templateUrl: './modalthongtinchitiettaisan.component.html',
  styleUrls: ['./modalthongtinchitiettaisan.component.css']
})
export class ModalthongtinchitiettaisanComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public toastr: ToastrService) { }

  ngOnInit(): void {
  }

  changeTab(e) {
    // this.trangThai = e.index + 1;
    // this.loaiTab = e.index;
    // this.Loaddata(true);
  }

}

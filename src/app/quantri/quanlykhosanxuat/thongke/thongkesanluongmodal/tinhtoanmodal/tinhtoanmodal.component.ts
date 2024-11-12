import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tinhtoanmodal',
  templateUrl: './tinhtoanmodal.component.html',
  styleUrls: ['./tinhtoanmodal.component.css']
})
export class TinhtoanmodalComponent implements OnInit {
  item: any;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService,) { }

  ngOnInit(): void {
    console.log(this.item);
    this.item = {
      ...this.item,
      ChieuDai_Cuoi: this.item.ChieuDai_Cuoi || 0,
      ChieuDai_Dau: this.item.ChieuDai_Dau || 0
    }
  }

  accept() {
    console.log(this.item);

    try {
      let result = this.item.ChieuDai_Cuoi - this.item.ChieuDai_Dau;
      this.item.ChieuDai = result;
      this.activeModal.close(this.item)
    } catch (error) {
    }

  }
}

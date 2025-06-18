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
    this.item = {
      ...this.item,
      ChieuDai_Cuoi: this.item.ChieuDai_Cuoi || 0,
      ChieuDai_Dau: this.item.ChieuDai_Dau || 0
    }
  }

  accept() {
    try {
      if (this.item.ChieuDai_Cuoi < this.item.ChieuDai_Dau) {
        this.item.ChieuDai = (1000 - this.item.ChieuDai_Dau + this.item.ChieuDai_Cuoi);
      } else this.item.ChieuDai = this.item.ChieuDai_Cuoi - this.item.ChieuDai_Dau;
      this.activeModal.close(this.item)
    } catch (error) {
    }

  }
}

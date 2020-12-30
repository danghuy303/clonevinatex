import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-xuatkhomathangmodal',
  templateUrl: './xuatkhomathangmodal.component.html',
  styleUrls: ['./xuatkhomathangmodal.component.css']
})
export class XuatkhomathangmodalComponent implements OnInit {

  listMatHang: any = []
  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }
  accept() {
    let data: any = []
    this.listMatHang.forEach(element => {
      if (element.checked == true)
        data.push(element);
    });
    this.activeModal.close(
      { data: data}
    );
  }
}

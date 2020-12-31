import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-xuatkhomathangmodal',
  templateUrl: './xuatkhomathangmodal.component.html',
  styleUrls: ['./xuatkhomathangmodal.component.css']
})
export class XuatkhomathangmodalComponent implements OnInit {

  listMatHang: any = [];
  listItem: any = [];
  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    if(this.listItem != undefined && this.listItem!= null && this.listMatHang!= undefined && this.listMatHang!= null)
    {
      this.listItem.forEach(element => {
        var itemFind = this.listMatHang.find(function (obj) {
          return obj.IddmItem == element.IddmItem;
        });
        itemFind.checked = true;
      });
    }
  }
  accept() {
    let data: any = []
    this.listMatHang.forEach(element => {
      if (element.checked == true)
        data.push(element);
    });
    this.activeModal.close(
      { data: data }
    );
  }
}

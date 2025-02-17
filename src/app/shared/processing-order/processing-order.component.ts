import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from '../../services/Taisan/taisan.service';

@Component({
  selector: 'app-processing-order',
  templateUrl: './processing-order.component.html',
  styleUrls: ['./processing-order.component.css']
})
export class ProcessingOrderComponent implements OnInit {

  IdTable: any;
  listUserXuLy: any = [];
  IdTrangThai: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private _service: TaisanService,
  ) { }

  ngOnInit(): void {
    this.GetUsers();
  }

  GetUsers() {
    this._service.GetListUserXuLy(this.IdTable,this.IdTrangThai).then((res: any) => {
      this.listUserXuLy = res.Data;
    })
  }

}

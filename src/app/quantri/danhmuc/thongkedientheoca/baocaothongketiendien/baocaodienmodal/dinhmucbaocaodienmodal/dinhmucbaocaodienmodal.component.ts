import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-dinhmucbaocaodienmodal',
  templateUrl: './dinhmucbaocaodienmodal.component.html',
  styleUrls: ['./dinhmucbaocaodienmodal.component.css']
})
export class DinhmucbaocaodienmodalComponent implements OnInit {

  items: any = [];
  constructor(private _service: SanXuatService, public activeModal: NgbActiveModal, private _toastr: ToastrService,) { }

  ngOnInit(): void {
    console.log("items", this.items);

  }

  handleSave() {
    console.log("items 1", this.items);
    this._service.BaoCao().SetBaoCaoDienHueDinhMuc(this.items[0]).subscribe((res: any) => {
      // this.activeModal.close(res);
      this._toastr.success("Ghi lại thành công!")
    })
  }

}

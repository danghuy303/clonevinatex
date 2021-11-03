import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalthongtinchitiettaisan',
  templateUrl: './modalthongtinchitiettaisan.component.html',
  styleUrls: ['./modalthongtinchitiettaisan.component.css']
})
export class ModalthongtinchitiettaisanComponent implements OnInit {
item: any ;
  constructor(public activeModal: NgbActiveModal, public toastr: ToastrService,  private _serviceTaiSan: TaisanService,) { }

  ngOnInit(): void {
    console.log(this.item.Id)
    this.GetById();
  }

  GetById(){
    this._serviceTaiSan.ListDanhSachTaiSan().Get(this.item.Id).subscribe((res: any) => {
    console.log(res)
    
     })
  }

}

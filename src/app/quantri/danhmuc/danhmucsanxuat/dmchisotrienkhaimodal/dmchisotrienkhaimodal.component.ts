import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dmchisotrienkhaimodal',
  templateUrl: './dmchisotrienkhaimodal.component.html',
  styleUrls: ['./dmchisotrienkhaimodal.component.css']
})
export class DmchisotrienkhaimodalComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  opt: any = "";
  listCongDoan: any = [];
  khongclicknhieu: any = false;
  newTableItem: any = {
    Id: "",
    IddmPhanNhomMay: "",
  };
 
  constructor(private _modal: NgbModal, public activeModal: NgbActiveModal, private sanXuatService: SanXuatService, public toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.GetListCongDoan();
  }
  
  GetListCongDoan() {
    this.sanXuatService.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
  }
  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    this.sanXuatService.dmChiSoTrienKhai().Set(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.khongclicknhieu = !this.khongclicknhieu;
          this.activeModal.close(res.message);
        } else {
          this.khongclicknhieu = !this.khongclicknhieu;
          this.toastr.error(res.message)
        }
      }
    })
  }
}

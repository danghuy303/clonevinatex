import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcedureBase } from 'src/app/services/procedure.base';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-test-quy-trinh',
  templateUrl: './test-quy-trinh.component.html',
  styleUrls: ['./test-quy-trinh.component.css']
})
export class TestQuyTrinhComponent extends ProcedureBase implements OnInit  {

  title: string = 'Test quy trình';
  public item = {Id: "782cbf1b-6efc-4d2b-bd1b-7d4737a0c7bc"};
  public baseService = 'BanGiaoTaiSan';

  constructor(
    public _modal: NgbModal,
    activeModal: NgbActiveModal,
    taisanService: TaisanService,
  ) { 
    super(taisanService, activeModal);
  }

  validate() {
    return true;
  }

  HandleData = () => {
    console.log(123);
  }

  HandleError() {
    console.log('fail');
  }
  
}

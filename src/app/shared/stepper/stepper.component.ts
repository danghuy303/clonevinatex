import { Component, Input, OnInit } from '@angular/core';
import { TaisanService } from '../../services/Taisan/taisan.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcessingOrderComponent } from '../processing-order/processing-order.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  @Input() title: string = '';
  @Input() quyTrinh: any = {};
  listStepper: any = [];

  constructor(
    private _service: TaisanService,
    private _modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.title =  this.title.toUpperCase();
    this.getQuyTrinhSteps();
  }

  getQuyTrinhSteps() {
    let data = {
      IdTable: this.quyTrinh.Id,
      eAction: this.quyTrinh.eAction,
      IdTrangThai: this.quyTrinh.IdTrangThai ? this.quyTrinh.IdTrangThai : '',
      IdUser: localStorage.getItem('IdUser')
    }
    this._service.GetLietKeQuyTrinh(data).subscribe((res: any) => {
      this.listStepper = res;
    })
  }

  openStepDetail() {
    let modalRef = this._modal.open(ProcessingOrderComponent, {
      size: 'lg',
      backdrop: 'static',
    })
    modalRef.componentInstance.IdTable = this.quyTrinh.Id;
    modalRef.componentInstance.IdTrangThai = this.quyTrinh.IdTrangThai;
    modalRef.result
      .then(() => {

      })
  }

}

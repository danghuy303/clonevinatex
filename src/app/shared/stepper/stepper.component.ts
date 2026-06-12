import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TaisanService } from '../../services/Taisan/taisan.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProcessingOrderComponent } from '../processing-order/processing-order.component';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
  
})
export class StepperComponent implements OnInit, OnChanges {

  @Input() title: string = '';
  @Input() quyTrinh: any = {};
  listStepper: any = [];

  constructor(
    private _service: TaisanService,
    private _modal: NgbModal,
    private _auth: AuthenticationService,

  ) { }

  ngOnInit(): void {
    this.title = this.title ? this.title.toUpperCase() : '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['quyTrinh'] && changes['quyTrinh'].currentValue) {
      this.getQuyTrinhSteps();
    }
  }

  getQuyTrinhSteps() {
    console.log("this.quyTrinh", this.quyTrinh);

    let data = {
      IdTable: this.quyTrinh.Id,
      eAction: this.quyTrinh.eAction,
      IdTrangThai: this.quyTrinh.IdTrangThai ? this.quyTrinh.IdTrangThai : '',
      IdUser: this._auth.currentUserValue.Id,
      // IdUser: localStorage.getItem('IdUser') ,
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

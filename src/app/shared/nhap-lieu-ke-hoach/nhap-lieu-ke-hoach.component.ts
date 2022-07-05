import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ConfirmationService } from 'src/app/services/confirmation.service';

@Component({
  selector: 'app-nhap-lieu-ke-hoach',
  templateUrl: './nhap-lieu-ke-hoach.component.html',
  styleUrls: ['./nhap-lieu-ke-hoach.component.css']
})
export class NhapLieuKeHoachComponent implements OnInit, OnChanges {

  @Input() title: any = "";
  @Input() cols: any;
  @Input() serviceName: any;
  @Input() modalName: any;
  items: any = [];
  paging: any = {};

  constructor(
    private sanxuatService: SanXuatService,
    public modal: NgbModal,
    public toast: ToastrService, 
    private confirmService: ConfirmationService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.ResetData();
  }

  ngOnInit(): void {
  }

  ResetData() {
    this.LoadData(true);
  }
  
  LoadData(reset?: boolean) {
    if (reset) {
    }
    this.sanxuatService[this.serviceName]().GetAll().subscribe((res: any) => {
      // console.log("res", res);
      this.items = res.Data;
      this.paging.totalCount = this.items.length;
    })
  }

  add() {
    let modalRef = this.modal.open(this.modalName, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.result
      .then((res: any) => {
        this.ResetData();
      })
      .catch()
      .finally()
  }

  update(item) {
    let modalRef = this.modal.open(this.modalName, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {...item};
    modalRef.result
      .then((res: any) => {
        this.ResetData();
      })
      .catch()
      .finally()
  }

  deleteItem(id) {

  }

}

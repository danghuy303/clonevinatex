import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';
import { ModalluachonbaoduonglichxichtheothangComponent } from '../../modal/modalluachonbaoduonglichxichtheothang/modalluachonbaoduonglichxichtheothang.component';

@Component({
  selector: 'app-taisanlichxichthang',
  templateUrl: './taisanlichxichthang.component.html',
  styleUrls: ['./taisanlichxichthang.component.css']
})
export class TaisanlichxichthangComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  @Input('listTaiSan') listTaiSan: any = [];

  labelThang = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngAfterViewInit(): void {
    this.voiPintable.active();
  }

  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    for (let i = 1; i <= 31; i++) {
      this.labelThang.push(i);
    }
  }

  getBaoDuong(taisan, baoduong) {
    let modalRef = this._modal.open(ModalluachonbaoduonglichxichtheothangComponent, {
      size: 'lg',
      backdrop: 'static',
    })
    modalRef.componentInstance.taiSan = taisan;
    modalRef.componentInstance.listItemDaChon =  baoduong.listChiTiet ?  baoduong.listChiTiet.map(ele => ele?.IddmLoaiBaoDuong) : [];
    modalRef.result.then((res: any) => {
      // baoduong.listLoaiBaoDuong = res;
      baoduong.listChiTiet = res;
     
    })
      .catch(error => {
      })
      .finally()
  }

}

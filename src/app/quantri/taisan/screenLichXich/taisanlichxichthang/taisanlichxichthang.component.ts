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
  @Input('soNgay') soNgay: any = 0;
  @Input('ThoiGianDaChon') thoiGianDaChon:any;
  labelThang = [];
  selectedItems = [];
  copyItemsBaoDuong = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.labelThang = [];
    for (let i = 1; i <= this.soNgay; i++) {
      this.labelThang.push(i);
    }
  }
  ngAfterViewInit(): void {
    this.voiPintable.active();
  }

  ngOnInit(): void {

  }

  getBaoDuong(taisan, baoduong) {
    let modalRef = this._modal.open(ModalluachonbaoduonglichxichtheothangComponent, {
      size: 'lg',
      backdrop: 'static',
    })
    modalRef.componentInstance.taiSan = taisan;
    modalRef.componentInstance.thoiGianDaChon = this.thoiGianDaChon;
    // modalRef.componentInstance.listItemDaChon =  baoduong.listChiTiet ?  baoduong.listChiTiet.map(ele => ele?.IddmLoaiBaoDuong) : [];
    modalRef.componentInstance.listItemDaChon = this.selectedItems;
    modalRef.componentInstance.copyItemsBaoDuong = this.copyItemsBaoDuong;
    modalRef.result
      .then((res: any) => {
        baoduong.listChiTiet = res;
        taisan.listBaoDuong.forEach(ele => {
          ele?.listChiTiet.forEach(obj => {
            this.copyItemsBaoDuong = obj;
            this.selectedItems.push(obj.IddmLoaiBaoDuong)
          })
        })
      })
      .catch(error => {
      })
      .finally()
  }
}

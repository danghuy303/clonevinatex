import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { deepCopy } from 'src/app/services/globalfunction';
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
  @Input('checkBtnChonTaiSan') checkBtnChonTaiSan: boolean;
  @Input('soNgay') soNgay: any = 0;
  @Input('ThoiGianDaChon') thoiGianDaChon: any;
  keyword: string;
  labelThang = [];
  selectedItems = [];
  copyItemsBaoDuong = [];
  listDaChon: any = [];

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
    // this.voiPintable.active();
  }

  ngOnInit(): void {

  }

  check(e, index, list) {
    list.forEach(ele => {
      ele.isChon = false;
    })
    list[index].isChon = e.checked;
  }

  resetFilter() {
    this.keyword = '';
  }

  handlDel() {
    this.listTaiSan.forEach(ele => {
      if (ele.listBaoDuongThang) {
        ele.listBaoDuongThang = ele.listBaoDuongThang.filter(obj => !obj.checked);
      }
    });

    let i = this.listTaiSan.length;
    while (i--) {
      if (!this.listTaiSan[i].listBaoDuongThang || this.listTaiSan[i].listBaoDuongThang.length === 0) {
        this.listTaiSan.splice(i, 1);
      }
    }
    console.log("this.listTaiSan", this.listTaiSan);
  }
}

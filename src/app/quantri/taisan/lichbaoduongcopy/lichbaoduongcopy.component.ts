import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { vn } from 'src/app/services/const';
import { DateToUnix } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-lichbaoduongcopy',
  templateUrl: './lichbaoduongcopy.component.html',
  styleUrls: ['./lichbaoduongcopy.component.css']
})
export class LichbaoduongcopyComponent implements OnInit {

  @Input('item') item: any = { isChonNam: 0, };
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(PintableDirective) voiPintable: PintableDirective;

  listNam: any = [];
  items: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  itemsThang: any = [];
  labelThang: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  constructor(
    public _modal: NgbModal,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    console.log(this.item)
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    this._serviceTaiSan.ChiTietTaiSanLichBaoDuong().GetNam(this.item.Id, DateToUnix(this.item.Ngay)).subscribe((res: any) => {
      this.items = res.Data;
    })
  }
  isChon(item) {
    item.isChonNam = 0;
  }
  isChonNam(item) {
    item.isChonThang = 0;
    // this._serviceTaiSan.ChiTietTaiSanLichBaoDuong().GetNam(this.item.Id,DateToUnix(this.item.Ngay)).subscribe((res: any) => {
    //   this.items = res.Data;
    // })
  }
  isChonThang(item) {
    item.isChonNam = 1;
    this._serviceTaiSan.ChiTietTaiSanLichBaoDuong().GetThang(this.item.Id).subscribe((res: any) => {
      this.itemsThang = res.Data;
    })
  }
}

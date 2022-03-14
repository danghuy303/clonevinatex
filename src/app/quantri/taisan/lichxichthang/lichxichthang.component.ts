import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-lichxichthang',
  templateUrl: './lichxichthang.component.html',
  styleUrls: ['./lichxichthang.component.css']
})
export class LichxichthangComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  item: any = {};
  items: any = [];
  labelThang: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
  constructor(public _modal: NgbModal,
    private _serviceTaiSan: TaisanService,) { }

  ngOnInit(): void {
    let data = {
      Keyword: "", CurrentPage: 0, PageSize: 20, MaCongDoan: '', IdBoPhanSuDung: '',
      IddmLoaiTaiSan: '', IdUser: '', Ngay: 0, LoaiKeHoach: '',
      IdDuAn: 0,
    };
    this._serviceTaiSan.ListLichXichThang().GetList(data).subscribe((res: any) => {
      this.items = res.Data;
    })
  }
}

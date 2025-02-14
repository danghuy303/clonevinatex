import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from '../../../../services/Taisan/taisan.service';

@Component({
  selector: 'app-nhacungcapvahangphaimua',
  templateUrl: './nhacungcapvahangphaimua.component.html',
  styleUrls: ['./nhacungcapvahangphaimua.component.css']
})
export class NhacungcapvahangphaimuaComponent implements OnInit {

  title: string = '';
  listView: any = [];
  isChon: any =null;

  constructor(
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
  }

  ChapNhan() {
    this.activeModal.close(this.listView.find(ele => ele.IddmNhaCungUng === this.isChon));
  }

}

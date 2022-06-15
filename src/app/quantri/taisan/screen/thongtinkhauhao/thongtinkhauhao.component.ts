import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-thongtinkhauhao',
  templateUrl: './thongtinkhauhao.component.html',
  styleUrls: ['./thongtinkhauhao.component.css']
})
export class ThongtinkhauhaoComponent implements OnInit {

  @Input() item: any = {};
  listKhauHao: any = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.GetList();
  }
  GetList() {
    this._serviceTaiSan.KhauHaoTaiSan().GetListKhauHaoByIdTaiSan(this.item.Id).subscribe((res: any) => {
      this.listKhauHao = res.Data;
    })
  }
}

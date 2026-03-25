import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-danh-sach-theo-nhom-may',
  templateUrl: './danh-sach-theo-nhom-may.component.html',
  styleUrls: ['./danh-sach-theo-nhom-may.component.css']
})
export class DanhSachTheoNhomMayComponent implements OnInit {

  title: string = '';
  listTaiSan: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {

  }

  GhiLai() {
    this.activeModal.close(this.listTaiSan);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalcapnhattaisancon',
  templateUrl: './modalcapnhattaisancon.component.html',
  styleUrls: ['./modalcapnhattaisancon.component.css']
})
export class ModalcapnhattaisanconComponent implements OnInit {

  opt: any = "";
  title: any = "";
  lang: any = vn;
  uploader: FileUploader;
  // newTableItem: any = {};
  listDonVi: any = [];
  listLoaiTaiSan: any = [];
  listTinhTrangTaiSan: any = [];
  listNhaSanXuat: any = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    if (this.opt === 'add') {
      this.title = "Thêm mới tài sản con";
    }
    else {
      this.title = "Cập nhật tài sản con";
    }
  }

  GhiLai() {

  }

}

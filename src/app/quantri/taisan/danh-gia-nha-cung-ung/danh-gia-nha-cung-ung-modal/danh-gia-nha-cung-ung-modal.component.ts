import { Component, OnInit } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemNhaCungUngModalComponent } from '../them-nha-cung-ung-modal/them-nha-cung-ung-modal.component';
import { SuaNhaCungUngModalComponent } from '../sua-nha-cung-ung-modal/sua-nha-cung-ung-modal.component';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-danh-gia-nha-cung-ung-modal',
  templateUrl: './danh-gia-nha-cung-ung-modal.component.html',
  styleUrls: ['./danh-gia-nha-cung-ung-modal.component.css']
})
export class DanhGiaNhaCungUngModalComponent implements OnInit {

  title: any;
  item:any = {};
  items: any[] = [];
  filter: any = {};
  opt: any = "";
  checkbutton: any = {};
  paging: any = {};
  listTinhTrang: any[] = [];
  listPheDuyet: any[] = [];
  user: any;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
    private _serviceSanXuat: SanXuatService,
    private _serviceAuth: AuthenticationService,
  ) { 
    this.listTinhTrang = [
      { id: 'HIENHANH', label: 'Hiện hành'},
      { id: 'TIEMNANG', label: 'Tiềm năng'},
      { id: 'CHAMDUT', label: 'Chấm dứt'}
    ];
    this.listPheDuyet = [
      { id: 'DUYET', label: 'Phê duyệt' },
      { id: 'CHUADUYET', label: 'Chưa phê duyệt' },
    ]
    this.item.user = this._serviceAuth.currentUserValue;
  }

  ngOnInit(): void {
    if (this.opt === 'add') {
      this.title = "Thêm mới";
      this.GetNextSoQuyTrinh();
    }
    else {
      this.title = "Cập nhật";
      // this.GetIem();
    }
    this.KiemTraButtonModal();
    this.ResetFilter();
  }

  ResetFilter() {
    this.filter = {};
    this.GetListNhaCungUng(true);
  }

  GetListNhaCungUng(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    // let data = {
    //   CurrentPage: this.paging.currentPage,
    //   PageSize: 20,
    //   Keyword: this.filter.keyword,
    // }
    // this._serviceTaiSan.NhaCungUng().GetList(data).subscribe((res: any) => {
    //   // console.log(res);
    //   this.items = res.Data.Items;
    //   this.paging.TotalCount = res.Data.TotalCount;
    // })
    this.paging.TotalCount = this.items.length;
  }

  AddNhaCungUng() {
    let modalRef = this._modal.open(ThemNhaCungUngModalComponent, {
      size: "xl",
      backdrop: "static"
    })
    modalRef.result
      .then((res: any) => {
        this.items = res;
        this.GetListNhaCungUng();
        this.paging.TotalCount = this.items.length;
      })
      .catch(er => {})
      .finally()
  }

  KiemTraButtonModal() {
    this._serviceSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.DanhGiaNhaCungUng().GetNextSoQuyTrinh().subscribe((res: any)=> {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  SetNhaCungUng(item) {
    let modalRef = this._modal.open(SuaNhaCungUngModalComponent, {
      size: 'xl',
      backdrop: 'static',
    })
    modalRef.componentInstance.item = item;
  }

  DeleteNhaCungUng(id: string) {
    let idItem = this.items.findIndex(item => item.id === id);
    this.items.splice(idItem, 1);
  }

  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.GetListNhaCungUng(false);
  }

}

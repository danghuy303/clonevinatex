import { Component, OnInit, ViewChild } from '@angular/core';
import { DanhmuckhocungungmodalComponent } from './danhmuckhocungungmodal/danhmuckhocungungmodal.component';
import { ModalthongbaoComponent } from '../../../modal/modalthongbao/modalthongbao.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhmuctaisanService } from '../../../../services/Taisan/danhmuctaisan.service';

@Component({
  selector: 'app-danhmuckhocungung',
  templateUrl: './danhmuckhocungung.component.html',
  styleUrls: ['./danhmuckhocungung.component.css']
})
export class DanhmuckhocungungComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  fileUpload: any;
  items: any = [];
  Keyword: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  selectedItems: any = [];
  listCongDoan: any = [];
  filter: any = {};

  constructor(
    private _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    private _toastr: ToastrService
  ) { }

  ngOnInit() {
    this.GetList();
  }

  resetFilter() {
    this.filter = {};
    this.Keyword = '';
    this.GetList(true);
  }
  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      Keyword: this.Keyword,
      IdDuAn: this.filter.IdDuAn ? this.filter.IdDuAn : 0,
    };
    this._danhMucTaiSan.GetlistdmKho().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
      this.paging.CurrentPage = res.Data.Page;
    })
  }
  add() {
    let modalRef = this._modal.open(DanhmuckhocungungmodalComponent, {
      backdrop: 'static',
      size: "lg",
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới kho';
    modalRef.componentInstance.listCongDoan = this.listCongDoan;
    modalRef.result.then(res => {
      this.GetList()
    }).catch(er => console.log(er))
  }
  edit(item) {
    let modalRef = this._modal.open(DanhmuckhocungungmodalComponent, {
      backdrop: 'static',
      size: "lg",
    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật kho';
    modalRef.componentInstance.listCongDoan = this.listCongDoan;
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res => {
      this.GetList()
    }).catch(er => console.log(er))
  }

  deleteAll() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    const listId = this.selectedItems.map(({ Id }) => Id);
    modalRef.result.then(res => {
      this._danhMucTaiSan.GetlistdmKho().Delete(listId).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetList();
            this.selectedItems = [];
          } else {
            this._toastr.error(res.Message);
          }
        }
      })
    }).catch(er => console.log(er))
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

}
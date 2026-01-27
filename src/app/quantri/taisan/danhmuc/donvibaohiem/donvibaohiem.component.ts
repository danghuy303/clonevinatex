import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../../../app/quantri/modal/modalthongbao/modalthongbao.component';
import { DanhmuctaisanService } from '../../../../services/Taisan/danhmuctaisan.service';
import { UploadmodalComponent } from '../../../../../app/quantri/modal/uploadmodal/uploadmodal.component';
import { DonvibaohiemodalComponent } from './donvibaohiemodal/donvibaohiemodal.component';

@Component({
  selector: 'app-donvibaohiem',
  templateUrl: './donvibaohiem.component.html',
  styleUrls: ['./donvibaohiem.component.css']
})
export class DonvibaohiemComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  Keyword: any = '';
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 0 };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '150px',
      align: ''
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '200px',
      align: ''
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '',
      align: ''
    }
  ];
  selectedItems: any = [];
  fileUpload: any;

  constructor(private _modal: NgbModal, private _danhMucTaiSan: DanhmuctaisanService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetList();
  }
  resetFilter() {
    this.Keyword = '';
    this.GetList(true);
  }
  GetList(reset?: any) {
    if (reset) {
      this.paging.Page = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.Page,
      Keyword: this.Keyword,
      Ma: "",
      Ten: ""
    };
    this._danhMucTaiSan.DonViBaoHiem().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  add() {
    let modalRef = this._modal.open(DonvibaohiemodalComponent, {
      backdrop: 'static', size: 'lg',
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới đơn vị bảo hiểm';
    modalRef.result.then(res => {
      this.GetList()
    }).catch(er => console.log(er))
  }
  edit(item: any) {
    let modalRef = this._modal.open(DonvibaohiemodalComponent, {
      backdrop: 'static', size: 'lg',
    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật đơn vị bảo hiểm';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res => {
      this.GetList()
    }).catch(er => console.log(er))
  }
  delete(item: any) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._danhMucTaiSan.DonViBaoHiem().Delete([item.Id]).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetList();
          } else {
            this._toastr.error(res.Message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
  changePage(event: any) {
    this.paging.Page = event.page + 1;
    this.GetList()
  }

  deleteAll() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    const listId = this.selectedItems.map((ele: any) => ele.Id);
    modalRef.result.then(res => {
      this._danhMucTaiSan.DanhMucLoaiTaiSan().DeleteList(listId).subscribe((res: any) => {
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
  importExcel() {
    let modalRef = this._modal.open(UploadmodalComponent, {
      size: 'md',
      backdrop: 'static',
    })
    modalRef.componentInstance.type = "excel";
    modalRef.componentInstance.single = true;
    modalRef.componentInstance.onlyExcel = true;
    modalRef.result
      .then((res: any) => {
        console.log(res);
        this.fileUpload = res;
        this._danhMucTaiSan.DonViBaoHiem().Importdm(this.fileUpload[0].Name).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.resetFilter();
          } else {
            this._toastr.error(res.Message);
          }
        })
      })
      .catch(er => { })
      .finally(() => {
      })
  }
  exportExcel() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      Keyword: this.Keyword,

    };
    this._danhMucTaiSan.DonViBaoHiem().Exportdm(data).subscribe((res: any) => {
      this._danhMucTaiSan.DonViBaoHiem().download(res.Data);
    })
  }

}

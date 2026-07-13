import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { ModaldmcasanxuatComponent } from '../../modal/modaldmcasanxuat/modaldmcasanxuat.component';
import { QuantriComponent } from 'src/app/quantri/quantri.component';

@Component({
  selector: 'app-dmcasanxuat',
  templateUrl: './dmcasanxuat.component.html',
  styleUrls: ['./dmcasanxuat.component.css']
})
export class DanhmuccasanxuatComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter: any = {};
  Keyword: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  get listCongTy(): any[] {
    return this.quantri.listNhaMay || [];
  }
  IdCongTy: any = null;
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '100px',
      align: 'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '150px',
      align: 'left'
    },
    {
      header: 'Tên công ty',
      field: 'TenCongTy',
      width: '150px',
      align: 'left'
    },
    {
      header: 'Tên nhà máy',
      field: 'TendmPhanXuong',
      width: '150px',
      align: 'left'
    },
    {
      header: 'Số giờ làm việc',
      field: 'SoGioLamViec',
      width: '120px',
      align: 'center'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px',
      align: 'left'
    }
  ];
  fileUpload: any;
  selectedItems: any = [];

  constructor(
    private _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    private _toastr: ToastrService,
    public quantri: QuantriComponent
  ) { }

  ngOnInit(): void {
    this.GetList();
  }


  resetFilter() {
    this.filter = {};
    this.IdCongTy = null;
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
      Keyword: this.filter.Keyword,
      Ma: "",
      Ten: "",
      IdCongTy: this.IdCongTy
    };
    this._danhMucTaiSan.DanhMucCaSanXuat().GetListdmCaSanXuatForDanhMuc(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    });
  }

  add() {
    let modalRef = this._modal.open(ModaldmcasanxuatComponent, {
      backdrop: 'static',
      size: 'lg',
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới ca sản xuất';
    modalRef.componentInstance.listCongTy = this.listCongTy;
    modalRef.result.then(res => {
      this.GetList();
    }).catch(er => console.log(er));
  }

  edit(item) {
    let modalRef = this._modal.open(ModaldmcasanxuatComponent, {
      backdrop: 'static',
      size: 'lg',
    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật ca sản xuất';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.listCongTy = this.listCongTy;
    modalRef.result.then(res => {
      this.GetList();
    }).catch(er => console.log(er));
  }

  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._danhMucTaiSan.DanhMucCaSanXuat().DeleteList([item.Id]).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetList();
          } else {
            this._toastr.error(res.Message);
          }
        }
      });
    }).catch(er => console.log(er));
  }

  deleteAll() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    const listId = this.selectedItems.map(({ Id }) => Id);
    modalRef.result.then(res => {
      this._danhMucTaiSan.DanhMucCaSanXuat().DeleteList(listId).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.GetList();
            this.selectedItems = [];
          } else {
            this._toastr.error(res.Message);
          }
        }
      });
    }).catch(er => console.log(er));
  }

  importExcel() {
    let modalRef = this._modal.open(UploadmodalComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.type = "excel";
    modalRef.componentInstance.single = true;
    modalRef.componentInstance.onlyExcel = true;
    modalRef.result
      .then((res: any) => {
        this.fileUpload = res;
        this._danhMucTaiSan.DanhMucCaSanXuat().Importdm(this.fileUpload[0].Name).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.resetFilter();
          } else {
            this._toastr.error(res.Message);
          }
        });
      })
      .catch(er => { });
  }

  exportExcel() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      Keyword: this.Keyword,
    };
    this._danhMucTaiSan.DanhMucCaSanXuat().Exportdm(data).subscribe((res: any) => {
      this._danhMucTaiSan.DanhMucCaSanXuat().download(res.Data);
    });
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { LoaiCongViecBaoDuongModalComponent } from '../../modal/loai-cong-viec-bao-duong-modal/loai-cong-viec-bao-duong-modal.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loai-cong-viec-bao-duong',
  templateUrl: './loai-cong-viec-bao-duong.component.html',
  styleUrls: ['./loai-cong-viec-bao-duong.component.css']
})
export class LoaiCongViecBaoDuongComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  Keyword: any = '';
  filter: any = {};
  MaCongDoan: any = '';
  fileUpload: any;
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 0 };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '350px',
      align: 'center'
    },
    {
      header: 'Nội dung',
      field: 'Ten',
      width: '300px',
      align: 'center'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '200px',
      align: 'center'
    },
  ];
  selectedItems: any = [];
  listCongDoan: any = [];
  constructor(private _modal: NgbModal,
     private _danhMucTaiSan: DanhmuctaisanService,
     private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetList();
  }
  
  resetFilter() {
    this.filter = {};
    this.GetList(true);
  }
  GetList(reset?) {
    if (reset) {
      this.paging.Page = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      Keyword: this.filter.Keyword,
      MaCongDoan: this.filter.MaCongDoan ? this.filter.MaCongDoan : '',

    };
    this._danhMucTaiSan.LoaiThucHienBaoDuong().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
      this.paging.TotalPages = res.Data.TotalPages;
    })
  }
  add() {
    let modalRef = this._modal.open(LoaiCongViecBaoDuongModalComponent, {
      backdrop: 'static',
      size: 'lg',

    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới loại công việc bảo dưỡng';
    modalRef.result.then(res => {
      this.GetList()
    }).catch(er => console.log(er))
  }
  edit(item) {
    let modalRef = this._modal.open(LoaiCongViecBaoDuongModalComponent, {
      backdrop: 'static',
      size: 'lg',

    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật loại công việc bảo dưỡng';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then(res => {
      this.GetList()
    }).catch(er => console.log(er))
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._danhMucTaiSan.LoaiThucHienBaoDuong().DeleteList([item.Id]).subscribe((res: any) => {
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
  deleteAll() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    const listId = this.selectedItems.map(({ Id }) => Id);
    modalRef.result.then(res => {
      this._danhMucTaiSan.LoaiThucHienBaoDuong().DeleteList(listId).subscribe((res: any) => {
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
        this.fileUpload = res;
        console.log(res);
        
        this._danhMucTaiSan.LoaiThucHienBaoDuong().Importdm(this.fileUpload[0].Name).subscribe((res: any) => {
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
    this._danhMucTaiSan.LoaiThucHienBaoDuong().Exportdm(data).subscribe((res: any) => {
      this._danhMucTaiSan.DanhMucLoaiTaiSan().download(res.Data);
    })
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

}

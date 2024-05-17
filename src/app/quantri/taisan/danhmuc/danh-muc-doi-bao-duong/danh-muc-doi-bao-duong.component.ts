import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DanhMucDoiBaoDuongModalComponent } from '../../modal/danh-muc-doi-bao-duong-modal/danh-muc-doi-bao-duong-modal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-danh-muc-doi-bao-duong',
  templateUrl: './danh-muc-doi-bao-duong.component.html',
  styleUrls: ['./danh-muc-doi-bao-duong.component.css']
})
export class DanhMucDoiBaoDuongComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  fileUpload: any;
  items: any = [];
  Keyword: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: '200px',
      align: 'center'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: '200px',
      align: 'center'
    },
    {
      header: 'Nội dung',
      field: 'NoiDung',
      width: '200px',
      align: 'center'
    },
    {
      header: 'Công đoạn',
      field: 'ThoiGianVaSoNguoiThucTe',
      width: '200px',
      align: 'center'
    }
  ];
  selectedItems: any = [];
  listCongDoan: any = [];
  filter: any = {};

  constructor(private _modal: NgbModal, private _danhMucTaiSan: DanhmuctaisanService, private _toastr: ToastrService,private _servicesSanXuat: SanXuatService,) { }

  ngOnInit() {
    this.GetList();
    let data = { PageSize: 20, CurrentPage: this.paging.CurrentPage, Keyword: this.Keyword, };
    this.getListCongDoan();
  }

  getListCongDoan() {
    this._servicesSanXuat.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
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
      MaCongDoan: this.filter.MaCongDoan ? this.filter.MaCongDoan : '',
    };
    this._danhMucTaiSan.DoiBaoDuong().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  add() {
    let modalRef = this._modal.open(DanhMucDoiBaoDuongModalComponent, {
      backdrop: 'static',
      size: "lg",
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới đội bảo dưỡng';
    modalRef.componentInstance.listCongDoan = this.listCongDoan;
    modalRef.result.then(res => {
      this.GetList()
    }).catch(er => console.log(er))
  }
  edit(item) {
    let modalRef = this._modal.open(DanhMucDoiBaoDuongModalComponent, {
      backdrop: 'static',
      size: "lg",
    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật đội bảo dưỡng';
    modalRef.componentInstance.listCongDoan = this.listCongDoan;
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
      this._danhMucTaiSan.DoiBaoDuong().DeleteList([item.Id]).subscribe((res: any) => {
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
      this._danhMucTaiSan.DoiBaoDuong().DeleteList(listId).subscribe((res: any) => {
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
  
  importExcel(){
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
        this._danhMucTaiSan.DanhMucLoaiBaoDuong().Importdm(this.fileUpload[0].Name).subscribe((res: any)=>{
          if (res.StatusCode === 200) {
            this._toastr.success(res.Message);
            this.resetFilter();
          } else {
            this._toastr.error(res.Message);
          }
        })
      })
      .catch(er => {})
      .finally(()=> {
      })
  }
  exportExcel() {
    let data = {
      PageSize:20, 
      CurrentPage:0,
      Keyword:this.Keyword, 
    };
    this._danhMucTaiSan.DanhMucLoaiBaoDuong().Exportdm(data).subscribe((res: any) => {
      this._danhMucTaiSan.DanhMucLoaiBaoDuong().download(res.Data);
    })
  }
  
  changePage(event) {
    this.paging.CurrentPage = event.page+1;
    this.GetList()
  }

}

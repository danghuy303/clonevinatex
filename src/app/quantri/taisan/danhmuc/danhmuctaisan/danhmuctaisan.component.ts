import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown } from '../../../../services/globalfunction'
import { SanXuatService } from '../../../../services/callApiSanXuat'
import { DanhmuctaisanService } from '../../../../services/Taisan/danhmuctaisan.service'
import { ModalthongbaoComponent } from '../../../../quantri/modal/modalthongbao/modalthongbao.component'
import { DanhmuctaisanmodalComponent } from './danhmuctaisanmodal/danhmuctaisanmodal.component';


@Component({
  selector: 'app-danhmuctaisan',
  templateUrl: './danhmuctaisan.component.html',
  styleUrls: ['./danhmuctaisan.component.css']
})
export class DanhmuctaisanComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  Keyword: any = '';
  filter: any = {};
  MaCongDoan: any = '';
  fileUpload: any;
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 0 };
  cols: any = [
    {
      header: 'Tên',
      field: 'Ten',
      width: '150px',
      align: 'center'
    },
    {
      header: 'Mã loại vật tư',
      field: 'Ma',
      width: '150px',
      align: 'center'
    },
    {
      header: 'Tên loại vật tư',
      field: 'TendmLoaiTaiSan',
      width: '150px',
      align: 'center'
    },
    {
      header: 'Catalog No.',
      field: 'Catalog',
      width: '150px',
      align: 'center'
    },
    {
      header: 'Part No.',
      field: 'PartNo',
      width: '150px',
      align: 'center'
    },
    {
      header: 'Xuất xứ',
      field: 'NuocSanXuat',
      width: '150px',
      align: 'center'
    },
    {
      header: 'Tuổi thọ',
      field: 'TuoiTho',
      width: '150px',
      align: 'center'
    },
    {
      header: 'Vị trí',
      field: 'ViTri',
      width: '150px',
      align: 'center'
    },
    {
      header: 'Địa chỉ giá kho',
      field: 'DiaChiGiaKho',
      width: '150px',
      align: 'center'
    },
    {
      header: 'Đơn vị tính',
      field: 'DonViTinh',
      width: '150px',
      align: 'center'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: '150px',
      align: 'center'
    }
  ];
  selectedItems: any = [];
  listCongDoan: any = [];
  constructor(private _modal: NgbModal, private _danhMucTaiSan: DanhmuctaisanService, private _services: SanXuatService, private _toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetList();
    this.getListCongDoan();
  }
  getListCongDoan() {
    this._danhMucTaiSan.GetlistCongDoan().GetList().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res.Data, "Ten", "Ma");
    })
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
    };
    this._danhMucTaiSan.DanhMucTaiSan().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
      this.paging.TotalPages = res.Data.TotalPages;
    })
  }
  add() {
    let modalRef = this._modal.open(DanhmuctaisanmodalComponent, {
      backdrop: 'static',
      size: 'xl',

    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới Nhóm tài sản/vật tư';
    modalRef.result.then(res => {
      this.GetList()
    }).catch(er => console.log(er))
  }
  edit(item) {
    // this._danhMucTaiSan.DanhMucTaiSan().ById(item.Id).subscribe((res: any) => {
      let modalRef = this._modal.open(DanhmuctaisanmodalComponent, {
        backdrop: 'static',
        size: 'xl',

      });
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.type = 'capnhat';
      modalRef.componentInstance.title = 'Cập nhật Nhóm tài sản/vật tư';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
      modalRef.result.then(res => {
        this.GetList()
      }).catch(er => console.log(er))
    // })
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._danhMucTaiSan.DanhMucTaiSan().DeleteList([item.Id]).subscribe((res: any) => {
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
      this._danhMucTaiSan.DanhMucTaiSan().DeleteList(listId).subscribe((res: any) => {
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

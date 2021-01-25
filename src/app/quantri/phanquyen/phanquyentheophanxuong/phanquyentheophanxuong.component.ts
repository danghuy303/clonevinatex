import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { PhanquyentheophanxuongmodalComponent } from '../phanquyentheophanxuongmodal/phanquyentheophanxuongmodal.component';

@Component({
  selector: 'app-phanquyentheophanxuong',
  templateUrl: './phanquyentheophanxuong.component.html',
  styleUrls: ['./phanquyentheophanxuong.component.css']
})
export class PhanquyentheophanxuongComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [
  ];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
  keyWord:any='';
  filter:any={
  };
  cols: any = [
    {
      header: 'Tên user',
      field: 'TenUser',
      width: 'unset',
      align: 'center'
    },
    {
      header: 'Tên phân xưởng',
      field: 'TendmPhanXuong',
      width: 'unset',
      center: 'left'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset',
      center: 'center'
    }
  ];
  selectedItems: any = [];
  dataSearch: any = {};
  userInfo: any;
  listPhanXuong: any = [];

  constructor(private _modal: NgbModal, private _services: SanXuatService, 
    private _toastr: ToastrService, private _auth: AuthenticationService) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    this.GetDanhSachDuAnByIdUser();
    this.GetListdm();
  }

  resetFilter() {
    this.keyWord = '';
    this.GetListdm()
  }

  GetDanhSachDuAnByIdUser() {
    this._services.GetOptions().GetPhanXuong(this.userInfo.Id).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetListdm(reset?) {
    // if (reset) {
    //   this.paging.CurrentPage = 1;
    //   this.paginator.changePage(0);
    // }
    // this.dataSearch = {
    //   PageSize: 20,
    //   CurrentPage: this.paging.CurrentPage,
    //   sFilter: this.keyWord,
    //   Ma: "",
    //   Ten: ""
    // };
    // this._services.dmPhanNhomMaySanXuat().GetList().subscribe((res: any) => {
    //   this.items = res;
    //   // this.items.forEach(element => {
    //   //   this.listnhamay.filter(obj => {
    //   //     if (element.idNhaMay == obj.value) {
    //   //       element.TenNhaMay = obj.label;
    //   //     }
    //   //   });
    //   //   this.listphanxuong.filter(obj => {
    //   //     if (element.idPhanXuong == obj.value) {
    //   //       element.TenPhanXuong = obj.label;
    //   //     }
    //   //   });
    //   // });
    //   // this.paging = res.paging;
    // })
  }
  add() {
    let modalRef = this._modal.open(PhanquyentheophanxuongmodalComponent, {
      size: "xl",
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {
      Id: '',
      lstdmItem: []
    }
    modalRef.result.then(res => {
      // this._toastr.success(res);
      this.GetListdm()
    }).catch(er => console.log(er))
  }
  edit(item) {
    this._services.dmPhanNhomMaySanXuat().Get(item.Id).subscribe((res: any) => {
      let modalRef = this._modal.open(PhanquyentheophanxuongmodalComponent, {
        size: "xl",
        backdrop: 'static'
      });
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = res;
      modalRef.result.then(res => {
        // this._toastr.success(res);
        this.GetListdm()
      }).catch(er => console.log(er))
    })
  }
  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._services.dmPhanNhomMaySanXuat().Delete(item.Id).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this._toastr.success(res.message);
            this.GetListdm();
          } else {
            this._toastr.error(res.message);
          }
        }
      })
    }).catch(er => console.log(er))
  }
 
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetListdm();
  }
 
}

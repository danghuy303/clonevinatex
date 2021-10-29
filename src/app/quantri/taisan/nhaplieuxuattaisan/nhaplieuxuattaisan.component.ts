import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, formatdate, UnixToDate } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-nhaplieuxuattaisan',
  templateUrl: './nhaplieuxuattaisan.component.html',
  styleUrls: ['./nhaplieuxuattaisan.component.css']
})
export class NhaplieuxuattaisanComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  filter: any = {};
  listnhamay: any = [];
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  userInfo: any;
  constructor(public _modal: NgbModal,public store:StoreService, 
    public _toastr: ToastrService, 
    private _service: SanXuatService,
     private activatedRoute: ActivatedRoute, 
     private router: Router, 
     private _auth: AuthenticationService) {this.userInfo = this._auth.currentUserValue}

  ngOnInit(): void {
    this.resetFilter();
  }
  
  GetList(reset?) {
    let data = {
      sFilter: this.filter.KeyWord,
      TuNgay: (new Date(this.filter.TuNgay).getTime() / 1000) || 0,
      DenNgay: (new Date(this.filter.DenNgay).getTime() / 1000) || 0,
      IdDuAn: this.filter.IddmItem
    }
    this._service.ThongKeDien().GetList(data).subscribe((res: any) => {
      this.items = res;
      this.items.lstNgay.forEach(element => {
        element.NgayNhap = element.NgayNhapUnix > 0 ? element.NgayNhap : null;
      });
    })
  }

  GetDanhSachDuAnByIdUser() {
    this._service.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res: any) => {
      this.listnhamay = mapArrayForDropDown(res, 'TenDuAn', 'Id');
    })
  }

  update(item) {
    this._service.ThongKeDien().Get(item).subscribe((res: any) => {
      let modalRef = this._modal.open( {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = res;
      modalRef.result.then((res: any) => {
        // this._toastr.success('Cập nhật thành công');
        this.GetList();
      })
        .catch(er => { console.log(er) })
    })
  } 
  resetFilter() {
    this.filter = {};
    let d = new Date();
    this.filter.DenNgay = new Date();
    d.setDate(this.filter.DenNgay.getDate() - 7);
    this.filter.TuNgay = d;
    this.GetList(true);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList();
  }
}


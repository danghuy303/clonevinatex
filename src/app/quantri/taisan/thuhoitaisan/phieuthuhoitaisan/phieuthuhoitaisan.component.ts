import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalthuhoitaisanComponent } from '../../modal/modalthuhoitaisan/modalthuhoitaisan.component';
@Component({
  selector: 'app-phieuthuhoitaisan',
  templateUrl: './phieuthuhoitaisan.component.html',
  styleUrls: ['./phieuthuhoitaisan.component.css']
})
export class PhieuthuhoitaisanComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  IdTrangThai: string = "";
  keyWord: any = '';
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 1 };
  selectedItems: any = [];
  filter: any = {};
  showDropDown: boolean = false;
  trangThai: any = 1;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true };
  eAction = "";


  constructor(private _modal: NgbModal, private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
  ) { }

  ngOnInit(): void {
    this.KiemTraTabTrangThai();
  }

  resetFilter() {
    this.keyWord = '';
    this.GetListThuHoiTaiSan(true);
  }
  GetListThuHoiTaiSan(reset?) {
    if (reset) {
      this.paging.Page = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.Page,
      sFilter: this.keyWord,
      TabTrangThai: this.trangThai

    };
    this. _serviceTaiSan.PhieuThuHoiTaiSan().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  add() {

    let modalRef = this._modal.open(ModalthuhoitaisanComponent,{
      backdrop: 'static',
      size: 'fullscreen',
      keyboard: false
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = '';
    modalRef.componentInstance.item = {
      Id: '', IdTrangThai: '', SoQuyTrinh: ""
    };
    modalRef.result.then(res => {
      this.GetListThuHoiTaiSan()
    }).catch(er => console.log(er))
  }

  update(item) {
    let modalRef = this._modal.open(ModalthuhoitaisanComponent,{
      size: "fullscreen",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = '';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result
      .finally(() => {
        this.GetListThuHoiTaiSan();
      });
  }

  //xử lí tab 
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetListThuHoiTaiSan(true);
  }

  KiemTraTabTrangThai() {
    this._services.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetListThuHoiTaiSan();
    });
  }

  changePage(event) {
    this.paging.Page = event.page + 1;
    this.GetListThuHoiTaiSan()
  }

}
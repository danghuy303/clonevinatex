import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { CapnhatthuvientaisanchitietComponent } from '../capnhatthuvientaisanchitiet/capnhatthuvientaisanchitiet.component';
import { ModalthongtinchitiettaisanComponent } from '../modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component';

@Component({
  selector: 'app-capnhatthuvien',
  templateUrl: './capnhatthuvien.component.html',
  styleUrls: ['./capnhatthuvien.component.css']
})
export class CapnhatthuvienComponent implements OnInit {

  filter: any = {};
  Keyword: any = '';
  eAction: any = "";
  loaiTab: any = 0;
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  items: TreeNode[];
  listLoaiTaiSan: any = [];
  listPhanXuong: any = [];

  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _servicesSanXuat: SanXuatService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    this.getList();
    let data = { PageSize: 20, CurrentPage: this.paging.page, Keyword: this.Keyword, };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(res.Data.Items, "Ten", "Id");
    })
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      res.push({Ten:"Chưa có bộ phận sử dụng",Id:"Chưa có bộ phận sử dụng"})
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  resetFilter() {
    this.getList(true);
    this.filter='';
  }

  getList(reset?) {
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.Page,
      tabTrangThai: this.loaiTab,
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan,
      Keyword: this.filter.Keyword,
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
    };
    this._serviceTaiSan.ThuVienTaiSan().GetList(data).subscribe((res: any) => {
      this.paging.CurrentPage = res.Data.Page;
      this.paging.TotalPages = res.Data.TotalPages;
      this.paging.TotalCount = res.Data.TotalCount;
      let items = [];
      this.items = [];
      items = res.Data.Items;
      items.forEach(obj => {
        let obj_copy: any = {};
        if (obj?.listTaiSan) {
          obj_copy.children = [];
          obj.listTaiSan.forEach(element => {
            obj_copy.children.push({ data: element });
          });
          obj.listTaiSan = undefined;
        }
        obj_copy.data = obj;
        this.items.push({ data: obj_copy.data, children: obj_copy.children });
      });
    })
  }

  add() {
    let modalRef = this._modal.open(CapnhatthuvientaisanchitietComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.title = "Nhập tài sản";
    modalRef.componentInstance.item = {listTaiSan: [],
      listLichBaoDuong: [],
      listThongSoKyThuat: [],
      listThongSoAnToan: [],}
    modalRef.result.then(res => {

    }).catch(er => console.log(er))
      .finally(() => {
        this.getList()
      })
  }

  update(item) {
    this._serviceTaiSan.ThuVienTaiSan().Get(item.Id || "").subscribe((res: any) => {
    let modalRef = this._modal.open(CapnhatthuvientaisanchitietComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.title = "Cập nhập tài sản";
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(res.Data));
    modalRef.result.then(res => {
    }).catch(er => console.log(er))
      .finally(() => {
        this.getList()
      })
    })
  }

  changePage(event){
    this.paging.Page = event.page+1;
    this.getList()
  }
}

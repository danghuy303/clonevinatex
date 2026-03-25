import { HopDongService } from "src/app/services/Hopdong/hopdong.service";

import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { DateToUnix, mapArrayForDropDown, UnixToDate, } from "src/app/services/globalfunction";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DanhmuctaisanService } from "src/app/services/Taisan/danhmuctaisan.service";
import { TreeNode } from 'primeng/api';
import { ModalcapnhattaisanComponent } from "../modal/modalcapnhattaisan/modalcapnhattaisan.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";
import { API } from "../../../services/host";
import { handleHTTPResponse } from "../../../services/globalfunction";


@Component({
  selector: 'app-nhaptaisan',
  templateUrl: './nhaptaisan.component.html',
  styleUrls: ['./nhaptaisan.component.css']
})
export class NhaptaisanComponent implements OnInit, OnDestroy {
  $sub!: Subscription;
  $subRoute!: Subscription;
  @ViewChild("paginator") paginator: any;
  eAction: any = "QUYTRINHNHAPTAISAN";
  loaiTab: any = 0;
  Keyword: any = '';
  paging: any = {};
  selectedItems: any = [];
  filter: any = {};
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  items: TreeNode[];
  trangThai: any = 1;
  listLoaiTaiSan: any = [];
  listPhanXuong = [];
  TenBoPhanSuDung = '';
  display: boolean = false;
  checkedAll: boolean = false;
  listDanhSachMay = [];

  constructor(
    public _modal: NgbModal,
    public toastr: ToastrService,
    private _serviceDungChung: SanXuatService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
    private activatedRoute: ActivatedRoute, private router: Router,
    private store: StoreService
  ) {
  }

  ngOnInit(): void {
    this.$subRoute = this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        this._serviceTaiSan
          .NhapTaiSan()
          .Get(res.id)
          .subscribe((res1: any) => {
            this.update(res1);
          });
      }
    });

    this.$sub = this.store.getNhaMay().subscribe((res: any) => {
      if (res) {
        this.resetFilter();
        this.KiemTraTabTrangThai();
        this.GetListdmPhanXuong();
      }
    });

    this.resetFilter();
    this.KiemTraTabTrangThai();
    this.GetListdmPhanXuong();
  }

  ngOnDestroy(): void {
    if (this.$sub) {
      this.$sub.unsubscribe();
    }
    if (this.$subRoute) {
      this.$subRoute.unsubscribe();
    }
  }
  changeParam(id: any) {
    this.router.navigate([`/quantri/taisan/nhaptaisan/${id}`], {
      replaceUrl: true,
    });
  }
  GetListdmPhanXuong() {
    this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS().subscribe((res: any) => {
      let nhaMay = [
        {
          Id: 'Chưa có bộ phận sử dụng',
          Ten: 'Chưa có bộ phận sử dụng'
        }
      ]
      let luaChonNhaMay = [...res, ...nhaMay]
      // this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.listPhanXuong = mapArrayForDropDown(luaChonNhaMay, 'Ten', 'Id');
    })
  }
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.loaiTab = e.index;
    this.Loaddata(true);
  }
  resetFilter() {
    this.filter = {};
    this.Loaddata(true);
  }
  Loaddata(reset?) {
    if (reset) {
      this.paging.CurrentPage = 0;
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      tabTrangThai: this.trangThai,
      Keyword: this.filter.Keyword,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
      Loai: 0
    };
    this._serviceTaiSan.NhapTaiSan().GetList(data).subscribe((res: any) => {
      let items = [];
      this.items = [];
      items = res.Data.Items;
      this.paging = res.Data;
      items?.forEach(obj => {
        let obj_copy: any = {};
        if (obj?.listTaiSan) {
          obj_copy.children = [];
          obj.listTaiSan.forEach(element => {
            obj_copy.children.push({ data: element });
          });
          delete obj.listTaiSan;
        }
        obj_copy.data = obj;
        this.items.push({ data: obj_copy.data, children: obj_copy.children });
      });
    })
  }
  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.Loaddata();
    })
  }
  add() {
    let modalRef = this._modal.open(ModalcapnhattaisanComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.title = "Nhập tài sản";
    modalRef.componentInstance.item = {
      Id: "",
      IdTaiSan: "",
      IdTrangThai: "",
      TenTrangThai: "",
      isKetThuc: false,
      TaiSan: {
        Id: "",
        isXoa: false,
        listFileDinhKem: [],
        Created: new Date(),
        Modified: new Date(),
        listTaiSan: [],
        listLichBaoDuong: [],
        listThongSoKyThuat: [],
        listThongSoAnToan: [],
      },
    }
    modalRef.result.then(res => {

    }).catch(er => console.log(er))
      .finally(() => {
        this.Loaddata();
        this.changeParam(0)
      })
  }
  update(item: any) {
    let modalRef = this._modal.open(ModalcapnhattaisanComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.title = "Cập nhật tài sản";
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item.Data));
    modalRef.result.then(res => {
    }).catch(er => console.log(er))
      .finally(() => {
        this.Loaddata()
        this.changeParam(0);
      })
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.Loaddata();
  }

  ChonDanhSachMay() {
    this.display = !this.display;
    let data = {
      CurrentPage: 0
    }
    this._servicesSanXuat.GetListdmMay(data).subscribe((res: any) => {
      this.listDanhSachMay = res;
    })
  }

  check() {
    this.checkedAll = this.listDanhSachMay.every(ele => ele.checked);
  }

  checkAll() {
    this.listDanhSachMay = this.listDanhSachMay.map(ele => {
      return {
        ...ele,
        checked: this.checkedAll
      }
    });
  }

  ChapNhan() {
    let listId = this.listDanhSachMay.filter(ele => ele.checked).map(obj => obj.Id);
    this._serviceTaiSan.DongBoTaiSanBylistIdFromSCM(listId).subscribe((res: any) => {
      if (res.StatusCode === 200) {
        this.toastr.success(res.Message);
        this.display = !this.display;
        this.Loaddata();
      } else this.toastr.error(res.Message);

    })
  }

  handlExcel() {
    this._serviceTaiSan.ExportFileMauNhapVatTu().subscribe((res: any) => {
      if (res.StatusCode === 200) {
        window.open(`${API.imgURL}${res.Data}`)
        this.toastr.success(res.Message);
      } else this.toastr.error(res.Message);
    })
  }

  handleUpload(e: any) {
    this._serviceTaiSan.ImportQuyTrinhNhapTaiSan(e.Name, this.store.getCurrent()).subscribe((res: any) => {
      handleHTTPResponse(res, this.toastr, () => {
        if (res.StatusCode === 200) {
          this.Loaddata()
          this.toastr.success(res.Message);
        } else {
          this.toastr.error(res.Message);
        }
      })
    })
  }

}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalthuhoitaisanComponent } from '../../modal/modalthuhoitaisan/modalthuhoitaisan.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreBase } from 'src/app/services/storebase.class';
@Component({
  selector: 'app-phieuthuhoitaisan',
  templateUrl: './phieuthuhoitaisan.component.html',
  styleUrls: ['./phieuthuhoitaisan.component.css']
})
export class PhieuthuhoitaisanComponent extends StoreBase implements OnInit,OnDestroy {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  IdTrangThai: string = "";
  keyWord: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  selectedItems: any = [];
  filter: any = {};
  showDropDown: boolean = false;
  trangThai: any = 1;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true };
  eAction = "QUYTRINHTHUHOITAISAN";
  listPhanXuong:any=[];

  constructor(private _modal: NgbModal, private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    store: StoreService,
    private activatedRoute: ActivatedRoute, private router: Router,
  ) {
    super(store)
   }
  ngOnInit(): void {
    console.log(this.paginator);
    this.activatedRoute.params.subscribe((res: any) => {
      console.log(res);
      if (res.id !== "0") {
        this._serviceTaiSan
          .PhieuThuHoiTaiSan()
          .Get(res.id)
          .subscribe((res: any) => {
            this.update(res);
          });
      }
    });
    this.GetListThuHoiTaiSan();
    this.KiemTraTabTrangThai();
    this.GetListdmPhanXuong();
  }

  resetFilter() {
    this.keyWord = '';
    this.filter = {};
    this.GetListThuHoiTaiSan(true);
  }
  
  GetListThuHoiTaiSan(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      keyWord: this.keyWord,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      TabTrangThai: this.trangThai
    };
    this._serviceTaiSan.PhieuThuHoiTaiSan().GetList(data).subscribe((res: any) => {
      // res.Data.Items.forEach(obj=>{  
      //   obj.TenPhanXuong = this.listPhanXuong.find(ele=>ele.value===obj.IddmPhanXuong)?.label||null;          
      // });
      this.items = res.Data.Items;  
      this.paging.TotalCount = res.Data.TotalCount;
      console.log(this.listPhanXuong)
    })
  }
  GetListdmPhanXuong() {
    this._services.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      console.log(res)
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.GetListThuHoiTaiSan();
    })
  }
  changeParam(id) {
    this.router.navigate([`quantri/taisan/thuhoitaisan/${id}`], {
      replaceUrl: true,
    });
  }
  add() {
    let modalRef = this._modal.open(ModalthuhoitaisanComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard:false
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = 'Thêm mới thu hồi tài sản';
    modalRef.componentInstance.item = {
      Id: '',IdTaiSan: "", IdTrangThai: '', SoQuyTrinh: "", TenTrangThai: "",TendmPhanXuong:"",
      isKetThuc: false,listFileDinhKem:[],listTaiSan:[],
    };
    modalRef.result.then(res => {
    }).catch(er => console.log(er))
      .finally(() => {
        this.GetListThuHoiTaiSan()
        this.changeParam(0);
      })
  }
  update(item) {
    let modalRef = this._modal.open(ModalthuhoitaisanComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật thu hồi tài sản';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item.Data));
    modalRef.result
      .then(data => {
      })
      .catch(er => {
      })
      .finally(() => {
        this.GetListThuHoiTaiSan();
        this.changeParam(0);
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
    this.paging.CurrentPage = event.page + 1;
    this.GetListThuHoiTaiSan()
  }

}
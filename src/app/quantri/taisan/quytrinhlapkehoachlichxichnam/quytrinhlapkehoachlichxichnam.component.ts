import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LapkehoachlichxichnamComponent } from '../lapkehoachlichxichnam/lapkehoachlichxichnam.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quytrinhlapkehoachlichxichnam',
  templateUrl: './quytrinhlapkehoachlichxichnam.component.html',
  styleUrls: ['./quytrinhlapkehoachlichxichnam.component.css']
})
export class QuytrinhlapkehoachlichxichnamComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [];
  IdTrangThai: string = "";
  Keyword: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  selectedItems: any = [];
  filter: any = {};
  showDropDown: boolean = false;
  trangThai: any = 1;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true };
  eAction = "LAPKEHOACHLICHXICHNAM";
  listPhanXuong: any = [];
  listNam: any = [];
  minDate: Date;
  $sub!: Subscription;

  constructor(private _modal: NgbModal, private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute, private router: Router,
  ) {  this.$sub = this.store.getNhaMay().subscribe(res => {
    if (res) {
        this.ngOnInit()
    }
})}

  ngOnInit(): void {
    this.GetList();
    for (let i = new Date().getFullYear()-10; i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    // this.filter.Ngay = new Date().getFullYear();
    this.activatedRoute.params.subscribe((res: any) => {
      if (res.id !== "0") {
        // this._serviceTaiSan
        //   .LichXich()
        //   .Get(res.id)
        //   .subscribe((res: any) => {
            this.update({Id:res.id});

          // });
      }
    });
    this.KiemTraTabTrangThai();
    this.GetListdmPhanXuong();
  }

  resetFilter() {
    this.filter = {};
    this.GetList(true);
  }

  GetList(reset?) {

    let data = {
      PageSize: 20,
      Ngay: this.filter.Ngay ? DateToUnix(new Date(this.filter.Ngay, 1, 1, 1,)) : 0,
      CurrentPage: this.paging.CurrentPage,
      Keyword: this.filter.Keyword,
      TuThang: DateToUnix(this.filter.TuNgay),
      DenThang: DateToUnix(this.filter.DenNgay),
      TabTrangThai: this.trangThai,
      Loai: 0,
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
    };
    this._serviceTaiSan.LichXich().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }
  GetListdmPhanXuong() {
    this._services.GetListdmPhanXuongForIdDuAn().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.GetList();
    })
  }
  changeParam(id) {
    this.router.navigate([`quantri/taisan/quytrinhlapkehoachnam/${id}`], {
      replaceUrl: true,
    });
  }
  add() {
    let modalRef = this._modal.open(LapkehoachlichxichnamComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard: false
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.type = 'themmoi';
    modalRef.componentInstance.title = '';
    modalRef.componentInstance.item = {
      Id: '', IdTrangThai: '', TenTrangThai: "", SoQuyTrinh: '',
      isKetThuc: false, listTaiSan: [], LoaiKeHoach: "", IdDuAn: 0, listChiPhi: [], listVatTu: [],
    };
    modalRef.result.then(res => {

    }).catch(er => console.log(er))
      .finally(() => {
        this.GetList()
        this.changeParam(0);
      })
  }
  update(item) {
    //  // hiện thị năm
    let modalRef = this._modal.open(LapkehoachlichxichnamComponent, {
      size: "fullscreen-100",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.type = 'capnhat';
    modalRef.componentInstance.title = 'Cập nhật ';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result
      .then(data => {

      })
      .catch(er => {
      })
      .finally(() => {
        this.GetList();
        this.changeParam(0);
      });
  }

  //xử lí tab 
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetList(true);
  }

  KiemTraTabTrangThai() {
    this._services.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetList();
    });
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

}

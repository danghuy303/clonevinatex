import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModaldenghixulisucoComponent } from '../modaldenghixulisuco/modaldenghixulisuco.component';

@Component({
  selector: 'app-denghixulisuco',
  templateUrl: './denghixulisuco.component.html',
  styleUrls: ['./denghixulisuco.component.css']
})
export class DenghixulisucoComponent implements OnInit {
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
  eAction = "";
  listPhanXuong:any=[];

  constructor(private _modal: NgbModal, private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private activatedRoute: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
  }
  changeParam(id) {
    this.router.navigate([`quantri/taisan/denghixulisuco/${id}`], {
      replaceUrl: true,
    });
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
    this._serviceTaiSan.SuCoSuaChua().GetList(data).subscribe((res: any) => {
      res.Data.Items.forEach(obj=>{  
        obj.TenPhanXuong = this.listPhanXuong.find(ele=>ele.value===obj.IddmPhanXuong)?.label||null;          
      });
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

add() {
  let modalRef = this._modal.open(ModaldenghixulisucoComponent, {
    backdrop: 'static',
    size: 'fullscreen-100',
    keyboard:false
  });
  modalRef.componentInstance.opt = 'add';
  modalRef.componentInstance.type = 'themmoi';
  modalRef.componentInstance.title = 'Vật tư cần thay';
  modalRef.componentInstance.item = {
    Id: '', IdTrangThai: '', SoQuyTrinh: "", TenTrangThai: "",TendmPhanXuong:"",
    isKetThuc: false,listFileDinhKem:[],listTaiSan:[],
  };
  modalRef.result.then(res => {

  }).catch(er => console.log(er))
    .finally(() => {

    })

}
}

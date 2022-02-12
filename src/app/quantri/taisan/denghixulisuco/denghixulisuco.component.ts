import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
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
    Id: '',IdTaiSan: "", IdTrangThai: '', SoQuyTrinh: "", TenTrangThai: "",TendmPhanXuong:"",
    isKetThuc: false,listFileDinhKem:[],listTaiSan:[],
  };
  modalRef.result.then(res => {

  }).catch(er => console.log(er))
    .finally(() => {

    })

}
}

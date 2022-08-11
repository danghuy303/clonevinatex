import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { ChiPhiGiaCuocContainerModalComponent } from './chi-phi-gia-cuoc-container-modal/chi-phi-gia-cuoc-container-modal.component';

@Component({
  selector: 'app-chi-phi-gia-cuoc-container',
  templateUrl: './chi-phi-gia-cuoc-container.component.html',
  styleUrls: ['./chi-phi-gia-cuoc-container.component.css']
})
export class ChiPhiGiaCuocContainerComponent implements OnInit {

  items: any[] = [];
  listNhaMay: any[] = [];
  userInfo: any = {};

  constructor(
    private _modal: NgbModal,
    private _danhMucHopDong: DanhMucHopDongService,
    private _auth: AuthenticationService,
    private _services: SanXuatService,
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  getListNhaMay() {
    this._services.GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id)
      .subscribe((res: any) => {
        this.listNhaMay = res;
        this.getListChiPhi();
      })
  }

  getListChiPhi() {
    this._danhMucHopDong
      .GiaCuocContainer()
      .GetAll().subscribe((res: any) => {
        this.items = res.Data.map((item: any) => {
          return {
            ...item,
            TenDuAn: this.listNhaMay.find(ele => ele.Id == item.IdDuAn).TenDuAn
          }
        })
      })
  }

  initData() {
    this.userInfo = this._auth.currentUserValue;
    this.getListNhaMay();
  }


  addChiPhi() {
    let modalRef = this._modal.open(
      ChiPhiGiaCuocContainerModalComponent,
      {
        size: 'lg',
        backdrop: 'static',
      }
    )
    modalRef.componentInstance.option = "add";
    modalRef.result
      .then((res: any) => { })
      .catch()
      .finally(() => {
        this.initData();
      })
  }

}

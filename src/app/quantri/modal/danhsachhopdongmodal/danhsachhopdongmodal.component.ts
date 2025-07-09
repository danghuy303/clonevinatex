import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from '../../../services/callApiSanXuat';

@Component({
  selector: 'app-danhsachhopdongmodal',
  templateUrl: './danhsachhopdongmodal.component.html',
  styleUrls: ['./danhsachhopdongmodal.component.css']
})
export class DanhsachhopdongmodalComponent implements OnInit {

  listHopDong: any = [];
  keyWork: string = '';
  item: any = {};

  constructor(
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _services: SanXuatService
  ) { }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this._services.GetListHopDongForPhieuXuatHang(this.item?.IddmItem).subscribe((res: any) => {
      this.listHopDong = res.data?.map(ele => {
        return {
          ...ele,
          tenMatHang: this.item?.Ten,
          checked: this.item?.IdHopDong === ele.idHopDong ? true : false
        }
      });
    })
  }
  getCheck(data) {
    this.listHopDong = this.listHopDong?.map(ele => {
      return {
        ...ele,
        checked: ele.idHopDong === data.idHopDong ? true : false
      }
    })
  }

  accept() {
    this.activeModal.close(this.listHopDong?.find(ele => ele.checked));
  }

}

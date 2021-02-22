import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TrangthaimaysanxuatComponent } from '../../../quytrinh/trangthaimaysanxuat/trangthaimaysanxuat.component';

@Component({
  selector: 'app-botrimay-ong',
  templateUrl: './botrimay-ong.component.html',
  styleUrls: ['./botrimay-ong.component.css']
})
export class BotrimayOngComponent implements OnInit {
  checkbutton: any = {
    Ghi: true
  };
  filter: any = {};
  addonData: any = {};
  listHangHoa: any = [];
  item: any = {};
  newMay: any = {};
  mapCa_Id: any = {};
  lang: any = vn;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal, private _store: StoreService) { }

  ngOnInit(): void {
    this.listHangHoa = mapArrayForDropDown(this.item.listCanBoTri, 'Ten', 'Id')
    this.sort();
    this.mapCa_Id = {}
    this.item.listCaSanXuat.forEach(ca => {
      this.mapCa_Id[ca.Ten.split(" ").join("_")] = ca.Id;
    });
  }
  sort() {
    this.item.listDaBoTri = this.item.listDaBoTri.sort((a: any, b: any) => {
      return a.TenMay.localeCompare(b.TenMay);
    })
  }

  addMore(item) {
    this.item.listDaBoTri.push(deepCopy(item));
    this.sort();
  }
  GhiLai() {
    this.services.CanDoiChuyen().SetCanDoiChuyen({ ...this.item, ...this.addonData }).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      } else {
        this.toastr.error('Cập nhật không thành công!');
      }
    })
  }
  ApDungDenNgay() {
    if (validVariable(this.filter.DenNgay) && validVariable(this.filter.TuNgay) && this.filter.TuNgay < this.filter.DenNgay) {
      this.services.CanDoiChuyen().SetCanDoiChuyen({ ...this.item, ...this.addonData }).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            // this.toastr.success(res.message);
            let data = {
              ...this.addonData,
              TuNgayUnix: DateToUnix(this.filter.TuNgay),
              DenNgayUnix: DateToUnix(this.filter.DenNgay),
            }
            this.services.CanDoiChuyen().SetCanDoiChuyen_ApDungNgay(data).subscribe(res => {
              console.log(res);
            })
          } else {
            this.toastr.error(res.message);
          }
        } else {
          this.toastr.error('Cập nhật không thành công!');
        }
      })
    }
    else {
      this.toastr.error('Vui lòng nhập kiểm tra lại khoảng thời gian áp dụng!');
    }
  }
}

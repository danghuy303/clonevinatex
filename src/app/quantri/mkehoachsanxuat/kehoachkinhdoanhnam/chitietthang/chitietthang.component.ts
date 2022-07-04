import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-chitietthang',
  templateUrl: './chitietthang.component.html',
  styleUrls: ['./chitietthang.component.css']
})
export class ChitietthangComponent implements OnInit {

  itemThang: any = {};
  listCachThuc: Array<any> = [{ value: 'noiDia', label: 'Nội địa' }, { value: 'xuatKhau', label: 'Xuất khẩu' }];
  listContainer: any = [];
  listPhuongThucVanChuyen: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private _modal: NgbModal,
    public toastr: ToastrService,
    private _services: SanXuatService,
  ) { }

  ngOnInit(): void {
    this.GetListDropDown();
    this.CountTongSanLuong()
  }

  GetListDropDown() {
    let ls1 = this._services.GetOptions().GetListPhuongThucVanChuyenKHKD().toPromise();
    let ls2 = this._services.GetOptions().GetListContainerForKHKD().toPromise();
    Promise.all([ls1, ls2]).then((values: any) => {
      this.listPhuongThucVanChuyen = mapArrayForDropDown(values[0], "Ten", "Id");
      this.listContainer = mapArrayForDropDown(values[1], "Ten", "Id");
      // console.log({
      //   listPhuongThucVanChuyen: this.listPhuongThucVanChuyen,
      //   listContainer: this.listContainer
      // });
      
    });
  }

  CountTongSanLuong() {
    this.itemThang.TongSanLuong = 0;
    this.itemThang.TongSanLuong = (this.itemThang.TongSoCa || 0) * (this.itemThang.SanLuongMotCa || 0);
  }

  ChapNhan() {
    this.activeModal.close(this.itemThang);
  }

}

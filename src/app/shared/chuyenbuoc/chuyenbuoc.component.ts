import { Component, Input, OnInit } from '@angular/core';
import { mapArrayForDropDown } from '../../services/globalfunction';
import { TaisanService } from '../../services/Taisan/taisan.service';

@Component({
  selector: 'app-chuyenbuoc',
  templateUrl: './chuyenbuoc.component.html',
  styleUrls: ['./chuyenbuoc.component.css']
})
export class ChuyenbuocComponent implements OnInit {

  @Input() quyTrinh: any = {Id:''};
  listUserTiepTheoCopy: any = [];
  listTrangThaiTiepTheoCopy: any = [];
  IdTrangThaiTiepTheo: string = '';
  listIdUserTiepTheo: any = [];

  constructor(
    public _taiSanService: TaisanService,
  ) { }

  ngOnInit(): void {
    this.getList();
    this.getUserTiepTheo(this.quyTrinh.listUserTiepTheo);
  }

  getList() {
    this.listTrangThaiTiepTheoCopy = mapArrayForDropDown(this.quyTrinh.listTrangThaiTiepTheo, "TenTrangThai", "IdTrangThai");
    this.IdTrangThaiTiepTheo = this.quyTrinh.listTrangThaiTiepTheo?.filter((chon: any) => chon.isChon)[0]?.IdTrangThai;
  }

  getTrangThaiTiepTheo(value: any) {
    this._taiSanService.GetTrangThaiChuyenTiep_listUser(this.quyTrinh.IdDuAn, value).subscribe((res: any) => {
      this.quyTrinh.listUserTiepTheo = res;
      this.getUserTiepTheo(res)
    })
    this.quyTrinh.listTrangThaiTiepTheo = this.quyTrinh.listTrangThaiTiepTheo.map((ele: any) => {
      return {
        ...ele,
        isChon: value == ele.IdTrangThai ? true : false
      }
    })
  }

  getUserTiepTheo(list) {
    this.listUserTiepTheoCopy = mapArrayForDropDown(list, 'TenUser', 'IdUser');
    this.listIdUserTiepTheo = list.filter((obj: any) => obj.isChon).map((ele: any) => ele.IdUser);
  }

  UserTiepTheo(value: any) {
    this.quyTrinh.listUserTiepTheo = this.quyTrinh.listUserTiepTheo.map((ele: any) => {
      return {
        ...ele,
        isChon: value.value.includes(ele.IdUser)
      }
    })
  }

}

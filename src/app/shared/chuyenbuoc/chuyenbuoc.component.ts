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
    this.getUserTiepTheo(this.quyTrinh?.listUserTiepTheo);
  }

  getList() {
    const listTrangThai = Array.isArray(this.quyTrinh?.listTrangThaiTiepTheo) ? this.quyTrinh.listTrangThaiTiepTheo : [];
    this.listTrangThaiTiepTheoCopy = mapArrayForDropDown(listTrangThai, "TenTrangThai", "IdTrangThai");
    this.IdTrangThaiTiepTheo = listTrangThai.filter((chon: any) => chon.isChon)[0]?.IdTrangThai;
  }

  getTrangThaiTiepTheo(value: any) {
    this._taiSanService.GetTrangThaiChuyenTiep_listUser(this.quyTrinh.IdDuAn, value).subscribe((res: any) => {
      this.quyTrinh.listUserTiepTheo = res;
      this.getUserTiepTheo(res)
    })
    this.quyTrinh.listTrangThaiTiepTheo = (this.quyTrinh.listTrangThaiTiepTheo || []).map((ele: any) => {
      return {
        ...ele,
        isChon: value == ele.IdTrangThai ? true : false
      }
    })
  }

  getUserTiepTheo(list) {
    const safeList = Array.isArray(list) ? list : [];
    this.listUserTiepTheoCopy = mapArrayForDropDown(safeList, 'TenUser', 'IdUser');
    this.listIdUserTiepTheo = safeList.filter((obj: any) => obj?.isChon).map((ele: any) => ele.IdUser);
  }

  UserTiepTheo(value: any) {
    this.quyTrinh.listUserTiepTheo = (this.quyTrinh.listUserTiepTheo || []).map((ele: any) => {
      return {
        ...ele,
        isChon: value.value.includes(ele.IdUser)
      }
    })
  }

}

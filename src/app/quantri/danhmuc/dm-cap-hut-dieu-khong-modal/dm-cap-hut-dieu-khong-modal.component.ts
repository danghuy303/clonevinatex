import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dm-cap-hut-dieu-khong-modal',
  templateUrl: './dm-cap-hut-dieu-khong-modal.component.html',
  styleUrls: ['./dm-cap-hut-dieu-khong-modal.component.css']
})
export class DmCapHutDieuKhongModalComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  opt: any = "";
  khongclicknhieu: any = false;
  listPhanXuong: any[];
  listLoaiCapHut: any[];
  listHeThongDieuKhong: any[];
  constructor(public activeModal: NgbActiveModal, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOptPhanXuong();
    this.getLoaiCapHut();
    this.getHeThongDieuKhong();
  }

  getOptPhanXuong() {
    this.sanXuatService.GetOptions().GetPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getLoaiCapHut() {
    this.sanXuatService.DanhMucCapHutDieuKhong().GetListLoaiCapHut().subscribe((res: any) => {
      this.listLoaiCapHut = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getHeThongDieuKhong() {
    this.sanXuatService.DanhMucHeThongDieuKhong().GetList({ CurrentPage: 0 }).subscribe((res: any) => {
      this.listHeThongDieuKhong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma !== null && this.item.Ten !== undefined && this.item.Ten !== null && this.item.IddmPhanXuong !== undefined && this.item.IddmPhanXuong !== null) {
      this.Save();
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ trường thông tin bắt buộc!')
    }
  }

  Save() {
    this.sanXuatService.DanhMucCapHutDieuKhong().Set(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }

  resAction(res: any) {
    if (res.State === 1) {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.success(res.message);
      this.activeModal.close();
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.error(res.message)
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from '../../services/globalfunction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaiLieuPhanCongCongViecComponent } from '../tai-lieu-phan-cong-cong-viec/tai-lieu-phan-cong-cong-viec.component';

@Component({
  selector: 'app-phan-cong-cong-viec',
  templateUrl: './phan-cong-cong-viec.component.html',
  styleUrls: ['./phan-cong-cong-viec.component.css']
})
export class PhanCongCongViecComponent implements OnInit {

  quyTrinh: any = {
    listPhanCongCongViecAll: [
      {
        "NameTable": "PSM_LapTienDoBaseLine",
        "IdTable": "f425c974-035b-4e5a-8b48-39daf62d2a77",
        "IdUser": "0fcb84e2-0f32-4bc4-81cf-0bae6e8c185e",
        "TenUser": "Nhân viên hành chính 02",
        "IdNguoiGiao": "c48ba4f3-3229-45f4-9fb8-8e28ee5d03ff",
        "NguoiGiao": "Demo",
        "NoiDung": "CV1",
        "TuNgay": "2026-03-20T09:46:21.2",
        "DenNgay": "2026-03-21T09:46:17.196",
        "NgayHoanThanh": null,
        "DanhGia": null,
        "GhiChu": "",
        "LyDoKhongDuyet": null,
        "IdTrangThai": "5f15b37d-9452-4775-b9f3-ba649c3b3c37",
        "isTrangThai": false,
        "ThoiGianNhanhCham_Ngay": 0,
        "ThoiGianNhanhCham_Gio": 0,
        "ThoiGianNhanhCham_Phut": 0,
        "SapXep": 1,
        "isDisableTrangThai": true,
        "isDisablePheDuyet": false,
        "isShowCombobox": true,
        "isXoa": true,
        "TuNgayUnix": 1773974781.2,
        "DenNgayUnix": 1774061177.196,
        "NgayHoanThanhUnix": 0,
        "Mau": "white",
        "isGuiServer": true,
        "TongSoTaiLieu": "0/0",
        "listFileDinhKem": [],
        "Id": "4f63aa71-7544-4d72-8ab2-f73d07421000",
        "Created": "2026-03-20T09:46:26.4861393",
        "CreatedBy": "c48ba4f3-3229-45f4-9fb8-8e28ee5d03ff",
        "CreatedByName": "Demo",
        "Modified": "2026-03-20T09:46:26.4871768",
        "ModifiedBy": "c48ba4f3-3229-45f4-9fb8-8e28ee5d03ff",
        "ModifiedByName": "Demo"
      }
    ],
    listPhanCongCongViec: [
      {
        "NameTable": "PSM_LapTienDoBaseLine",
        "IdTable": "f425c974-035b-4e5a-8b48-39daf62d2a77",
        "IdUser": "0fcb84e2-0f32-4bc4-81cf-0bae6e8c185e",
        "TenUser": "Nhân viên hành chính 02",
        "IdNguoiGiao": "c48ba4f3-3229-45f4-9fb8-8e28ee5d03ff",
        "NguoiGiao": "Demo",
        "NoiDung": "CV1",
        "TuNgay": "2026-03-20T09:46:21.2",
        "DenNgay": "2026-03-21T09:46:17.196",
        "NgayHoanThanh": null,
        "DanhGia": null,
        "GhiChu": "",
        "LyDoKhongDuyet": null,
        "IdTrangThai": "5f15b37d-9452-4775-b9f3-ba649c3b3c37",
        "isTrangThai": false,
        "ThoiGianNhanhCham_Ngay": 0,
        "ThoiGianNhanhCham_Gio": 0,
        "ThoiGianNhanhCham_Phut": 0,
        "SapXep": 1,
        "isDisableTrangThai": true,
        "isDisablePheDuyet": false,
        "isShowCombobox": true,
        "isXoa": true,
        "TuNgayUnix": 1773974781.2,
        "DenNgayUnix": 1774061177.196,
        "NgayHoanThanhUnix": 0,
        "Mau": "white",
        "isGuiServer": true,
        "TongSoTaiLieu": "0/0",
        "listFileDinhKem": [],
        "Id": "4f63aa71-7544-4d72-8ab2-f73d07421000",
        "Created": "2026-03-20T09:46:26.4861393",
        "CreatedBy": "c48ba4f3-3229-45f4-9fb8-8e28ee5d03ff",
        "CreatedByName": "Demo",
        "Modified": "2026-03-20T09:46:26.4871768",
        "ModifiedBy": "c48ba4f3-3229-45f4-9fb8-8e28ee5d03ff",
        "ModifiedByName": "Demo"
      }
    ]
  };
  @Input() checkQuyen: any = { listPhanCong: [] };
  IdTrangThai: string = '';
  isCongViecAll: boolean = false;

  constructor(
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.initDataAll();
  }

  checkAll(e: any) {
    this.isCongViecAll = !this.isCongViecAll;
  }

  initDataAll() {
    this.quyTrinh.listPhanCongCongViecAll = this.getMapUnix(this.quyTrinh.listPhanCongCongViecAll);
    this.quyTrinh.listPhanCongCongViec = this.getMapUnix(this.quyTrinh.listPhanCongCongViec);
    console.log('this.quyTrinh.listPhanCongCongViecAll', this.quyTrinh.listPhanCongCongViecAll);

  }

  getMapUnix(list: any) {
    return list.map((ele: any) => {
      return {
        ...ele,
        TuNgay: UnixToDate(ele.TuNgayUnix),
        DenNgay: UnixToDate(ele.DenNgayUnix),
        NgayHoanThanh: UnixToDate(ele.NgayHoanThanhUnix),
      }
    })
  }

  handleMoTaiLieu(index: any, item: any) {
    // let list = this.isListTrangThai ? this.quyTrinh.listPhanCongCongViecAll : this.quyTrinh.listPhanCongCongViec;
    let modalRef = this.modal.open(TaiLieuPhanCongCongViecComponent, {
      size: 'fullscreen-100',
      backdrop: 'static'
    });
    // modalRef.componentInstance.listDS = this.quyTrinh.listFileDinhKem ? this.quyTrinh.listFileDinhKem.filter((ele: any) => ele.isPhanCongCongViec !== true) : [];
    // modalRef.componentInstance.listFileDinhKem = list[index].listFileDinhKem ? list[index].listFileDinhKem : [];
    // modalRef.componentInstance.listCheck = this.listIdDaChon ? this.listIdDaChon.map((ele: any) => ele.IdFileDinhKem) : [];
    // modalRef.componentInstance.isTrangThai = list[index]?.isTrangThai;
    // modalRef.componentInstance.Id = this.quyTrinh.Id;
    // modalRef.componentInstance.eAction = this.quyTrinh.eAction;
    // modalRef.componentInstance.isDisableTrangThai = this.isListTrangThai ? this.isListTrangThai : list[index]?.isDisableTrangThai;
    modalRef.result.then((res: any) => {
      // this.listIdDaChon = res;
      // list[index].listFileDinhKem = res;
      // list[index].pheduyet = list[index].listFileDinhKem?.filter((ele: any) => ele.isPheDuyet == 1).length;
      // list[index].tongPheDuyet = list[index].listFileDinhKem.length;
    })
  }


}

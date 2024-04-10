import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
@Component({
  selector: 'app-modalbaoduong',
  templateUrl: './modalbaoduong.component.html',
  styleUrls: ['./modalbaoduong.component.css']
})
export class ModalbaoduongComponent implements OnInit {

  item: any = {};
  title: any = '';
  type = '';
  bool: boolean = true;
  Keyword: any = '';
  paging: any = { page: 1, totalPages: 1, totalCount: 1 };
  listTaiSan: any = [];
  listMucDoUuTien: any = [];
  Time = {
    NGAY: 'Ngày',
    TUAN: 'Tuần',
    THANG: 'Tháng',
    NAM: 'Năm',
  };
  listTuan: any = [];
  listDonViTinh: any = [];
  listLoaiThucHienBaoDuong: any = [];
  listVatTu: any = [];

  constructor(public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    private _service: TaisanService,
    private _modal: NgbModal,
    public toastr: ToastrService) { this.item.isHoatDong = true }

  ngOnInit(): void {
    if ((this.item.DenGioUnix !== null && this.item.TuGioUnix !== null)) {
      this.item.DenGio = UnixToDate(this.item.DenGioUnix);
      this.item.TuGio = UnixToDate(this.item.TuGioUnix);
    }
    this.item.listCongViec = this.item.listCongViec ? this.item.listCongViec : [];
    this.GetListdmLoaiTaiSan();
    this.getData();
    this.GetListVatTuTheoLoaiTaiSan(this.item.IddmLoaiTaiSan ? this.item.IddmLoaiTaiSan : '');
  }
  getData() {
    this.listTuan = [
      { value: 0, label: 'Chủ nhật' },
      { value: 1, label: 'Thứ 2' },
      { value: 2, label: 'Thứ 3' },
      { value: 3, label: 'Thứ 4' },
      { value: 4, label: 'Thứ 5' },
      { value: 5, label: 'Thứ 6' },
      { value: 6, label: 'Thứ 7' },
    ];
    this.listDonViTinh = [
      { value: 'May', label: 'Máy' },
      { value: 'Coc', label: 'Cọc' },
      { value: 'Day', label: 'Dây' },
    ];
    let data = {
      CurrentPage: 0,
      Keyword: '',
      MaCongDoan: '',
    };
    this._danhMucTaiSan.LoaiThucHienBaoDuong().GetList(data).subscribe((res: any) => {
      this.listLoaiThucHienBaoDuong = mapArrayForDropDown(res.Data, 'Ten', 'Id')
    });

  }

  GetListVatTuTheoLoaiTaiSan(Id) {
    this._service.GetListVatTuTheoLoaiTaiSan(Id).subscribe((res: any) => {
      this.listVatTu = mapArrayForDropDown(res.Data, 'Ten', 'Id')
    })
  }

  delete(index: any) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa?';
    modalRef.result.then(res => {
      this.item.listCongViec.splice(index, 1)
    })
  }

  add() {
    this.item.listCongViec.push({})
  }

  GetListdmLoaiTaiSan() {
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.page,
      Keyword: this.Keyword,
    };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listTaiSan = mapArrayForDropDown(res.Data.Items, "Ten", "Id");
    })
    this._danhMucTaiSan.DanhMucMucDoUuTien().GetList(data).subscribe((res: any) => {
      res.Data.Items.forEach(ele => {
        ele.tenValue = `${ele.Ten} - ${ele.ThuTu}`;
      })
      this.listMucDoUuTien = mapArrayForDropDown(res.Data.Items, "tenValue", "Id",);
    })
  }
  ValidateData() {
    if (!validVariable(this.item.Ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã!");
      return false;
    }
    if (!validVariable(this.item.Ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ tên !");
      return false;
    }
    if (!validVariable(this.item.Ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ ký hiệu !");
      return false;
    }
    if (!validVariable(this.item.IddmLoaiTaiSan) || !validVariable(this.item.IddmMucDoUuTien)) {
      this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc !");
      return false;
    }
    if (!validVariable(this.item.ThoiGianBaoDuong)) {
      this.toastr.error("Yêu cầu nhập loại bảo dưỡng!");
      return false;
    }
    if (!validVariable(this.item.MaLoaiThoiGian)) {
      this.toastr.error("Yêu cầu chọn loại bảo dưỡng!");
      return false;
    }
    return true;
  }

  setData() {
    let data = {
      ...this.item,
      TuGioUnix: DateToUnix(this.item.TuGio),
      DenGioUnix: DateToUnix(this.item.DenGio),
    }
    return data;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._danhMucTaiSan.DanhMucLoaiBaoDuong().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.item = res;
          this.activeModal.close();
        }
      })
    }
  }
}

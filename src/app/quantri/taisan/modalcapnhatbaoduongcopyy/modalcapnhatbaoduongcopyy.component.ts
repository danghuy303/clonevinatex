import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { getDonViTinhSanLuongContext } from 'src/app/services/const';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { LohangComponent } from '../../quanlykhosanxuat/thongke/lohang/lohang.component';

@Component({
  selector: 'app-modalcapnhatbaoduongcopyy',
  templateUrl: './modalcapnhatbaoduongcopyy.component.html',
  styleUrls: ['./modalcapnhatbaoduongcopyy.component.css']
})
export class
  ModalcapnhatbaoduongcopyyComponent implements OnInit {
  item: any = {};
  LayId: any = {};
  items: any = [];
  title: "";
  listLoaiBaoDuong: any = [];
  listChiTiet: any = [];
  listLichBaoDuong: any = [];
  disabled: boolean = true;
  existedItems: any = [];
  checkBaoDuong: any = '';
  opt: any = '';


  constructor(public activeModal: NgbActiveModal,
    public _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    let data = { Keyword: "", CurrentPage: 0, PageSize: 1000, IddmLoaiTaiSan: this.LayId.IddmLoaiTaiSan };
    this._danhMucTaiSan.DanhMucLoaiBaoDuong().GetList(data).subscribe((res: any) => {
      this.items = Array.isArray(res.Data) ? res.Data : (res.Data?.Items || []);
      this.listLoaiBaoDuong = mapArrayForDropDown(this.items, "Ten", "Id");
      if (this.item.IddmLoaiBaoDuong) {
        this.chonLoaiBaoDuong(this.item.IddmLoaiBaoDuong);
      }
    })

  }
  chonLoaiBaoDuong(e: any) {
    let filter;
    if (e !== '') {
      filter = this.items.find((ele: any) => ele.Id === e);
      this.item.ThoiGianNangSuat = filter?.ThoiGianNangSuat;
      if (!this.item.NoiDung)
        this.item.NoiDung = filter?.NoiDung;
      this.item.MaLoaiThoiGian = filter?.MaLoaiThoiGian;
      if (!this.item.ThoiGianBaoDuong)
        this.item.ThoiGianBaoDuong = filter?.ThoiGianBaoDuong;
      this.item.DonViTinh_SanLuong = filter?.DonViTinh_SanLuong || this.item.DonViTinh_SanLuong;
      this.item.NangSuat = filter?.NangSuat;
      this.item.SanLuong = (filter?.NangSuat !== undefined && filter?.NangSuat !== null) ? filter.NangSuat : filter?.SanLuong;

    }

  }

  getTextTime() {
    let text = `${this.item.ThoiGianBaoDuong}`;
    switch (this.item.MaLoaiThoiGian) {
      case `NGAY`:
        text += " ngày/lần"
        break;

      case `TUAN`:
        text += " tuần/lần"
        break;
      case `THANG`:
        text += " tháng/lần"
        break;
      case `NAM`:
        text += " năm/lần"
        break;
      default:
        break;
    }
    return text;
  }

  getLabelSanLuong(): string {
    const ctx = getDonViTinhSanLuongContext(this.item?.DonViTinh_SanLuong);
    return ctx ? ctx.label : 'Sản lượng (tấn)';
  }

  GhiLai() {
    this.item.NangSuat = this.item.SanLuong;
    if (this.opt === 'add') {
      if (validVariable(this.item.IddmLoaiBaoDuong)) {
        this.item.TendmLoaiBaoDuong = this.listLoaiBaoDuong.find(obj => obj.value == this.item.IddmLoaiBaoDuong).label;
        if (!this.existedItems.includes(this.item.IddmLoaiBaoDuong)) {
          this.activeModal.close(this.item);
        }
        else {
          this.toastr.error("Đã tồn tại!");
        }
      } else {
        this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc!");
      }
    }
    else {
      if (validVariable(this.item.IddmLoaiBaoDuong)) {
        this.item.TendmLoaiBaoDuong = this.listLoaiBaoDuong.find(obj => obj.value == this.item.IddmLoaiBaoDuong).label;
        this.activeModal.close({
          ...this.item
        });
      } else {
        this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc!");
      }
    }
  }
}

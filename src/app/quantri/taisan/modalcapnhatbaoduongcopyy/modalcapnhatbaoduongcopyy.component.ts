import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';

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

    let data = { Keyword: "", CurrentPage: 0, PageSize: 2, IddmLoaiTaiSan: this.LayId.IddmLoaiTaiSan };
    this._danhMucTaiSan.DanhMucLoaiBaoDuong().GetList(data).subscribe((res: any) => {
      this.items = res.Data;
      this.listLoaiBaoDuong = mapArrayForDropDown(res.Data, "Ten", "Id");
    })
  }
  chonLoaiBaoDuong(e) {
    let filter;
    if (e.value !== '') {
      filter = this.items.find(ele => ele.Id === e.value);
      this.item.ThoiGianNangSuat = filter?.ThoiGianNangSuat;
      this.item.NoiDung = filter?.NoiDung;

      this.item.MaLoaiThoiGian = filter?.MaLoaiThoiGian;
      this.item.ThoiGianBaoDuong = filter?.ThoiGianBaoDuong;
      this.item.NangSuat = filter?.NangSuat;
    }

  }
  GhiLai() {
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
        this.activeModal.close(this.item);
      } else {
        this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc!");
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DateToUnix } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalluachonbaoduonglichxichtheothang',
  templateUrl: './modalluachonbaoduonglichxichtheothang.component.html',
  styleUrls: ['./modalluachonbaoduonglichxichtheothang.component.css']
})
export class ModalluachonbaoduonglichxichtheothangComponent implements OnInit {
  taiSan: any = {};
  listBaoDuong: any = [];
  checkedAll: boolean = false;
  listItemDaChon: any = [];
  copyItemsBaoDuong:any = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    let data = {
      IdTaiSan: this.taiSan.IdTaiSan,
      IddmLoaiTaiSan: this.taiSan.IddmLoaiTaiSan,
      Ngay: DateToUnix(this.taiSan.ThoiGian),
      IdBoPhanSuDung: this.taiSan.IdBoPhanSuDung,
    }
    this._serviceTaiSan.LichXich().GetListTaiSanTheoThang(data).subscribe((res: any) => {
      this.listBaoDuong = res.Data[0]?.listLoaiBaoDuong;
      this.listBaoDuong.push(this.copyItemsBaoDuong)
      this.listBaoDuong.forEach(obj => {
        obj.checked = this.listItemDaChon.includes(obj.IddmLoaiBaoDuong);
      })
      this.timXoa();
      this.checked();
    })
    this.checkedAll = this.listBaoDuong.every(obj => obj.checked);
  }

  checkAll(e) {
    this.listBaoDuong.forEach(ele => {
      ele.checked = e.checked
    })
  }

  checked() {
    this.checkedAll = this.listBaoDuong.every(ele => ele.checked)
  }

  timXoa() {
    this.listItemDaChon.forEach(ele => {
     let index = this.listBaoDuong.findIndex(obj => obj.IddmLoaiBaoDuong == ele)
     this.listBaoDuong.splice(index,1)
    })
  }

  Accept() {
    let data = this.listBaoDuong.filter(ele => ele.checked);
    this.activeModal.close(data);
  }

}

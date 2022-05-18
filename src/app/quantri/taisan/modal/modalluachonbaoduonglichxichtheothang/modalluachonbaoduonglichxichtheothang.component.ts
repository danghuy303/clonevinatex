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
  listItemsTrongBd: any = [];
  copyItemsBaoDuong: any = [];
  thoiGianDaChon: any;
  filter: any = {

  }
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
      Ngay: DateToUnix(this.thoiGianDaChon),
    }
    this._serviceTaiSan.LichXich().GetListTaiSanTheoThang(data).subscribe((res: any) => {
      // debugger;
      this.listBaoDuong = res.Data[0]?.listLoaiBaoDuong;
      this.listBaoDuong.forEach(obj => {
        // obj.checked = this.listItemDaChon.includes(obj.IddmLoaiBaoDuong);
        obj.checked = this.listItemDaChon.includes(obj.Id);
      })
      this.checked();
      this.checkExistedItems();
    })
    this.checkedAll = this.listBaoDuong.every(obj => obj.checked);
  }

  checkExistedItems() {
    // console.log("listItemDaChon", this.listItemDaChon);
    // console.log("listItemsTrongBd", this.listItemsTrongBd);
    // console.log("listBaoDuong", this.listBaoDuong);
    this.listItemDaChon.forEach(ele => {
      if (!this.listItemsTrongBd.includes(ele)) {
        // let index = this.listBaoDuong.findIndex(obj => obj.IddmLoaiBaoDuong === ele);
        let index = this.listBaoDuong.findIndex(obj => obj.Id === ele);
        this.listBaoDuong.splice(index, 1);
      }
    })
  }

  checkAll(e) {
    this.listBaoDuong.forEach(ele => {
      ele.checked = e.checked
    })
  }

  checked() {
    this.checkedAll = this.listBaoDuong.every(ele => ele.checked)
  }

  Accept() {
    let data = this.listBaoDuong.filter(ele => ele.checked);
    this.activeModal.close(data);
  }

}

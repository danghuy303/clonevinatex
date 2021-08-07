import { vn } from 'src/app/services/const';
import { DanhMucHopDongService } from './../../../../../../../services/Hopdong/danhmuchopdong.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chitiethanghoamodal',
  templateUrl: './chitiethanghoamodal.component.html',
  styleUrls: ['./chitiethanghoamodal.component.css']
})
export class ChitiethanghoamodalComponent implements OnInit {
  lang: any = vn;

  opt: any = '';
  item: any = {};
  listLoaiBong:any = []
  listThanhToanThuTuc:any = []
  

  listDieuKhoanThanhToan :any = {}
  yearRange: string = `${
    new Date().getFullYear() - 50
  }:${new Date().getFullYear()}`;
  constructor(public activeModal:NgbActiveModal, private _servicesdmHopDong: DanhMucHopDongService, private _modal : NgbModal) { }
  

  ngOnInit(): void {
  }
  accept(opt){
    // if (this.item.tempCapHang !== undefined && this.item.tempCapHang !== null) {
    //   this.item.IDdmCapHang = this.item.tempCapHang.ID;
    //   this.item.TendmCapHang = this.item.tempCapHang.Ten;
    // }
   
    
    this.activeModal.close({ opt: opt, item: this.item });
  }
  chonHangHoa() {
    // let modalRef = this._modal.open(ChonthutucthanhtoanmodalComponent, {
    //   size: 'xl'
    // })
    // modalRef.componentInstance.items = this.listThanhToanThuTuc;
    // modalRef.componentInstance.selectedItems = [];
    // modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    // modalRef.result.then(res => {
    //   if (res.length > 0) {
    //     res.forEach(obj => this.item.listItem.push(obj))
    //   }
    //   // merge(res, this.item.listItem, 'IddmItem')
    // }).catch(er => {
    //   console.log(er);
    // })
  }
}

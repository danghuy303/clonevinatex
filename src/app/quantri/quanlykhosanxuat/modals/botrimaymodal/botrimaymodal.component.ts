import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';
import { ChonmaytheocongdoanComponent } from '../chonmaytheocongdoan/chonmaytheocongdoan.component';

@Component({
  selector: 'app-botrimaymodal',
  templateUrl: './botrimaymodal.component.html',
  styleUrls: ['./botrimaymodal.component.css']
})
export class BotrimaymodalComponent implements OnInit {
  item: any = {};
  filter: any = {};
  opt: string = '';
  listCongDoan: Array<any> = []
  IddmPhanXuong: string = '';
  PoolMaySanXuat:any={};
  constructor(private _service: SanXuatService, private _activeModal: NgbActiveModal, private _modal: NgbModal) { }

  ngOnInit(): void {
    console.log(this.PoolMaySanXuat);
    if (this.opt !== 'edit') {
      this.GetCongDoanTheoMatHang()
    }

    // this.item.listCongDoan= [
    //   {Ten:'Bông chải',listMay:[
    //     {Ten:'TC05',ChiSo:0.2,Loai:'CM'},
    //     {Ten:'TC06',ChiSo:0.2,Loai:'CM'},
    //     {Ten:'TC02',ChiSo:0.2,Loai:'CM'},
    //   ]},
    //   {Ten:'Cuộn cúi'},
    //   {Ten:'Chải kỹ'},
    //   {Ten:'Ghép thô'},
    // ]
  }
  GetCongDoanTheoMatHang() {
    this._service.GetOptions().GetListCongDoanTheoMatHang(this.item.IddmItem).subscribe((res: any) => {
      this.listCongDoan = res;
    })
  }
  async chonMayTheoCongDoan(CongDoan) {
    this._service.GetOptions().GetListMayTheoCongDoan(this.IddmPhanXuong, DateToUnix(this.item.TuNgay), DateToUnix(this.item.DenNgay)).subscribe(res => {
      return res;
    });
    let modalRef = this._modal.open(ChonmaytheocongdoanComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.items =
      modalRef.componentInstance.selectedItems = this.item.listItem.filter(ele => {
        ele.CongDoan === CongDoan;
      });
    modalRef.result.then(result => {
      console.log(result);
      // this.
    }).catch(er => {
      console.log(er);
    })
  }
}

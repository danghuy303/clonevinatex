import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, UnixToDate } from 'src/app/services/globalfunction';
import { ChonmaytheocongdoanComponent } from '../chonmaytheocongdoan/chonmaytheocongdoan.component';

@Component({
  selector: 'app-botrimaymodal',
  templateUrl: './botrimaymodal.component.html',
  styleUrls: ['./botrimaymodal.component.css'],
  providers: [DatePipe]
})
export class BotrimaymodalComponent implements OnInit {
  item: any = {};
  filter: any = {};
  opt: string = '';
  listCongDoan: Array<any> = []
  IddmPhanXuong: string = '';
  PoolMaySanXuat: any = {};
  DateArray: any = [];
  listDate: any = [];
  constructor(private _services: SanXuatService, private _activeModal: NgbActiveModal, private _modal: NgbModal, private datepipe: DatePipe) { }

  ngOnInit(): void {
    // console.log(this.PoolMaySanXuat);
    // if (this.opt !== 'edit') {
      this.GetCongDoanTheoMatHang()
    // }
    
    console.log(this.PoolMaySanXuat);
    console.log(this.item);
    this.listDate = this.getDates(UnixToDate(this.item.TuNgayUnix), UnixToDate(this.item.DenNgayUnix));
    console.log(this.listDate);
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
  getDates(startDate, endDate) {
    let dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      let data: any = {};
      if (currentDate.getDate() === 1) {
        data.header = `01/${currentDate.getMonth() < 9 ? `0${currentDate.getMonth() + 1}` : (currentDate.getMonth() + 1)}`
      } else {
        data.header = this.datepipe.transform(currentDate, 'dd')
      }
      data.prop = this.datepipe.transform(currentDate, 'dd_MM_yyyy');
      dates.push(data);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };
  GetCongDoanTheoMatHang() {
    this._services.GetOptions().GetListCongDoanTheoMatHang(this.item.IddmItem).subscribe((res: any) => {
      this.listCongDoan = res;
    if (this.opt !== 'edit') {
      res.forEach(cd => {
        let data = []
        for (let key in this.PoolMaySanXuat[cd.CongDoan]) {
          if (this.PoolMaySanXuat[cd.CongDoan][key]) {
            data.push(this.PoolMaySanXuat[cd.CongDoan][key]);
          }
        }
        this.item.listItemTemp[cd.CongDoan] = data.map(
          ele => {
            return {
              prop: ele.Id.split('-').join('_'),
              MadmLoaiSoi:this.item.MadmLoaiSoi,
              IddmMay: ele.Id,
              Id: ''
            }
          })
      });
    }
    })
  }
  checkMay(CongDoan,May,event){
      this.listDate.forEach(date => {
        if(this.PoolMaySanXuat[CongDoan][May][date.prop].TinhTrang!==2){
          this.PoolMaySanXuat[CongDoan][May][date.prop].TinhTrang = event.checked? 1:0;
          this.PoolMaySanXuat[CongDoan][May][date.prop].IddmItem = event.checked? this.item.IddmItem:null;
        }
      });
  }
  collapseCongDoan(congDoan){
    congDoan.show = !!!congDoan.show;
  }
  accept(){
    this._activeModal.close(this.item);
  }
  // async chonMayTheoCongDoan(CongDoan) {
  //   let modalRef = this._modal.open(ChonmaytheocongdoanComponent, {
  //     size: 'lg',
  //   });
  //   modalRef.componentInstance.items = this.PoolMaySanXuat[CongDoan];
  //   modalRef.result.then(result => {
  //     this.item.listItem[CongDoan]= result;
  //     console.log(this.item);
  //   }).catch(er => {
  //     console.log(er);
  //   })
  // }
}

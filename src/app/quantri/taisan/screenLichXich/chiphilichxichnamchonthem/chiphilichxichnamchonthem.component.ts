import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';

@Component({
  selector: 'app-chiphilichxichnamchonthem',
  templateUrl: './chiphilichxichnamchonthem.component.html',
  styleUrls: ['./chiphilichxichnamchonthem.component.css']
})
export class ChiphilichxichnamchonthemComponent implements OnInit {

  item:any = {};
  title: '';
  layIdTaiSan: any ={};

  constructor(
    public activeModal: NgbActiveModal,
    public _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    
  }

  GhiLai() {
    // if (validVariable(this.item.IddmLoaiBaoDuong))
    //   this.item.TendmLoaiBaoDuong = this.listLoaiBaoDuong.find(obj => obj.value == this.item.IddmLoaiBaoDuong).label;
    // if (this.listLichBaoDuong === undefined) {
    //   this.listLichBaoDuong = [];
    // }
    // this.listLichBaoDuong.push(this.item);
  
    let data = {
      SoTien: this.item.SoTien,
      TenChiPhi:this.item.TenChiPhi,
      IdTaiSan:this.layIdTaiSan,
    }
    this.activeModal.close(data);
    
  }

}

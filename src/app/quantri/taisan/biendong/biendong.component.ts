import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DateToUnix } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalcapnhatbaoduongComponent } from '../modal/modalcapnhatbaoduong/modalcapnhatbaoduong.component';

@Component({
  selector: 'app-biendong',
  templateUrl: './biendong.component.html',
  styleUrls: ['./biendong.component.css']
})
export class BiendongComponent implements OnInit,OnChanges {
 
  @Input("ThongTinQueryBienDongTaiSan") ThongTinQueryBienDongTaiSan:any=null;
  
  paging: any = {CurrentPage:1};
  item: any;
  listItems:any =[];
  constructor(public activeModal: NgbActiveModal, public toastr: ToastrService, private _serviceTaiSan: TaisanService,) { }
  
  ngOnInit(): void {
    console.log(this.ThongTinQueryBienDongTaiSan)
  }
  ngOnChanges(changes: SimpleChanges){
    this.GetList();
  }
  
  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
    }
    let data = {
      ...this.ThongTinQueryBienDongTaiSan,
      
      CurrentPage: this.paging.CurrentPage,
    }
    this._serviceTaiSan.ListDanhSachBienDong().Get(data).subscribe((res: any) => {
       console.log(res.Data)
       this.listItems=res.Data.Items;
       this.paging = res.Data;
    })
  }
  changePage(event) {
    this.paging.CurrentPage = event.Page + 1;
    this.GetList();
  }
 
}

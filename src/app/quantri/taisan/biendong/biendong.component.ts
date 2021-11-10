import { Component, Input, OnInit } from '@angular/core';
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
export class BiendongComponent implements OnInit {
 
  @Input("Du_Lieu_Bien_Dong") Chon_Vao_Bien_Dong:any={};
  
  paging:any = {Page: 1, TotalPages: 1, TotalCount: 1 };
  filter: any;
  item: any;

  constructor(public activeModal: NgbActiveModal, public toastr: ToastrService, private _serviceTaiSan: TaisanService,) { }
  
  ngOnInit(): void {
    // this.GetList();
    
  }

  
  // GetList(reset?) {
  //   if (reset) {
  //   }
  //   let data = {
  //     PageSize: 25,
  //     CurrentPage: this.paging.Page,
  //     KeyWord: this.filter.KeyWord,
  //     IdTaiSan:this.item.Id,
  //     TuNgay: DateToUnix(this.filter.TuNgay),
  //     DenNgay: DateToUnix(this.filter.DenNgay),
  //   }
  //   this._serviceTaiSan.ListDanhSachBienDong().Get(data).subscribe((res: any) => {
  //      console.log(res)
     

  //   })
  // }
  // changePage(event) {
  //   this.paging.CurrentPage = event.Page + 1;
  //   this.GetList();
  // }
 
}

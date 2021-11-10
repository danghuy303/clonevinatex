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

  constructor(public activeModal: NgbActiveModal, public toastr: ToastrService, private _serviceTaiSan: TaisanService,) { }
  
  ngOnInit(): void {
    this.GetList();
    
  }

  
  GetList() {
    
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      KeyWord: '',
      IdTaiSan:'',
      TuNgay: 0,
      DenNgay:0,
    }
    this._serviceTaiSan.ListDanhSachBienDong().Get(data).subscribe((res: any) => {
     console.log(res)
      //  this.paging.CurrentPage = this.Phan_Trang.Page;
      // this.paging.TotalPages = this.Phan_Trang.TotalPages;
      // this.paging.TotalCount = this.Phan_Trang.TotalCount;
    })
  }
  changePage(event) {
    this.paging.CurrentPage = event.Page + 1;
    this.GetList();
  }
 
}

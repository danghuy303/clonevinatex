import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-tonkhodanhsachchitiet',
  templateUrl: './tonkhodanhsachchitiet.component.html',
  styleUrls: ['./tonkhodanhsachchitiet.component.css']
})
export class TonkhodanhsachchitietComponent implements OnInit {
  @ViewChild('paginator') paginator: any;
  items: any = [{id:5,SoQuyTrinh:'PNK_0000_0000'}];
  filter:any={};
  item:any={};
  itemTongCong:any={};
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,
    private activatedRoute: ActivatedRoute,private router:Router, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.GetTheKho();
  }
  
  changePage(event){
    this.paging.CurrentPage = event.page + 1;
    this.GetTheKho();
  }
  GetTheKho(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      "IddmItem": this.item.IddmItem,
      "TuNgay": (new Date(this.filter.TuNgay).getTime() / 1000) || 0,
      "DenNgay": (new Date(this.filter.DenNgay).getTime() / 1000) || 0,
      "IddmKho": this.item.IddmKho,
      "IdLoHang": this.item.IdLoHang,
      "CurrentPage": this.paging.CurrentPage,
    }
    this._service.GetTheKho(data).subscribe((res: any) => {
      this.items = res.items;
      this.itemTongCong = res.items[0];
      this.items.shift();
      this.paging = res.paging;
      console.log(res)
      console.log(this.items)
      console.log(this.paging)
    })
  }
}

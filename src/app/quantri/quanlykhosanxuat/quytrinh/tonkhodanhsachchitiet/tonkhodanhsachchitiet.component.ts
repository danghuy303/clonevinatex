import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  listLoaiPhuongAn:any=[];
  trangThai:any=1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  checkQuyen:any={ChuaXuLy:true,DaXyLy:true,ThemMoi:true};
  listPhanXuong: any = [];
  listCaSanXuat: any = [];
  eAction = 'THONGKESANLUONG'
  constructor(public _modal:NgbModal,public _toastr:ToastrService,private _service:SanXuatService,private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.GetTheKho();
  }
  
  changePage(event){
    this.paging.CurrentPage = event.page + 1;
    this.GetTheKho();
  }
  GetTheKho() {
    let data = {
      "IddmItem": this.item.IddmItem,
      "TuNgay": (new Date(this.filter.TuNgay).getTime() / 1000) || 0,
      "DenNgay": (new Date(this.filter.DenNgay).getTime() / 1000) || 0,
      "IddmKho": this.item.IddmKho,
      "IdLoHang": this.item.IdLoHang
    }
    this._service.GetTheKho(data).subscribe((res: any) => {
      this.items = res.items;
      this.paging = res.paging;
  })
  }
}

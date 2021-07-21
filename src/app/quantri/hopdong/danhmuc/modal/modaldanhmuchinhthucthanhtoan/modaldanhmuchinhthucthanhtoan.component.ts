import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dat09Service } from 'src/app/services/callApi';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
@Component({
  selector: 'app-modaldanhmuchinhthucthanhtoan',
  templateUrl: './modaldanhmuchinhthucthanhtoan.component.html',
  styleUrls: ['./modaldanhmuchinhthucthanhtoan.component.css']
})
export class ModaldanhmuchinhthucthanhtoanComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  khongclicknhieu: any = false;
  listLoaiBong: any = [];
  listLoaiNhomKho: any = [];
  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    
  }
  // GetListLoaiNhomKho() {
  //   this.sanXuatService.GetListLoaiNhomKho().subscribe((res: any) => {
  //     this.listLoaiNhomKho = mapArrayForDropDown(res, "Ten", 'Loai');
  //   })
  // }
  // accept() {
  //   this.item.HoatDong = true;
  //   this.khongclicknhieu = !this.khongclicknhieu;
    
  // }
  // resAction(res: any) {
  //   if (res.State === 1) {
  //     this.khongclicknhieu = !this.khongclicknhieu;
  //     this.activeModal.close(res.message);
  //   } else {
  //     this.khongclicknhieu = !this.khongclicknhieu;
  //     this.toastr.error(res.message)
  //   }
  // }
  // GetListLoaiBong() {
  //   this.sanXuatService.GetListLoaiBong().subscribe((res: any) => {
  //     this.listLoaiBong = mapArrayForDropDown(res, 'Ten', 'Loai');
  //   })
  // }
}

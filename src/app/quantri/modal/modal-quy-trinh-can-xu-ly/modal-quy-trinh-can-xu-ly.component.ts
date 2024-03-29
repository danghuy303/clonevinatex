import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapQuyTrinhRoute } from 'src/app/services/mapquytrinhroute';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-quy-trinh-can-xu-ly',
  templateUrl: './modal-quy-trinh-can-xu-ly.component.html',
  styleUrls: ['./modal-quy-trinh-can-xu-ly.component.css']
})
export class ModalQuyTrinhCanXuLyComponent implements OnInit {
  listQuyTrinh: any;
  QuyTrinhRoute: any;

  constructor(
    public activeModal: NgbActiveModal, 
    private service: SanXuatService,
    private router: Router,
    private _toastr: ToastrService) { }

  ngOnInit(): void {
    // this.service.GetListQuyTrinhCanXuLy().subscribe((res: any) => {
    //   this.listQuyTrinh = res.Items;
    // })
    this.QuyTrinhRoute = mapQuyTrinhRoute;
  }

  readOne(item: any) {
    let routerURL = '';
    routerURL=this.QuyTrinhRoute[item.eAction];
    if (routerURL) {
      this.router.navigate([`${routerURL}/${item.IdTable || 0}`]);
    } else {
      this._toastr.warning("Không tìm thấy điều hướng của quy trình!");
    }
  }

  close() {
    this.activeModal.close('CloseAndUpdateQuytrinh');
  }

}

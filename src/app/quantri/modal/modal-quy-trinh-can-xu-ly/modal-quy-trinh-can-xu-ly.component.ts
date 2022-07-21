import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-modal-quy-trinh-can-xu-ly',
  templateUrl: './modal-quy-trinh-can-xu-ly.component.html',
  styleUrls: ['./modal-quy-trinh-can-xu-ly.component.css']
})
export class ModalQuyTrinhCanXuLyComponent implements OnInit {
  listQuyTrinh: any;
  constructor(public activeModal: NgbActiveModal, private service: SanXuatService) { }

  ngOnInit(): void {
    this.service.GetListQuyTrinhCanXuLy().subscribe((res: any) => {
      console.log(res);
      this.listQuyTrinh = res;
    })
  }

}

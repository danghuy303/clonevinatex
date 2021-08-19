import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KehoachkinhdoanhTaomoiComponent } from '../kehoachkinhdoanh-taomoi/kehoachkinhdoanh-taomoi.component';

@Component({
  selector: 'app-danhsachkehoachkinhdoanh',
  templateUrl: './danhsachkehoachkinhdoanh.component.html',
  styleUrls: ['./danhsachkehoachkinhdoanh.component.css']
})
export class DanhsachkehoachkinhdoanhComponent implements OnInit {

  constructor(private _modal:NgbModal) { }

  ngOnInit(): void {
  }
  add(){
    let modalRef = this._modal.open(KehoachkinhdoanhTaomoiComponent,{
      backdrop:'static',
      size:'fullscreen'
    });
    // modalRef.componentInstance.opt='add';
    // modalRef.componentInstance.type = 'themmoi';
    // modalRef.componentInstance.title = 'Thêm cơ cấu nhân sự';
    // modalRef.result.then(res=>{
    //   this.GetListdmCoCauNhanSu()
    // }).catch(er=>console.log(er))
  }
}

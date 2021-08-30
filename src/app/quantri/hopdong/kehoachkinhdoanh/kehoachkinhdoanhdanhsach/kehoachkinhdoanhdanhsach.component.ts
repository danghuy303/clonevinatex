import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalkehoachkinhdoanhchitiettaomoiComponent } from '../modal/modalkehoachkinhdoanhchitiettaomoi/modalkehoachkinhdoanhchitiettaomoi.component';

@Component({
  selector: 'app-kehoachkinhdoanhdanhsach',
  templateUrl: './kehoachkinhdoanhdanhsach.component.html',
  styleUrls: ['./kehoachkinhdoanhdanhsach.component.css']
})
export class KehoachkinhdoanhdanhsachComponent implements OnInit {

  constructor(private _modal:NgbModal) { }

  ngOnInit(): void {
  }

  add(){
    let modalRef = this._modal.open(ModalkehoachkinhdoanhchitiettaomoiComponent,{
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

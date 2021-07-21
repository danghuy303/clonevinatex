import { ChonquycachdonggoimodalComponent } from './../../../../../quanlykhosanxuat/modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component';
import { ChonhanghoamodalComponent } from './../../../../../quanlykhosanxuat/modals/chonhanghoamodal/chonhanghoamodal.component';
import { FileUploader } from 'ng2-file-upload';
import { Component, DoCheck, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CalcmodalComponent } from 'src/app/quantri/modal/calcmodal/calcmodal.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToDatePicker, DateToUnix, deepCopy, mapArrayForDropDown, merge, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-chitiethopdongbongxo',
  templateUrl: './chitiethopdongbongxo.component.html',
  styleUrls: ['./chitiethopdongbongxo.component.css']
})
export class ChitiethopdongbongxoComponent implements OnInit {
  item:any={};
  checkbutton:any={};
  lang:any=vn;
  constructor(public activeModal:NgbActiveModal){

  }
  ngOnInit() {

  }
}

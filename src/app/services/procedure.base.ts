
import { OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from './Taisan/taisan.service';

export class ProcedureBase implements OnInit {

  public item: any = {};
  public baseService:string;

  constructor(
    private taisanService: TaisanService,
    private activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    this.GetDataForDropDown();
    this.GetDetail();
  }

  GetDataForDropDown() {
    return new Promise((resolve, reject) => {
      
    })
  }

  GetDetail() {
    this.taisanService[this.baseService]().Get(this.item.Id).subscribe((res: any) => {
      console.log("res", res);
    })
    // console.log("get detail active"); 
  }

  handleProcedure(event){
    // console.log(event);
    this[event]();
  }

  HandleData() {
    // handle data abstract
  }

  HandleError() {

  }

  MockGetData(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve('ok');
      reject('fail');
    })
  }

  GhiLai() {
    this.MockGetData()
      .then((res: any) => {
        this.HandleData();
      })
      .catch(err => {
        this.HandleError();
      })
      .finally(() => {

      })
  }

  Xoa() {
    console.log('Xoa');
  }

  ChuyenTiep() {
    console.log('ChuyenTiep');
  }

  KhongDuyet() {
    console.log('KhongDuyet');
  }

  QuayLai() {
    this.activeModal.dismiss();
  }

  validate(): boolean | void{
    
  }
}
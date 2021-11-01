import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
@Component({
  selector: 'app-modalnhaplieuxuattaisan',
  templateUrl: './modalnhaplieuxuattaisan.component.html',
  styleUrls: ['./modalnhaplieuxuattaisan.component.css']
})
export class ModalnhaplieuxuattaisanComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public Ten: any = '';
  public Ma: any = '';
  public TendmDoViTinh: any = '';
  public type = '';
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  public listTaiSan:any = [];

  constructor(public activeModal: NgbActiveModal, private _serviceTaiSan: TaisanService, public toastr: ToastrService) { }

  ngOnInit(): void {
   
  }
  // GetListTaiSanDeChon(){
  //   this._serviceTaiSan.HieuXuatTaiSan().GetListTaiSan().subscribe((res: any)=>{
  //     console.log(res);
  //     this.listTaiSan = mapArrayForDropDown(res.Data, "Ten", 'Id');
  //     console.log(this.listTaiSan)
  //   })
  // }
  ValidateData() {
    // if (!validVariable(this.item.Ma)) {
    //   this.toastr.error("Yêu cầu nhập đầy đủ mã!");
    //   return false;
    // }
   
  }
  setData() {
    this.item.ThoiGianUnix = DateToUnix(this.item.ThoiGian);
    return this.item;
  }
  GhiLai() {
      this._serviceTaiSan.HieuXuatTaiSan().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        } 
        this.activeModal.close();
      })
    }
}
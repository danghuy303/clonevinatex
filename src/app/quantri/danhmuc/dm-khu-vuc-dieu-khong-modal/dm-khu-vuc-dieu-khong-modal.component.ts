import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dm-khu-vuc-dieu-khong-modal',
  templateUrl: './dm-khu-vuc-dieu-khong-modal.component.html',
  styleUrls: ['./dm-khu-vuc-dieu-khong-modal.component.css']
})
export class DmKhuVucDieuKhongModalComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  opt: any = "";
  khongclicknhieu: any = false;
  listPhanXuong: any[];
  listCapHutBase:any[];
  listCap:any[];
  listHut:any[];
  listHeThongDieuKhong: any[];
  constructor(public activeModal: NgbActiveModal, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.sanXuatService.DanhMucKhuVucDieuKhong().Get(this.item.Id).subscribe(res=>{
      this.item = res;
      this.getOptPhanXuong();
      this.getCapHut();
      this.getHeThongDieuKhong();
    })
  }

  getOptPhanXuong() {
    this.sanXuatService.GetOptions().GetPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getCapHut() {
    this.sanXuatService.DanhMucCapHutDieuKhong().GetList({CurrentPage:0}).subscribe((res:any)=>{
      this.listCapHutBase = res;
      this.changeHeThong()
    })
  }
  changeHeThong(){
    if(validVariable(this.item.IddmHeThongDieuKhong)){
      this.listHut = mapArrayForDropDown(this.listCapHutBase.filter(ele=>ele.IddmHeThongDieuKhong===this.item.IddmHeThongDieuKhong && ele.LoaiCapHutDieuKhong==="Hut"),'Ten','Id');
      this.listCap = mapArrayForDropDown(this.listCapHutBase.filter(ele=>ele.IddmHeThongDieuKhong===this.item.IddmHeThongDieuKhong && ele.LoaiCapHutDieuKhong==="Cap"),'Ten','Id');
      console.log(this.listCap)
      console.log(this.listCap)
      console.log(this.listCapHutBase)
      console.log(this.item.IddmHeThongDieuKhong)
    }else{
      this.item.listIddmCapDieuKhong = [];
      this.item.listIddmHutDieuKhong = [];
      this.listHut = [];
      this.listCap = [];
    }
  }

  getHeThongDieuKhong() {
    this.sanXuatService.DanhMucHeThongDieuKhong().GetList({ CurrentPage: 0 }).subscribe((res: any) => {
      this.listHeThongDieuKhong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma !== null && this.item.Ten !== undefined && this.item.Ten !== null && this.item.IddmPhanXuong !== undefined && this.item.IddmPhanXuong !== null) {
      this.Save();
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ trường thông tin bắt buộc!')
    }
  }

  Save() {
    this.sanXuatService.DanhMucKhuVucDieuKhong().Set(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }

  resAction(res: any) {
    if (res.State === 1) {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.success(res.message);
      this.activeModal.close();
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.error(res.message)
    }
  }

}

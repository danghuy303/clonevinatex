import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { ChonhanghoamodalComponent } from '../../modals/chonhanghoamodal/chonhanghoamodal.component';

@Component({
  selector: 'app-kehoachsanxuatmodal',
  templateUrl: './kehoachsanxuatmodal.component.html',
  styleUrls: ['./kehoachsanxuatmodal.component.css']
})
export class KehoachsanxuatmodalComponent implements OnInit {
  opt: any = ''
  item: any = {
    // SoQuyTrinh: 'PKK_0000_001',
    // listKienHang: []
  };
  lang: any = vn;
  filter: any = {};
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  listPhuongAnSapXep: any = [];
  listDonVi: any = [];
  listPhanXuong: any = [];
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal) {

  }

  ngOnInit(): void {
    console.log(this.checkbutton)
    this.listDonVi = [
      { label: 'Nhà máy sợi Đồng Văn', value: 1 },
    ]
    this.listPhanXuong = [
      { label: 'Phân xưởng 1', value: 1 }
    ]
    // this.checkbutton={
    //   Ghi:true,Xoa:true,KhongDuyet:true,ChuyenTiep:true
    // }
    this.GetFormOptions()
    this.KiemTraButtonModal();
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
    this.item = {
      NoiDung: 'Kế hoạch sản xuất tháng 11 - Nhà máy Sợi Đồng Văn',
      SoQuyTrinh: 'KHSX_001',
      DonVi: 1,
      PhanXuong: 1,
      GhiChu:'KHSX Đồng văn tháng 11',
      ChiSoBinhQuan:'36.1',
      TongSoCa:'90',
      Ngay:new Date('2020-10-31T17:00:00.000Z'),
      listMatHang:[
        {Ma:'Ne 36 TCM 65/35',Ten:'Ne 36 TCM 65/36',KLKH:'13',GhiChu:'Xuất khẩu  HD 6063	'},
        {Ma:'Ne 40 TCM 65/35',Ten:'Ne 40 TCM 65/35',KLKH:'20',GhiChu:'Nội địa - đóng tải trắng, giao hàng từ 4/11	'},
        {Ma:'Ne 40 TCM 65/35',Ten:'Ne 40 TCM 65/35',KLKH:'11',GhiChu:'Nội địa  đóng tải xanh - Đông Xuân 	'},
        {Ma:'Ne 30 TCM 65/35',Ten:'Ne 30 TCM 65/36',KLKH:'28',GhiChu:'Xuất khẩu HD 6078	'},
        {Ma:'Ne 45 TCM 65/35 DK ',Ten:'Ne 45 TCM 65/35 DK ',KLKH:'20',GhiChu:'Xuất khẩu  (đã ký HD)	'},
        {Ma:'Ne 40 TCM 65/35',Ten:'Ne 40 TCM 65/36',KLKH:'22',GhiChu:'Xuất khẩu ( Đã ký HĐ)	'},
        {Ma:'Ne 40 CVCM 50/50',Ten:'Ne 40 CVCM 50/51',KLKH:'30',GhiChu:'Xuất khẩu  HD 6069 (KH 2 cont giao tháng 11 + 2 cont giao tháng 12) dự kiến 16 tấn sx trong T10  	'},
        {Ma:'Ne 45 CVCM 60/40',Ten:'Ne 45 CVCM 60/41',KLKH:'20',GhiChu:'Giao hàng tháng 11 ( đã ký HD)	'},
        {Ma:'Ne 40 CVCM 60/40',Ten:'Ne 40 CVCM 60/41',KLKH:'105',GhiChu:'Xuất khẩu HD 6076 10 cont (5 cont giao tháng 11+ 5 cont giao tháng 12)	'},
        {Ma:'Ne 30 CVCM 60/40',Ten:'Ne 30 CVCM 60/41',KLKH:'80',GhiChu:'Xuất khẩu 6084(HĐ 10 cont 2 cont giao tháng 11 + 5 cont giao tháng 12+ 3 cont giao tháng 1)	'},
        {Ma:'Ne 40 CVCM 60/40',Ten:'Ne 40 CVCM 60/40',KLKH:'5',GhiChu:'Nội địa - đóng tải trắng (đóng đủ theo TBSX 20 tấn) 	'},
        {Ma:'Ne 40 CVCM 60/40',Ten:'Ne 40 CVCM 60/40',KLKH:'10',GhiChu:'Nội địa - Xuất công ty Bốn mùa	'},
        {Ma:'Sợi 24 TCD 65/35',Ten:'Sợi 24 TCD 65/36',KLKH:'20',GhiChu:'Xuất khẩu HD 6083	'},
        {Ma:'Sợi 30 TCD 65/35',Ten:'Sợi 30 TCD 65/36',KLKH:'41',GhiChu:'Xuất khẩu HD 6083	'},
      ]
    }
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res;
    })
  }
  GetFormOptions() {
    this.services.GetOptions().GetMatHang().subscribe(res => {
      console.log(res);
    })
  }
  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      // console.log(data);
      // console.log(this.item.TepDinhKems);
      // let itemupload:any = {};
      // itemupload.ID = 0;
      // itemupload.TenGui = data[data.length - 1]?.Name||null;
      // itemupload.TenGoc = data[data.length - 1]?.NameLocal||null;
      // itemupload.DuongDan = data[data.length - 1]?.Url||null;
      // if(itemupload.TenGui!== null){
      //   if(this.item.TepDinhKems.length!==0){
      //     this.item.TepDinhKems.forEach(ele => {
      //       ele.isXoa =true;
      //     });
      //   }
      //   this.item.TepDinhKems.unshift(itemupload);
      //   console.log(this.item);
      // }
    }, (reason) => {

    });
  }
  ChuyenDuyet() {
    this.services.GiaoKeHoachSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }
  GetListdmPhuongAnSapXep() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
    };
    // this.services.GetListdmPhuongAnSapXep(data).subscribe((res: any) => {
    //   this.listPhuongAnSapXep = res;
    //   if (this.opt === 'edit') {
    //     if (this.item.listTaiSanQuyTrinh.length !== 0) {
    //       this.item.listTaiSanQuyTrinh.forEach(ele => {
    //         ele.tempPhuongAnSapXep = res.filter(pa => pa.ID === ele.IDdmPhuongAnDeXuat)[0];
    //       });
    //     }
    //   }
    // })
  }
  GetNextSoQuyTrinh() {
    this.services.GiaoKeHoachSanXuat().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyetDinh;
    })
  }
  // GetQuyTrinh(Id){
  //   this.services.GetQuyTrinh(Id).subscribe(res=>{
  //     // this.item = res;
  //     console.log(res);
  //   })
  // }
  chonHangHoa() {
    this._modal.open(ChonhanghoamodalComponent)
  }
  GhiLai() {
    console.log(JSON.stringify(this.item))
    // if (this.item.listTaiSanQuyTrinh.length !== 0) {
    //   this.services.GiaoKeHoachSanXuat().Set(this.item).subscribe((res: any) => {
    //     if (res) {
    //       if (res.State === 1) {
    //         this.toastr.success(res.message)
    //         this.opt = 'edit';
    //         this.item = res.objectReturn;
    //         // this.GetListdmPhuongAnSapXep()
    //         this.KiemTraButtonModal();
    //         // this.activeModal.close(res.message);
    //       } else {
    //         this.toastr.error(res.message);
    //       }
    //     }
    //   })
    // } else {
    //   this.toastr.warning('Vui lòng chọn thửa đất để khởi tạo quy trình!');
    // }
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.GiaoKeHoachSanXuat().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }
  merge(newArr, existingArr) {
    let removeIndex = [];
    newArr.forEach((newEle) => {
      let index = existingArr.findIndex(
        (oldEle) => newEle.IDTaiSan === oldEle.IDTaiSan
      );
      if (index === -1) {
        existingArr.push(newEle);
      }
    });
    existingArr.forEach((oldEle, index) => {
      let indexCheck = newArr.findIndex(

        (newEle) => newEle.IDTaiSan === oldEle.IDTaiSan
      );
      if (indexCheck === -1) {
        removeIndex.push(index);
      }
    });
    for (var i = removeIndex.length - 1; i >= 0; i--) {
      if (existingArr[i].ID === 0) {
        existingArr.splice(removeIndex[i], 1);
      } else {
        existingArr[i].isXoa = true;
      }
    }
    return existingArr;
  }
  changePhuongAnDeXuat(event, item) {
    item.TenPhuongAnDeXuat = event.Ten;
    item.IDdmPhuongAnDeXuat = event.ID;
  }
  delete(item, index) {

  }
}

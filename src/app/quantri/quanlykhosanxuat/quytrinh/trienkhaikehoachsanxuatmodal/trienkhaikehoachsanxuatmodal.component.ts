import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { BotrimaymodalComponent } from '../../modals/botrimaymodal/botrimaymodal.component';
import { ChonhanghoamodalComponent } from '../../modals/chonhanghoamodal/chonhanghoamodal.component';

@Component({
  selector: 'app-trienkhaikehoachsanxuatmodal',
  templateUrl: './trienkhaikehoachsanxuatmodal.component.html',
  styleUrls: ['./trienkhaikehoachsanxuatmodal.component.css']
})
export class TrienkhaikehoachsanxuatmodalComponent implements OnInit {
  opt: any = ''
  item: any = {
    Id:'',
  };
  filter: any = {};
  checkbutton: any = {};
  listPhuongAnSapXep: any = [];
  listLoHang: any = [];
  lang: any = vn;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal) {

  }

  ngOnInit(): void {
    console.log(this.checkbutton)
    this.listLoHang = [
      { label: 'Đơn vị 1', value: 1 },
      { label: 'Đơn vị 2', value: 2 },
      { label: 'Đơn vị 3', value: 3 },
    ]
    // this.item = {
    //   SoQuyTrinh: 'PTKKHSX001',
    //   GhiChu: 'Chạy kế hoạch giai đoạn 1',
    //   NoiDung: 'Kế hoạch sản xuất tháng 11 - Nhà máy Sợi Đồng Văn',
    //   Ngay: new Date('2020-10-31T17:00:00.000Z'),
    //   Created: new Date('2020-10-25T17:00:00.000Z'),
    //   Modified: new Date('2020-10-25T17:00:00.000Z'),
    //   listMatHang: [
    //     { Ten: 'Ne 36 TCM 65/35', GiaoKeHoach: '13', KHTK: '13', TuNgay: new Date('2020-11-11T17:00:00.000Z'), DenNgay: new Date('2020-11-15T17:00:00.000Z') },
    //     { Ten: 'Ne 40 TCM 65/35', GiaoKeHoach: '20', KHTK: '20', TuNgay: new Date('2020-11-11T17:00:00.000Z'), DenNgay: new Date('2020-11-15T17:00:00.000Z') },
    //     { Ten: 'Ne 40 TCM 65/35', GiaoKeHoach: '11', KHTK: '11', TuNgay: new Date('2020-11-11T17:00:00.000Z'), DenNgay: new Date('2020-11-15T17:00:00.000Z') },
    //     { Ten: 'Ne 30 TCM 65/35', GiaoKeHoach: '28', KHTK: '28', TuNgay: new Date('2020-11-11T17:00:00.000Z'), DenNgay: new Date('2020-11-15T17:00:00.000Z') },
    //   ]
    // }
    // this.GetFormOptions()
    // this.KiemTraButtonModal();
    if (this.opt !== 'edit') {
      // this.GetNextSoQuyTrinh();
    }
  }
  getListKeHoachGiao(){
    
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res.SoQuyetDinh;
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
    this.services.TrienKhaiKeHoachSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this.services.TrienKhaiKeHoachSanXuat().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyetDinh;
      console.log(this.item)
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
  boTriMay(item){
    console.log(item);
    let modalRef = this._modal.open(BotrimaymodalComponent,{
      size:'lg'
    });
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
  }
  GhiLai() {
    if (this.item.listTaiSanQuyTrinh.length !== 0) {
      this.services.TrienKhaiKeHoachSanXuat().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            // this.GetListdmPhuongAnSapXep()
            this.KiemTraButtonModal();
            // this.activeModal.close(res.message);
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    } else {
      this.toastr.warning('Vui lòng chọn thửa đất để khởi tạo quy trình!');
    }
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.TrienKhaiKeHoachSanXuat().Delete(this.item).subscribe((res: any) => {
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

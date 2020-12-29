import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, merge, UnixToDate } from 'src/app/services/globalfunction';
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
    Id: '',
  };
  filter: any = {};
  checkbutton: any = {};
  listGiaoKeHoach: any = [];
  tempDataGiaoKeHoach: any = [];
  listMatHangGiaoKeHoach: any = [];
  mapGiaoKeHoachNIdPhanXuong: any = {};
  lang: any = vn;
  yearRangeChonGiaoKeHoach: string = `${((new Date()).getFullYear() - 10)}:${((new Date()).getFullYear())}`;
  maxDateChonMay: Date = null;
  minDateChonMay: Date = null;
  IddmPhanXuong: string = '';
  PoolMaySanXuat: any = {};
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal) {

  }

  ngOnInit(): void {
    console.log(this.checkbutton)
    // this.KiemTraButtonModal();
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
    this.getListGiaoKeHoach();
  }
  getListGiaoKeHoach() {
    this.services.GetOptions().GetListGiaoKeHoachSanXuatChuaLapKeHoach().subscribe((res: Array<any>) => {
      res.forEach(ele => {
        this.mapGiaoKeHoachNIdPhanXuong[`${ele.Id}`] = ele.IddmPhanXuong;
      })
      this.tempDataGiaoKeHoach = deepCopy(res);
      this.listGiaoKeHoach = mapArrayForDropDown(res, 'NoiDung', 'Id');
    })
  }
  GetListMatHangChuaLapKeHoach(event) {
    this.IddmPhanXuong = this.mapGiaoKeHoachNIdPhanXuong[`${event.value}`];
    this.minDateChonMay = UnixToDate(this.tempDataGiaoKeHoach.filter(ele => ele.Id === event.value)[0]?.TuNgayUnix);
    this.maxDateChonMay = UnixToDate(this.tempDataGiaoKeHoach.filter(ele => ele.Id === event.value)[0]?.DenNgayUnix);
    this.services.GetOptions().GetListMatHangChuaLapKeHoach(event.value).subscribe((res: any) => {
      res.forEach(element => {
        element.KhoiLuongKeHoach = element.KhoiLuongKeHoach / 1000;
        element.KhoiLuongSanXuat = element.KhoiLuongSanXuat / 1000;
      });
      this.listMatHangGiaoKeHoach = res;
    })
    this.services.GetOptions().GetListTinhTrangMay(this.mapGiaoKeHoachNIdPhanXuong[`${event.value}`], DateToUnix(this.minDateChonMay), DateToUnix(this.maxDateChonMay)).subscribe((res: any) => {
      console.log(res);
      res.forEach(may => {
        this.PoolMaySanXuat[may.CongDoan] = {...this.PoolMaySanXuat[may.CongDoan]};
        let mayName = may.Id.split('-').join('_');
        this.PoolMaySanXuat[may.CongDoan][mayName]={...this.PoolMaySanXuat[may.CongDoan][mayName]}
        let ngayName = may.Ngay.split('/').join('_');
        this.PoolMaySanXuat[may.CongDoan][mayName][ngayName]= may;
        this.PoolMaySanXuat[may.CongDoan][mayName].Ma = may.Ma;
        this.PoolMaySanXuat[may.CongDoan][mayName].Ten = may.Ten;
      });
    });
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res;
    })
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
  GetNextSoQuyTrinh() {
    this.services.TrienKhaiKeHoachSanXuat().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  // GetQuyTrinh(Id){
  //   this.services.GetQuyTrinh(Id).subscribe(res=>{
  //     // this.item = res;
  //     console.log(res);
  //   })
  // }
  chonHangHoa() {
    let modalRef = this._modal.open(ChonhanghoamodalComponent, {
      size: 'lg',
    })
    modalRef.componentInstance.items = deepCopy(this.listMatHangGiaoKeHoach);
    modalRef.componentInstance.opt = "KhoiLuongKeHoach";
    modalRef.componentInstance.selectedItems = deepCopy(this.item.listItem);
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.result.then(res => {
      console.log(res);
      this.item.listItem = merge(deepCopy(res), this.item.listItem, 'IddmItem');

    }).catch(er => {
      console.log(er);
    })
  }
  boTriMay(item) {
    item.TuNgayUnix = DateToUnix(item.TuNgay);
    item.DenNgayUnix = DateToUnix(item.DenNgay);
    let modalRef = this._modal.open(BotrimaymodalComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.IddmPhanXuong = this.IddmPhanXuong;
    modalRef.componentInstance.PoolMaySanXuat = this.PoolMaySanXuat;
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
  changePhuongAnDeXuat(event, item) {
    item.TenPhuongAnDeXuat = event.Ten;
    item.IDdmPhuongAnDeXuat = event.ID;
  }
  delete(item, index) {

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
}

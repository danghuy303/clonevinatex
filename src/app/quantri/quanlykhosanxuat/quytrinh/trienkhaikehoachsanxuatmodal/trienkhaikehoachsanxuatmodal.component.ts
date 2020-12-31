import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { BotrimaymodalComponent } from '../../modals/botrimaymodal/botrimaymodal.component';
import { ChonhanghoamodalComponent } from '../../modals/chonhanghoamodal/chonhanghoamodal.component';

@Component({
  selector: 'app-trienkhaikehoachsanxuatmodal',
  templateUrl: './trienkhaikehoachsanxuatmodal.component.html',
  styleUrls: ['./trienkhaikehoachsanxuatmodal.component.css'],
  providers: [DatePipe]
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
  constructor(public activeModal: NgbActiveModal, private _services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal, private datepipe: DatePipe) {

  }

  ngOnInit(): void {
    console.log(this.checkbutton)
    // this.KiemTraButtonModal();
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
    this.getListGiaoKeHoach();
  }
  validVariable(e) {
    return validVariable(e);
  }
  getListGiaoKeHoach() {
    this._services.GetOptions().GetListGiaoKeHoachSanXuatChuaLapKeHoach().subscribe((res: Array<any>) => {
      res.forEach(ele => {
        this.mapGiaoKeHoachNIdPhanXuong[`${ele.Id}`] = ele.IddmPhanXuong;
      })
      this.tempDataGiaoKeHoach = deepCopy(res);
      this.listGiaoKeHoach = mapArrayForDropDown(res, 'NoiDung', 'Id');
      if (validVariable(this.item.IdGiaoKeHoachSanXuat)) {
        this.GetListMatHangChuaLapKeHoach({ value: this.item.IdGiaoKeHoachSanXuat });
      }
    })
  }
  GetListMatHangChuaLapKeHoach(event) {
    this.IddmPhanXuong = this.mapGiaoKeHoachNIdPhanXuong[`${event.value}`];
    this.minDateChonMay = UnixToDate(this.tempDataGiaoKeHoach.filter(ele => ele.Id === event.value)[0]?.TuNgayUnix);
    this.maxDateChonMay = UnixToDate(this.tempDataGiaoKeHoach.filter(ele => ele.Id === event.value)[0]?.DenNgayUnix);
    this._services.GetOptions().GetListMatHangChuaLapKeHoach(event.value).subscribe((res: any) => {
      res.forEach(element => {
        element.KhoiLuongKeHoach = element.KhoiLuongKeHoach / 1000;
        element.KhoiLuongSanXuat = element.KhoiLuongSanXuat / 1000;
      });
      this.listMatHangGiaoKeHoach = res;
      if (validVariable(this.item.listItem) && this.item.listItem?.length !== 0) {
        this.item.listItem.forEach(mathang => {
          if (validVariable(mathang.TuNgayUnix) && validVariable(mathang.DenNgayUnix)) {
            mathang.TuNgay = UnixToDate(mathang.TuNgayUnix);
            mathang.DenNgay = UnixToDate(mathang.DenNgayUnix);
          }
          mathang.listItemTemp = {};
          this._services.GetOptions().GetListCongDoanTheoMatHang(mathang.IddmItem).subscribe((res: any) => {
            res.forEach(cd => {
              mathang.listItemTemp[cd.CongDoan] = []
            })
          })
        });
      }
    })
    this._services.GetOptions().GetListTinhTrangMay(this.item.Id,this.mapGiaoKeHoachNIdPhanXuong[`${event.value}`], DateToUnix(this.minDateChonMay), DateToUnix(this.maxDateChonMay)).subscribe((res: any) => {
      // console.log(res);
      res.forEach(may => {
        this.PoolMaySanXuat[may.CongDoan] = { ...this.PoolMaySanXuat[may.CongDoan] };
        let mayName = may.Id.split('-').join('_');
        this.PoolMaySanXuat[may.CongDoan][mayName] = { ...this.PoolMaySanXuat[may.CongDoan][mayName] }
        let ngayName = may.Ngay.split('/').join('_');
        this.PoolMaySanXuat[may.CongDoan][mayName][ngayName] = may;
        this.PoolMaySanXuat[may.CongDoan][mayName].Ma = may.Ma;
        this.PoolMaySanXuat[may.CongDoan][mayName].Ten = may.Ten;
        this.PoolMaySanXuat[may.CongDoan][mayName].Id = may.Id;
        if (validVariable(may.IddmItem)) {
          console.log(may);
        }
      });
      console.log(this.PoolMaySanXuat);
    });
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res;
    })
  }
  ChuyenDuyet() {
    this._services.TrienKhaiKeHoachSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this._services.TrienKhaiKeHoachSanXuat().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  // GetQuyTrinh(Id){
  //   this._services.GetQuyTrinh(Id).subscribe(res=>{
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
      console.log(this.item.listItem);
    }).catch(er => {
      console.log(er);
    })
  }
  boTriMay(item, index) {
    item.TuNgayUnix = DateToUnix(item.TuNgay);
    item.DenNgayUnix = DateToUnix(item.DenNgay);
    let modalRef = this._modal.open(BotrimaymodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    });
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.opt = item.opt;
    modalRef.componentInstance.IddmPhanXuong = this.IddmPhanXuong;
    modalRef.componentInstance.PoolMaySanXuat = this.PoolMaySanXuat;
    modalRef.result.then(res => {
      console.log(res);
      this.item.listItem[index] = res;
      this.item.listItem[index].opt = 'edit';
      console.log(this.item.listItem[index])
    }).catch(er => {
      console.log(er);
    })
  }
  SetData() {
    this.item.listItem.forEach(mathang => {
      mathang.TuNgayUnix = DateToUnix(mathang.TuNgay);
      mathang.DenNgayUnix = DateToUnix(mathang.DenNgay);
      let dateArr = this.getDates(UnixToDate(mathang.TuNgayUnix), UnixToDate(mathang.DenNgayUnix));
      for (let congDoan in mathang.listItemTemp) {
        if (!validVariable(mathang.listItem)) {
          mathang.listItem = []
        }
        mathang.listItemTemp[congDoan].forEach(may => {
          dateArr.forEach(ngay => {
            let mayTrongPool = this.PoolMaySanXuat[congDoan][may.prop][ngay.prop];
            if (mayTrongPool.TinhTrang === 1 && mayTrongPool.IddmItem === mathang.IddmItem) {
              mayTrongPool.IdGiaoKeHoachSanXuat_TrienKhai = this.item.Id;
              mayTrongPool.IdGiaoKeHoachSanXuat = this.item.IdGiaoKeHoachSanXuat;
              mayTrongPool.ChiSo = may.ChiSo;
              mathang.listItem.push(mayTrongPool);
            }
          })
          //   dateArr.forEach(ngay => {
          //     let mayDuocChon = this.PoolMaySanXuat[congDoan][may.prop][ngay.prop];
          //     mayDuocChon.IdGiaoKeHoachSanXuat_TrienKhai = this.item.Id;
          //     mayDuocChon.IdGiaoKeHoachSanXuat_TrienKhaiMatHang = mathang.IddmItem;
          //     mayDuocChon.IdGiaoKeHoachSanXuat = this.item.IdGiaoKeHoachSanXuat;
          //     mayDuocChon.ChiSo = may.ChiSo;
          //     mathang.listItem.push(mayDuocChon);
          //   })
          // }
        });
      }
    });
    return this.item;
  }
  getDates(startDate, endDate) {
    let dates = [],
      currentDate = startDate,
      addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      let data: any = {};
      if (currentDate.getDate() === 1) {
        data.header = `01/${currentDate.getMonth() < 9 ? `0${currentDate.getMonth() + 1}` : (currentDate.getMonth() + 1)}`
      } else {
        data.header = this.datepipe.transform(currentDate, 'dd')
      }
      data.prop = this.datepipe.transform(currentDate, 'dd_MM_yyyy');
      dates.push(data);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };
  GhiLai() {
    // this.SetData();
    this._services.TrienKhaiKeHoachSanXuat().Set(this.SetData()).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.toastr.success(res.message)
          this.opt = 'edit';

          this.item = res.objectReturn;
          this.GetListMatHangChuaLapKeHoach({ value: this.item.IdGiaoKeHoachSanXuat });
          // this.GetListdmPhuongAnSapXep()
          this.KiemTraButtonModal();
          // this.activeModal.close(res.message);
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._services.TrienKhaiKeHoachSanXuat().Delete(this.item).subscribe((res: any) => {
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

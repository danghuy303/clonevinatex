import { Component, OnInit, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CalcmodalComponent } from 'src/app/quantri/modal/calcmodal/calcmodal.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { LohangComponent } from '../lohang/lohang.component';

@Component({
  selector: 'app-thongkesanluongmodal',
  templateUrl: './thongkesanluongmodal.component.html',
  styleUrls: ['./thongkesanluongmodal.component.css']
})
export class ThongkesanluongmodalComponent implements OnInit {
  @ViewChildren('inputNumber') inputNumbers:any;
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  listCongDoan: any = [];
  listCaSanXuat: any = [];
  listPhanXuong: any = [];
  listItem: any = [];
  editTableItem: any = {};
  lang: any = vn;
  listLoHang: any = [];
  listCaThucTe: any = [];
  TongKhoiLuong: any = 0;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal) {

  }

  ngOnInit(): void {
    this.getListCongDoan();
    if(this.item.isTruVaoSanLuong === undefined)
    this.item.isTruVaoSanLuong = false;
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      this.GetPhanXuongTheoUser()
    }
    else {
      this.KiemTraButtonModal();
      this.getItemTheoCongDoan();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.getListPhanXuong();
    this.getListCaSanXuat();
    this.getListLoHang();
    this.getListCaThucTe();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  ChuyenDuyet() {
    switch (this.item.CongDoan) {
      case 'CHAICOTTON':
        this.TinhTyLeCottonBongPhe();
      case 'CHAIPE':
        this.TinhTyLePEBongPhe();
      case 'CHAIKY':
        this.TinhTyLeBongChaiKy();
      case 'THO':
        this.TinhTyLeBongCuiHoi();
      case 'CON':
        this.TinhTyLeBongThoMang();
      case 'ONG':
        this.TinhTyLeSoiCat();
    }
    let isCheck: any = false;
    this.item.listItem.forEach(element => {
      if ((element.IdLoHang === null || element.IdLoHang === undefined) && element.CongDoan === "ONG" && element.SoQuaSoi !== null && element.SoQuaSoi !== undefined) {
        isCheck = true;
      }
    });
    if (isCheck === true) {
      this.toastr.error("Bạn chưa chọn hết lô hàng cho công đoạn Ống");
    }
    else {
      this.services.ThongKeSanLuong().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this.services.ThongKeSanLuong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  GhiLai() {
    switch (this.item.CongDoan) {
      case 'CHAICOTTON':
        this.TinhTyLeCottonBongPhe();
      case 'CHAIPE':
        this.TinhTyLePEBongPhe();
      case 'CHAIKY':
        this.TinhTyLeBongChaiKy();
      case 'THO':
        this.TinhTyLeBongCuiHoi();
      case 'CON':
        this.TinhTyLeBongThoMang();
      case 'ONG':
        this.TinhTyLeSoiCat();
    }
    let isCheck: any = false;
    if (this.item.listItem !== null && this.item.listItem !== undefined) {
      this.item.listItem.forEach(element => {
        if ((element.IdLoHang === null || element.IdLoHang === undefined) && element.CongDoan === "ONG" && element.KhoiLuong !== null && element.KhoiLuong !== undefined) {
          isCheck = true;
        }
      });
    }
    if (isCheck === true) {
      this.toastr.error("Bạn chưa chọn hết lô hàng cho công đoạn Ống");
    }
    else if (this.item.IddmCaSanXuatThucTe === undefined || this.item.IddmCaSanXuatThucTe === null) {
      this.toastr.error("Bạn chưa chọn ca thống kê");
    }
    else {
      // this.item.listItem.forEach(element => {
      //   element.IdLoHang = this.item.IdLoHang
      // });
      this.services.ThongKeSanLuong().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.listItem = [];
            this.getItemTheoCongDoan()
            this.KiemTraButtonModal();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.ThongKeSanLuong().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {

    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  getListCongDoan() {
    this.services.GetlistCongDoanBoDayBongDayPE().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');

    })
  }
  getListCaThucTe() {
    this.services.GetListOptdmCaSanXuatThucTe().subscribe((res: any) => {
      this.listCaThucTe = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListCaSanXuat() {
    this.services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listCaSanXuat = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetPhanXuongTheoUser() {
    this.services.GetListPhanXuongTheoUser().subscribe((res: any) => {
      if (res != null && res.length > 0)
        this.item.IddmPhanXuong = res[0].Id;
    })
  }
  getListPhanXuong() {
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getMatHangThongKeSanLuong() {
    if (this.item.IddmCaSanXuat != undefined
      && this.item.IddmPhanXuong != undefined
      && this.item.Ngay != undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (this.opt !== 'edit') {
        this.item.listItem = []
      }
      else{
        if (this.item.listItem != undefined && this.item.listItem != null) {
          this.item.listItem = this.item.listItem.filter((e: any) => e.Id !== null)
          for(let i=0; i<  this.item.listItem.length; i ++){
            this.item.listItem[i].isXoa = true;
          }
        }
      }
      
      this.services.ThongKeSanLuong().GetMatHang(this.item.IddmPhanXuong, this.item.IddmCaSanXuat, this.item.NgayUnix).subscribe((res: any) => {
        res.forEach(element => {
          element.Id = null;
        });
        if (this.item.listItem !== undefined && this.item.listItem !== null) {
          this.item.listItem = this.item.listItem.concat(res);
        }
        else
          this.item.listItem = res;
        this.getItemTheoCongDoan();
      })
    }
  }
  editChiTiet(item, index) {
    this.item.listItem.forEach(element => {
      element.editField = false;
    });
    this.item.listItem[index].editField = true;
    this.editTableItem = deepCopy(item);
  }

  saveEdit(item, index) {
    this.item.listItem[index] = item;
    this.item.listItem[index].editField = false;
  }
  cancelEdit(item, index) {
    this.item.listItem[index].editField = false;
  }
  TinhGiaTri(item, event) {
    var KhoiLuong = 0;
    if (item.Ne !== undefined && item.Ne !== null && item.Ne !== 0 && event !== undefined)
      KhoiLuong = event / item.Ne;
    return KhoiLuong;
  }
  TinhCongThucMoi(item) {
    var KhoiLuong = 0;
    if (item.Ne !== undefined && item.Ne !== null && item.Ne !== 0)
      KhoiLuong = item.ChieuDai / item.Ne / 1.693 * 1200 / 1000;

    item.KhoiLuong = KhoiLuong;
    this.TinhTyLeBongThoMang();
  }
  TinhKhoiLuongChaiCotton(item) {
    var KhoiLuong = 0;
    if (item.Ne !== undefined && item.Ne !== null && item.Ne !== 0)
      KhoiLuong = item.ChieuDai / (item.Ne * 1.693 * 1000);
    item.KhoiLuong = KhoiLuong;
    this.TinhTyLeCottonBongPhe();
  }
  TinhKhoiLuongGhepSoBoChaiCotton(item) {
    var KhoiLuong = 0;
    if (item.Ne !== undefined && item.Ne !== null && item.Ne !== 0)
      KhoiLuong = item.ChieuDai / (item.Ne * 1.693 * 1000) * (item.SoDauRa|| 0) - (item.KhoiLuongCuiHoi || 0);
    item.KhoiLuong = KhoiLuong;
    this.TinhTongKhoiLuongBong();
  }

  onClose() {
    this.activeModal.close();
  }
  getListLoHang() {
    var data = {
      CurrentPage: 0,
      IddmPhanXuong: this.item.IddmPhanXuong,
    }
    this.services.LoHang().GetList(data).subscribe((res: any) => {
      this.listLoHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  addLoHang() {
    let data = {
      CurrentPage: 0,
      Loai: 1,
    };
    this.services.GetListdmItem(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(LohangComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.lstSanPham;
      modalRef.result.then((data) => {
        this.getListLoHang();
      });
    }, (reason) => {
      // không
    });
  }
  getItemTheoCongDoan() {
    if (this.item.CongDoan != undefined && this.item.listItem != undefined && this.item.listItem != null) {
      this.listItem = []
      this.item.listItem.forEach(element => {
        if (element.CongDoan === this.item.CongDoan) {
          this.listItem.push(element);
        }
      })
      this.TinhTongKhoiLuongBong();
    }
    console.log(this.listItem)
  }
  TinhSoQuaSoi(item, event) {
    if (item.KhoiLuong !== undefined && item.KhoiLuong !== null) {
      if (event === 0 && item.KgCone !== 0 && item.KhoiLuong !== null)
        item.SoQuaSoi = item.KhoiLuong / item.KgCone;
      else if (event !== 0 && event.value !== 0 && event.value !== null)
        item.SoQuaSoi = item.KhoiLuong / event.value;
    }
  }
  TinhKhoiLuongHoiAm(item) {
    item.KhoiLuongHoiAm = item.SoQuaSoi * item.KgCone
  }
  ApDung(item) {
    let cloneId = item.IdLoHang;
    this.listItem.forEach(abc => {
      abc.IdLoHang = cloneId;
    });
  }
  ThayDoiPhanXuong() {
    this.getListLoHang();
    this.getMatHangThongKeSanLuong();
  }
  //cotton
  TinhTyLeCottonBongPhe() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuong||0),0);
    if(this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.CottonBongPhe || 0) - (this.item.CottonBongMun || 0) - (this.item.KhoiLuongCuiHoiChaiCotton || 0);

    if (this.TongKhoiLuong > 0) {
      this.item.TyLeCottonBongPhe = (this.item.CottonBongPhe || 0) / (this.TongKhoiLuong + (this.item.CottonBongPhe || 0)) * 100;
      this.item.TyLeCottonBongMun = (this.item.CottonBongMun || 0) / (this.TongKhoiLuong + (this.item.CottonBongMun || 0)) * 100;
      this.item.TyLeCuiHoiChaiCotton = (this.item.KhoiLuongCuiHoiChaiCotton || 0) / (this.TongKhoiLuong + (this.item.KhoiLuongCuiHoiChaiCotton || 0)) * 100;
    }
  }
  //PE
  TinhTyLePEBongPhe() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuong||0),0);
    if(this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.PEBongPhe || 0) - (this.item.PEBongMun || 0);

    if (this.TongKhoiLuong > 0) {
      this.item.TyLePEBongPhe = this.item.PEBongPhe / (this.TongKhoiLuong + (this.item.PEBongPhe || 0)) * 100;
      this.item.TyLePEBongMun = this.item.PEBongMun / (this.TongKhoiLuong + (this.item.PEBongMun || 0)) * 100;
    }
  }
  //chai ki
  TinhTyLeBongChaiKy() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuong||0),0);
    if(this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.ChaiKy || 0);

    if (this.TongKhoiLuong > 0)
      this.item.TyLeBongChaiKy = this.item.ChaiKy / (this.TongKhoiLuong + (this.item.ChaiKy || 0)) * 100;
  }
  //thô
  TinhTyLeBongCuiHoi() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuong||0),0);
    if(this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.CuiHoi || 0) - (this.item.ThoMangTho || 0);

    if (this.TongKhoiLuong > 0){
      this.item.TyLeBongCuiHoi = this.item.CuiHoi / (this.TongKhoiLuong + (this.item.CuiHoi || 0)) * 100;
      this.item.TyLeThoMangTho = this.item.ThoMangTho / (this.TongKhoiLuong + (this.item.ThoMangTho || 0)) * 100;
    }
  }
  //con
  TinhTyLeBongThoMang() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuong||0),0);
    if(this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.ThoMang || 0);
      // this.TongKhoiLuong = this.TongKhoiLuong - (this.item.ThoMang || 0) - (this.item.BongHutMoi || 0);
    if (this.TongKhoiLuong > 0) {
      this.item.TyLeThoMang = (this.item.ThoMang ?? 0) / (this.TongKhoiLuong + (this.item.ThoMang || 0)) * 100;
      this.item.TyLeBongHutMoi = (this.item.BongHutMoi ?? 0) / (this.TongKhoiLuong) * 100;
    }
  }
  //ong
  TinhTyLeSoiCat() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuong||0),0);
    if(this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.SoiCat || 0);

    if (this.TongKhoiLuong > 0)
      this.item.TyLeSoiCat = this.item.SoiCat / (this.TongKhoiLuong + (this.item.SoiCat || 0)) * 100;
  }
  // ghep dau ra
  TinhTyLeCuiHoiGhepDauRa() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuong||0),0);
    if(this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.KhoiLuongCuiHoiGhepDauRa || 0);

    if (this.TongKhoiLuong > 0)
      this.item.TyLeCuiHoiGhepDauRa = this.item.KhoiLuongCuiHoiGhepDauRa / (this.TongKhoiLuong + (this.item.KhoiLuongCuiHoiGhepDauRa || 0)) * 100;
  }
  // ghep so bo cotton
  TinhTyLeCuiHoiGhepSoBoCotton() {
    this.TongKhoiLuong = 0;

    this.TongKhoiLuong = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuong||0),0);
    if(this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong -= (this.item.TongKhoiLuongCuiHoi || 0);

    if (this.TongKhoiLuong > 0)
      this.item.TyLeCuiHoiGhepSoBoCotton = this.item.TongKhoiLuongCuiHoi / (this.TongKhoiLuong + (this.item.TongKhoiLuongCuiHoi || 0)) * 100;
  }
  enter(i){
    if(i+1<this.inputNumbers.toArray().length){
      this.inputNumbers.toArray()[i+1].el.nativeElement.children[0].children[0].focus();
    }else{
      this.inputNumbers.toArray()[0].el.nativeElement.children[0].children[0].focus();
    }
  }
  enterCon(i){
    if(i+3<this.inputNumbers.toArray().length){
      this.inputNumbers.toArray()[i+3].el.nativeElement.children[0].children[0].focus();
    }else{
      this.inputNumbers.toArray()[0].el.nativeElement.children[0].children[0].focus();
    }
  }
  TinhTongKhoiLuongBong() {
    switch(this.item.CongDoan){
        case 'CHAICOTTON':
          this.TinhTyLeCottonBongPhe();
          break;
        case 'CHAIPE':
          this.TinhTyLePEBongPhe();
          break;
        case 'CHAIKY':
            this.TinhTyLeBongChaiKy();
            break;
        case 'THO':
          this.TinhTyLeBongCuiHoi();
          break;
        case 'ONG':
          this.TinhTyLeSoiCat();
          break;
        case 'CON':
          this.TinhTyLeBongThoMang();
          break;
        case 'GHEPDAURA':
          this.TinhTyLeCuiHoiGhepDauRa();
          break;
        case 'GHEPSOBOCOTTON':
         this.TinhTyLeCuiHoiGhepSoBoCotton();
          break;
        default:
          this.TongKhoiLuong = 0;
          this.TongKhoiLuong = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuong||0),0);
          break;
      }
  }
  resetKhoiLuongCuiHoi(){
    this.TongKhoiLuong = 0;
    if(this.listItem.length > 0){
      for (let i = 0; i < this.listItem.length; i++) {
        this.listItem[i].KhoiLuongCuiHoi = 0;
        if (this.listItem[i].Ne !== undefined && this.listItem[i].Ne !== null && this.listItem[i].Ne !== 0 && this.listItem[i].DonViNangSuat===0)
          this.listItem[i].KhoiLuong = this.listItem[i].ChieuDai / (this.listItem[i].Ne * 1.693 * 1000) * (this.listItem[i].SoDauRa|| 0) - (this.listItem[i].KhoiLuongCuiHoi || 0);
        this.TongKhoiLuong += (this.listItem[i].KhoiLuong || 0);
      }
      if(this.item.isTruVaoSanLuong === true)
          this.TongKhoiLuong -= (this.item.TongKhoiLuongCuiHoi || 0);
    }
    
    let TongKhoiLuong = this.TongKhoiLuong + (this.item.TongKhoiLuongCuiHoi || 0);
    
    if (TongKhoiLuong > 0)
      this.item.TyLeCuiHoiGhepSoBoCotton = this.item.TongKhoiLuongCuiHoi / (TongKhoiLuong) * 100;
  }

  KhoiLuongBongTheoCuiHoi(item){
    this.TongKhoiLuong = 0;
    var KhoiLuong = 0;
    this.item.TongKhoiLuongCuiHoi = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuongCuiHoi||0),0);
    
    if (item.Ne !== undefined && item.Ne !== null && item.Ne !== 0 && item.DonViNangSuat===0)
      KhoiLuong = item.ChieuDai / (item.Ne * 1.693 * 1000) * (item.SoDauRa|| 0) - (item.KhoiLuongCuiHoi || 0);
    item.KhoiLuong = KhoiLuong;
    this.TongKhoiLuong = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuong||0),0);

    if(this.item.isTruVaoSanLuong === true)
      this.TongKhoiLuong = this.TongKhoiLuong - (this.item.TongKhoiLuongCuiHoi || 0);
  }

  KhoiLuongBongCongDoanCon(item){
    this.item.BongHutMoi = this.listItem.reduce((Total,ele)=>Total+(ele.HutMoi||0),0);
    item.KhoiLuong = (item.ChuDongHo || 0) * ((item.SoCoc || 0) - (item.CocChet || 0)) / 1000 - (item.HutMoi || 0);
    this.TinhTongKhoiLuongBong();
  }
  // ThayDoiTongKhoiLuong(){
  //   this.TongKhoiLuong = this.listItem.reduce((Total,ele)=>Total+(ele.KhoiLuong||0),0);
  //   if(this.item.isTruVaoSanLuong === true){
  //     this.TongKhoiLuong = this.TongKhoiLuong -  (this.item.TongKhoiLuongCuiHoi || 0);
  //   }
  // }
  tinhToan(item, opt) {
    let modalRef = this._modal.open(CalcmodalComponent)
    modalRef.result.then((res) => {
      item[opt]=res;
      this.TinhTongKhoiLuongBong();
    })
  }
}

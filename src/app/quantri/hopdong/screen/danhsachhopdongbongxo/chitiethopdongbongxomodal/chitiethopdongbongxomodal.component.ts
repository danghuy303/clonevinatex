import { DanhMucHopDongService } from "src/app/services/Hopdong/danhmuchopdong.service";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { FileUploader } from "ng2-file-upload";
import { ChonquycachdonggoimodalComponent } from "../../../../quanlykhosanxuat/modals/chonquycachdonggoimodal/chonquycachdonggoimodal.component";
import { ChonhanghoamodalComponent } from "../../../../quanlykhosanxuat/modals/chonhanghoamodal/chonhanghoamodal.component";

import { Component, DoCheck, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { CalcmodalComponent } from "src/app/quantri/modal/calcmodal/calcmodal.component";
import { ModalthongbaoComponent } from "src/app/quantri/modal/modalthongbao/modalthongbao.component";
import { UploadmodalComponent } from "src/app/quantri/modal/uploadmodal/uploadmodal.component";
import { Dat09Service } from "src/app/services/callApi";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { vn } from "src/app/services/const";
import {
  DateToDatePicker,
  DateToUnix,
  deepCopy,
  mapArrayForDropDown,
  merge,
  validVariable,
} from "src/app/services/globalfunction";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-chitiethopdongbongxomodal",
  templateUrl: "./chitiethopdongbongxomodal.component.html",
  styleUrls: ["./chitiethopdongbongxomodal.component.css"],
})
// export class ChitiethopdongbongxomodalComponent implements OnInit{
//   constructor(public activeModal:NgbActiveModal){}
//   ngOnInit() {
//     // this.updateInjectorAndContext();
//   }
// }
export class ChitiethopdongbongxomodalComponent implements OnInit {
  opt: any = "";
  item: any = {
    Id: "",
    // SoQuyTrinh: 'PKK_0000_001',
    // listKienHang: []
  };
  lang: any = vn;
  filter: any = {
    keyWord: "",
  };
  listLoaiHopDong: any = [];
  checkedAll: boolean = false;
  checkbutton: any = {
    Ghi: true,
    Xoa: true,
    KhongDuyet: true,
    ChuyenTiep: true,
  };
  listPhuongAnSapXep: any = [];
  listDonVi: any = [];
  listMucDich: any = [
    { value: 0, label: "Xuất khẩu" },
    { value: 1, label: "Nội địa" },
  ];
  listPhanXuong: any = [];
  listMatHang: any = [];
  listQuyCachDongGoi: any = [];
  yearRange: string = `${new Date().getFullYear()}:${
    new Date().getFullYear() + 5
  }`;
  constructor(
    public activeModal: NgbActiveModal,
    private services: SanXuatService,
    private _servicesdmHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    public _modal: NgbModal,
    private _store: StoreService
  ) {}

  ngOnInit(): void {
    this.GetFormOptions();
    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
      if (this._store.getCurrent()) {
        this.item.IdDuAn = this._store.getCurrent();
      }
    }
  }
  ngDoCheck(): void {
    this.Calculate();
  }
  KiemTraButtonModal() {
    this.services
      .KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "")
      .subscribe((res: any) => {
        this.checkbutton = res;
      });
  }
  GetFormOptions() {
    this.services
      .GetOptions()
      .GetMatHang()
      .subscribe((res: Array<any>) => {
        this.listMatHang = res;
      });
    this._servicesdmHopDong
      .DanhMucLoaiHopDong()
      .GetList()
      .subscribe((res: Array<any>) => {
        this.listLoaiHopDong = mapArrayForDropDown(res, "ten", "id");
      });

    this._servicesdmHopDong
      .DanhMucLoaiTienTe()
      .GetList()
      .subscribe((res: Array<any>) => {
        this.listQuyCachDongGoi = mapArrayForDropDown(res, "ten", "id");
      });

    this._servicesdmHopDong
      .DanhMucThuTucThanhToan()
      .GetList()
      .subscribe((res: Array<any>) => {
        this.listQuyCachDongGoi = mapArrayForDropDown(res, "ten", "id");
      });
    this.services
      .GetOptions()
      .GetNhaMay()
      .subscribe((res: Array<any>) => {
        this.listDonVi = mapArrayForDropDown(res, "TenDuAn", "Id");
        if (validVariable(this.item.IdDuAn)) {
          this.getPhanXuong(this.item.IdDuAn, true);
        }
      });
  }
  getPhanXuong(IdDuAn, update?) {
    this.listPhanXuong = [];
    if (!!!update) {
      this.item.IddmPhanXuong = null;
    }
    this.services
      .GetOptions()
      .GetPhanXuong(IdDuAn)
      .subscribe((res: any) => {
        this.listPhanXuong = mapArrayForDropDown(res, "Ten", "Id");
      });
  }

  ChuyenDuyet() {}
  KhongDuyet() {
    this.services
      .GiaoKeHoachSanXuat()
      .KhongDuyet(this.item)
      .subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      });
    // if (this.validData()) {
    //   this.services.GiaoKeHoachSanXuat().KhongDuyet(this.item).subscribe((res: any) => {
    //     if (res) {
    //       if (res.State === 1) {
    //         this.activeModal.close();
    //       } else {
    //         this.toastr.error(res.message);
    //       }
    //     }
    //   })
    // }
  }
  GetListdmPhuongAnSapXep() {}
  GetNextSoQuyTrinh() {
    this.services
      .GiaoKeHoachSanXuat()
      .GetNextSo()
      .subscribe((res: any) => {
        this.item.SoQuyTrinh = res.SoQuyTrinh;
      });
  }
  GetQuyTrinh(Id) {
    this.services
      .GiaoKeHoachSanXuat()
      .Get(Id)
      .subscribe((res: any) => {
        this.item = res;
        // console.log(res);
      });
  }
  validData() {}
  chonHangHoa() {}

  changeKeHoachSanXuat(e, item) {}

  chonQuyCachDongGoi(item) {
    let modalRef = this._modal.open(ChonquycachdonggoimodalComponent, {
      size: "lg",
    });
    modalRef.componentInstance.items = this.listQuyCachDongGoi;
    modalRef.componentInstance.layitem = item;
    modalRef.componentInstance.selectedItems = deepCopy(item.listItem || []);
    modalRef.componentInstance.IdQuyTrinh = this.item.Id;
    modalRef.result
      .then((res) => {
        // merge(res, this.item.listItem, 'IddmQuyCachDongGoi');
        item.listItem = res.listItem;
        // if (item.KhoiLuongKeHoach != undefined && item.KhoiLuongKeHoach != null && item.KhoiLuongKeHoach > 0
        //   && item.listItem != undefined && item.listItem.length > 0) {
        //   let tong = 0;
        //   item.listItem.filter(obj => {
        //     if(!obj.isXoa){
        //       tong += obj.KhoiLuong;
        //     }
        //   });
        //   if (item.KhoiLuongKeHoach < tong) {
        //     this.toastr.error("Không được lớn hơn Kế hoạch sản xuất");
        //   }
        // }
      })
      .catch((er) => {
        console.log(er);
      });
  }

  Calculate() {}
  HoanThanh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });

    this.services
      .GiaoKeHoachSanXuat()
      .HoanThanh(this.item)
      .subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      });
    // if (this.validData()) {
    //   modalRef.componentInstance.message = "Bạn có chắc chắn các mặt hàng này đã hoàn thành?"
    //   modalRef.result.then(res => {
    //     this.services.GiaoKeHoachSanXuat().HoanThanh(this.item).subscribe((res: any) => {
    //       if (res) {
    //         if (res.State === 1) {
    //           this.toastr.success(res.message)
    //           this.activeModal.close();
    //         } else {
    //           this.toastr.error(res.message);
    //         }
    //       }
    //     })
    //   }).catch(er => console.log(er))
    // }
  }
  XoaQuyTrinh() {}

  changePhuongAnDeXuat(event, item) {
    item.TenPhuongAnDeXuat = event.Ten;
    item.IDdmPhuongAnDeXuat = event.ID;
  }
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    console.log(item);
    // let item = this.items.splice(i, 1)[0];
    if (item.Id.trim() === "") {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  refreshFilterMatHang() {
    this.filter.keyWord = "";
  }
  checkAll(e) {
    if (e.checked) {
      this.item.listItem.forEach((item) => {
        item.isDaHoanThanh = true;
      });
    } else {
      this.item.listItem.forEach((item) => {
        item.isDaHoanThanh = false;
      });
    }
  }
  checked() {
    this.checkedAll = this.item.listItem.every((ele) => ele.checked);
  }
}

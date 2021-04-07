import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { ImportnhapkhothanhphamComponent } from '../nhapkhothanhphammodal/modals/importnhapkhothanhpham/importnhapkhothanhpham.component';

@Component({
  selector: 'app-khobongkiemkekhomodal',
  templateUrl: './khobongkiemkekhomodal.component.html',
  styleUrls: ['./khobongkiemkekhomodal.component.css']
})
export class KhobongkiemkekhomodalComponent implements OnInit {
  @ViewChild("paginator") paginator: any;
  opt: any = "";
  Id: any = "";
  item: any = {};
  checkbutton: any = {
      Ghi: true,
      KhongDuyet: false,
      ChuyenTiep: false,
      Xoa: false,
  };
  listdmKho: any = [];
  listdmKhoFull: any = [];
  listLoBong: any = [];
  listQuyCachDongGoi: any = [];
  listNewMatHang: any = [];
  listNewMatHang_ref: any = [];
  isKhoThanhPham:any=false;
  paging: any = {};
  listItem: any = [];
  title: any = "";
  newItem: any = {};
  constructor(
      public activeModal: NgbActiveModal,
      private services: SanXuatService,
      public toastr: ToastrService,
      public _modal: NgbModal
  ) { }

  ngOnInit(): void {
      if (this.opt !== "edit") {
          this.GetNextSoQuyTrinh();
      } else {
          this.GetQuyTrinh();
      }
      var data: any = {};
      data.CurrentPage = 0;
      data.Loai = 2;
      this.item.Loai = 2;
      this.services.GetListdmKho(data).subscribe((res: any) => {
          this.listdmKho = mapArrayForDropDown(res, "Ten", "Id");
          this.listdmKhoFull = res;
      });
      this.services.GetListLoBong(data).subscribe((res: any) => {
          this.listLoBong = mapArrayForDropDown(res, "Ten", "Id");
      });
      
      this.services
          .dmQuyCachDongGoi()
          .GetList()
          .subscribe((res: any) => {
              this.listQuyCachDongGoi = mapArrayForDropDown(res, "Ten", "Id");
          });
      this.services
          .PhieuKiemKeKho()
          .GetlistdmMatHangThanhPhamKiemKe()
          .subscribe((res: any) => {
              this.listNewMatHang = mapArrayForDropDown(res, "Ten", "Id");
              this.listNewMatHang_ref = res;
          });
  }
  GetQuyTrinh() {
      this.services
          .PhieuKiemKeKhoBong()
          .Get(this.Id)
          .subscribe((res1: any) => {
              this.item = res1;
            //   this.listItem = res1.listItem;
              this.item.listItem = res1.listItem;
              this.paging.CurrentPage = 1;
              this.paging.TotalPage = 5;
              this.paging.TotalItem = res1.listItem.length;
              this.listItem = res1.listItem.slice(0, 10);
              this.KiemTraButtonModal();
          });
  }
  KiemTraButtonModal() {
      this.services
          .KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "")
          .subscribe((res) => {
              this.checkbutton = res;
          });
  }

  ChuyenDuyet() {
      this.services
          .PhieuKiemKeKhoBong()
          .ChuyenTiep(this.item)
          .subscribe((res: any) => {
              if (res) {
                  if (res.State === 1) {
                      this.activeModal.close();
                  } else {
                      this.toastr.error(res.message);
                  }
              }
          });
  }

  GetNextSoQuyTrinh() {
      this.services
          .PhieuKiemKeKhoBong()
          .GetNextSo()
          .subscribe((res: any) => {
              this.item.SoQuyTrinh = res.SoQuyTrinh;
          });
  }

  GhiLai() {
      this.services
          .PhieuKiemKeKhoBong()
          .Set(this.item)
          .subscribe((res: any) => {
              if (res) {
                  if (res.State === 1) {
                      this.toastr.success(res.message);
                      this.opt = "edit";
                    //   this.item = res.objectReturn;
                      this.Id = res.objectReturn.Id;
                      this.GetQuyTrinh();
                    //   this.paging.CurrentPage = 1;
                    //   this.paging.TotalPage = 5;
                    //   if (
                    //       res.objectReturn.listItem != undefined &&
                    //       res.objectReturn.listItem != null
                    //   )
                    //       this.paging.TotalItem = res.objectReturn.listItem.length;
                    //   this.listItem = res.objectReturn.listItem.slice(0, 10);
                    //   this.KiemTraButtonModal();
                  } else {
                      this.toastr.error(res.message);
                  }
              }
          });
  }
  XoaQuyTrinh() {
      let modalRef = this._modal.open(ModalthongbaoComponent, {
          backdrop: "static",
      });
      modalRef.componentInstance.message =
          "Bạn có chắc chắn muốn xóa quy trình này chứ?";
      modalRef.result
          .then((res) => {
              this.services
                  .PhieuKiemKeKhoBong()
                  .Delete(this.item)
                  .subscribe((res: any) => {
                      console.log(res);
                      if (res?.State === 1) {
                          this.activeModal.close();
                      } else {
                          this.toastr.error(res.message);
                      }
                  });
          })
          .catch((er) => console.log(er));
  }

  delete(index) {
      let item = this.item.listItem.splice(index, 1)[0];
      if (item.Id === "" || item.Id === null || item.Id === undefined) {
        this.item.listItem.splice(index, 1);
        this.listItem.splice(index, 1);
      } else {
          item.isXoa = true;
          this.item.listItem.push(JSON.parse(JSON.stringify(item)));
          this.listItem.push(JSON.parse(JSON.stringify(item)));
      }
  }
  GetMatHangTheoKho() {
      this.services.PhieuKiemKeKhoBong()
          .GetlistdmMatHangKiemKe(
              this.item.IddmKho,
              this.item.IdLoBong
          )
          .subscribe((res1: any) => {
              res1.forEach((mathang) => {
                  mathang.SoLuong = mathang.TonSoLuong;
                  mathang.TongTrongLuong = mathang.TonTongTrongLuong;
              });
              this.item.listItem = res1;
              this.listItem = res1.slice(0, 10);
              this.paging.CurrentPage = 1;
              this.paging.TotalPage = 5;
              this.paging.TotalItem = res1.length;
          });
  }
  changePage(event) {
      this.paging.CurrentPage = event.page + 1;
      let start = 10 * event.page;
      let end = start + 10;
      if (start + 10 > this.item.listItem.length) {
          end = this.item.listItem.length;
      }
      this.listItem = this.item.listItem.slice(start, end);
  }
  setNewItemName(event) {
      let selected = this.listNewMatHang_ref.find(
          (ele) => ele.Id === event.value
      );
      this.newItem.Ten = selected?.Ten;
      this.newItem.Ma = selected?.Ma;
  }
  add() {
      if (validVariable(this.newItem.IddmItem)) {
          this.listItem.push(deepCopy(this.newItem));
          this.newItem = {};
          console.log(this.paging);
          if (this.listItem.length > this.paging.CurrentPage * 10) {
              console.log(Math.floor(this.listItem.length / 10));
              this.paginator.changePage(
                  Math.floor(this.listItem.length / 10)
              );
          } else {
              this.changePage({ page: this.paging.CurrentPage - 1 });
          }
      } else {
          this.toastr.error("Vui lòng chọn mặt hàng cần thêm!");
      }
  }
  ImportExcel() {
      let modalRef = this._modal.open(ImportnhapkhothanhphamComponent, {
        backdrop: 'static',
      })
      modalRef.result.then(res => {
        this.toastr.success('Cập nhật thành công!');
          this.item.listItem = res.items;
          this.paginator.changePage(0);
      })
        .catch(er => console.log(er))
    }
}

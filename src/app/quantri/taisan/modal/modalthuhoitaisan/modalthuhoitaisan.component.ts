import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalchontaisanComponent } from '../modalchontaisan/modalchontaisan.component';
@Component({
  selector: 'app-modalthuhoitaisan',
  templateUrl: './modalthuhoitaisan.component.html',
  styleUrls: ['./modalthuhoitaisan.component.css']
})
export class ModalthuhoitaisanComponent implements OnInit {

  newitem: any = {};
  showDropDown: boolean = false;
  item: any = {listTaiSan:[]};
  type = '';
  opt = '';
  listPhanXuong = [];
  public listdsTaiSan:any = [];
  public listTaiSanRef:any = [];
  listTaiSan:any = [];
  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private _serviceTaiSan: TaisanService,
    public toastr: ToastrService,
    public store: StoreService,
    public _modal: NgbModal,
  ) { }

  ngOnInit(): void {
    if (this.type === 'themmoi') {
      this.GetNextSoQuyTrinh();
    }
    this.GetListdmPhanXuong();
    this.GetListTaiSanChuaBanGiao();
  }

  GetListdmPhanXuong() {
    this._services.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      console.log(res)
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetListTaiSanChuaBanGiao() {
    this._serviceTaiSan.GetOptions().GetListTaiSanChuaBanGiao().subscribe((res: any) => {
      console.log(res)
      this.listdsTaiSan = mapArrayForDropDown(res.Data, 'Ten', 'Id');
      this.listTaiSanRef = res.Data;
    })
  }

  add() {
    if (this.item.listTaiSan == undefined || this.item.listTaiSan == null)
      this.item.listTaiSan = [];
    this.item.listTaiSan.push(this.newitem);
    this.newitem = {}
  }

  delete(index) {
    let item = this.item.listTaiSan.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listTaiSan.push(JSON.parse(JSON.stringify(item)));
    }
  }

  edit(item) {
    item.edit = true;
  }

  save(item) {
    item.edit = false;
  }

  xoa(item) {

  }
  validate(): boolean {
    if (!validVariable(this.item.IddmPhanXuong)) {
      this.toastr.error('Vui lòng nhập phân xưởng!!');
      return false;
    }
    return true;
  }
  setData() {
    this.item.IdDuAn = this.store.getCurrent();
    return this.item;
  }
  GhiLai() {
    if (this.validate()) {
      this._serviceTaiSan.PhieuThuHoiTaiSan().Set(this.setData()).subscribe((res: any) => {
          if (res.StatusCode !== 200 || !res.StatusCode) {
            this.toastr.error("Có lỗi trong quá trình xử lý!!!");
          } else {
            this.toastr.success(res.Message);
            // this.activeModal.close();
          }
      },(er)=>{
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      })
    }

  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.PhieuThuHoiTaiSan().GetNextSoQuyTrinh().subscribe((res: any) => {
      console.log(res)
      this.item.SoQuyTrinh = res.Data;
    })
  }

  ThemMoiDanhSachTaiSan() {
    let modalRef = this._modal.open(ModalchontaisanComponent, {
      size: "xl",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.item = {};
    modalRef.result.then((res: any) => {
        // console.log(res);
        res.forEach(element => {
          element.SoLuong=0; 
          this.item.listTaiSan.push(element);
        });
        console.log(this.item.listTaiSan)
      })
      .catch((er) => {

      });
  }
}

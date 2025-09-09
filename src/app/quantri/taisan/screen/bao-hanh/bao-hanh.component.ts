import { Label } from '@amcharts/amcharts4/core';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { BaoHanhPopupComponent } from './bao-hanh-popup/bao-hanh-popup.component';


@Component({
  selector: 'app-bao-hanh',
  templateUrl: './bao-hanh.component.html',
  styleUrls: ['./bao-hanh.component.css']
})
export class BaoHanhComponent implements OnInit {

  @Input() listBaoHanh: any = [];
  @Output() itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() listKiemDinh: any = [];
  constructor(
    private _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _services: SanXuatService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.listBaoHanh?.forEach(element => {
      element.TenDonViBaoHanh = element.IdDonViBaoHanh ? this.listKiemDinh.filter(ele => ele.value === element.IdDonViBaoHanh)[0].label : '';
    });
  }

  ngOnInit(): void {
    // this.GetListdm(); 8/9/2025 a_lap dv bảo hành lấy luôn theo nhà cung cấp
  }

  GetListdm() {
    let data = {
      CurrentPage: 0,
      PageSize: 0,
      IddmTinhTrangNhaCungUng: '',
    }
    this._services.GetALLdmNhaCungUngHienHang(data).subscribe((res: any) => {
      this.listKiemDinh = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  add() {
    let modalRef = this._modal.open(BaoHanhPopupComponent, {
      backdrop: 'static',
      size: 'lg'
    });
    modalRef.componentInstance.title = "Thêm mới bảo hành";
    modalRef.componentInstance.listKiemDinh = this.listKiemDinh;
    modalRef.result.then((res: any) => {
      this.listBaoHanh = this.listBaoHanh?.length ? this.listBaoHanh : [];
      res.TenDonViBaoHanh = res.IdDonViBaoHanh ? this.listKiemDinh.filter(ele => ele.value === res.IdDonViBaoHanh)[0].label : '';
      this.listBaoHanh.push(res);
      this.itemChange.emit(this.listBaoHanh);
    })
  }

  edit(item: any, index: any) {
    let modalRef = this._modal.open(BaoHanhPopupComponent, {
      backdrop: 'static',
      size: 'lg'
    });
    modalRef.componentInstance.title = "Chỉnh sửa bảo hành";
    modalRef.componentInstance.listKiemDinh = this.listKiemDinh;
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
      res.TenDonViBaoHanh = res.IdDonViBaoHanh ? this.listKiemDinh.filter(ele => ele.value === res.IdDonViBaoHanh)[0].label : '';
      this.listBaoHanh[index] = res;
      this.itemChange.emit(this.listBaoHanh);
    })
  }

  delete(index) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this.listBaoHanh.splice(index, 1)[0];
    }).catch(er => console.log(er))
  }

}

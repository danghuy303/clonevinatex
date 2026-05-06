import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhSachTaiLieuCongViecPopupComponent } from '../danh-sach-tai-lieu-cong-viec-popup/danh-sach-tai-lieu-cong-viec-popup.component';
import { TaisanService } from '../../services/Taisan/taisan.service';

@Component({
  selector: 'app-tai-lieu-phan-cong-cong-viec',
  templateUrl: './tai-lieu-phan-cong-cong-viec.component.html',
  styleUrls: ['./tai-lieu-phan-cong-cong-viec.component.css']
})
export class TaiLieuPhanCongCongViecComponent implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  listFileDinhKem: any = [];
  optionPheDuyet: any = [
    { label: 'Chờ duyệt', value: 2 },
    { label: 'Không duyệt', value: 0 },
    { label: 'Phê duyệt', value: 1 },
    { label: 'Phê duyệt pháp lý', value: 3 },
  ];
  listFile: any = [];
  quyTrinh: any = {};

  constructor(
    public activeModal: NgbActiveModal,
    private modal: NgbModal,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
  }

  scrollToLeft() {
    this.scrollContainer.nativeElement.scrollLeft = 0;
  }
  HandleAddFile() {
    let data = {
      Id: "",
      Created: new Date(),
      TenTaiLieu: "",
      FileName: "",
      IddmNhomTaiLieu: "",
      NguoiUp: "",
      isPheDuyet: 2,
      GhiChu: "",
      Link: "",
      isQuyTrinh: 0,
      isPhaiNop: 0,
      isXoa: false,
      disabled: true,
      isLoai: true,
    }
    this.listFileDinhKem = this.listFileDinhKem || [];
    this.listFileDinhKem.push(data);
    this.scrollToLeft();
  }

  GhiLai() {

  }

  handleDanhSachTaiLieu() {
    this._serviceTaiSan.GetlistFileDinhKemForPhanCongCongViec(this.quyTrinh.Id, this.quyTrinh.eAction).subscribe((res: any) => {
      let modalRef = this.modal.open(DanhSachTaiLieuCongViecPopupComponent, {
        size: 'fullscreen-100',
        backdrop: 'static'
      });
      // modalRef.componentInstance.listDS = this.quyTrinh.listFileDinhKem ? this.quyTrinh.listFileDinhKem.filter((ele: any) => ele.isPhanCongCongViec !== true) : [];
      modalRef.result.then((res: any) => {

      })
    })
  }

  handleUpLoadItem(data: any, index: number) {
    this.listFileDinhKem[index] = {
      ...this.listFileDinhKem[index],
      FileName: data.NameLocal,
      FileNameGUI: data.Name,
      Size: data.Size
    };
  }

}

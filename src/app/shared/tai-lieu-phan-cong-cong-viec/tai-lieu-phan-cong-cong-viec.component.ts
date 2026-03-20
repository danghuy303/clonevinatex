import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tai-lieu-phan-cong-cong-viec',
  templateUrl: './tai-lieu-phan-cong-cong-viec.component.html',
  styleUrls: ['./tai-lieu-phan-cong-cong-viec.component.css']
})
export class TaiLieuPhanCongCongViecComponent implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @Input() quyTrinh: any = {};
  optionPheDuyet: any = [
    { label: 'Chờ duyệt', value: 2 },
    { label: 'Không duyệt', value: 0 },
    { label: 'Phê duyệt', value: 1 },
    { label: 'Phê duyệt pháp lý', value: 3 },
  ];
  listFile: any = [];

  constructor(
    public activeModal: NgbActiveModal,
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
    this.quyTrinh.listFileDinhKem = this.quyTrinh.listFileDinhKem || [];
    this.quyTrinh.listFileDinhKem.push(data);
    this.scrollToLeft();
  }

  GhiLai() {

  }

  handleDanhSachTaiLieu() {

  }

}

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { QuytrinhServiceService } from '../../services/quytrinh-service.service';
import { StoreService } from '../../services/store.service';
import { API } from '../../services/host';
import { ConfirmationService } from '../../services/confirmation.service';
import { ToastrService } from 'ngx-toastr';
import { LichsudownloadComponent } from '../lichsudownload/lichsudownload.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-danh-sach-tai-lieu',
  templateUrl: './danh-sach-tai-lieu.component.html',
  styleUrls: ['./danh-sach-tai-lieu.component.css']
})
export class DanhSachTaiLieuComponent implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @Input() quyTrinh: any = {};
  @Input() isThuyetMinh: boolean = false;
  optionPheDuyet: any = [
    { label: 'Chờ duyệt', value: 2 },
    { label: 'Không duyệt', value: 0 },
    { label: 'Phê duyệt', value: 1 },
    { label: 'Phê duyệt pháp lý', value: 3 },
  ];
  listFile: any = [];

  constructor(
    public quyTrinhService: QuytrinhServiceService,
    private store: StoreService,
    public confirmService: ConfirmationService,
    public toast: ToastrService,
    public modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.GetListFile();
  }

  GetListFile() {
    let data = {
      CurrentPage: 0,
      IdDuAn: this.store.getCurrent() || 0,
    }
    this.quyTrinhService.GetListdmNhomTaiLieu(data).subscribe((res: any) => {
      this.listFile = res.Data.filter((ele: any) => ele.isHoatDong).map((ele: any) => {
        return {
          value: ele.Id,
          label: `${ele.Ma}-${ele.Ten}`
        }
      });
      this.quyTrinh.listFileDinhKem?.forEach((obj: any) => {
        obj.Ten = this.listFile.filter((ele: any) => ele.value === obj.IddmNhomTaiLieu)[0]?.label;
      })
    })
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
      isPheDuyet: this.quyTrinh.isPheDuyet,
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

  test(e: any) {
    e.preventDefault();
    this.toast.warning('Vui lòng không sao chép thông tin mã hóa!');
    if (navigator.clipboard) {
      navigator.clipboard.writeText('Bạn không được sao chép link đã mã hóa!').then(() => {
      }, (error) => {
        console.log(error)
      });
    } else {
      this.toast.error('Chức năng mã hóa link chỉ chạy trên domain có SSL (https)!');
    }
  }

  handleUpLoadItem(data: any, index: number) {
    this.quyTrinh.listFileDinhKem[index] = {
      ...this.quyTrinh.listFileDinhKem[index],
      FileName: data.NameLocal,
      FileNameGUI: data.Name,
      Size: data.Size
    };
  }

  downloadFile(url: string, id: string, selfType?: boolean, Module?: string) {
    let link = API.imgURL + '/' + url;
    if (selfType) {
      link = url;
    }
    window.open(link);
    this.quyTrinhService.SetFileDinhKemDownload(id, Module).subscribe((res: any) => {
    })
  }

  DeleteFile(index: number) {
    this.confirmService.show({
      message: 'Bạn chắc chắn muốn xóa file này?'
    }, () => {
      let item = this.quyTrinh.listFileDinhKem.splice(index, 1);
      if (item.Id === '' || item.Id === null || item.Id === undefined) {
      } else {
        item.isXoa = true;
        this.quyTrinh.listFileDinhKem.push(JSON.parse(JSON.stringify(item)));
      }
    })
  }

  OpenHistory(id: string, Module: string) {
    this.quyTrinhService.GetFileDinhKem(id, Module).subscribe((res: any) => {
      let modalRef = this.modal.open(LichsudownloadComponent, {
        size: 'md',
        backdrop: 'static',
      })
      modalRef.componentInstance.listLichSu = res.Data;
    });
  }

  showView(id: string, Module: string) {
    this.quyTrinhService.XemTruocTaiLIeu(id, Module).subscribe((res: any) => {
      let link = API.imgURL + res.Data;
      window.open(link);
    });
  }

  handleChangeItem(data: any) {
    this.quyTrinh.listFileDinhKem = this.quyTrinh.listFileDinhKem || [];
    this.quyTrinh.listFileDinhKem.push({
      FileName: data.NameLocal,
      FileNameGUI: data.Name,
      Id: "",
      Created: new Date(),
      TenTaiLieu: "",
      IddmNhomTaiLieu: "",
      NguoiUp: "",
      isPheDuyet: this.quyTrinh.isPheDuyet,
      GhiChu: "",
      Link: "",
      isQuyTrinh: 0,
      isPhaiNop: 0,
      isXoa: false,
      disabled: true,
      isLoai: true,
    })
    this.scrollToLeft();
  }

}

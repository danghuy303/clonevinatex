import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuytrinhServiceService } from '../../services/quytrinh-service.service';
import { ConfirmationService } from '../../services/confirmation.service';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-noi-dung-trao-doi',
  templateUrl: './noi-dung-trao-doi.component.html',
  styleUrls: ['./noi-dung-trao-doi.component.css']
})
export class NoiDungTraoDoiComponent implements OnInit {

  traoDoi: any = {};
  @Input() IdTable: string = '';
  @Input() IdParent: string = '';
  @Input() eAction: string = '';
  @Output() traoDoiChange: EventEmitter<any> = new EventEmitter();

  constructor(
    public authService: AuthenticationService,
    public confirmService: ConfirmationService,
    public quyTrinhService: QuytrinhServiceService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.ResetTraoDoiInput();
  }

  ResetTraoDoiInput() {
    this.traoDoi = {
      TableId: this.IdTable,
      eAction: this.eAction,
      IdTrangThai: '',
      IdParent: this.IdParent || '',
      TenNguoiTao: this.authService.currentUserValue.UserName,
      NoiDungTraoDoi: '',
      listChild: [],
      listFileDinhKem: [],
    }
  }

  ValidateData() {
    if (this.traoDoi.NoiDungTraoDoi.trim() === '') {
      this.toast.error("Vui lòng nhập nội dung trao đổi!")
      return false;
    }
    return true;
  }

  SetTraoDoi() {
    if (this.ValidateData()) {
      this.quyTrinhService.SetTraoDoiQuyTrinh(this.traoDoi).subscribe((res: any) => {
        if (res.State === 1) {
          this.toast.success(res.message);
          this.ResetTraoDoiInput();
          this.HandleEvent('done');
        } else {
          this.toast.error(res.message);
        }
      })
    }
  }

  handleChangeItem(data: any) {
    this.traoDoi.listFileDinhKem.push({
      FileName: data.NameLocal,
      FileNameGUI: data.Name,
      Size: data.Size
    });
  }

  DeleteFileTraoDoi(index: number) {
    this.confirmService.show({
      message: 'Bạn chắc chắn muốn xóa file này?'
    }, () => {
      this.traoDoi.listFileDinhKem.splice(index, 1);
    })
  }

  HandleEvent(e: any) {
    this.traoDoiChange.emit(e);
  }

}

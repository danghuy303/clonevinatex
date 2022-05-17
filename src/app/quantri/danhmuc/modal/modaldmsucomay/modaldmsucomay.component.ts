import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-modaldmsucomay',
  templateUrl: './modaldmsucomay.component.html',
  styleUrls: ['./modaldmsucomay.component.css']
})
export class ModaldmsucomayComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';
  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
  }
  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (validVariable(this.item.Ma) && validVariable(this.item.Ten)&& validVariable(this.item.STT)) {
      this.sanXuatService.DanhMucSuCoMay().Set(this.item).subscribe((res: any) => {
        if (res) {
          this.resAction(res)
        }
      })
    }else{
      this.toastr.error('Vui lòng nhập đầy đủ trường dữ liệu bắt buộc!')
    }
  }

  resAction(res: any) {
    if (res.State === 1) {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.activeModal.close(res.message);
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.error(res.message)
    }
  }
}

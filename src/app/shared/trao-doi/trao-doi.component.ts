import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuytrinhServiceService } from '../../services/quytrinh-service.service';
import { ToastrService } from 'ngx-toastr';
import { host1 } from '../../services/host';

@Component({
  selector: 'app-trao-doi',
  templateUrl: './trao-doi.component.html',
  styleUrls: ['./trao-doi.component.css']
})
export class TraoDoiComponent implements OnInit {

  @Input() IdTable: string = '';
  @Input() IdParent: string = '';
  @Input() eAction: string = '';
  @Output() traoDoiChange: EventEmitter<any> = new EventEmitter();

  host: string = host1;
  listTraoDoi: any[] = [];
  reply: boolean = false;
  expanded: boolean = false;

  constructor(
    public quyTrinhService: QuytrinhServiceService,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.GetListTraoDoi();
  }

  GetListTraoDoi() {
    let data = {
      eAction: this.eAction,
      TableId: this.IdTable,
    }
    this.quyTrinhService.TraoDoiQuyTrinh(data).subscribe((res: any) => {
      if (res.State === 1) {
        this.listTraoDoi = res.Data.map((traodoi: any) => {
          return {
            ...traodoi,
            expanded: true,
            reply: false,
          }
        })
      }
      else {
        this.toast.error(res.message + ' Tải trao đổi từ server không thành công! Vui lòng liên hệ backend!')
      }
    })
  }

  DisplayEvent(item: any, name: string) {
    item[name] = !item[name];
    if (name === 'reply') {
      this.reply = item[name];
      this.listTraoDoi.forEach((traodoi: any) => {
        traodoi.reply = (traodoi.Id !== item.Id) ? !item.reply : item.reply;
      })
    }
  }

  HandleTraoDoi(e: any) {
    if (e === 'done') {
      this.reply = false;
      this.GetListTraoDoi();
    }
  }

  showViewTraoDoi(id: string, Module: string) {
    this.quyTrinhService.XemTruocTaiLIeuTraoDoi(id, Module).subscribe((res: any) => {
      let link = this.host + res.Data;
      window.open(link);
    });
  }


}

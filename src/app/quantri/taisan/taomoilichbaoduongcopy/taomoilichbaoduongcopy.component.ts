import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalcapnhatbaoduongcopyyComponent } from '../modalcapnhatbaoduongcopyy/modalcapnhatbaoduongcopyy.component';

@Component({
  selector: 'app-taomoilichbaoduongcopy',
  templateUrl: './taomoilichbaoduongcopy.component.html',
  styleUrls: ['./taomoilichbaoduongcopy.component.css']
})
export class TaomoilichbaoduongcopyComponent implements OnInit , OnChanges{

  @Input('item') item: any = {};
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  listIdDaChon: any = [];

  constructor(public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {
  }
  addBaoDuong() {
    this.listIdDaChon = this.item?.listLichBaoDuong?.map(ele => {
      return ele.IddmLoaiBaoDuong
    }) || [];
    let modalRef = this._modal.open(ModalcapnhatbaoduongcopyyComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.title = "Thêm mới lịch bảo dưỡng";
    modalRef.componentInstance.listLichBaoDuong = this.item.listLichBaoDuong || [];
    modalRef.componentInstance.LayId = this.item;
    modalRef.componentInstance.existedItems = this.listIdDaChon|| [];
    modalRef.result
      .then((res: any) => {
        this.item.listLichBaoDuong.push(res);
      })
      .catch((er) => {

      });
  }
  CapNhat(index, item) {
    let item_copy = { ...item };
    this.listIdDaChon = this.item?.listLichBaoDuong?.map(ele => {
      return ele.IddmLoaiBaoDuong
    })||[]
    let modalRef = this._modal.open(ModalcapnhatbaoduongcopyyComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.title = "Cập nhật lịch bảo dưỡng";
    modalRef.componentInstance.item = item_copy;
    modalRef.componentInstance.existedItems = this.listIdDaChon|| [];
    modalRef.result
      .then((res: any) => {
        this.item.listLichBaoDuong[index] = res;
        this.toastr.success(`Cập nhật thành công!`)
      })
      .catch((er) => {

      });
  }
  // Xoa(item, index) {
  //   if (validVariable(item.Id)) {
  //     this.item.listLichBaoDuong.splice(index, 1);
  //   }
  //   else {
  //     this.item.listLichBaoDuong[index].isXoa = true;
  //   }
  // }
  delete(index) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this.item.listLichBaoDuong.splice(index, 1);
    }).catch(er => console.log(er))
  }

}

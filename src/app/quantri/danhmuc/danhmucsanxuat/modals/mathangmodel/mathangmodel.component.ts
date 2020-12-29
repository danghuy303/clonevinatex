import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { congDoan } from 'src/app/services/const';
import { MultiSelectModule } from 'primeng/multiselect';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-mathangmodel',
  templateUrl: './mathangmodel.component.html',
  styleUrls: ['./mathangmodel.component.css']
})
export class MathangmodelComponent implements OnInit {
  opt: any = ''
  item: any = {
  };
  listCongDoan: any = [];
  listLoaiSoi: any = [];
  constructor(public activeModal: NgbActiveModal,
    private services: SanXuatService,
    public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    console.log(this.item);
    this.getListLoaiSoi();
  }

  getListLoaiSoi() {
    this.services.GetListOptdmLoaiSoi().subscribe((res: any) => {
      this.listLoaiSoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  accept() {
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined) {
      this.item.Loai = 1;
      this.item.DonViThietKe = this.item.DonViDatHang;
      var listCodeCongDoan_new: any = [];
      if (this.item.listCongDoan != null && this.item.listCongDoan != undefined) {
        this.item.listCongDoan.forEach(element => {
          var data: any = {};
          data.CongDoan = element;
          data.Id = element.Id;
          listCodeCongDoan_new.push(data);
        });
        this.item.listCongDoan = listCodeCongDoan_new;
      }


      this.services.SetdmItem(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close(res.message);
          } else {
            this.toastr.error(res.message)
          }
        }
      })
    } else {
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!')
    }
  }

}

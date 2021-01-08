import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { congDoan } from 'src/app/services/const';
import { MultiSelectModule } from 'primeng/multiselect';
import { deepCopy, mapArrayForDropDown } from 'src/app/services/globalfunction';

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
  listItem: any = [];
  editTableItem: any = {};
  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal,
    private services: SanXuatService,
    public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.getListItemDinhMuc();
    }
    console.log(this.item);
    console.log(this.item.listCongDoan);
    this.getListLoaiSoi();
  }

  getListLoaiSoi() {
    this.services.GetListOptdmLoaiSoi().subscribe((res: any) => {
      this.listLoaiSoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined) {
      this.item.Loai = 1;
      this.item.DonViThietKe = this.item.DonViDatHang;
      var listCodeCongDoan_new: any = [];
      if (this.item.listCongDoan != null && this.item.listCongDoan != undefined) {
        console.log(this.item.listCongDoan)
        this.item.listCongDoan.forEach(element => {
          if(element != null && element!= undefined){
            var data: any = {};
            data.CongDoan = element;
            listCodeCongDoan_new.push(data);
          }
        });
        this.item.listCongDoan = listCodeCongDoan_new;
      }
      if(this.item.Id === undefined || this.item.Id === null || this.item.Id === "")
        this.item.HoatDong = true;
      this.services.SetdmItem(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.activeModal.close(res.message);
          } else {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.toastr.error(res.message)
          }
        }
      })
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!')
    }
  }

  getListItemDinhMuc() {
    this.services.KhoiTaoItem().subscribe((res: any) => {
      this.item.listDinhMuc = res;
    })
  }
  edit(item, index) {
    this.item.listDinhMuc.forEach(element => {
      element.editField = false;
    });
    this.item.listDinhMuc[index].editField = true;
    this.editTableItem = deepCopy(item);
  }
  delete(index) {
    let item = this.item.listDinhMuc.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listDinhMuc.push(JSON.parse(JSON.stringify(item)));
    }
  }
  saveEdit(item, index){
    this.item.listDinhMuc[index] = item;
    this.item.listDinhMuc[index].editField = false;
  }
  cancelEdit(item, index){
    this.item.listDinhMuc[index].editField = false;
  }
}

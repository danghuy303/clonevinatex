import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { DanhsachduanComponent } from '../danhsachduan/danhsachduan.component';

@Component({
  selector: 'app-thong-tin-chung',
  templateUrl: './thong-tin-chung.component.html',
  styleUrls: ['./thong-tin-chung.component.css']
})
export class ThongTinChungComponent implements OnInit {

  @Input() item: any;
  listNhomCungUng: any = [];
  @Input() listDuAn: any = [];

  constructor(
    private taiSanService: TaisanService,
    public modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.GetListdmNhomCungUng();
  }

  GetListdmNhomCungUng() {
    let data = {
      CurrentPage: 0,
      PageSize: 20,
      Ma: "",
      Ten: "",
      Keyword: "",
      GhiChu: "",
    }
    this.taiSanService.NhomNhaCungUng().GetListdmNhomNhaCungung(data)
      .subscribe((res: any) => {
        let data = res.Data.filter(ele => ele.isHoatDong)
        this.listNhomCungUng = mapArrayForDropDown(data, 'Ten', 'Id');
      })
  }

  Add() {
    let modalRef = this.modal.open(DanhsachduanComponent, {
      size: "xl",
      backdrop: "static",
    })
    modalRef.componentInstance.listDuAn = this.listDuAn;
    modalRef.componentInstance.listDaChon = this.item.listDuAnUuTien.length ? this.item.listDuAnUuTien.map(ele => ele.IdDuAn) : [];
    modalRef.result
      .then((res: any) => {
        this.item.listDuAnUuTien = res.map(ele => {
          let _newObj = this.item.listDuAnUuTien?.find(obj => obj.IdDuAn === ele.IdDuAn) || ele;
          return _newObj;
        })
      })
      .catch(er => { });
  }

}

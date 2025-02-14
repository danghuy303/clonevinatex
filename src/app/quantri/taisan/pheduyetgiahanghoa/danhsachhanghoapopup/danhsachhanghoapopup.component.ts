import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from '../../../../services/Taisan/taisan.service';

@Component({
  selector: 'app-danhsachhanghoapopup',
  templateUrl: './danhsachhanghoapopup.component.html',
  styleUrls: ['./danhsachhanghoapopup.component.css']
})
export class DanhsachhanghoapopupComponent implements OnInit {

  title: string = '';
  listNhaCungUng: any = [];
  listHangHoa: any = [];
  listDaChon: any = [];
  checkedAll: boolean = false;
  isChon: any = null;

  constructor(
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
  }

  SelectSupply(item) {
    this._serviceTaiSan.GetlistdmItemByIddmNhaCungUng(item.Id).subscribe((res: any) => {
      this.listHangHoa = res.map(ele => {
        return {
          ...ele,
          Ten: ele.TendmItem,
          Ma: ele.MadmItem,
          checked: this.listDaChon.find(obj => obj.IddmItem === ele.IddmItem && obj.IddmNhaCungUng === ele.IddmNhaCungUng) ? true : false
        }
      });
      this.checked();
    })
  }

  checked() {
    this.checkedAll = this.listHangHoa.every(ele => ele.checked);
  }

  checkAll(e) {
    this.listHangHoa = this.listHangHoa.map(ele => {
      return {
        ...ele,
        checked: e.checked
      }
    })
  }

  getData(list) {
    return list.filter(obj => obj.checked).map(ele => {
      return {
        ...ele
      }
    });
  }

  ChapNhan() {
    this.activeModal.close(this.getData(this.listHangHoa));
  }

}

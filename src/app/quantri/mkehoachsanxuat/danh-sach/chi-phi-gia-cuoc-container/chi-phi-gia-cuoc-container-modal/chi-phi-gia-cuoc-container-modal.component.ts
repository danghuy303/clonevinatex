import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { handleHTTPResponse } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

interface ChiPhi {
  Nam: number,
  IdDuAn: number,
  lstContainers: 
    {
      TenLoaiContainer: string,
      lstGiaCuoc: Array<ChiPhiDetail>
    }[]
}
interface ChiPhiDetail {
  IdContainer: string,
  MaNuoc: string,
  GiaCuocVanChuyen: number,
  GiaCuocHangTau: number,
  DonViTinh: "",
  Nam: number,
  IdDuAn: number,
  TenNuoc: string,
  TenConTaiNer: string
}
interface Year {
  value: number,
  label: string
}

@Component({
  selector: 'app-chi-phi-gia-cuoc-container-modal',
  templateUrl: './chi-phi-gia-cuoc-container-modal.component.html',
  styleUrls: ['./chi-phi-gia-cuoc-container-modal.component.css']
})
export class ChiPhiGiaCuocContainerModalComponent implements OnInit {

  title: string = "";
  option: string = "";
  item?: ChiPhi;
  years: Array<Year> = [];
  selectedYear?: number;

  constructor(
    public activeModal: NgbActiveModal,
    private _hopDongService: DanhMucHopDongService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    if (this.option === "add") {
      this.title = "Thêm mới giá cước container";
      this.selectedYear = new Date().getFullYear();
      this.getYearsForDropDown();
    } else {
      this.title = "Chỉnh sửa giá cước container";
    }
    this.getMonthsThroughYear();
  }

  getYearsForDropDown() {
    const currentYear = new Date().getFullYear();
    const futureYear = currentYear + 20
    for (let i = currentYear; i <= futureYear; i++) {
      this.years.push({ value: i, label: `${i}` });
    }
  }

  saveItem() {
    let dataToSave: ChiPhi = {
      ...this.item
    }
    this._hopDongService.GiaCuocContainer()
      .Set(dataToSave).subscribe((res: any) => {
        handleHTTPResponse(res, this.toast, () => {
          this.item = res.Data;
        })
      })
  }

  getMonthsThroughYear() {
    this._hopDongService.GiaCuocContainer()
      .GetByNam(this.selectedYear).subscribe((res: any) => {
        this.item = res;
      })
  }

}

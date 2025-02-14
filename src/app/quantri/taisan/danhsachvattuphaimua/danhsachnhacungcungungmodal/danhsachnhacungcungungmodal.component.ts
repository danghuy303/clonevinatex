import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from "../../../../services/Taisan/taisan.service";
import { NhacungcapvahangphaimuaComponent } from '../nhacungcapvahangphaimua/nhacungcapvahangphaimua.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-danhsachnhacungcungungmodal',
  templateUrl: './danhsachnhacungcungungmodal.component.html',
  styleUrls: ['./danhsachnhacungcungungmodal.component.css']
})
export class DanhsachnhacungcungungmodalComponent implements OnInit {

  title: string = '';
  listData: any = [];
  listView: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
    private _modal: NgbModal,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getList(this.listData);
  }

  getList(list) {
    this.listView = list.map((ele, index) => {
      const { listItem, ...cleanData } = ele;
      return {
        data: {
          ...cleanData,
          STT: index + 1,
          isChildren: true
        },
        children: ele.listItem.map((obj, idxChild) => {
          return {
            data: {
              ...obj,
              STT: `${index + 1}.${idxChild + 1}`,
              TenDuAn: obj.Ten,
              isChildren: false
            },
            children: []
          }
        }),
        expanded: true
      }
    });
  }

  addSupply(node, data) {
    let _payload = {
      IddmItem: data.IddmItem,
      Ngay: data.NgayUnix
    }
    this._serviceTaiSan.GetListdmNhaCungPhuHopTheoNgay(_payload).subscribe((res: any) => {
      let modalRef = this._modal.open(NhacungcapvahangphaimuaComponent, {
        backdrop: 'static',
        size: 'fullscreen-100',
        keyboard: false
      });
      modalRef.componentInstance.title = 'Chọn nhà cung cấp';
      modalRef.componentInstance.listView = res.Data;
      modalRef.result.then(res => {
        let _newArray = this.listData.map(ele => {
          return {
            ...ele,
            listItem: ele.IdDuAn === data.IdDuAn ? [...ele.listItem].map(obj => {
              let _newObj = obj.IddmItem === data.IddmItem ? {
                ...obj,
                DonGia: res.DonGia,
                IddmNhaCungUng: res.IddmNhaCungUng,
                TendmNhaCungUng: res.TendmNhaCungUng
              } : obj;
              return {
                ..._newObj,
              }
            }) : ele.listItem
          }
        })
        this.getList(_newArray);
      }).catch(er => console.log(er))
        .finally(() => {
        })
    })
  }

  setData(list) {
    return list.map(ele => {
      return {
        ...ele.data,
        listItem: ele.children.map(child => child.data)
      }
    })
  }

  ChapNhan() {
    this._serviceTaiSan.SetTongHopDonHang(this.setData(this.listView)).subscribe((res: any) => {
      if (res.StatusCode === 200) {
        this.activeModal.close(res.Data);
        this.toastr.success(res.Message);
      } else this.toastr.error(res.Message);
    })
  }

}

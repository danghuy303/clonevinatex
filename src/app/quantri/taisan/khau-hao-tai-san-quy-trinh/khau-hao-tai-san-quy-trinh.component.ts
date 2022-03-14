import { Component, OnInit } from '@angular/core';
import { DateToUnix } from 'src/app/services/globalfunction';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { KhauHaoTaiSanModalComponent } from './modal/khau-hao-tai-san-modal/khau-hao-tai-san-modal.component';

interface QuyTrinh {
  id: number,
  ngay: number,
  noidung: string,
  trangthai: boolean,
}

@Component({
  selector: 'app-khau-hao-tai-san-quy-trinh',
  templateUrl: './khau-hao-tai-san-quy-trinh.component.html',
  styleUrls: ['./khau-hao-tai-san-quy-trinh.component.css']
})
export class KhauHaoTaiSanQuyTrinhComponent implements OnInit {

  listQuyTrinh: QuyTrinh[] = [];
  filterQuyTrinh: QuyTrinh[] = [];
  // filter: {
  //   keyWord: string,
  //   tuNgay: number,
  //   denNgay: number,
  // };
  // paging: {
  //   currentPage: number,
  //   totalCount: number
  // };
  // trangThai: number = 1;

  filter: any = {};
  paging: any = {};
  trangThai: any = 1;

  constructor(
    private _modal: NgbModal,
  ) { 
    // fake data
    this.listQuyTrinh = [
      {
        id: 1,
        ngay: 1646870400,
        noidung: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
        trangthai: true
      },
      {
        id: 2,
        ngay: 1646881473,
        noidung: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
        trangthai: false
      },
      {
        id: 3,
        ngay: 1646881486,
        noidung: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
        trangthai: false
      },
      {
        id: 4,
        ngay: 1646795069,
        noidung: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
        trangthai: true
      },
      {
        id: 5,
        ngay: 1646708669,
        noidung: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
        trangthai: true
      },
      {
        id: 6,
        ngay: 1646622269,
        noidung: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
        trangthai: false
      },
      {
        id: 7,
        ngay: 1646881296,
        noidung: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
        trangthai: true
      },
      {
        id: 8,
        ngay: 1646881473,
        noidung: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
        trangthai: false
      },
      {
        id: 9,
        ngay: 1646881486,
        noidung: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
        trangthai: false
      },
      {
        id: 10,
        ngay: 1646795069,
        noidung: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
        trangthai: true
      },
      {
        id: 11,
        ngay: 1646708669,
        noidung: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
        trangthai: true
      },
      {
        id: 12,
        ngay: 1646622269,
        noidung: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
        trangthai: false
      },
    ]
  }

  ngOnInit(): void {
    this.ResetFilter();
  }

  // loadData(reset: boolean) {
  //   if (reset) {
  //     this.paging.currentPage = 1;
  //   }
  //   let data = {
  //     pageSize: 20, /* Giới hạn dòng dữ liệu gửi về back-end */
  //     currentPage: this.paging.currentPage,
  //     keyWord: this.filter.keyWord,
  //     tuNgay: DateToUnix(this.filter.tuNgay),
  //     denNgay: DateToUnix(this.filter.denNgay),
  //   }
  //   // this._serviceTaiSan.BanGiaoTaiSan().GetList(data).subscribe((res: any) => {
  //   //   this.items = res.Data.Items;
  //   //   this.paging = res.Data;
  //   // })
  // }

  ResetFilter() {
    this.filter = {};
    this.LoadData(true);
  }

  AddNewQuyTrinh() {
    let modalRef = this._modal.open(KhauHaoTaiSanModalComponent, {
      size: "xl",
      backdrop: "static",
    })
    modalRef.componentInstance.opt = 'add';
  }

  LoadData(reset: boolean) {
    if (reset) {
      this.paging.currentPage = 1;
      this.filterQuyTrinh = this.listQuyTrinh;
      this.paging.totalCount = this.filterQuyTrinh.length;
    }
    let keyWord = this.filter.keyWord;
    let tuNgay = DateToUnix(this.filter.tuNgay);
    let denNgay = DateToUnix(this.filter.denNgay);
    this.filterQuyTrinh = this.filterQuyTrinh.filter(a => {
      if (denNgay === 0) {
        return a.ngay >= tuNgay;
      } else {
        return a.ngay >= tuNgay && a.ngay <= denNgay;
      }
    })
    this.filterQuyTrinh = this.filterQuyTrinh.filter(a => {
      if (keyWord !== undefined) {
        return a.noidung.toLowerCase().includes(keyWord.trim().toLowerCase());
      } else {
        return a
      }
    })
    this.paging.totalCount = this.filterQuyTrinh.length;
  }

  ChangePage(event) {
    this.paging.currentPage = event.page + 1;
    this.LoadData(false)
    console.log(this.paging.currentPage);
  }

  

}

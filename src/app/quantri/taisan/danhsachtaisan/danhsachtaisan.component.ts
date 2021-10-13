import { number } from "@amcharts/amcharts4/core";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";

import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";

import {
  DateToUnix,
  mapArrayForDropDown,
  UnixToDate,
} from "src/app/services/globalfunction";

@Component({
  selector: 'app-danhsachtaisan',
  templateUrl: './danhsachtaisan.component.html',
  styleUrls: ['./danhsachtaisan.component.css']
})
export class DanhsachtaisanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

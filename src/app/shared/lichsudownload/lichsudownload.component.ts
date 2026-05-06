import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lichsudownload',
  templateUrl: './lichsudownload.component.html',
  styleUrls: ['./lichsudownload.component.css']
})
export class LichsudownloadComponent implements OnInit {

 listLichSu: any = [];

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { host1 } from 'src/app/services/host';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';

@Component({
  selector: 'app-lap-ke-hoach',
  templateUrl: './lap-ke-hoach.component.html',
  styleUrls: ['./lap-ke-hoach.component.css']
})
export class LapKeHoachComponent extends StoreBase implements OnInit {

  IdDuAnDaChon: any;
  url: string = '';
  urlSafe: SafeResourceUrl = '';
  url_copy: string = '';
  link: any;

  constructor(store: StoreService, private location: Location, private sanitizer: DomSanitizer, public activatedRoute: ActivatedRoute, public router: Router,) {
    super(store);
  }

  ngOnInit(): void {
    this.getRouting();
    this.OtherFunction()
  }

  getRouting() {
    let arr = [];
    let path: string = "";
    path = this.location.path();
    arr = path.split("/");
    this.link = `lapkehoach/danhsachkehoach`
    // this.link = this.mapRouting(arr[arr.length - 1]);
  }

  OtherFunction() {
    this.IdDuAnDaChon = this.store.getCurrent();
    let isDEV = window.location.hostname.includes('localhost');
    this.url = isDEV ? `${host1}/vinatex-module/#/${this.link}/${this.IdDuAnDaChon}` : `/vinatex-module/#/${this.link}/${this.IdDuAnDaChon}`;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    window.parent.postMessage(this.IdDuAnDaChon, `${this.url}`);
  }

}

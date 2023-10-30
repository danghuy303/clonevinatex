import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { host1 } from 'src/app/services/host';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';

@Component({
  selector: 'app-lap-ke-hoach',
  templateUrl: './lap-ke-hoach.component.html',
  styleUrls: ['./lap-ke-hoach.component.css']
})
export class LapKeHoachComponent implements OnInit {
  @ViewChild("iframe") _iframe: any;
  $sub!: Subscription;
  IdDuAnDaChon: any;
  url: string = '';
  urlSafe: SafeResourceUrl = '';
  url_copy: string = '';
  link: any;

  constructor(
    private activatedRoute: ActivatedRoute, private router: Router,
    private location: Location,
    private store: StoreService,
    private sanitizer: DomSanitizer,
  ) {
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
        this.ngOnInit()
      }
    })
  }

  ngOnInit(): void {
    this.OtherFunction()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.postMessageToIframe();
    }, 1000)
  }

  OtherFunction() {
    this.link = `lapkehoach/danhsachkehoach`
    this.IdDuAnDaChon = this.store.getCurrent();
    let isDEV = window.location.hostname.includes('localhost');
    this.url = isDEV ? `${host1}/vinatex-module/#/${this.link}/${this.IdDuAnDaChon}` : `/vinatex-module/#/${this.link}/${this.IdDuAnDaChon}`;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.postMessageToIframe();
  }

  postMessageToIframe() {
    try {
      let domain = window.location.protocol + "//" + window.location.host;
      this._iframe.nativeElement
        .contentWindow.postMessage(this.IdDuAnDaChon, `${domain}${this.url}`);
    } catch (error) {
      console.log(error);
    }
  }
}

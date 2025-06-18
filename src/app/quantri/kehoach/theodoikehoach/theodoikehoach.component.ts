import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { host1 } from '../../../services/host';
import { Location } from '@angular/common';

@Component({
  selector: 'app-theodoikehoach',
  templateUrl: './theodoikehoach.component.html',
  styleUrls: ['./theodoikehoach.component.css']
})
export class TheodoikehoachComponent implements OnInit, OnDestroy {

  @ViewChild('iframe', { static: false }) _iframe!: ElementRef;
  private $sub!: Subscription;
  private messageSubscription: any;
  IdDuAnDaChon: any;
  url: string = '';
  urlSafe: SafeResourceUrl = '';
  url_copy: string = '';
  link: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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

    const fullPath = window.location.hash || window.location.pathname;
    const segments = fullPath.split('/');
    this.link = segments[segments.length - 1];
    
    this.OtherFunction();
    this.messageSubscription = window.addEventListener('message', (event) => {
      // if (event.origin !== window.location.origin) return;
      if (event.data.from !== this.link) return;
      let id = event.data.payload;
      this.router.navigate([`/quantri/lap-ke-hoach/${this.link}/${id}`], {
        replaceUrl: true,
      });
    });
  }

  OtherFunction() {
    this.IdDuAnDaChon = this.store.getCurrent();
    let isDEV = window.location.hostname.includes('localhost');
    this.url = isDEV ? `${host1}/lap-ke-hoach/#/${this.IdDuAnDaChon}/${this.link}` : `/lap-ke-hoach/#/${this.IdDuAnDaChon}/${this.link}`;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  ngOnDestroy(): void {
    if (this.$sub) {
      this.$sub.unsubscribe();
    }
    if (this.messageSubscription) {
      window.removeEventListener('message', this.messageSubscription);
    }
  }
}
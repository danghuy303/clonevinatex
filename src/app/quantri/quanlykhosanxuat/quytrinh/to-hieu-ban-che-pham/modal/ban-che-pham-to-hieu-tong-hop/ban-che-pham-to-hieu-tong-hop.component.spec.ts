import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanChePhamToHieuTongHopComponent } from './ban-che-pham-to-hieu-tong-hop.component';

describe('BanChePhamToHieuTongHopComponent', () => {
  let component: BanChePhamToHieuTongHopComponent;
  let fixture: ComponentFixture<BanChePhamToHieuTongHopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanChePhamToHieuTongHopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanChePhamToHieuTongHopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

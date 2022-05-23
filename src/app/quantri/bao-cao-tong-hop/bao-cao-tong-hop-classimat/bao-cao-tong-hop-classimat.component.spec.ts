import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoTongHopClassimatComponent } from './bao-cao-tong-hop-classimat.component';

describe('BaoCaoTongHopClassimatComponent', () => {
  let component: BaoCaoTongHopClassimatComponent;
  let fixture: ComponentFixture<BaoCaoTongHopClassimatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoCaoTongHopClassimatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoTongHopClassimatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

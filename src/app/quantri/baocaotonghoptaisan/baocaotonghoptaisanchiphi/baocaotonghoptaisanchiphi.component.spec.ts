import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaotonghoptaisanchiphiComponent } from './baocaotonghoptaisanchiphi.component';

describe('BaocaotonghoptaisanchiphiComponent', () => {
  let component: BaocaotonghoptaisanchiphiComponent;
  let fixture: ComponentFixture<BaocaotonghoptaisanchiphiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaotonghoptaisanchiphiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaotonghoptaisanchiphiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

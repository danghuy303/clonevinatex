import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoHiemPopupThemmoiComponent } from './bao-hiem-popup-themmoi.component';

describe('BaoHiemPopupThemmoiComponent', () => {
  let component: BaoHiemPopupThemmoiComponent;
  let fixture: ComponentFixture<BaoHiemPopupThemmoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoHiemPopupThemmoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoHiemPopupThemmoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

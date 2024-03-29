import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoQrPopupComponent } from './tao-qr-popup.component';

describe('TaoQrPopupComponent', () => {
  let component: TaoQrPopupComponent;
  let fixture: ComponentFixture<TaoQrPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaoQrPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaoQrPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

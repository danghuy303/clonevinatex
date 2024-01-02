import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucMatHangPopupComponent } from './danh-muc-mat-hang-popup.component';

describe('DanhMucMatHangPopupComponent', () => {
  let component: DanhMucMatHangPopupComponent;
  let fixture: ComponentFixture<DanhMucMatHangPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhMucMatHangPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucMatHangPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

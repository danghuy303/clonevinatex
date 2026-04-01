import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachTaiLieuCongViecPopupComponent } from './danh-sach-tai-lieu-cong-viec-popup.component';

describe('DanhSachTaiLieuCongViecPopupComponent', () => {
  let component: DanhSachTaiLieuCongViecPopupComponent;
  let fixture: ComponentFixture<DanhSachTaiLieuCongViecPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachTaiLieuCongViecPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachTaiLieuCongViecPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

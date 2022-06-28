import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachTinhLuongComponent } from './danh-sach-tinh-luong.component';

describe('DanhSachTinhLuongComponent', () => {
  let component: DanhSachTinhLuongComponent;
  let fixture: ComponentFixture<DanhSachTinhLuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachTinhLuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachTinhLuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

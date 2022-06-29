import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachTinhLuongModalComponent } from './danh-sach-tinh-luong-modal.component';

describe('DanhSachTinhLuongModalComponent', () => {
  let component: DanhSachTinhLuongModalComponent;
  let fixture: ComponentFixture<DanhSachTinhLuongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachTinhLuongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachTinhLuongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

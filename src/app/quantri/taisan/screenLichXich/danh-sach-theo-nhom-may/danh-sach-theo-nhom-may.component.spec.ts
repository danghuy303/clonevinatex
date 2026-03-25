import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachTheoNhomMayComponent } from './danh-sach-theo-nhom-may.component';

describe('DanhSachTheoNhomMayComponent', () => {
  let component: DanhSachTheoNhomMayComponent;
  let fixture: ComponentFixture<DanhSachTheoNhomMayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachTheoNhomMayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachTheoNhomMayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

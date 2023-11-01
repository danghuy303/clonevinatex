import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachMatHangComponent } from './danh-sach-mat-hang.component';

describe('DanhSachMatHangComponent', () => {
  let component: DanhSachMatHangComponent;
  let fixture: ComponentFixture<DanhSachMatHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachMatHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachMatHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

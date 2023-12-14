import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatKhoVatTuDanhSachComponent } from './xuat-kho-vat-tu-danh-sach.component';

describe('XuatKhoVatTuDanhSachComponent', () => {
  let component: XuatKhoVatTuDanhSachComponent;
  let fixture: ComponentFixture<XuatKhoVatTuDanhSachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatKhoVatTuDanhSachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatKhoVatTuDanhSachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

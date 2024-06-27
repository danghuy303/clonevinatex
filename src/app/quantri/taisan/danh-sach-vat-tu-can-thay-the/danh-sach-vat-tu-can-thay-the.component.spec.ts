import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachVatTuCanThayTheComponent } from './danh-sach-vat-tu-can-thay-the.component';

describe('DanhSachVatTuCanThayTheComponent', () => {
  let component: DanhSachVatTuCanThayTheComponent;
  let fixture: ComponentFixture<DanhSachVatTuCanThayTheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachVatTuCanThayTheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachVatTuCanThayTheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachBangGiaComponent } from './danh-sach-bang-gia.component';

describe('DanhSachBangGiaComponent', () => {
  let component: DanhSachBangGiaComponent;
  let fixture: ComponentFixture<DanhSachBangGiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachBangGiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachBangGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

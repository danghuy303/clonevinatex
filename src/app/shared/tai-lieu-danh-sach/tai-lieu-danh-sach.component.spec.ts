import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiLieuDanhSachComponent } from './tai-lieu-danh-sach.component';

describe('TaiLieuDanhSachComponent', () => {
  let component: TaiLieuDanhSachComponent;
  let fixture: ComponentFixture<TaiLieuDanhSachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiLieuDanhSachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiLieuDanhSachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

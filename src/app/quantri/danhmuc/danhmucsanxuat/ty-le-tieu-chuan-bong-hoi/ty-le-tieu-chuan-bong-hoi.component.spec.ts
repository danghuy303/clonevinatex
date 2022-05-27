import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TyLeTieuChuanBongHoiComponent } from './ty-le-tieu-chuan-bong-hoi.component';

describe('TyLeTieuChuanBongHoiComponent', () => {
  let component: TyLeTieuChuanBongHoiComponent;
  let fixture: ComponentFixture<TyLeTieuChuanBongHoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TyLeTieuChuanBongHoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TyLeTieuChuanBongHoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemDinhTaiSanPopupThemMoiComponent } from './kiem-dinh-tai-san-popup-them-moi.component';

describe('KiemDinhTaiSanPopupThemMoiComponent', () => {
  let component: KiemDinhTaiSanPopupThemMoiComponent;
  let fixture: ComponentFixture<KiemDinhTaiSanPopupThemMoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemDinhTaiSanPopupThemMoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemDinhTaiSanPopupThemMoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

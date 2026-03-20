import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiLieuPhanCongCongViecComponent } from './tai-lieu-phan-cong-cong-viec.component';

describe('TaiLieuPhanCongCongViecComponent', () => {
  let component: TaiLieuPhanCongCongViecComponent;
  let fixture: ComponentFixture<TaiLieuPhanCongCongViecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiLieuPhanCongCongViecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiLieuPhanCongCongViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

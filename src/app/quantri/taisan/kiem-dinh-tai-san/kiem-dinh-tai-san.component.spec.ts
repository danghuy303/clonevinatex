import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemDinhTaiSanComponent } from './kiem-dinh-tai-san.component';

describe('KiemDinhTaiSanComponent', () => {
  let component: KiemDinhTaiSanComponent;
  let fixture: ComponentFixture<KiemDinhTaiSanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemDinhTaiSanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemDinhTaiSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

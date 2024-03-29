import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemDinhTaiSanModalComponent } from './kiem-dinh-tai-san-modal.component';

describe('KiemDinhTaiSanModalComponent', () => {
  let component: KiemDinhTaiSanModalComponent;
  let fixture: ComponentFixture<KiemDinhTaiSanModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemDinhTaiSanModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemDinhTaiSanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

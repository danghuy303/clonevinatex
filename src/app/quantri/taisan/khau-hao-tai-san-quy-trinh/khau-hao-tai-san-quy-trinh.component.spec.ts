import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhauHaoTaiSanQuyTrinhComponent } from './khau-hao-tai-san-quy-trinh.component';

describe('KhauHaoTaiSanQuyTrinhComponent', () => {
  let component: KhauHaoTaiSanQuyTrinhComponent;
  let fixture: ComponentFixture<KhauHaoTaiSanQuyTrinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhauHaoTaiSanQuyTrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhauHaoTaiSanQuyTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

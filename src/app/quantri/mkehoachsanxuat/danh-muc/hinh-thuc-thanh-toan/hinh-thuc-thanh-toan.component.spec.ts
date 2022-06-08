import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HinhThucThanhToanComponent } from './hinh-thuc-thanh-toan.component';

describe('HinhThucThanhToanComponent', () => {
  let component: HinhThucThanhToanComponent;
  let fixture: ComponentFixture<HinhThucThanhToanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HinhThucThanhToanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HinhThucThanhToanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

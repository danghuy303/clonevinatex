import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiNhanCongHangThangComponent } from './chi-phi-nhan-cong-hang-thang.component';

describe('ChiPhiNhanCongHangThangComponent', () => {
  let component: ChiPhiNhanCongHangThangComponent;
  let fixture: ComponentFixture<ChiPhiNhanCongHangThangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiNhanCongHangThangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiNhanCongHangThangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

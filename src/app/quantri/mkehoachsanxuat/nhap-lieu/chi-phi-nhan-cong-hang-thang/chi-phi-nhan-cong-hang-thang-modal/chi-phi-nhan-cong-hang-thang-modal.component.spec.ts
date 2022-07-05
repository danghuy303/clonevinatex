import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiNhanCongHangThangModalComponent } from './chi-phi-nhan-cong-hang-thang-modal.component';

describe('ChiPhiNhanCongHangThangModalComponent', () => {
  let component: ChiPhiNhanCongHangThangModalComponent;
  let fixture: ComponentFixture<ChiPhiNhanCongHangThangModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiNhanCongHangThangModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiNhanCongHangThangModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

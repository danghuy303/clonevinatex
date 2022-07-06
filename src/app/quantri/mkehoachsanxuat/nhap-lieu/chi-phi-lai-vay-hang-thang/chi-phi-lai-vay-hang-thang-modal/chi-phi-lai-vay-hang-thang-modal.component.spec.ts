import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiLaiVayHangThangModalComponent } from './chi-phi-lai-vay-hang-thang-modal.component';

describe('ChiPhiLaiVayHangThangModalComponent', () => {
  let component: ChiPhiLaiVayHangThangModalComponent;
  let fixture: ComponentFixture<ChiPhiLaiVayHangThangModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiLaiVayHangThangModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiLaiVayHangThangModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

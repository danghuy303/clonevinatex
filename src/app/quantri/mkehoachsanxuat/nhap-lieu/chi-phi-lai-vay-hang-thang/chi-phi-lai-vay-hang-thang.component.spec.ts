import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiLaiVayHangThangComponent } from './chi-phi-lai-vay-hang-thang.component';

describe('ChiPhiLaiVayHangThangComponent', () => {
  let component: ChiPhiLaiVayHangThangComponent;
  let fixture: ComponentFixture<ChiPhiLaiVayHangThangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiLaiVayHangThangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiLaiVayHangThangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiXuatHangComponent } from './chi-phi-xuat-hang.component';

describe('ChiPhiXuatHangComponent', () => {
  let component: ChiPhiXuatHangComponent;
  let fixture: ComponentFixture<ChiPhiXuatHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiXuatHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiXuatHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

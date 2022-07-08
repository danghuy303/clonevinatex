import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiXuatHangModalComponent } from './chi-phi-xuat-hang-modal.component';

describe('ChiPhiXuatHangModalComponent', () => {
  let component: ChiPhiXuatHangModalComponent;
  let fixture: ComponentFixture<ChiPhiXuatHangModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiXuatHangModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiXuatHangModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

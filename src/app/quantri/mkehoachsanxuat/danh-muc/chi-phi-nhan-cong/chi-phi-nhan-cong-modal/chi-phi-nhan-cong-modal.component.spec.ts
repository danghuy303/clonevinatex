import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiNhanCongModalComponent } from './chi-phi-nhan-cong-modal.component';

describe('ChiPhiNhanCongModalComponent', () => {
  let component: ChiPhiNhanCongModalComponent;
  let fixture: ComponentFixture<ChiPhiNhanCongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiNhanCongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiNhanCongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

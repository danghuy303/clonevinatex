import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LapChiPhiModalComponent } from './lap-chi-phi-modal.component';

describe('LapChiPhiModalComponent', () => {
  let component: LapChiPhiModalComponent;
  let fixture: ComponentFixture<LapChiPhiModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LapChiPhiModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapChiPhiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

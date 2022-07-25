import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LapChiPhiComponent } from './lap-chi-phi.component';

describe('LapChiPhiComponent', () => {
  let component: LapChiPhiComponent;
  let fixture: ComponentFixture<LapChiPhiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LapChiPhiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapChiPhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

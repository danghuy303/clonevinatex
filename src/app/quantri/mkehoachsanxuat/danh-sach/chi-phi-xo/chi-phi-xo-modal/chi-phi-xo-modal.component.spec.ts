import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiXoModalComponent } from './chi-phi-xo-modal.component';

describe('ChiPhiXoModalComponent', () => {
  let component: ChiPhiXoModalComponent;
  let fixture: ComponentFixture<ChiPhiXoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiXoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiXoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

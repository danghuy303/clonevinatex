import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiXoComponent } from './chi-phi-xo.component';

describe('ChiPhiXoComponent', () => {
  let component: ChiPhiXoComponent;
  let fixture: ComponentFixture<ChiPhiXoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiXoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiXoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

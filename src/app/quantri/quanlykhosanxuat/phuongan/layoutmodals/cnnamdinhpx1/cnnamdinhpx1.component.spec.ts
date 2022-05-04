import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cnnamdinhpx1Component } from './cnnamdinhpx1.component';

describe('Cnnamdinhpx1Component', () => {
  let component: Cnnamdinhpx1Component;
  let fixture: ComponentFixture<Cnnamdinhpx1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cnnamdinhpx1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cnnamdinhpx1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

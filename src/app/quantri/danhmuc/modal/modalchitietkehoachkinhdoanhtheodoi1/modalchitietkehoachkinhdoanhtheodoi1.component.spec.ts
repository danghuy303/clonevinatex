import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Modalchitietkehoachkinhdoanhtheodoi1Component } from './modalchitietkehoachkinhdoanhtheodoi1.component';

describe('Modalchitietkehoachkinhdoanhtheodoi1Component', () => {
  let component: Modalchitietkehoachkinhdoanhtheodoi1Component;
  let fixture: ComponentFixture<Modalchitietkehoachkinhdoanhtheodoi1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Modalchitietkehoachkinhdoanhtheodoi1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Modalchitietkehoachkinhdoanhtheodoi1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

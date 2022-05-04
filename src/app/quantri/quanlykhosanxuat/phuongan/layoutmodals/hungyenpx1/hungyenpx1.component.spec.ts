import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hungyenpx1Component } from './hungyenpx1.component';

describe('Hungyenpx1Component', () => {
  let component: Hungyenpx1Component;
  let fixture: ComponentFixture<Hungyenpx1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hungyenpx1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hungyenpx1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

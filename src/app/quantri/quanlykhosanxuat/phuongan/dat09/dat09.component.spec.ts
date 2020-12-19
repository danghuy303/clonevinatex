import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dat09Component } from './dat09.component';

describe('Dat09Component', () => {
  let component: Dat09Component;
  let fixture: ComponentFixture<Dat09Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dat09Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dat09Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

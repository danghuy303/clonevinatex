import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VattucanthayComponent } from './vattucanthay.component';

describe('VattucanthayComponent', () => {
  let component: VattucanthayComponent;
  let fixture: ComponentFixture<VattucanthayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VattucanthayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VattucanthayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

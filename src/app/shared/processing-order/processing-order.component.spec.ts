import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingOrderComponent } from './processing-order.component';

describe('ProcessingOrderComponent', () => {
  let component: ProcessingOrderComponent;
  let fixture: ComponentFixture<ProcessingOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

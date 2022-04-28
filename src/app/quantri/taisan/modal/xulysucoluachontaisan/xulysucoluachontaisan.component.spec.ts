import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XulysucoluachontaisanComponent } from './xulysucoluachontaisan.component';

describe('XulysucoluachontaisanComponent', () => {
  let component: XulysucoluachontaisanComponent;
  let fixture: ComponentFixture<XulysucoluachontaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XulysucoluachontaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XulysucoluachontaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

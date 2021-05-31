import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcmodalComponent } from './calcmodal.component';

describe('CalcmodalComponent', () => {
  let component: CalcmodalComponent;
  let fixture: ComponentFixture<CalcmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

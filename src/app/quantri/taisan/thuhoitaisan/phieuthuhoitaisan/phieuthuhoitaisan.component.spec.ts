import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhieuthuhoitaisanComponent } from './phieuthuhoitaisan.component';

describe('PhieuthuhoitaisanComponent', () => {
  let component: PhieuthuhoitaisanComponent;
  let fixture: ComponentFixture<PhieuthuhoitaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhieuthuhoitaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhieuthuhoitaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

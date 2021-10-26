import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhlytaisanComponent } from './thanhlytaisan.component';

describe('ThanhlytaisanComponent', () => {
  let component: ThanhlytaisanComponent;
  let fixture: ComponentFixture<ThanhlytaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanhlytaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhlytaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

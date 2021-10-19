import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuluchopdongsoimodalComponent } from './phuluchopdongsoimodal.component';

describe('PhuluchopdongsoimodalComponent', () => {
  let component: PhuluchopdongsoimodalComponent;
  let fixture: ComponentFixture<PhuluchopdongsoimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhuluchopdongsoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhuluchopdongsoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

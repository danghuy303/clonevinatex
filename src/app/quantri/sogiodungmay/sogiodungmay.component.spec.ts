import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SogiodungmayComponent } from './sogiodungmay.component';

describe('SogiodungmayComponent', () => {
  let component: SogiodungmayComponent;
  let fixture: ComponentFixture<SogiodungmayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SogiodungmayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SogiodungmayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

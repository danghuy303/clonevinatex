import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiphibongComponent } from './chiphibong.component';

describe('ChiphibongComponent', () => {
  let component: ChiphibongComponent;
  let fixture: ComponentFixture<ChiphibongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiphibongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiphibongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

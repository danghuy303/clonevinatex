import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemlotuonglaimodalComponent } from './themlotuonglaimodal.component';

describe('ThemlotuonglaimodalComponent', () => {
  let component: ThemlotuonglaimodalComponent;
  let fixture: ComponentFixture<ThemlotuonglaimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemlotuonglaimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemlotuonglaimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

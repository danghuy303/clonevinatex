import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaphopdongsoiComponent } from './laphopdongsoi.component';

describe('LaphopdongsoiComponent', () => {
  let component: LaphopdongsoiComponent;
  let fixture: ComponentFixture<LaphopdongsoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaphopdongsoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaphopdongsoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

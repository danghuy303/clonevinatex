import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LapkehoachthangComponent } from './lapkehoachthang.component';

describe('LapkehoachthangComponent', () => {
  let component: LapkehoachthangComponent;
  let fixture: ComponentFixture<LapkehoachthangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LapkehoachthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapkehoachthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

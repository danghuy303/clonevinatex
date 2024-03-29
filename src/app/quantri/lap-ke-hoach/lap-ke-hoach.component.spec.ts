import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LapKeHoachComponent } from './lap-ke-hoach.component';

describe('LapKeHoachComponent', () => {
  let component: LapKeHoachComponent;
  let fixture: ComponentFixture<LapKeHoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LapKeHoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LapKeHoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

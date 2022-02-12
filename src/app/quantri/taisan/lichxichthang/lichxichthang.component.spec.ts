import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichxichthangComponent } from './lichxichthang.component';

describe('LichxichthangComponent', () => {
  let component: LichxichthangComponent;
  let fixture: ComponentFixture<LichxichthangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichxichthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichxichthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiphilichxichthangComponent } from './chiphilichxichthang.component';

describe('ChiphilichxichthangComponent', () => {
  let component: ChiphilichxichthangComponent;
  let fixture: ComponentFixture<ChiphilichxichthangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiphilichxichthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiphilichxichthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaisanlichxichthangComponent } from './taisanlichxichthang.component';

describe('TaisanlichxichthangComponent', () => {
  let component: TaisanlichxichthangComponent;
  let fixture: ComponentFixture<TaisanlichxichthangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaisanlichxichthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaisanlichxichthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

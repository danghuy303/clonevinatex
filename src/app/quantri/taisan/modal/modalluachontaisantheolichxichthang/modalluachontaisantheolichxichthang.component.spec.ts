import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalluachontaisantheolichxichthangComponent } from './modalluachontaisantheolichxichthang.component';

describe('ModalluachontaisantheolichxichthangComponent', () => {
  let component: ModalluachontaisantheolichxichthangComponent;
  let fixture: ComponentFixture<ModalluachontaisantheolichxichthangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalluachontaisantheolichxichthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalluachontaisantheolichxichthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

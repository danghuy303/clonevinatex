import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalluachonbaoduonglichxichtheothangComponent } from './modalluachonbaoduonglichxichtheothang.component';

describe('ModalluachonbaoduonglichxichtheothangComponent', () => {
  let component: ModalluachonbaoduonglichxichtheothangComponent;
  let fixture: ComponentFixture<ModalluachonbaoduonglichxichtheothangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalluachonbaoduonglichxichtheothangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalluachonbaoduonglichxichtheothangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalluachonloaibaoduongComponent } from './modalluachonloaibaoduong.component';

describe('ModalluachonloaibaoduongComponent', () => {
  let component: ModalluachonloaibaoduongComponent;
  let fixture: ComponentFixture<ModalluachonloaibaoduongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalluachonloaibaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalluachonloaibaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

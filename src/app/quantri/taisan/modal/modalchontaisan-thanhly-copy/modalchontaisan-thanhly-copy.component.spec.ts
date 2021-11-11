import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalchontaisanThanhlyCopyComponent } from './modalchontaisan-thanhly-copy.component';

describe('ModalchontaisanThanhlyCopyComponent', () => {
  let component: ModalchontaisanThanhlyCopyComponent;
  let fixture: ComponentFixture<ModalchontaisanThanhlyCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalchontaisanThanhlyCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalchontaisanThanhlyCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

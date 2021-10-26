import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalchontaisanCopyComponent } from './modalchontaisan-copy.component';

describe('ModalchontaisanCopyComponent', () => {
  let component: ModalchontaisanCopyComponent;
  let fixture: ComponentFixture<ModalchontaisanCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalchontaisanCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalchontaisanCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

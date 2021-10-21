import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalchontaisanComponent } from './modalchontaisan.component';

describe('ModalchontaisanComponent', () => {
  let component: ModalchontaisanComponent;
  let fixture: ComponentFixture<ModalchontaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalchontaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalchontaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalloaitaisanComponent } from './modalloaitaisan.component';

describe('ModalloaitaisanComponent', () => {
  let component: ModalloaitaisanComponent;
  let fixture: ComponentFixture<ModalloaitaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalloaitaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalloaitaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

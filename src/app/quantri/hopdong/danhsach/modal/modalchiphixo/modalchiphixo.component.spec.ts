import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalchiphixoComponent } from './modalchiphixo.component';

describe('ModalchiphixoComponent', () => {
  let component: ModalchiphixoComponent;
  let fixture: ComponentFixture<ModalchiphixoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalchiphixoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalchiphixoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

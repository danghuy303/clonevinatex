import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalchiphibongComponent } from './modalchiphibong.component';

describe('ModalchiphibongComponent', () => {
  let component: ModalchiphibongComponent;
  let fixture: ComponentFixture<ModalchiphibongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalchiphibongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalchiphibongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

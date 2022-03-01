import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalthemmoiluachontaisanComponent } from './modalthemmoiluachontaisan.component';

describe('ModalthemmoiluachontaisanComponent', () => {
  let component: ModalthemmoiluachontaisanComponent;
  let fixture: ComponentFixture<ModalthemmoiluachontaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalthemmoiluachontaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalthemmoiluachontaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

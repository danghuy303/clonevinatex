import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcapnhatbaoduongComponent } from './modalcapnhatbaoduong.component';

describe('ModalcapnhatbaoduongComponent', () => {
  let component: ModalcapnhatbaoduongComponent;
  let fixture: ComponentFixture<ModalcapnhatbaoduongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcapnhatbaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcapnhatbaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

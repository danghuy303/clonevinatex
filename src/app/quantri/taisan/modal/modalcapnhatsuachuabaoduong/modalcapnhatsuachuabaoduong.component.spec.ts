import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcapnhatsuachuabaoduongComponent } from './modalcapnhatsuachuabaoduong.component';

describe('ModalcapnhatsuachuabaoduongComponent', () => {
  let component: ModalcapnhatsuachuabaoduongComponent;
  let fixture: ComponentFixture<ModalcapnhatsuachuabaoduongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcapnhatsuachuabaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcapnhatsuachuabaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalthongkechitieuloicatComponent } from './modalthongkechitieuloicat.component';

describe('ModalthongkechitieuloicatComponent', () => {
  let component: ModalthongkechitieuloicatComponent;
  let fixture: ComponentFixture<ModalthongkechitieuloicatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalthongkechitieuloicatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalthongkechitieuloicatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

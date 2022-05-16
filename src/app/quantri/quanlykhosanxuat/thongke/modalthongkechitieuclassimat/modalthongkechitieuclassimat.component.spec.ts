import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalthongkechitieuclassimatComponent } from './modalthongkechitieuclassimat.component';

describe('ModalthongkechitieuclassimatComponent', () => {
  let component: ModalthongkechitieuclassimatComponent;
  let fixture: ComponentFixture<ModalthongkechitieuclassimatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalthongkechitieuclassimatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalthongkechitieuclassimatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

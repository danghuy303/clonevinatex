import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldinhmucchitieuclassimatComponent } from './modaldinhmucchitieuclassimat.component';

describe('ModaldinhmucchitieuclassimatComponent', () => {
  let component: ModaldinhmucchitieuclassimatComponent;
  let fixture: ComponentFixture<ModaldinhmucchitieuclassimatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldinhmucchitieuclassimatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldinhmucchitieuclassimatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

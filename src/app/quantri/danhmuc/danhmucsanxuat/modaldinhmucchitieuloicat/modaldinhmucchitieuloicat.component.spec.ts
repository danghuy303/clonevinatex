import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldinhmucchitieuloicatComponent } from './modaldinhmucchitieuloicat.component';

describe('ModaldinhmucchitieuloicatComponent', () => {
  let component: ModaldinhmucchitieuloicatComponent;
  let fixture: ComponentFixture<ModaldinhmucchitieuloicatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldinhmucchitieuloicatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldinhmucchitieuloicatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

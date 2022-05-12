import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldinhmucclassimatComponent } from './modaldinhmucclassimat.component';

describe('ModaldinhmucclassimatComponent', () => {
  let component: ModaldinhmucclassimatComponent;
  let fixture: ComponentFixture<ModaldinhmucclassimatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldinhmucclassimatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldinhmucclassimatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

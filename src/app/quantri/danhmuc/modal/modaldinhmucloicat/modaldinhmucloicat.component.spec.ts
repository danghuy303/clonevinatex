import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldinhmucloicatComponent } from './modaldinhmucloicat.component';

describe('ModaldinhmucloicatComponent', () => {
  let component: ModaldinhmucloicatComponent;
  let fixture: ComponentFixture<ModaldinhmucloicatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldinhmucloicatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldinhmucloicatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

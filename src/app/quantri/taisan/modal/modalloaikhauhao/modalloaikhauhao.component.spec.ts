import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalloaikhauhaoComponent } from './modalloaikhauhao.component';

describe('ModalloaikhauhaoComponent', () => {
  let component: ModalloaikhauhaoComponent;
  let fixture: ComponentFixture<ModalloaikhauhaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalloaikhauhaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalloaikhauhaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

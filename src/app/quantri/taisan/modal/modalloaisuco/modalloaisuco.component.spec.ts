import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalloaisucoComponent } from './modalloaisuco.component';

describe('ModalloaisucoComponent', () => {
  let component: ModalloaisucoComponent;
  let fixture: ComponentFixture<ModalloaisucoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalloaisucoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalloaisucoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

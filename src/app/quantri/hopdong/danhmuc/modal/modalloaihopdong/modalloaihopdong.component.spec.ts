import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalloaihopdongComponent } from './modalloaihopdong.component';

describe('ModalloaihopdongComponent', () => {
  let component: ModalloaihopdongComponent;
  let fixture: ComponentFixture<ModalloaihopdongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalloaihopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalloaihopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

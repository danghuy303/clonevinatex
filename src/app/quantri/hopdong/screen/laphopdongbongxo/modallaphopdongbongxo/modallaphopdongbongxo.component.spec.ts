import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModallaphopdongbongxoComponent } from './modallaphopdongbongxo.component';

describe('ModallaphopdongbongxoComponent', () => {
  let component: ModallaphopdongbongxoComponent;
  let fixture: ComponentFixture<ModallaphopdongbongxoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModallaphopdongbongxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModallaphopdongbongxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

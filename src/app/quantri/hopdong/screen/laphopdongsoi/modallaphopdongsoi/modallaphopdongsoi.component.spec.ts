import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModallaphopdongsoiComponent } from './modallaphopdongsoi.component';

describe('ModallaphopdongsoiComponent', () => {
  let component: ModallaphopdongsoiComponent;
  let fixture: ComponentFixture<ModallaphopdongsoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModallaphopdongsoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModallaphopdongsoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

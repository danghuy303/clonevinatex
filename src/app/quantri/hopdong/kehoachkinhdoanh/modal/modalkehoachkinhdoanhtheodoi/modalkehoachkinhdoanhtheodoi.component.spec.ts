import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalkehoachkinhdoanhtheodoiComponent } from './modalkehoachkinhdoanhtheodoi.component';

describe('ModalkehoachkinhdoanhtheodoiComponent', () => {
  let component: ModalkehoachkinhdoanhtheodoiComponent;
  let fixture: ComponentFixture<ModalkehoachkinhdoanhtheodoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalkehoachkinhdoanhtheodoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalkehoachkinhdoanhtheodoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

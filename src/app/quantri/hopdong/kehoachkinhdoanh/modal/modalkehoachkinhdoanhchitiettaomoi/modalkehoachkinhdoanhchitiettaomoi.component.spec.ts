import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalkehoachkinhdoanhchitiettaomoiComponent } from './modalkehoachkinhdoanhchitiettaomoi.component';

describe('ModalkehoachkinhdoanhchitiettaomoiComponent', () => {
  let component: ModalkehoachkinhdoanhchitiettaomoiComponent;
  let fixture: ComponentFixture<ModalkehoachkinhdoanhchitiettaomoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalkehoachkinhdoanhchitiettaomoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalkehoachkinhdoanhchitiettaomoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

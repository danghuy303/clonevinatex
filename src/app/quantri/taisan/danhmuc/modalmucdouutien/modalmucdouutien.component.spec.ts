import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalmucdouutienComponent } from './modalmucdouutien.component';

describe('ModalmucdouutienComponent', () => {
  let component: ModalmucdouutienComponent;
  let fixture: ComponentFixture<ModalmucdouutienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalmucdouutienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalmucdouutienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

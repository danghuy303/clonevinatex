import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChiPhiXoComponent } from './table-chi-phi-xo.component';

describe('TableChiPhiXoComponent', () => {
  let component: TableChiPhiXoComponent;
  let fixture: ComponentFixture<TableChiPhiXoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableChiPhiXoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChiPhiXoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChiPhiDienComponent } from './table-chi-phi-dien.component';

describe('TableChiPhiDienComponent', () => {
  let component: TableChiPhiDienComponent;
  let fixture: ComponentFixture<TableChiPhiDienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableChiPhiDienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChiPhiDienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

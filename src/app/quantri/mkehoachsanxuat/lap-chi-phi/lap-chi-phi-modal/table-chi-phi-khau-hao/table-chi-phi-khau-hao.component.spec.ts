import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChiPhiKhauHaoComponent } from './table-chi-phi-khau-hao.component';

describe('TableChiPhiKhauHaoComponent', () => {
  let component: TableChiPhiKhauHaoComponent;
  let fixture: ComponentFixture<TableChiPhiKhauHaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableChiPhiKhauHaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChiPhiKhauHaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

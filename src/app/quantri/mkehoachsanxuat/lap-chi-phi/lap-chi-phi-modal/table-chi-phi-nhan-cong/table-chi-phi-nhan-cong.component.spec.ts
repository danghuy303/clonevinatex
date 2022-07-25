import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChiPhiNhanCongComponent } from './table-chi-phi-nhan-cong.component';

describe('TableChiPhiNhanCongComponent', () => {
  let component: TableChiPhiNhanCongComponent;
  let fixture: ComponentFixture<TableChiPhiNhanCongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableChiPhiNhanCongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChiPhiNhanCongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChiPhiVatTuPhuComponent } from './table-chi-phi-vat-tu-phu.component';

describe('TableChiPhiVatTuPhuComponent', () => {
  let component: TableChiPhiVatTuPhuComponent;
  let fixture: ComponentFixture<TableChiPhiVatTuPhuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableChiPhiVatTuPhuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChiPhiVatTuPhuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChiPhiBanHangComponent } from './table-chi-phi-ban-hang.component';

describe('TableChiPhiBanHangComponent', () => {
  let component: TableChiPhiBanHangComponent;
  let fixture: ComponentFixture<TableChiPhiBanHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableChiPhiBanHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChiPhiBanHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

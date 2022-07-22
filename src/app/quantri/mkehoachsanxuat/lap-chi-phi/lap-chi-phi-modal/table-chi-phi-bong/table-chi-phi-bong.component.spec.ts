import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChiPhiBongComponent } from './table-chi-phi-bong.component';

describe('TableChiPhiBongComponent', () => {
  let component: TableChiPhiBongComponent;
  let fixture: ComponentFixture<TableChiPhiBongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableChiPhiBongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChiPhiBongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

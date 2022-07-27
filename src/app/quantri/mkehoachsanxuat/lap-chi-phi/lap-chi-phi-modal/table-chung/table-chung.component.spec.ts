import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChungComponent } from './table-chung.component';

describe('TableChungComponent', () => {
  let component: TableChungComponent;
  let fixture: ComponentFixture<TableChungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableChungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

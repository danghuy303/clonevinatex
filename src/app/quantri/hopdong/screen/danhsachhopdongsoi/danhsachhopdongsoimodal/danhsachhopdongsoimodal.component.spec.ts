import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachhopdongsoimodalComponent } from './danhsachhopdongsoimodal.component';

describe('DanhsachhopdongsoimodalComponent', () => {
  let component: DanhsachhopdongsoimodalComponent;
  let fixture: ComponentFixture<DanhsachhopdongsoimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachhopdongsoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhopdongsoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuyetToanNguyenLieuComponent } from './quyet-toan-nguyen-lieu.component';

describe('QuyetToanNguyenLieuComponent', () => {
  let component: QuyetToanNguyenLieuComponent;
  let fixture: ComponentFixture<QuyetToanNguyenLieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuyetToanNguyenLieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuyetToanNguyenLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

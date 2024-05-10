import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucDoiBaoDuongComponent } from './danh-muc-doi-bao-duong.component';

describe('DanhMucDoiBaoDuongComponent', () => {
  let component: DanhMucDoiBaoDuongComponent;
  let fixture: ComponentFixture<DanhMucDoiBaoDuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhMucDoiBaoDuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucDoiBaoDuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

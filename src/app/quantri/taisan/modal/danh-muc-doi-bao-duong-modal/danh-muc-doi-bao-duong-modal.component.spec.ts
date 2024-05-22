import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucDoiBaoDuongModalComponent } from './danh-muc-doi-bao-duong-modal.component';

describe('DanhMucDoiBaoDuongModalComponent', () => {
  let component: DanhMucDoiBaoDuongModalComponent;
  let fixture: ComponentFixture<DanhMucDoiBaoDuongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhMucDoiBaoDuongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucDoiBaoDuongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

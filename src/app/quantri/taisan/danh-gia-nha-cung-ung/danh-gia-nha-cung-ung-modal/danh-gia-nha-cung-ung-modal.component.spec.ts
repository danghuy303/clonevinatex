import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhGiaNhaCungUngModalComponent } from './danh-gia-nha-cung-ung-modal.component';

describe('DanhGiaNhaCungUngModalComponent', () => {
  let component: DanhGiaNhaCungUngModalComponent;
  let fixture: ComponentFixture<DanhGiaNhaCungUngModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhGiaNhaCungUngModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhGiaNhaCungUngModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

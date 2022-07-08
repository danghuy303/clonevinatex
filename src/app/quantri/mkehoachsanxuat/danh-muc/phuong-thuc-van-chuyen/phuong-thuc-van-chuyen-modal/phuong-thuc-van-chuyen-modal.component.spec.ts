import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuongThucVanChuyenModalComponent } from './phuong-thuc-van-chuyen-modal.component';

describe('PhuongThucVanChuyenModalComponent', () => {
  let component: PhuongThucVanChuyenModalComponent;
  let fixture: ComponentFixture<PhuongThucVanChuyenModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhuongThucVanChuyenModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhuongThucVanChuyenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

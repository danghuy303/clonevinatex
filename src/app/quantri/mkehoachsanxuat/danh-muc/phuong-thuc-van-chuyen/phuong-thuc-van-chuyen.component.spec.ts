import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuongThucVanChuyenComponent } from './phuong-thuc-van-chuyen.component';

describe('PhuongThucVanChuyenComponent', () => {
  let component: PhuongThucVanChuyenComponent;
  let fixture: ComponentFixture<PhuongThucVanChuyenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhuongThucVanChuyenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhuongThucVanChuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

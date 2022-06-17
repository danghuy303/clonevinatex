import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmHeThongDieuKhongComponent } from './dm-he-thong-dieu-khong.component';

describe('DmHeThongDieuKhongComponent', () => {
  let component: DmHeThongDieuKhongComponent;
  let fixture: ComponentFixture<DmHeThongDieuKhongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmHeThongDieuKhongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmHeThongDieuKhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
